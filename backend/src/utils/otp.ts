import otpMaster from "../model/otpMaster";

const generateOtp = function (len: number): string {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < len; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const verifyOtp = async function (userId: any, otp: string, type: string): Promise<any> {
  let existOtp = await otpMaster.findOne({
    userId,
    otp,
    type,
  });

  const currentDate = new Date();
  let otpExpiration = existOtp?.otpExpiration;
  if (otpExpiration == null) {
    return null;
  } else {
    if (!existOtp || existOtp.otpExpiration! < currentDate) {
      return null;
    }
  }

  return existOtp._id;
};

const otpExpirationDuration = function () {
  let tokenExpiration: any = new Date();
  tokenExpiration = tokenExpiration.setMinutes(tokenExpiration.getMinutes() + 10);

  return tokenExpiration;
};
export { generateOtp, verifyOtp, otpExpirationDuration };
