import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import NotePad from './NotePad';

const Pad = () => {
  const notes = useSelector((state: RootState) => state.note);
  const index = useSelector((state: RootState) => state.index);

  return (
    <div className="pad">
      {notes.map(note => (
        <NotePad note={note} key={note.id} idx={index.indexOf(note.id)} />
      ))}
    </div>
  );
};

export default Pad;
