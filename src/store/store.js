import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import RootReducer from '../reducers/root_reducer.js';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
 key: 'root',
 storage: storage,
 stateReconciler: autoMergeLevel2,  // see "Merge Process" section for details.
 whitelist: ['user']
};

const persistReducerConst = persistReducer(persistConfig, RootReducer);

const preloadedState = {}

export const store = createStore(persistReducerConst, preloadedState, applyMiddleware(thunk, logger));
export const persistor = persistStore(store);
