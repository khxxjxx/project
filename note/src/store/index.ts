import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type noteType = {
  id: string;
  title: string;
  text?: string;
  coord: { x: number; y: number };
};

type stateType = {
  note: noteType[];
};

const initialState: stateType = {
  note: [],
};

export const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: state => {
      const newNote = {
        id: new Date().toISOString(),
        title: '새로운 노트',
        text: undefined,
        coord: { x: 50, y: 50 },
      };

      state.note.push(newNote);
    },
    removeNote: (state, action: PayloadAction<noteType>) => {
      state.note = state.note.filter(note => note.id !== action.payload.id);
    },
  },
});

export const noteActions = noteSlice.actions;

export default noteSlice.reducer;
