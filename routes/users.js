const fs = require('fs');
const usersRouter = require('express').Router();
const message =  {"message": "Нет пользователя с таким id"};

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

      res.status(404).send(message);
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


module.exports = usersRouter;