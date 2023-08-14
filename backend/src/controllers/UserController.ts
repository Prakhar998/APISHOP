import { validate, validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { AppConstant } from "../constant/constant";
import { SignupDTO } from "../dtos/SignupDTO";
import { BadRequestError } from "../errors/bad-request-error";
import { User, UserDoc } from "../model/userSchema";
import jwt from "jsonwebtoken";
import { RequestValidationError } from "../errors/request-validation-errors";
import { ResponseUtil } from "../utils/Response";
import { ResetPasswordDTO, SignInDTO, VerifyEmailDTO } from "../dtos/SignInDTO";
import { Password } from "../services/password";
import { UnAuthorizeError } from "../errors/unauthorize-errors";
import { isValidUrl } from "../services/url-validation";
import { NotFoundError } from "../errors/not-found";
import { Paginator } from "../services/paginator";
import mongoose, { Model, Mongoose } from "mongoose";
import { isValidId } from "../services/validateMongoosedbId";
import { Product } from "../model/productSchema";
import { Cart } from "../model/cartSchema";
import { Address } from "../model/addressSchema";
import { cloudinaryInstance } from "../services/cloudinary";
import { check_env_isExist } from "../config/dbConnect";
import verifyEmail from "../templates/verifyEmailTemplates";
import MailService from "../services/mail/mailService";
import { generateOtp, otpExpirationDuration, verifyOtp } from "../utils/otp";
import otpMaster, { OtpType } from "../model/otpMaster";
import logger from "../utils/logging";

export class UserController {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    const userData = req.body;
    const dto = new SignupDTO();
    Object.assign(dto, userData);

    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new RequestValidationError(errors);
    }

    const avatar = UserController.getAvatarByName(dto.name.toLowerCase());
    dto.loginIp = req.headers["x-forwarded-for"]?.toString() || req.socket.remoteAddress;

    const user = User.build({
      name: dto.name,
      phone: dto.phone,
      email: dto.email,
      password: dto.password,
      avatar: avatar,
      loginIp: dto.loginIp,
      isAdmin: dto.isAdmin || false,
    });

    await user
      .save()
      .then(async (user) => {
        UserController.setJwtToken(user, req, dto.isAdmin ?? false, true);
        await UserController.generateOtpAndSendEmailToUser(user._id, dto.name, dto.email, req);
        ResponseUtil.sendResponse(
          res,
          `User Created Successfully, verification link has sent to ${dto.email}`,
          { user, token: req.session },
          null,
          201
        );
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          let errors = {};
          Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message;
          });
          return ResponseUtil.sendError(res, "ValidationError", 422, errors);
        } else {
          throw new BadRequestError(AppConstant.MSG_ACCOUNT_CREATION_FAILED);
        }
      });
  }

  static async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        throw new BadRequestError("email and otp is required");
      }
      let user = await User.findOne({ email });

      if (!user) {
        throw new NotFoundError("You have entered an invalid email address.");
      } else if (user.isActive) {
        return ResponseUtil.sendResponse(res, "User Email is Already verified.", null);
      }
      let isOtpValid = await verifyOtp(user.id, otp, OtpType.VERIFICATION);
      if (!isOtpValid) {
        throw new BadRequestError("This Otp has Invalid!");
      }
      await User.findByIdAndUpdate(user.id, { isActive: true });
      await otpMaster.findByIdAndDelete(isOtpValid);
      ResponseUtil.sendResponse(res, "Email verified successfully", null);
    } catch (e: any) {
      logger.error(e);
      throw new Error("Verification Failed!");
    }
  }

  static async generateOtpAndSendEmailToUser(
    userId: any,
    userName: string,
    userEmail: string,
    req: Request,
    otpType?: OtpType
  ) {
    try {
      const otp: string = generateOtp(AppConstant.OTP_LENGTH);
      let newOtp = new otpMaster({
        userId: userId,
        type: otpType ?? OtpType.VERIFICATION,
        otp,
        otpExpiration: new Date(otpExpirationDuration()),
      });
      await newOtp.save();

      const emailTemplate = verifyEmail(userName, otp, AppConstant.APP_NAME);
      const mailService = MailService.getInstance();
      await mailService.sendMail(req.headers["X-Request-Id"]!, {
        to: userEmail,
        subject: "Verify OTP",
        html: emailTemplate,
      });
    } catch (e: any) {
      logger.error(e);
      throw new Error(e);
    }
  }

  static async reSendEmailVerify(req: Request, res: Response) {
    try {
      const body = req.body;
      const dto = new VerifyEmailDTO();
      Object.assign(dto, body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        throw new RequestValidationError(errors);
      }

      const isExistingAccount = await User.findOne({ email: dto.email });
      if (!isExistingAccount) {
        throw new NotFoundError("user not found!");
      }
      const otp = await otpMaster.findOne({ userId: isExistingAccount._id });
      if (otp) {
        await otpMaster.findByIdAndDelete(otp._id);
      }
      await UserController.generateOtpAndSendEmailToUser(
        isExistingAccount._id,
        isExistingAccount.name,
        isExistingAccount.email,
        req
      ).then(() => {
        ResponseUtil.sendResponse(res, `Verification link has sent to ${dto.email}`, null);
      });
    } catch (e: any) {
      logger.error(e);
      throw new Error("Something Went Wrong!");
    }
  }

  static async forgotPassword(req: Request, res: Response) {
    try {
      const body = req.body;
      const dto = new VerifyEmailDTO();
      Object.assign(dto, body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        throw new RequestValidationError(errors);
      }
      const isExistingAccount = await User.findOne({ email: dto.email });
      if (!isExistingAccount) {
        throw new NotFoundError("Bad credentials");
      }
      if (!isExistingAccount.isActive) {
        throw new BadRequestError("Please confirm your account by confirmation email OTP and try again");
      }
      await UserController.generateOtpAndSendEmailToUser(
        isExistingAccount._id,
        isExistingAccount.name,
        isExistingAccount.email,
        req,
        OtpType.FORGET
      ).then(() => {
        ResponseUtil.sendResponse(
          res,
          `Hey! ${isExistingAccount.name} verification link has sent to ${dto.email}`,
          null
        );
      });
    } catch (e) {
      logger.error(e);
      throw new Error("Something Went Wrong!");
    }
  }

  static async verifyForgetPassword(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        throw new BadRequestError("email and otp is required");
      }
      let user = await User.findOne({ email });
      if (!user) {
        throw new BadRequestError("Bad credentials");
      }
      let isOtpValid = await verifyOtp(user.id, otp, OtpType.FORGET);
      if (!isOtpValid) {
        throw new BadRequestError("This Otp has Invalid!");
      }
      ResponseUtil.sendResponse(res, "Otp Verified, Now you able to set password", null);
    } catch (e) {
      logger.error(e);
      throw new Error("Something Went Wrong");
    }
  }

  static async resetPassword(req: Request, res: Response) {
    try {
      const requestBody = req.body;
      const dto = new ResetPasswordDTO();
      Object.assign(dto, requestBody);
      const errors = await validate(dto);
      if (errors.length > 0) {
        throw new RequestValidationError(errors);
      }
      const existingUser = await User.findOne({ email: dto.email });
      if (!existingUser) {
        throw new BadRequestError("User Not Found!");
      }

      const isMatchedPassword = await Password.compare(
        (await Password.toHash(dto.password)).toString(),
        dto.confirmPassword
      );
      if (!isMatchedPassword) {
        throw new BadRequestError("confirm Password and password should be same");
      }

      const hashedPassword = await Password.toHash(dto.password);
      await User.findByIdAndUpdate(existingUser._id, { password: hashedPassword }).then((_) => {
        UserController.wipeoutSession(req);
        ResponseUtil.sendResponse(res, "Password changed Successfully", null);
      });
    } catch (e) {
      logger.error(e);
      throw new Error("Something Went Wrong!");
    }
  }

  static async getOtpByEmailOnlyForDevelopment(req: Request, res: Response) {
    try {
      const body = req.body;
      const dto = new VerifyEmailDTO();
      Object.assign(dto, body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        throw new RequestValidationError(errors);
      }
      const isExistingAccount = await User.findOne({ email: dto.email });
      if (!isExistingAccount) {
        throw new NotFoundError("user not found!");
      }
      const otp = await otpMaster.findOne({ userId: isExistingAccount._id });
      if (!otp) {
        throw new NotFoundError("otp not found!");
      }
      ResponseUtil.sendResponse(res, "otp fetched successfully", otp);
    } catch (e: any) {
      logger.error(e);
      throw new Error(e);
    }
  }

  static async changeEmailOfUser(req: Request, res: Response) {
    try {
      const body = req.body;
      const currentUserEmail = req.currentUser?.email;
      const currentUserId = req.currentUser?.id;

      const dto = new VerifyEmailDTO();
      Object.assign(dto, body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        throw new RequestValidationError(errors);
      }
      const user = await User.findById(currentUserId);
      if (!user) {
        throw new BadRequestError("User not Exist");
      }
      const isExistingAccount = await User.findOne({ email: dto.email });

      if (isExistingAccount && isExistingAccount._id != currentUserId) {
        throw new BadRequestError("Email already Exist with another account");
      } else if (
        isExistingAccount &&
        isExistingAccount._id == currentUserId &&
        isExistingAccount.email == currentUserEmail
      ) {
        throw new BadRequestError("Your email already updated!");
      }
      await User.findByIdAndUpdate(currentUserId, { isActive: false, email: dto.email });
      await UserController.generateOtpAndSendEmailToUser(currentUserId, user.name, dto.email, req);
      ResponseUtil.sendResponse(res, `verification link has sent to ${dto.email}`, null);
    } catch (e: any) {
      logger.error(e);
      throw new Error(e);
    }
  }

  static async signIn(req: Request, res: Response) {
    const userData = req.body;
    const dto = new SignInDTO();
    Object.assign(dto, userData);
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new RequestValidationError(errors);
    }

    const existingUser = await User.findOne({ email: dto.email });
    if (!existingUser) {
      throw new UnAuthorizeError(`${dto.email} doesn't exist or Invalid Email Address`);
    }

    if (!existingUser.isActive) {
      throw new UnAuthorizeError(
        `Your account has not active,Please confirm your account by confirmation email OTP and try again, or contact with administrator`
      );
    }

    const isPasswordMatch = await Password.compare(existingUser.password, dto.password);

    if (!isPasswordMatch) {
      throw new UnAuthorizeError("Inavlid Credentials");
    }
    await User.findByIdAndUpdate(existingUser.id, { lastLoginAt: Date.now() })
      .then((value) => {
        UserController.setJwtToken(existingUser, req, existingUser.isAdmin, existingUser.isActive);

        ResponseUtil.sendResponse(res, "loggedIn Successfully", existingUser, null, 200);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  static async currentUser(req: Request, res: Response) {
    if (isValidUrl(req.url)) {
      return ResponseUtil.sendResponse(res, "fetched Successfully", { currentUser: req.currentUser }, null, 200);
    } else {
      throw new NotFoundError();
    }
  }

  static async getProfile(req: Request, res: Response) {
    const email = req.currentUser?.email;
    let user = await User.findOne({ email });

    if (!user) {
      throw new NotFoundError(`${email} not found!`);
    }
    const userDetails = await UserController.getUserProfile(user._id);
    return ResponseUtil.sendResponse(res, "profile Fetched", userDetails, null, 200);
  }

  private static async getUserProfile(userId) {
    try {
      let cartDetails = await Cart.find({ userId: userId });
      let address = await Address.find({ user: userId });

      const profile = await User.findById(userId);
      profile.cart = cartDetails;
      profile.address = address;
      return profile;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  static async signout(req: Request, res: Response) {
    UserController.wipeoutSession(req);
    return ResponseUtil.sendResponse(res, "Logout successfully!", null, null, 200);
  }

  private static wipeoutSession(req: Request) {
    req.session = null;
  }

  static async updateProfile(req: Request, res: Response) {
    if (typeof req.body.avatar !== "undefined") {
      throw new BadRequestError("can not change avatar at this moment");
    }
    if (typeof req.body.isAdmin !== "undefined") {
      throw new BadRequestError("You dont have engough permission to modify the permission");
    }
    let user = await User.findById(req.currentUser?.id);
    if (!user) {
      throw new NotFoundError();
    }
    await User.findByIdAndUpdate(req.currentUser?.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    })
      .then((val) => {
        ResponseUtil.sendResponse(res, "Profile has been updated successfully", val, null, 200);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  static async uploadUserImage(req: Request, res: Response) {
    const currentUser = req.currentUser?.id;
    const mainFolder_nev = check_env_isExist(
      process.env.MAIN_FOLDER_UPLOAD_FOR_USER,
      AppConstant.MAIN_FOLDER_UPLOAD_MSG
    );

    const isExistUser = await User.exists({ _id: currentUser });
    if (!isExistUser) {
      throw new NotFoundError("User not Exist!");
    }

    const file = req.file;
    if (!file) {
      throw new BadRequestError("file(jpeg,jpg,png) is required!");
    }

    const localFilePath = file.path;
    const originalname = currentUser + "-" + file.originalname.split(".")[0] + Date.now();

    try {
      const data = await cloudinaryInstance.uploadImage(localFilePath, originalname, mainFolder_nev);
      const userData = await User.updateOne(
        { _id: currentUser },
        {
          $set: {
            avatar: {
              url: data.url,
              public_id: data.public_id,
            },
          },
        },
        { upsert: true }
      );

      const userDetails = await UserController.getUserProfile(currentUser);
      ResponseUtil.sendResponse(res, "user image uploaded with success!", userDetails, null, 200);
    } catch (e: any) {
      throw new Error(e);
    }
  }

  // static async deleteUserProfileImage(req: Request, res: Response) {
  //   const { public_id } = req.body;
  //   if (!public_id) {
  //     throw new BadRequestError('public_id not found!')
  //   }

  // }

  static async localToCartUp(req: Request, res: Response) {
    try {
      const itemList = req.body;
      const currentUserId = req.currentUser?.id;
      let successCount = 0;
      if (!Array.isArray(itemList)) {
        throw new BadRequestError("Required Product list with quantity i.e [{productId:xyz, quantity:1}]");
      }

      for (let item in itemList) {
        const result = await UserController.addToCartHelper(
          itemList[item]["productId"],
          itemList[item]["quantity"],
          res,
          currentUserId
        );
        successCount += result ? 1 : 0;
      }
      if (successCount === itemList.length) {
        ResponseUtil.sendResponse(res, "All items Added Successfully", itemList, null, 200, 0);
      } else {
        throw new BadRequestError("oops Went wrong!");
      }
    } catch (e) {
      console.log(e);
      throw new Error("something went wrong");
    }
  }

  static async addToCart(req: Request, res: Response) {
    const { productId } = req.body;
    const currentUserId = req.currentUser?.id;
    const quantity = Number.parseInt(req.body.quantity);
    try {
      await UserController.addToCartHelper(productId, quantity, res, currentUserId).then(() => {
        ResponseUtil.sendResponse(res, "SuccessFully added in cart", null, null, 200);
      });
    } catch (e: any) {
      logger.error(e);
      throw new Error(e);
    }
  }

  static async clearCart(req: Request, res: Response) {
    try {
      const currentUserId = req.currentUser?.id;
      const existingUser = await User.findById(currentUserId);
      if (!existingUser) {
        throw new NotFoundError("User not Found!");
      }
      const cartData = await UserController.getCart(currentUserId!);
      if (!cartData) {
        throw new NotFoundError("Carts are empty");
      }

      await Cart.findByIdAndDelete(cartData.id, {}).then((_) => {
        ResponseUtil.sendResponse(res, "Cleared Successfully", null, null);
      });
    } catch (e) {
      logger.error(e);
      throw new Error("Something Went Wrong!");
    }
  }

  private static async addToCartHelper(productId: string, quantity: number, res: Response, currentUserId: any) {
    try {
      if (!isValidId(productId)) {
        throw new NotFoundError("Product id is invalid");
      }
      let cart = await UserController.getCart(currentUserId!);
      // console.log(cart);

      let productDetails = await Product.findById(productId);
      // let user = await User.findById(req.currentUser?.id);

      if (!productDetails) {
        throw new NotFoundError("Product not Found");
      }
      if (productDetails.stock <= 0) {
        throw new BadRequestError(
          `${productDetails.name} has only ${productDetails.stock} quantity of product available`
        );
      } else if (productDetails.stock < quantity) {
        throw new BadRequestError(
          `${productDetails.name} has only ${productDetails.stock} quantity of product available`
        );
      } else {
        if (cart) {
          const indexFound = cart.items.findIndex((item) => item.product._id.toString() === productId);
          if (indexFound !== -1 && quantity <= 0) {
            cart.items.splice(indexFound, 1);
            if (cart.items.length == 0) {
              cart.subTotal = 0;
            } else {
              cart.subTotal = cart.items.map((item) => item.total).reduce((acc, next) => acc + next);
            }
          } else if (indexFound !== -1) {
            cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
            cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
            cart.items[indexFound].price = productDetails.price;
            cart.subTotal = cart.items.map((item) => item.total).reduce((acc, next) => acc + next);
            if (cart.items[indexFound].quantity > productDetails.stock) {
              throw new BadRequestError(
                `${productDetails.name} failed to cart! due to stock(${productDetails.stock}) is less than the cart quantity`
              );
            }
          } else if (quantity > 0) {
            cart.items.push({
              product: productId,
              quantity: quantity,
              price: productDetails.price,
              total: productDetails.price * quantity,
            });
            cart.subTotal = cart.items.map((item) => item.total).reduce((acc, next) => acc + next);
            cart.userId = currentUserId;
          } else {
            throw new BadRequestError("invalid Request");
          }

          await cart.save().then((_) => {
            return true;
          });
          // let user = await User.findByIdAndUpdate();
          return true;
        } else {
          const cartData = {
            items: [
              {
                product: productId,
                quantity: quantity,
                total: productDetails.price * quantity,
                price: productDetails.price,
              },
            ],
            subTotal: productDetails.price * quantity,
            userId: currentUserId,
          };
          await UserController.addItem(cartData).then((_) => {
            return true;
          });
        }
      }
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  static async decreaseQuantityOfCart(req: Request, res: Response) {
    const quantity = 1;
    let user = await User.findById(req.currentUser?.id);
    console.log(user);
    if (!user) throw new BadRequestError("User Invalid");
    let productId = req.body.productId;
    if (!isValidId(productId)) return res.status(400).send({ status: false, message: "Invalid product ID" });
    let productDetails = await Product.findById(productId);
    // let user = await User.findById(req.currentUser?.id);
    if (!productDetails) {
      throw new NotFoundError("Product not Found");
    }
    if (productDetails.stock < quantity) {
      throw new BadRequestError(`only ${productDetails.stock} quantity of product available`);
    }
    let cart = await Cart.findOne({ userId: user?._id });
    if (!cart) throw new NotFoundError("Cart not Found!");
    let indexFound = cart.items.findIndex((item) => item.product._id.toString() === productId);
    if (indexFound > -1) {
      let productItem = cart.items[indexFound];
      productItem.quantity -= quantity;
      productItem.total = productItem.quantity * productDetails.price;
      productItem.price = productDetails.price;
      cart.subTotal = cart.items.map((item) => item.total).reduce((acc, next) => acc + next);
      cart.items[indexFound] = productItem;
      cart = await cart.save();
      return ResponseUtil.sendResponse(res, "Updated the cart", cart, 200);
    } else {
      throw new NotFoundError("Item not exist in cart");
    }
  }
  static async increaseQuantityOfCart(req: Request, res: Response) {
    const quantity = 1;
    let user = await User.findById(req.currentUser?.id);
    console.log(user);
    if (!user) throw new BadRequestError("User Invalid");
    let productId = req.body.productId;
    if (!isValidId(productId)) return res.status(400).send({ status: false, message: "Invalid product ID" });
    let productDetails = await Product.findById(productId);
    // let user = await User.findById(req.currentUser?.id);
    if (!productDetails) {
      throw new NotFoundError("Product not Found");
    }
    if (productDetails.stock < quantity) {
      throw new BadRequestError(`only ${productDetails.stock} quantity of product available`);
    }
    let cart = await Cart.findOne({ userId: user?._id });
    if (!cart) throw new NotFoundError("Cart not Found!");
    let indexFound = cart.items.findIndex((item) => item.product._id.toString() === productId);
    if (indexFound > -1) {
      let productItem = cart.items[indexFound];
      productItem.quantity += quantity;
      productItem.total = productItem.quantity * productDetails.price;
      productItem.price = productDetails.price;
      cart.subTotal = cart.items.map((item) => item.total).reduce((acc, next) => acc + next);
      if (productItem.quantity > productDetails.stock) {
        throw new BadRequestError(
          `${productDetails.name} failed to cart! due to stock(${productDetails.stock}) is less than the cart quantity`
        );
      }
      cart.items[indexFound] = productItem;
      cart = await cart.save();
      return ResponseUtil.sendResponse(res, "Updated the cart", cart, 200);
    } else {
      throw new NotFoundError("Item not exist in cart");
    }
  }

  static async getCartOfCurrentUser(req: Request, res: Response) {
    const cartDetails = await Cart.find({ userId: req.currentUser?.id }).populate({
      path: "items.product",
      populate: { path: "images" },
      model: "Product",
    });
    return ResponseUtil.sendResponse(res, "Fetch records successfully", cartDetails, null, 200);
  }

  static async deleteItemFromCartofCurrentUser(req: Request, res: Response) {
    let user = await User.findById(req.currentUser?.id);
    console.log(user);
    if (!user) throw new BadRequestError("User Invalid");
    let productId = req.body.productId;
    if (!isValidId(productId)) return res.status(400).send({ status: false, message: "Invalid product ID" });
    let productDetails = await Product.findById(productId);
    // let user = await User.findById(req.currentUser?.id);
    if (!productDetails) {
      throw new NotFoundError("Product not Found");
    }
    let cart = await Cart.findOne({ userId: user?._id });
    if (!cart) throw new NotFoundError("Cart not Found!");
    let indexFound = cart.items.findIndex((item) => item.product._id.toString() === productId);
    if (indexFound > -1) {
      cart.items.splice(indexFound, 1);
      if (cart.items.length > 0) {
        cart.subTotal = cart.items.map((item) => item.total).reduce((acc, next) => acc + next);
      } else {
        cart.subTotal = 0;
      }

      cart = await cart.save();
      return ResponseUtil.sendResponse(res, "Item remove from the cart", cart, 200);
    } else {
      throw new NotFoundError("Item not exist in cart");
    }
  }

  static async getCart(userId: string) {
    const carts = await Cart.find({
      userId: userId,
    }).populate({
      path: "items.product",
      select: "name price total",
    });
    return carts[0];
  }
  static async addItem(payload) {
    const newItem = await Cart.create(payload);
    return newItem;
  }

  static setJwtToken = (user: UserDoc, req: Request, isAdmin: boolean, isActive: boolean) => {
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isAdmin: isAdmin,
        isActive: isActive,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };
  };

  private static getAvatarByName(name: string) {
    const modifiedName = name.split(" ").join("%20");
    return `https://avatars.dicebear.com/api/initials/:${modifiedName}.svg`;
  }
}
