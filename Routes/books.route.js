const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../Middlewares/verifyToken");
const {
  getAllBooks,
  getOneBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../Controllers/books.controller");


router.route("/")
.get(getAllBooks)
.post(verifyTokenAndAdmin, createBook);


router.route("/:bookId")
  .get(getOneBook)
  .put( verifyTokenAndAdmin, updateBook)
  .delete( verifyTokenAndAdmin, deleteBook);


module.exports = router;
