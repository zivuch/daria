const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const path = require("path");
const userRouter = require('./routes/userRouter.js')
const bookRouter = require('./routes/bookRouter.js')

const app = express();
app.use(express.json());
app.use(cookieParser());
// for development
app.use(cors({
  origin: process.env.HOSTURI, // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server listening on ${process.env.PORT || 3001}`);
});

app.use('/user', userRouter);
app.use('/books', bookRouter);

// Have Node serve the files for our built React app
app.use(express.static(path.join(__dirname, "/client/dist")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});


