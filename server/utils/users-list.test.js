const expect = require('expect');

const { UsersList } = require('./users-list');


describe('UsersList', () => {
  let usersList;

  beforeEach(() => {
    usersList = new UsersList();
    usersList.users = [{
      id: '1',
      name: 'Mike',
      room: 'GoT fans'
    },
    {
      id: '2',
      name: 'John',
      room: 'JavaScript'
    },
    {
      id: '3',
      name: 'Jeff',
      room: 'GoT fans'
    }]
  });

  it('should add new user', () => {
    const usersList = new UsersList();
    const user = {
      id: '123',
      name: 'John',
      room: 'random room'
    };

    const resUser = usersList.addUser(user.id, user.name, user.room);

    expect(usersList.users).toEqual([user]);
    expect(resUser).toEqual(user);
  });

  it('should remove a user', () => {
    const validId = '1';
    const removedUser = usersList.removeUser(validId);

    expect(usersList.users.length).toBe(2);
    expect(removedUser.id).toBe(validId);
  });

  it('should not remove a user', () => {
    const invalidId = '55';
    const removedUser = usersList.removeUser(invalidId);

    expect(usersList.users.length).toBe(3);
    expect(removedUser).toBeFalsy();
  });

  it('should find a user', () => {
    const validId = '2';
    const user = usersList.getUser(validId);

    expect(user.id).toBe(validId);
  });

  it('should not find user', () => {
    const invalidId = '55';
    const user = usersList.getUser(invalidId);

    expect(user).toBeFalsy();
  });

  it('should return names for the GoT fans channel', () => {
    const currentUserList = usersList.getUserList('GoT fans');

    expect(currentUserList).toEqual(['Mike', 'Jeff']);
  });

  it('should return names for the JavaScript channel', () => {
    const currentUserList = usersList.getUserList('JavaScript');

    expect(currentUserList).toEqual(['John']);
  });
});