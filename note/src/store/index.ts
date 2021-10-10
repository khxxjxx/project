import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  pad: noteType[];
};

const initialState: stateType = {
  note: [],
  pad: [],
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
      state.pad.push(newNote);
    },
    removeNote: (state, action: PayloadAction<number>) => {
      state.note = state.note.filter(note => note.id !== action.payload);
    },
    clickNote: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      const findIdx = state.pad.findIndex(note => note.id === action.payload);
      console.log(findIdx);
      const copyNote = state.pad[findIdx];
      state.pad.splice(findIdx, 1);
      state.pad.push(copyNote);
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
  },
});

export const noteActions = noteSlice.actions;

export default noteSlice.reducer;
