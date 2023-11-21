const Book = require("./bookmodel");

async function addBook(req, res) {
    try {
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher,
            genre: req.body.genre
        }

        const dbresponse = await Book.create(newBook);
        console.log(dbresponse.Book);

        res.status(201).json({
            message: "Book added to table successfully",
            book: dbresponse
        })
    } catch (error) {
        res.status(501).json({
            message: error.message,
            error: error
        })
    }
}

async function addMultipleBooks(req, res) {
    try {
        const booksToAdd = req.body.books; 

        const createdBooks = await Promise.all(
            booksToAdd.map(async (bookData) => {
                const newBook = {
                    title: bookData.title,
                    author: bookData.author,
                    publisher: bookData.publisher,
                    genre: bookData.genre
                };

                return await Book.create(newBook);
            })
        );

        res.status(201).json({
            message: "Books added to table successfully",
            books: createdBooks
        });
    } catch (error) {
        res.status(501).json({
            message: error.message,
            error: error
        });
    }
}

async function listAllBooks (req, res) {
    try {
        const listOfBooks = await Book.findAll();
        res.status(200).json(listOfBooks);
    } catch (error) {
        res.status(501).json({
            message: error.message,
            error: error
        })   
    }
}

async function findByAuthor(req, res) {
    const { author } = req.body;

    try {
        if (!author) {
            return res.status(400).json({ message: 'Please provide author for search' });
        }

        const authorBook = await Book.findAll({ where: { author: author } });

        if (!authorBook) {
            return res.status(404).json({ message: 'Book by this author not found' });
        }

        res.status(200).json(authorBook);
    } catch (error) {
        res.status(500).json({ message: 'Failed to find book by author', error: error.message });
    }
}

async function updatePublisher(req, res) {
    const { title, newPublisher } = req.body;     
        try {
        const [rowsAffected] = await Book.update(
            { publisher: newPublisher }, { where: { title: title } }
        );

        const updatedBook = await Book.findOne({ where: { title: title } }); // Retrieve the updated book

        res.status(200).json({ message: 'Publisher updated successfully', updatedBook });
    } catch (error) {
        res.status(501).json({
            message: error.message,
            error: error
        })
    }
}

async function updateAuthor(req, res) {
    const { title, newAuthor } = req.body;     
        try {
        const [rowsAffected] = await Book.update(
            { author: newAuthor }, { where: { title: title } }
        );

        const updatedBook = await Book.findOne({ where: { title: title } });

        res.status(200).json({ message: 'Author updated successfully', updatedBook });
    } catch (error) {
        res.status(501).json({
            message: error.message,
            error: error
        })
    }
}

async function updateGenre(req, res) {
    const { title, newGenre } = req.body;     
        try {
        const [rowsAffected] = await Book.update(
            { genre: newGenre }, { where: { title: title } }
        );

        const updatedBook = await Book.findOne({ where: { title: title } });

        res.status(200).json({ message: 'Genre updated successfully', updatedBook });
    } catch (error) {
        res.status(501).json({
            message: error.message,
            error: error
        })
    }
}

async function deleteBook (req, res) {
    const {title} = req.body;
    try {
        const deletedBook = await Book.destroy({
            where: {title: title }
        });
        res.status(200).json({ message: 'Book deleted successfully'});
    } catch (error) {
        res.status(501).json({
            message: error.message,
            error: error
        })        
    }
}

async function deleteAllBooks (req, res) {
    try {
        await Book.destroy({
            where: {}
        });
        res.status(200).json({ message: 'All books deleted successfully'});
    } catch (error) {
        res.status(501).json({
            message: error.message,
            error: error
        })        
    }
}

module.exports = {addBook, addMultipleBooks, listAllBooks, updatePublisher, updateAuthor, deleteBook, deleteAllBooks, updateGenre, findByAuthor};