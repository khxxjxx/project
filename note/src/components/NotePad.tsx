import { useState } from 'react';
import { noteType } from '../store';

const NotePad: React.FC<{
  note: noteType;
  idx: number;
}> = props => {
  const [coord, setCoord] = useState(props.note.coord);

  const mouseDownNote = (e: any): void => {
    const startX: number = e.clientX;
    const startY: number = e.clientY;

    const moveNote = (e: MouseEvent): void => {
      let x: number = coord.x + (e.clientX - startX);
      let y: number = coord.y + (e.clientY - startY);

      x <= 30 && (x = 30);
      y <= 30 && (y = 30);

      setCoord({
        x: x,
        y: y,
      });
    };

    const mouseUpNote = (): void => {
      window.removeEventListener('mousemove', moveNote);
      window.removeEventListener('mouseup', mouseUpNote);
    };

    window.addEventListener('mousemove', moveNote);
    window.addEventListener('mouseup', mouseUpNote);
  };
  return (
    <div
      className="note"
      key={props.idx}
      style={{ top: coord.y, left: coord.x }}>
      <div className="top_bar" onMouseDown={mouseDownNote}>
        <div>-</div>
        <div>x</div>
      </div>
      <textarea>{props.note.text}</textarea>
    </div>
  );
};

export default NotePad;
