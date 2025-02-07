const asyncHandler = require("express-async-handler");
const {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
} = require("../Models/authors.model");

/**
 *  @desc    Get all authors
 *  @route   /api/authors
 *  @method  GET
 *  @access  public
 */

const getAllAuthors = asyncHandler(async (req, res) => {
  const { pageNumber } = req.query;
  const authorsPerPage = 3;
  const authors = await Author.find({}, { __v: false, _id: false })
    .skip((pageNumber - 1) * authorsPerPage)
    .limit(authorsPerPage);
  res.status(200).json(authors);
});

/**
 *  @desc    Get author by id
 *  @route   /api/authors/:id
 *  @method  GET
 *  @access  public
 */

const getOneAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.authorId, {
    __v: false,
    _id: false,
  });
  if (author) {
    res.status(200).json(author);
  } else {
    res.status(404).json({ error: "author not found" });
  }
});

/**
 *  @desc    create a new author
 *  @route   /api/authors
 *  @method  POST
 *  @access  private 
 */

const createAuthor = asyncHandler(async (req, res) => {
  const { error } = validateCreateAuthor(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const newAuthor = new Author({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
    image: req.body.image,
  });
  const author = await newAuthor.save();
  res.status(201).json(author);
});

/**
 *  @desc    Update author by id
 *  @route   /api/authors/:id
 *  @method  Put
 *  @access  private
 */

const updateAuthor = asyncHandler(async (req, res) => {
  const { error } = validateUpdateAuthor(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const author = await Author.findByIdAndUpdate(
    req.params.authorId,
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image,
      },
    },
    { new: true }
  ).select("-_id -__v");
  res.status(200).json(author);
});

/**
 *  @desc    Delete author by id
 *  @route   /api/authors/:id
 *  @method  DELETE
 *  @access  private
 */

const deleteAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.authorId);
  if (author) {
    await Author.findByIdAndDelete(req.params.authorId);
    return res.status(200).json({ message: "author Has been Deleted" });
  } else {
    return res.status(404).json({ error: "author not found" });
  }
});


module.exports = {
  getAllAuthors,
  getOneAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
}