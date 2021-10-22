import { noteActions } from '../store';
import { useDispatch } from 'react-redux';

const NoteColor: React.FC<{ color: string; id: number }> = props => {
  const dispatch = useDispatch();

  const colorChange = () => {
    dispatch(noteActions.colorChange({ id: props.id, color: props.color }));
  };

  return <li onClick={colorChange}>{props.color}</li>;
};

export default NoteColor;
