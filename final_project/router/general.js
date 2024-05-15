const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const axios = require('axios');
const public_users = express.Router();

//make books available to axios
public_users.get('/books', (req, res) =>{
  res.json(books);
});

//TASK 6:

//register a new customer
public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (isValid(username)) {
      users.push({"username": username, "password": password});
      return res.status(200).json({message: "User successfully registered"});
    } else { 
        return res.status(404).json({message: "User already exists"});
    }
  }
  return res.status(404).json({message: "Unable to register user"});
});


//TASK 1:

// Get the book list available in the shop - synchronously
/*
public_users.get('/',function (req, res) {
  return res.status(200).send(JSON.stringify(books));
});*/

//TASK 10:

//Get the book list available in the shop - using async/await
public_users.get('/', async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000/books");
    return res.status(200).send(JSON.stringify(response.data));
  } catch (error){
    return res.status(404).send(error.toString());
  }
});

//Get the book list available in the shop - using promises
/*public_users.get('/',  (req, res) => {
  axios.get("http://localhost:5000/books")
    .then(response => {
      res.status(404).send(JSON.stringify(response.data));
    })
    .catch(error => {
      res.status(404).send(error.toString());
    });
});*/

//TASK 2:

// Get book details based on ISBN - synchronously
/*public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
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
 });*/

 //TASK 11:

// Get book details based on ISBN - using async/await
 public_users.get('/isbn/:isbn',async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const response = await axios.get("http://localhost:5000/books");
    const books = response.data;
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

  } catch (error){
    return res.status(404).send(error.toString());
  };
});

// Get book details based on ISBN - using promises
/*public_users.get('/isbn/:isbn',function (req, res) {
  axios.get("http://localhost:5000/books")
    .then(response => {
      const isbn = req.params.isbn;
      const books = response.data;
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
    })
    .catch(error => {
      return res.status(404).send(error.toString());
    })
 });*/

 //TASK 3:
  
// Get book details based on author - synchronously
/*public_users.get('/author/:author',function (req, res) {
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
});*/

//TASK 12:

// Get book details based on author - using aync/await
public_users.get('/author/:author', async (req, res) => {
  try{
    const author = req.params.author;
    const response = await axios.get("http://localhost:5000/books");
    const books = response.data;
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
  } catch (error){
    return res.status(404).send(error.toString());
  }
  
});

// Get book details based on author - using promises
/*public_users.get('/author/:author', (req, res) => {
  axios.get("http://localhost:5000/books")
  .then(response =>{
    const author = req.params.author;
    const books = response.data;
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
  })
  .catch(error =>{
    return res.status(404).send(error.toString());
  });
  
});*/

//TASK 4:

// Get all books based on title - synchronously
/*public_users.get('/title/:title',function (req, res) {
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
});*/

//TASK 13:

// Get all books based on title - using sync/await
public_users.get('/title/:title',async (req, res) => {
  try {
    const title = req.params.title;
    const response = await axios.get("http://localhost:5000/books");
    const books = response.data;
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

  } catch (error){
    return res.status(404).send(error.toString());
  };
  
});

// Get all books based on title - using promises
/*public_users.get('/title/:title',function (req, res) {
  axios.get("http://localhost:5000/books")
  .then(response =>{
    const title = req.params.title;
    const books = response.data;
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
    };
  })
  .catch(error =>{
    return res.status(404).send(error.toString());
  });
  
});*/

//TASK 5:

//  Get book review - synchronously
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
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

//  Get book review - using async/await
/*public_users.get('/review/:isbn', async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const response = await axios.get("http://localhost:5000/books");
    const books = response.data;
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
  } catch (error) {
    return res.status(404).send(error.toString());
  }
});*/

//  Get book review - using promises
/*public_users.get('/review/:isbn', async (req, res) => {
  axios.get("http://localhost:5000/books")
  .then(response =>{
    const isbn = req.params.isbn;
    const books = response.data;
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
  })
  .catch (error =>{
    return res.status(404).send(error.toString());
  });
});*/

module.exports.general = public_users;
