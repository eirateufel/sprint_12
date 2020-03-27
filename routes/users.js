const fs = require('fs');
const usersRouter = require('express').Router();

usersRouter.get('/users/:id', (req, res) => {
  fs.readFile('./data/user.json', 'utf8', (err, users) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    const { id } = req.params;
    const parsed = JSON.parse(users);
    const user = parsed.find(item => item._id === id);
    if (!user) {

      res.status(404).json({"message": "Нет пользователя с таким id"});
      return;
    }
    res.send(user);
  });
});

usersRouter.get('/users', (req, res) => {
  fs.readFile('./data/user.json', 'utf8', (err, users) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.send(users);
  });
});

usersRouter.get('/:nonexistent', (req, res) => {
  res.status(404).json({"message": "Запрашиваемый ресурс не найден"});
});

module.exports = usersRouter;