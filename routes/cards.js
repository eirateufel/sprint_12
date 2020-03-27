const fs = require('fs');
const cardsRouter = require('express').Router();

cardsRouter.get('/cards', (req, res) => {
  fs.readFile('./data/cards.json', 'utf8', (err, cards) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.send(cards);
  });
});

module.exports = cardsRouter;
