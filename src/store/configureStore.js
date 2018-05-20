import { createStore } from 'redux';
import settings from '../reducers/settings';

// Store config
export default () => {
  const store = createStore(settings);
  return store;
}
