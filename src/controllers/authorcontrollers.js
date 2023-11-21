const Author = require('../author/authormodel');
const Book = require('../books/bookmodel');

exports.addAuthor = async (req, res) => {
  try {
    const { author_name } = req.body;
    const newAuthor = await Author.create({ author_name });
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ message: 'Error adding author', error: error.message });
  }
};

exports.getAuthorByName = async (req, res) => {
  try {
    const authorName = req.body.author; 
    console.log(authorName);
    const author_ID = await Author.findOne({
        where: { author_name: authorName}
    })
    console.log(author_ID.author_ID)
    const books = await Book.findAll({
        where: { author_ID: author_ID.author_ID }
    })
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving author', error: error.message });
  }
};

