import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import NotePad from './NotePad';

const Pad = () => {
  const notes = useSelector((state: RootState) => state.note.note);

  return (
    <div className="pad">
      {notes.map((note, idx) => (
        <NotePad note={note} key={idx} />
      ))}
    </div>
  );
};

export default Pad;
