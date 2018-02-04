const expect = require('expect');
const { Users } = require('./users')


describe('Users', () => {
  let users;
  
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'user1',
      room: 'Room1'
    }, {
        id: '2',
        name: 'user2',
        room: 'Room2'
    }, {
        id: '3',
        name: 'user3',
        room: 'Room1'
      }]
  })


  it('should add a new user', () => {
    const users = new Users();
    const user = {
      id: '123',
      name: 'Omer',
      room: 'Room1'
    }
    const resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => { 
    users.removeUser('1');
    expect(users.users.length).toBe(2);
    expect(users.users[0].id).toBe('2');
  });

  it('should not remove a user', () => { 
    users.removeUser('4');
    expect(users.users.length).toBe(3);
    expect(users.users[0].id).toBe('1');
  });

  it('should get a user', () => { 
    const user = users.getUser('2');
    expect(user.id).toBe('2');
  });


  it('should not get a user', () => { 
    const user = users.getUser('4');
    expect(user).toNotExist();
  });

  it('should return names for Room1', () => {
    const userList = users.getUserList('Room1');
    expect(userList).toEqual(['user1', 'user3']);
  });

  it('should return names for Room2', () => {
    const userList = users.getUserList('Room2');
    expect(userList).toEqual(['user2']);
  });
  
});


