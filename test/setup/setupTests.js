import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson, { createSerializer } from 'enzyme-to-json';
import { LocalStorage } from './localstorage';
import raf from './tempPolyfills'

Enzyme.configure({ adapter: new Adapter() });

global.toJson = toJson;
global.localStorage = new LocalStorage(jest);
global.sessionStorage = new LocalStorage(jest);
window.localStorage = global.localStorage;
window.sessionStorage = global.sessionStorage;

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));
// Fail tests on any warning
console.error = message => {
  throw new Error(message);
};
