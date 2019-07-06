import { find } from './helper';

describe('helper', () => {
  describe('find', () => {
    const users = [
      { user: 'barney', age: 36, active: true },
      { user: 'fred', age: 40, active: false },
      { user: 'pebbles', age: 1, active: true },
    ];

    it('find', () => {
      console.log(find(users, { age: 1, active: true }));
    });
  });
});
