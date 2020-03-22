const fs = require('fs');
const usersRouter = require('express').Router();
const noSuchUser =  {"message": "Нет пользователя с таким id"};
const wrongLink = { "message": "Запрашиваемый ресурс не найден" };

usersRouter.get('/users/:id', (req, res) => {
  fs.readFile('./data/user.json', 'utf8', (err, users) => { // читаю файл не через require, потому что, насколько я понимаю, при чтении через require файл считывается один раз при запуске сервера, но он может редактироваться по ходу при удалении или добавлении новых пользователей, поэтому стоит считывать его каждый раз при обращении по ссылке?
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

// не уверена, как правильно делать вариант несуществующего адреса. Чтобы такая схема работала, нужно подключать этот роутер в самую последнюю очередь, иначе таким образом отрабатывает любой адрес, подключенный после него. но в теории на этот счет ничего не было.
usersRouter.get('/:nonexistent', (req, res) => {
  res.status(404).send(wrongLink);
});

module.exports = usersRouter;