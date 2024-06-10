const express = require('express');
const bodyParser = require('body-parser');
const Book = require('./models/book'); 
const db = require('./config/database'); 

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  const books = await Book.find({});
  res.render('index', { books });
});


app.get('/add-book', (req, res) => {
  res.render('add-book');
});


app.post('/add-book', async (req, res) => {
  const { title, author, price } = req.body;
  const newBook = new Book({ title, author, price });
  await newBook.save();
  res.redirect('/');
});


app.get('/edit-book/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render('edit-book', { book });
});

// app.get('/edit-book2', async (req, res) => {
//   const books = await Book.find({});
//   res.render('edit-book2',{books});
// });

app.get('/edit-book2', async (req, res) => {
  const books = await Book.find({});
  res.render('edit-book2', { books, selectedBook: null });
});


app.post('/edit-book/:id', async (req, res) => {
  const { title, author, price } = req.body;
  await Book.findByIdAndUpdate(req.params.id, { title, author, price });
  res.redirect('/');
});

app.post('/delete-book/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Bookstore app listening at http://localhost:${port}`);
});
