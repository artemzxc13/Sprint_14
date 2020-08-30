# Sprint_14
 [] Аутентификация и авторизация и  пользователя в проекте.
  Стек: NodeJS, Express, MongoDB

  ## Запуск
  | ЗАПРОС | ОТВЕТ | 
| :---         |     :---       |  
| POST `localhost:3000/signup`   | Регистрация нового пользователя     |
| POST `localhost:3000/signin`   | Логин     |
| PATCH `http://localhost:3000/users/me`   | Изменение информации о пользователе     |
| PATCH `http://localhost:3000/users/me/avatar`   | Изменение аватара пользователя     |
| GET `localhost:3000/users`   | JSON-список всех пользователей     |
| GET `localhost:3000/cards`     | JSON-список всех карточек       | 
| GET `localhost:3000/users/343weuhw32t32u`     | JSON-пользователя с переданным после /users идентификатором. Если такого нет, API должно возвращать 404 статус ответа и JSON:`{ "message": "Пользователь с таким id не найден" }`       | 
| POST `localhost:3000/cards`     | Создание карточки. В ответ API должно возвращать 200 статус ответа и JSON с данными созданой карточки       | 
| DELETE `localhost:3000/cards/6w34defeuhedio34`     | Удаление карточки. В ответ API должно возвращать 200 статус ответа и JSON с данными удаленной карточки       | 
| Несуществующий адрес     | `{ "message": "Запрашиваемый ресурс не найден" }`       | 
