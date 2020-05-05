const uuid = require("uuid");
const users = [];

const addUsers = ({ id, name }) => {
  name = name.trim().toLowerCase();
  // room = room.trim().toLowerCase();
  if (users.length % 2 == 0) {
    var user = { name, id, room: uuid.v4() };
    users.push(user);
  } else {
    user = { name, id, room: users[users.length - 1].room };
    users.push(user);
  }
  console.log(user);
  //const user = { id, name, room };
  // users.push(user);
  return { user };
};

const removeUser = id => {
  var d;
  const index = users.findIndex(user => user.id === id);
  const currentUser = users.find(user => user.id === id);

  if (index !== -1) {
    d = users.splice(index, 1)[0];
  }
  const roomUser = users.findIndex(user => user.room === currentUser.room);
  const roomUserContent = users.find(user => user.room === currentUser.room);
  if (roomUser !== -1) {
    const changeUser = users.splice(roomUser, 1)[0];
    if (users.length % 2 != 0) {
      const user = {
        name: changeUser.name,
        id: changeUser.id,
        room: users[users.length - 1].room
      };
      users.push(user);
    } else {
      users.push(changeUser);
    }
  }
  return d;
};

const getUser = id => {
  return users.find(user => user.id == id);
};

const getUsersInRoom = room => users.filter(user => user.room === room);

module.exports = { addUsers, getUser, getUsersInRoom, removeUser };
