const fs = require('fs');
const cardsRouter = require('express').Router();

cardsRouter.get('/cards', (req, res) => {
  fs.readFile('./data/cards.json', 'utf8', (err, cards) => {
    if (err) {
        console.log("File read failed:", err)
        return;
    }
    res.send(cards);
  });
  return;
});

module.exports = cardsRouter;