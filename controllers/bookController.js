const bookModel = require("../models/bookModel.js");
require("dotenv").config();

// Return the compressed books object instead of the original one and number of books found
const compressBooks = (books) => {
    let result = {totalItems : books.totalItems, items:[]};
    for (const item of books.items) {
        const book = {
            id:item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            image: item.volumeInfo.imageLinks?.thumbnail
        }
        result.items.push(book);
    }
    return result; 
}

// Return the compressed single book
const compressedSingleBook = (book) => {
    const result = {
        authors: book.volumeInfo.authors.join(',  '),
        booktype: "Physical",
        categories: book.volumeInfo.categories.join(', '),
        date_finish: null,
        date_start: null,
        // deleting all html tags from the book description
        description: book.volumeInfo.description.replace(/<[^>]*>/g, ''),
        image: book.volumeInfo.imageLinks.thumbnail,
        language: book.volumeInfo.language,
        pagecount: book.volumeInfo.pageCount,
        pagetype:  'Page',
        publisher:  book.volumeInfo.publisher,
        reading_progress: null,
        score: null,
        status: null,
        title: book.volumeInfo.title,
        id:0
    }
    console.log(result);
    
    return result; 
}

module.exports = {
    // get all books of the user from the DB
    getAllBooks: async (req, res) => {
    const { user_id } = req.body;
    try {
        const books = await bookModel.getAllBooksByUserId(user_id);
        res.status(201).json(books);
    } catch (error) {
        console.log(error);
    }},

    // get all the books of the user with a certain status from the DB
    getBooksByStatus: async (req, res) => {
        const { user_id, status } = req.body;
        try {
            const books = await bookModel.getBooksByStatus(user_id, status);
            res.status(201).json(books);
        } catch (error) {
            console.log(error);
        }},

    // get a single book of the user from the DB
    getBookById : async (req, res) => {
        const id = req.params.id;
        try {
            const book = await bookModel.getBookById(id);
            if (book) res.status(200).json(book)
            else res.status(404).json({ message: 'Book not found' });
        } catch (error) {
            console.log(error);
        }
    }, 

    // search for books matching the search criteria in Google Books API
    searchBooks : async (req, res) => {
        const { title, authors } = req.body;
        try {
            const books = await bookModel.searchBooks(title, authors);
            if (books.totalItems!=0) {const result = compressBooks(books);
            if (books) res.status(200).json(result)}
            else res.status(404).json({ message: "Couldn't find any books matching your request. Please change your request" });
        } catch (error) {
            console.log(error);
        }
    },

    // search for a book matching the with certain id in Google books API
    searchBookById : async (req, res) => {
        const id = req.params.id;
        try {
            const book = await bookModel.searchBookById(id);
            console.log(compressedSingleBook(book));
            if (book) res.status(200).json(compressedSingleBook(book))
            else res.status(404).json({ message: 'Book not found' });
        } catch (error) {
            console.log(error);
        }
    }, 

    // add a new book to the user's collection in the DB
    addBook: async (req, res) => {
        const { authors, booktype, categories, date_finish,date_start,
            description, image, language, pagecount, pagetype, publisher, reading_progress,
            score, status, title, user_id} = req.body;
        try {
          const book = await bookModel.addBook(authors, booktype, categories, date_finish,date_start,
            description, image, language, pagecount, pagetype, publisher, reading_progress,
            score, status, title, user_id);
          res.status(201).json(`Book added successfully!`);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "internal server error" });
        }
      },
};