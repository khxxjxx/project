import { useDispatch } from 'react-redux';
import { noteActions, noteType } from '../store';

const List: React.FC<{ note: noteType }> = props => {
  const dispatch = useDispatch();

  const maximize = (e: any) => {
    dispatch(noteActions.maximize(props.note.id));
    dispatch(noteActions.clickNote(props.note.id));
  };

  return (
    <li onClick={maximize} style={{ backgroundColor: props.note.color.t }}>
      {props.note.title}
    </li>
  );
};

export default List;
