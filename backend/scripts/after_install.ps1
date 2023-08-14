cd C:\Users\Administrator\Desktop\apispocc_react_ecommerce_apis
npm start
pm2 start npm --name "reports-generator-backend" -- start
pm2 startup
pm2 save
pm2 restart all