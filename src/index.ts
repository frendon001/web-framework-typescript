import { User } from './models/User';

// ********* DB TEST *********

// const user = new User({ id: 1 });
// user.set({ name: 'NEW NAME', age: 50 });
// user.save();

// user.fetch();

// setTimeout(() => {
//   console.log(user);
// }, 4000);

// const newUser = new User({ name: 'second', age: 30 });
// newUser.save();

// ********* TRIGGER TEST *********

// const user = new User({ name: 'myname', age: 20 });

// console.log(user.get('name'));
// console.log(user.get('age'));

// user.set({ name: 'updated' });
// console.log(user.get('name'));
// console.log(user.get('age'));

// user.events.on('change', () => {
//   console.log('Change#1');
// });
// user.events.on('change', () => {
//   console.log('Change#2');
// });
// user.events.on('other', () => {
//   console.log('other');
// });

// console.log(user);

// user.events.trigger('change');
// user.events.trigger('other');
// user.events.trigger('random');

// ********* AXIOS Test *********
// import axios from 'axios';

// axios.post('http://localhost:3000/users', {
//   name: 'myname',
//   age: 20,
// });
