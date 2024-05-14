const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  //Write your code here
  let username = req.body.username;
  let password = req.body.password;
  if (username && password) {
    if (isValid(username)) {
      users.push({username: username, password: password});
      return res.status(200).json({message: "User successfully registered"});
    } else { 
        return res.status(404).json({message: "User already exists"});
    }
  }
  return res.status(404).json({message: "Unable to register user"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  let results = [];

  Object.keys(books).forEach( key => {
    if (key === isbn){
      results.push(books[key]);
    }
  });

  if (results.length > 0){
    return res.status(200).send(JSON.stringify(results));
  } else {
    return res.status(404).json({message: "Author not found"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let author = req.params.author;
  let results = [];

  Object.keys(books).forEach( key => {
    if (books[key].author === author){
      results.push(books[key]);
    }
  });

  if (results.length > 0){
    return res.status(200).send(JSON.stringify(results));
  } else {
    return res.status(404).json({message: "Author not found"});
  }
});


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let title = req.params.title;
  let results = [];

  Object.keys(books).forEach( key => {
    if (books[key].title === title){
      results.push(books[key]);
    }
  });

  if (results.length > 0){
    return res.status(200).send(JSON.stringify(results));
  } else {
    return res.status(404).json({message: "Title not found"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  let results = [];

  Object.keys(books).forEach( key => {
    if (key === isbn){
      results.push(books[key].reviews);
    }
  });

  if (results.length > 0){
    return res.status(200).send(JSON.stringify(results));
  } else {
    return res.status(404).json({message: "Author not found"});
  }
});

module.exports.general = public_users;
