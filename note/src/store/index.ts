import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Note = {
  id: string;
  title: string;
  text?: string;
};

type stateType = {
  note: Note[];
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
      };

      state.note.push(newNote);
    },
    removeNote: (state, action: PayloadAction<Note>) => {
      state.note = state.note.filter(note => note.id !== action.payload.id);
    },
  },
});

export const noteActions = noteSlice.actions;

export default noteSlice.reducer;
