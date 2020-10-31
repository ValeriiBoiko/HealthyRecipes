import AsyncStorage from '@react-native-community/async-storage';
import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  persistor.purge();
  return { store, persistor }
}