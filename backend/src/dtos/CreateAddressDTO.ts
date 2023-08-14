import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsPositive,
  IsOptional,
  Length,
  IsEnum,
  IsBoolean,
} from "class-validator";
import { AddressType } from "../model/addressSchema";
// address: string;
// city: string;
// state: string;
// country: string;
// zipCode: string;
// landmark: string;
// user: UserDoc;
export class CreateAddressDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  address!: string;

  @IsNotEmpty()
  @IsString()
  city!: string;

  @IsNotEmpty()
  @IsString()
  country!: string;

  @IsNotEmpty()
  @IsString()
  state!: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  zipCode!: string;

  @IsNotEmpty()
  @IsString()
  landmark!: string;

  @IsOptional()
  @IsString()
  extraNote?: string;

  @IsEnum(AddressType)
  addressType!: AddressType;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
