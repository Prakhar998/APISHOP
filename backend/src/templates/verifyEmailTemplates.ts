const verifyEmail = function (customerName: string, otp: string, yourCompanyName: string) {
  const html = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Customer Confirmation</title>
  <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet">
  <style>
        body {
      font-family: 'Montserrat', Arial, sans-serif;
      background-color: #f6f6f6;
      margin: 0;
      padding: 0;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    
    h1 {
      font-size: 24px;
      margin-bottom: 20px;
      color: #333333;
    }
    
    p {
      font-size: 16px;
      margin-bottom: 10px;
      color: #555555;
    }
    
    .otp {
      font-size: 20px;
      font-weight: bold;
      background-color: #f6f6f6;
      padding: 10px;
      border-radius: 4px;
      text-align: center;
    }
    
    .center {
      text-align: center;
      margin-top: 30px;
    }
    
    .signature {
      margin-top: 20px;
      font-style: italic;
      color: #888888;
    }
  </style>
</head>

<body>
  <div class="container">
    <h1>Welcome to ${yourCompanyName}!</h1>
    <p>Dear ${customerName},</p>
    <p>Thank you for creating an account with us. We're excited to have you on board!</p>
    
    
    <div class="otp">${otp}</div>
    
    <p>This OTP is valid for 10 minutes. Please enter it on our website to verify your account.</p>
    
    <div class="center">
      <p>If you didn't request this OTP or need any assistance, please contact our customer support team.</p>
    </div>
    
    <p>If you have any questions or need assistance, feel free to reach out to our customer support team.</p>
    
    <p>Thank you again for choosing our store!</p>
    
    <p class="signature">Best regards,<br>
      ${yourCompanyName}</p>
  </div>
</body>

</html>`;
  return html;
};
export default verifyEmail;
