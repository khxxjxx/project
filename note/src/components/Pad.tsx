import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Pad: React.FC = props => {
  const notes = useSelector((state: RootState) => state.note.note);

  return (
    <div className="pad">
      {notes.map(note => (
        <div className="note">
          <div className="top_bar">
            <div>-</div>
            <div>x</div>
          </div>
          <textarea>{note.text}</textarea>
        </div>
      ))}
    </div>
  );
};

export default Pad;
