import { useDispatch } from 'react-redux';
import { noteActions, noteType } from '../store';

const List: React.FC<{ note: noteType }> = props => {
  const dispatch = useDispatch();

  const maximize = (e: any) => {
    dispatch(noteActions.maximize(props.note.id));
  };

  return <li onClick={maximize}>{props.note.title}</li>;
};

export default List;
