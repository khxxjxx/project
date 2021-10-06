import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

function List() {
  const notes = useSelector((state: RootState) => state.note.note);

  return (
    <ul className="list">
      {notes.map((note, idx) => (
        <li key={idx}>{note.title}</li>
      ))}
    </ul>
  );
}

export default List;
