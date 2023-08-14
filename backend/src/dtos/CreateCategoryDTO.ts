import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { IsNotBlank } from "../decorators/IsNotBlank";

export class createCategory {
  @IsNotEmpty()
  @IsString()
  @IsNotBlank("title")
  title!: string;
}
