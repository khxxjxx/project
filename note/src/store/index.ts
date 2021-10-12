import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export type noteType = {
  id: number;
  title: string;
  text?: string;
  coord: { x: number; y: number };
  size: { w: number; h: number };
  display: string;
};

type stateType = {
  note: noteType[];
  index: number[];
};

const initialState: stateType = {
  note: [],
  index: [],
};

export const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: state => {
      const newNote = {
        id: new Date().valueOf(),
        title: '새로운 노트',
        text: undefined,
        coord: { x: 50, y: 50 },
        size: { w: 200, h: 180 },
        display: 'inline-block',
      };

      state.note.push(newNote);
      state.index.push(newNote.id);
    },
    removeNote: (state, action: PayloadAction<number>) => {
      state.note = state.note.filter(note => note.id !== action.payload);
      state.index = state.index.filter(idx => idx !== action.payload);
    },
    clickNote: (state, action: PayloadAction<number>) => {
      const findIdx = state.index.indexOf(action.payload);
      state.index.splice(findIdx, 1);
      state.index.push(action.payload);
    },
    moveNote: (
      state,
      action: PayloadAction<{ id: number; coord: { x: number; y: number } }>
    ) => {
      state.note.find(note => note.id === action.payload.id)!.coord =
        action.payload.coord;
    },
    reSizeNote: (state, action: PayloadAction<number>) => {
      const w = document.querySelector(`.note${action.payload}`)!.clientWidth;
      const h = document.querySelector(`.note${action.payload}`)!.clientHeight;

      state.note.find(note => note.id === action.payload)!.size = {
        w: w,
        h: h,
      };
    },
    minimize: (state, action: PayloadAction<number>) => {
      state.note.find(note => note.id === action.payload)!.display = 'none';
    },
    maximize: (state, action: PayloadAction<number>) => {
      state.note.find(note => note.id === action.payload)!.display =
        'inline-block';
    },
    addText: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const findNote = state.note.find(note => note.id === action.payload.id)!;
      findNote.text = action.payload.text;
      const enter = action.payload.text.indexOf('\n');

      if (enter !== -1) {
        if (action.payload.text.slice(0, enter).length < 11) {
          findNote.title = action.payload.text.slice(0, enter);
        } else {
          findNote.title = action.payload.text.slice(0, 10) + '...';
        }
      } else {
        if (action.payload.text === '') {
          findNote.title = '새로운 노트';
        } else if (action.payload.text.length < 11) {
          findNote.title = action.payload.text.slice(0, 10);
        } else {
          findNote.title = action.payload.text.slice(0, 10) + '...';
        }
      }
    },
  },
});

export const persistConfig = {
  key: 'root',
  storage,
};

export const noteActions = noteSlice.actions;

export default persistReducer(persistConfig, noteSlice.reducer);
