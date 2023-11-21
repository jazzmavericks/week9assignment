const {Router} = require("express");
const bookRouter = Router();
const {addBook, addMultipleBooks, listAllBooks, updatePublisher, updateAuthor, updateGenre, deleteBook, deleteAllBooks, findByAuthor} = require("../books/bookcontrollers");

// ROUTES

bookRouter.post("/addBook", addBook);
bookRouter.post("/addMultipleBooks", addMultipleBooks);
bookRouter.get("/listAllBooks", listAllBooks);
bookRouter.get("/findByAuthor", findByAuthor);
bookRouter.put("/updatePublisher", updatePublisher);
bookRouter.put("/updateAuthor", updateAuthor);
bookRouter.put("/updateGenre", updateGenre);
bookRouter.delete("/deleteBook", deleteBook);
bookRouter.delete("/deleteAllBooks", deleteAllBooks);

module.exports = bookRouter;