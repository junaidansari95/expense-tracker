import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
import thunk from "redux-thunk";
import rootReducer from "./Reducer";
import { logger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
const middleware = [thunk, logger];
const persistConfig = {
  key: 'root',
  storage: storageSession,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
let store;
if(process.env.NODE_ENV === "development"){
   store = createStore( persistedReducer, compose(composeWithDevTools(applyMiddleware(...middleware))))
}
else {
   store = createStore( persistedReducer, compose(applyMiddleware(...middleware)))
}
const persistor = persistStore(store)
export { store, persistor };