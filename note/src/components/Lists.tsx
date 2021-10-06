import { useDispatch } from 'react-redux';
import { noteActions } from '../store';
import List from './List';

function Lists() {
  const dispatch = useDispatch();

  const addNote = () => {
    dispatch(noteActions.addNote());
  };

  return (
    <div className="lists">
      <List />
      <div className="add" onClick={addNote}>
        +
      </div>
    </div>
  );
}

export default Lists;
