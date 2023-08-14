import { IsEmail, IsNotEmpty, IsString, Length, MaxLength, MinLength } from "class-validator";
import { IsNotBlank } from "../decorators/IsNotBlank";

export class SignInDTO {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @IsNotBlank("password")
  password!: string;
}
export class VerifyEmailDTO {
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}

export class ResetPasswordDTO {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @Length(6, 6)
  otp!: string;

  @IsNotEmpty()
  @IsString()
  @IsNotBlank("password")
  password!: string;

  @IsNotEmpty()
  @IsString()
  @IsNotBlank("confirmPassword")
  confirmPassword!: string;
}
