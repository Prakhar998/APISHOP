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
export class UpdateAddressDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  address?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  city?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  country?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  state?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  zipCode?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  landmark?: string;

  @IsOptional()
  @IsString()
  extraNote?: string;

  @IsOptional()
  @IsEnum(AddressType)
  addressType?: AddressType;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
