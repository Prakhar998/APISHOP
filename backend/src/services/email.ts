import validator from "validator";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../model/userSchema";
import { BankAccount } from "../model/bankAccountSchema";

export async function validateEmail(email) {
  if (!validator.isEmail(email)) throw new BadRequestError("Invalid Email Address");
  const user = await User.findOne({ email });
  if (user) throw new BadRequestError("A user is already registered with this email address.");
}
export async function validatePhone(phone) {
  if (!validator.isMobilePhone(phone)) throw new BadRequestError("Invalid Phone number");
  const user = await User.findOne({ phone });
  if (user) throw new BadRequestError("A user is already registered with this phone number.");
}
function validateBankAccountNumber(accountNumber: string): boolean {
  // Remove any non-digit characters from the account number
  const sanitizedAccountNumber = accountNumber.replace(/\D/g, "");

  // Define a regular expression pattern for the valid account number format
  const accountNumberRegex = /^[0-9]{8,18}$/;

  // Check if the account number matches the pattern
  return accountNumberRegex.test(sanitizedAccountNumber);
}
export async function validateAccountNumber(accountNumber) {
  if (!validateBankAccountNumber(accountNumber)) throw new BadRequestError("Invalid Account Number");
  const isExistAccount = await BankAccount.findOne({ accountNumber: accountNumber });
  if (isExistAccount) throw new BadRequestError("This Bank account already existed!");
}
