const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'math-tutorials',
  api_key: '338281388755611',
  api_secret: '6BNa0Jo5bMtwjBVG1IZdEDf8SzI',
  secure: true,
});

module.exports = cloudinary;
