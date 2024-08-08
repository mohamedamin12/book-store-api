const { Book } = require("./Models/books.model");
const {Author} = require("./Models/authors.model");
const {books , authors} = require("./data");
require("dotenv").config();
const connectToDB = require("./Config/connectDB");

// Connect To Database
connectToDB();

// Import Books (Seeding database)
const importBooks = async () => {
  try {
    await Book.insertMany(books);
    console.log("Books imported");
  }catch(error){
    console.log(error);
    process.exit(1);
  }
}

// Import Authors (Seeding database)

const importAuthors = async () => {
  try {
    await Author.insertMany(authors);
    console.log("Authors imported");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

// Remove Books 
const RemoveBooks = async () => {
  try {
    await Book.deleteMany();
    console.log("Books removed");
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
}

if (process.argv[2] === "-import-book") {
  importBooks();
}else if (process.argv[2] === "-remove-book") {
  RemoveBooks();
}else if (process.argv[2] === "-import-author") {
  importAuthors();
}

