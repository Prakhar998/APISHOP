import { validate } from "class-validator";
import { Request, Response } from "express";
import { CreateAddressDTO } from "../dtos/CreateAddressDTO";
import { UpdateAddressDTO } from "../dtos/updateAddressDTO";
import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidationError } from "../errors/request-validation-errors";
import { Address, AddressType } from "../model/addressSchema";
import { User } from "../model/userSchema";
import { isValidId } from "../services/validateMongoosedbId";
import { ResponseUtil } from "../utils/Response";

export class AddressController {
  static async AddAddressForUser(req: Request, res: Response) {
    const address = req.body;
    if (!req?.currentUser?.id) {
      throw new BadRequestError("session expired");
    }
    const userData = await User.findById(req.currentUser?.id);
    const dto = new CreateAddressDTO();
    Object.assign(dto, address);

    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new RequestValidationError(errors);
    }

    const isExistingTypeAddress = await Address.findOne({ user: req.currentUser?.id });
    if (!isExistingTypeAddress) {
      dto.isDefault = true;
    } else {
      dto.isDefault = false;
    }

    const addressData = Address.build({
      address: dto.address,
      city: dto.city,
      state: dto.state,
      country: dto.country,
      zipCode: dto.zipCode,
      landmark: dto.landmark,
      user: userData.id,
      extraNote: dto.extraNote ?? "",
      addressType: dto.addressType,
      isDefault: dto.isDefault,
    });

    await addressData
      .save()
      .then((address) => {
        ResponseUtil.sendResponse(res, "Address Added Successfully", address, null, 201);
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          let errors = {};
          Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message;
          });
          return ResponseUtil.sendError(res, "ValidationError", 422, errors);
        } else {
          throw new BadRequestError("something went wrong");
        }
      });
  }

  static async updateAddressOfCurrentUser(req: Request, res: Response) {
    const { addressId } = req.params;
    const addressBody = req.body;
    if (!isValidId(addressId)) {
      throw new BadRequestError("Address is not valid");
    }
    const dto = new UpdateAddressDTO();
    Object.assign(dto, addressBody);

    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new RequestValidationError(errors);
    }
    if (addressBody.isDefault) {
      const IsExistDefaultAddress = await Address.find({ user: req.currentUser?.id, isDefault: true });
      if (IsExistDefaultAddress.length > 0) {
        if (IsExistDefaultAddress[0].id !== addressId) {
          throw new BadRequestError("default already associated with another address");
        }
      }
    }
    await Address.findByIdAndUpdate(addressId, dto, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    })
      .then((val) => {
        ResponseUtil.sendResponse(res, "Address has been updated successfully", val, null, 200);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  static async removeAddressById(req: Request, res: Response) {
    const { addressId } = req.params;
    AddressController.isValidAddressId(addressId);
    const add = await Address.findById(addressId);
    if (!add || !add.user.equals(req.currentUser?.id)) {
      throw new BadRequestError("Address is not found");
    }
    try {
      await Address.findByIdAndDelete(addressId)
        .then((val) => {
          ResponseUtil.sendResponse(res, "Deleted successfully", null, null, 200);
        })
        .catch((e) => {
          throw new Error(e);
        });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  static async setDefaultAddressbyId(req: Request, res: Response) {
    const { addressId } = req.params;
    AddressController.isValidAddressId(addressId);
    const add = await Address.findById(addressId);
    if (!add || !add.user.equals(req.currentUser?.id)) {
      throw new BadRequestError("Address is not found");
    }

    try {
      await Address.updateMany(
        { isDefault: { $eq: true }, user: { $eq: add.user } },
        { $set: { isDefault: false } }
      ).then(async () => {
        await Address.findByIdAndUpdate(addressId, { isDefault: true })
          .then((_) => {
            ResponseUtil.sendResponse(res, "Updated!", null, null, 200);
          })
          .catch((e) => {
            throw new Error(e);
          });
      });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  static isValidAddressId(addressId: string) {
    if (!isValidId(addressId)) {
      throw new BadRequestError("Address is not valid");
    }
    return true;
  }

  static async getAddressOfCurrentUser(req: Request, res: Response) {
    await Address.find({ user: req.currentUser?.id })
      .then((address) => {
        return ResponseUtil.sendResponse(res, "Address Fetched Successfully", address, null, 200);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }
}
