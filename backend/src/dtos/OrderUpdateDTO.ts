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
import { OrderStatus } from "../model/OrderSchema";
// {
//     "orderStatus": "Test",
//     "coordinates":[88.4101,22.6076],
//     "comment": "Your order is ready to shipped"
// }
export class UpdateOrderStatusDTO {
  @IsEnum(OrderStatus)
  orderStatus!: OrderStatus;

  @IsNotEmpty()
  coordinates!: [];

  @IsOptional()
  @IsString()
  comment?: string;
}
