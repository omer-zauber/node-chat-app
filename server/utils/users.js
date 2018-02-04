class Users {
  constructor () {
    this.users = [];
  }

  addUser(id, name, room) {
    const user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    const result = this.getUser(id);
    if (result) this.users = this.users.filter((user)=>user.id !== id);
    return result;
  };

  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  getUserList(room) {
    return this.users
      .filter((user) => user.room === room)
      .map((user) => user.name);
  }
}

module.exports = { Users };
