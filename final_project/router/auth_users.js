const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

//boolean function to check if username is valid, i.e. username does not exist
const isValid = (username)=>{ 
  let usersWithSameUsername = users.filter((user) => {
    return user.username === username;
  });
  if (usersWithSameUsername.length > 0) {
    return false;
  } else {
    return true;
  }
}

//boolean function to test if user is authenticated
const authenticatedUser = (username,password)=>{ 
  let validUsers = users.filter((user) =>{
    return (user.username === username && user.password === password)
  });
  if (validUsers.length >0){
    return true;
  }else{
    return false;
  }
}

//TASK 7:

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password){
    return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username, password)){
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60});

    req.session.authorization = {
      accessToken, username
    }
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid login. Check username and password"});
  }

});

//TASK 8:

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  let reviewer = req.session.authorization['username'];
  let review = req.query.review;
  let filtered_review = books[isbn]["reviews"];

  if (books[isbn] && review){
    books[isbn]["reviews"][reviewer] = review;
    return res.status(200).json({message: "Review posted to " + JSON.stringify(books[isbn])});
    
  } else{
    return res.status(404).json({message: "No review submitted or book not found"});
  }
  
});

//TASK 9:

regd_users.delete("/auth/review/:isbn", (req, res) =>{
  const isbn = req.params.isbn;
  let reviewer = req.session.authorization['username'];
  let filtered_review = books[isbn]["reviews"];
  if (filtered_review[reviewer]){
    delete filtered_review[reviewer]
    res.send(`Reviews for the ISBN ${isbn} posted by the user ${reviewer} has been deleted`);
  }else{
    res.send("Cannot delete, as this review has been posted by a different user");
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
