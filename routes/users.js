const fs = require('fs');
const usersRouter = require('express').Router();
const noSuchUser =  {"message": "Нет пользователя с таким id"};
const wrongLink = { "message": "Запрашиваемый ресурс не найден" };

usersRouter.get('/users/:id', (req, res) => {
  fs.readFile('./data/user.json', 'utf8', (err, users) => {
    if (err) {
        console.log("File read failed:", err)
        return;
    }
    const {id} = req.params;
    const parsed = JSON.parse(users);
    const user = parsed.find(item=>item._id===id);
    if (!user) {

      res.status(404).send(noSuchUser);
      return
    }
    res.send(user);
  });
  return;
});

usersRouter.get('/users', (req, res) => {
  fs.readFile('./data/user.json', 'utf8', (err, users) => {
    if (err) {
        console.log("File read failed:", err)
        return;
    }
    res.send(users);
  });
  return;
});

usersRouter.get('/:nonexistent', (req, res) => {
  res.status(404).send(wrongLink);
});

module.exports = usersRouter;