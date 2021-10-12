import { createStore } from 'redux';
import persistStore from 'redux-persist/es/persistStore';
import noteReducer from '.';

export const store = createStore(noteReducer);

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
