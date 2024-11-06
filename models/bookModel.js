const { db } = require("../config/db.js");
const axios = require('axios');


module.exports = {
  getAllBooksByUserId: async (user_id) => {
    try {
      const books = await db("books")
        .select("id","title","authors","image", "status","reading_progress")
        .where({ user_id: user_id })
      return books;
    } catch (error) {
      throw error;
    }
  },
  getBooksByStatus: async (user_id, status) => {
    try {
      const books = await db("books")
        .select("id","title","authors","image", "status","reading_progress")
        .where({ user_id: user_id, status: status })
      return books;
    } catch (error) {
      throw error;
    }
  },
  getBookById: async (id) => {
    try {
      const book = await db("books")
      .select("id","title","authors","publisher", "description","image","categories","isbn","language","booktype","pagetype" ,"pagecount", "status","reading_progress", 
        "date_start", "date_finish", "score"  )
      .where({ id:id })
      .first();
      return book
    } catch (error) {
      throw error;
    }
  },
  searchBooks: async (title, authors) => {
    try {
      const books = await axios.get(``);
      return books.data;
    } catch (error) {
      throw error;
    }
  },
};








 


