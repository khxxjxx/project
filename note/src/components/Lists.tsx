import { useDispatch, useSelector } from 'react-redux';
import { noteActions } from '../store';
import { RootState } from '../store/store';
import List from './List';

function Lists() {
  const notes = useSelector((state: RootState) => state.note);
  const dispatch = useDispatch();

  const addNote = () => {
    dispatch(noteActions.addNote());
  };

  return (
    <div className="lists">
      <ul className="list">
        {notes.map(note => (
          <List note={note} key={note.id} />
        ))}
      </ul>
      <div className="add" onClick={addNote}>
        +
      </div>
    </div>
  );
}

export default Lists;
