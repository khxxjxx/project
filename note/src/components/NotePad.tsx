import { noteType, noteActions } from '../store';
import { useDispatch } from 'react-redux';
import { ChangeEvent } from 'react';

const NotePad: React.FC<{
  note: noteType;
  idx: number;
}> = props => {
  const dispatch = useDispatch();
  const W = document.querySelector('.pad')!.clientWidth;
  const H = document.querySelector('.pad')!.clientHeight;
  const padding = 20;

  const mouseDownNote = (e: React.MouseEvent<HTMLDivElement>): void => {
    const startX: number = e.clientX;
    const startY: number = e.clientY;

    const moveNote = (e: MouseEvent): void => {
      let x: number = props.note.coord.x + (e.clientX - startX);
      let y: number = props.note.coord.y + (e.clientY - startY);

      x <= padding && (x = padding);
      y <= padding && (y = padding);

      let r = x + props.note.size.w;
      let b = y + props.note.size.h;

      W - padding < r && (x = W - padding - props.note.size.w);
      H - padding < b && (y = H - padding - props.note.size.h);

      dispatch(
        noteActions.moveNote({ id: props.note.id, coord: { x: x, y: y } })
      );
    };

    const mouseUpNote = (): void => {
      window.removeEventListener('mousemove', moveNote);
      window.removeEventListener('mouseup', mouseUpNote);
    };

    window.addEventListener('mousemove', moveNote);
    window.addEventListener('mouseup', mouseUpNote);
  };

  const mouseDownSize = () => {
    const changeSize = () => {
      dispatch(noteActions.reSizeNote(props.note.id));
    };

    const mouseUpSize = (): void => {
      window.removeEventListener('mousemove', changeSize);
      window.removeEventListener('mouseup', mouseUpSize);
    };

    window.addEventListener('mousemove', changeSize);
    window.addEventListener('mouseup', mouseUpSize);
  };

  const removeNoteHandler = () => {
    dispatch(noteActions.removeNote(props.note.id));
  };

  const minimizeHandler = () => {
    dispatch(noteActions.minimize(props.note.id));
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch(noteActions.addText({ id: props.note.id, text: e.target.value }));
  };

  return (
    <div
      className={`note note${props.note.id}`}
      style={{
        top: props.note.coord.y,
        left: props.note.coord.x,
        width: props.note.size.w,
        height: props.note.size.h,
        maxWidth: W - props.note.coord.x - padding,
        maxHeight: H - props.note.coord.y - padding,
        display: props.note.display,
      }}
      onMouseDown={mouseDownSize}>
      <div className="top_bar" onMouseDown={mouseDownNote}>
        <div onClick={minimizeHandler}>-</div>
        <div onClick={removeNoteHandler}>x</div>
      </div>
      <textarea onChange={onChange}>{props.note.text}</textarea>
    </div>
  );
};

export default NotePad;
