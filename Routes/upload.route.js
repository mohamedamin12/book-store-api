const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage(
  {
    destination: function (req , file , cb){
      cb(null , path.join(__dirname, "../Images"));
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, "-"  + file.originalname));
    }
  }
); 

const upload = multer({storage});

router.post("/", upload.single("image"), (req, res) => {
  res.json({ message: "Image Uploaded Successfully" });
});

module.exports = router;