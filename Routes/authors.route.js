const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../Middlewares/verifyToken");
const {
  getAllAuthors,
  getOneAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../Controllers/authors.controller");

router.route("/")
.get(getAllAuthors).
post(verifyTokenAndAdmin, createAuthor);

router.route("/:authorId")
  .get(getOneAuthor)
  .put(verifyTokenAndAdmin, updateAuthor)
  .delete(verifyTokenAndAdmin, deleteAuthor);


module.exports = router;
