import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, NotContains } from "class-validator";
import { IsBoolean } from "../decorators/IsBoolean";
import { IsNotBlank } from "../decorators/IsNotBlank";
/**
 * @openapi
 * components:
 *   schemas:
 *      SignupInput:
 *        type: object
 *        required:
 *           - name
 *           - phone
 *           - email
 *           - password
 *           - isAdmin
 *        properties:
 *           name:
 *             type: string
 *             default: Jane Doe
 *           phone:
 *             type: string
 *             default: 8001783576
 *           email:
 *             type: string
 *             default: jane@example.com
 *           password:
 *             type: string
 *             default: stringpassword123
 *           isAdmin:
 *             type: boolean
 *             default: false
 *      SignupResponse:
 *          type: object
 *          properties:
 *            success:
 *               type: boolean
 *               example: true
 *            message:
 *               type: string
 *               example: "User Created Successfully"
 *            data:
 *               type:  object
 *               properties:
 *                  user:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                        example: "64270907c447d1e9a929a49c"
 *                      name:
 *                        type: string
 *                        example: Jane Doe
 *                      email:
 *                        type: string
 *                        example: jane@example.com
 *                      phone:
 *                        type: string
 *                        example: "8001783576"
 *                      avatar:
 *                        type: string
 *                        example: "https://avatars.dicebear.com/api/initials/:jane%20doe.svg"
 *                      isAdmin:
 *                        type: boolean
 *                        example: false
 *                      loginIp:
 *                        type: string
 *                        example: "::1"
 *                      isActive:
 *                        type: boolean
 *                        example: true
 *                      cart:
 *                        type: Array
 *                        example: []
 *                      address:
 *                        type: Array
 *                        example: []
 *                      wishlist:
 *                        type: Array
 *                        example: []
 *                      lastLoginAt:
 *                        type: DateTime
 *                        example: "2023-03-31T16:23:35.777Z"
 *                      createdAt:
 *                        type: DateTime
 *                        example: "2023-03-31T16:23:35.840Z"
 *                      updatedAt:
 *                        type: DateTime
 *                        example: "2023-03-31T16:23:35.840Z"
 *            token:
 *                type: object
 *                properties:
 *                    jwt:
 *                      type: string
 *                      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjcwOTA3YzQ0N2QxZTlhOTI5YTQ5YyIsImVtYWlsIjoibWFubmEuc3VtYW4xMzVAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlzQWN0aXZlIjp0cnVlLCJpYXQiOjE2ODAyNzk4MTV9.Vjo3KyDIQPEwG6tR9XOe7TGbVnMfJx39H4TkV9iZ1J0"
 *            paginationInfo:
 *                type: object
 *                example: null
 */
export class SignupDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  phone!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  @IsNotBlank("password")
  password!: string;

  @IsBoolean("isAdmin")
  isAdmin?: boolean;

  loginIp?: string;
}
