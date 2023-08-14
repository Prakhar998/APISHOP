import { registerDecorator, ValidationOptions } from "class-validator";

export function IsBoolean(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    const defaultMesage = function () {
      return "It must be boolean and required";
    };
    registerDecorator({
      name: "isBoolean",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === "boolean";
        },
        defaultMessage: defaultMesage,
      },
    });
  };
}
