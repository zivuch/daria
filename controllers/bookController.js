const bookModel = require("../models/bookModel.js");
require("dotenv").config();

module.exports = {
    getAllBooks: async (req, res) => {
    const { user_id } = req.body;
    try {
        const books = await bookModel.getAllBooksByUserId(user_id);
        res.status(201).json(books);
    } catch (error) {
        console.log(error);
    }},
    getBooksByStatus: async (req, res) => {
        const { user_id, status } = req.body;
        try {
            const books = await bookModel.getBooksByStatus(user_id, status);
            res.status(201).json(books);
        } catch (error) {
            console.log(error);
        }},
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
    searchBooks : async (req, res) => {
        const id = req.params.id;
        try {
            const book = await bookModel.getBookById(id);
            if (book) res.status(200).json(book)
            else res.status(404).json({ message: 'Book not found' });
        } catch (error) {
            console.log(error);
        }
    }, 

};