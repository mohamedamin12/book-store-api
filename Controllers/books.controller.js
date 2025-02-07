const asyncHandler = require("express-async-handler");
const {
  Book,
  validateCreateBook,
  validateUpdateBook,
} = require("../Models/books.model");

/**
 *  @desc    Get All Books
 *  @route   /api/books
 *  @method  Get
 *  @access  public (only admin)
 */

const getAllBooks = asyncHandler(async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  let books;
  if (minPrice && maxPrice) {
    books = await Book.find({
      price: { $gte: minPrice, $lte: maxPrice },
    }).populate("author", ["_id", "firstName", "lastName"]);
  } else {
    books = await Book.find().populate("author", [
      "_id",
      "firstName",
      "lastName",
    ]);
  }

  res.status(200).json(books);
});

/**
 *  @desc    Get All Books
 *  @route   /api/books/:bookId
 *  @method  Get
 *  @access  public (only admin)
 */

const getOneBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.bookId).populate("author", [
    "_id",
    "firstName",
    "lastName",
  ]);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

/**
 *  @desc    Create a new Book
 *  @route   /api/books
 *  @method  Post
 *  @access  private (only admin)
 */

const createBook = asyncHandler(async (req, res) => {
  const { error } = validateCreateBook(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  });
  const book = await newBook.save();
  res.status(201).json(book);
});

/**
 *  @desc    update book
 *  @route   /api/books/:bookId
 *  @method  Put
 *  @access  private (only admin)
 */

const updateBook = asyncHandler(async (req, res) => {
  const { error } = validateUpdateBook(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const book = await Book.findByIdAndUpdate(
    req.params.bookId,
    {
      $set: {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover,
      },
    },
    {
      new: true,
    }
  );
  res.status(200).json(book);
});

/**
 *  @desc    Delete book
 *  @route   /api/books/:bookId
 *  @method  Delete
 *  @access  private (only admin)
 */

const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.bookId);
  if (book) {
    await Book.findByIdAndDelete(req.params.bookId);
    return res.status(200).json({ message: "Book Has been Deleted" });
  } else {
    return res.status(404).json({ error: "Book not found" });
  }
});

module.exports = {
  getAllBooks,
  getOneBook,
  createBook,
  updateBook,
  deleteBook,
};
