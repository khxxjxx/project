import { useState } from 'react';
import { noteType } from '../store';

const NotePad: React.FC<{
  note: noteType;
}> = props => {
  const [coord, setCoord] = useState(props.note.coord);
  const [size, setSize] = useState(props.note.size);
  const W = document.querySelector('.pad')!.clientWidth;
  const H = document.querySelector('.pad')!.clientHeight;
  const padding = 20;

  const mouseDownNote = (e: any) => {
    const startX: number = e.clientX;
    const startY: number = e.clientY;
    const w = document.querySelector('.note')!.clientWidth;
    const h = document.querySelector('.note')!.clientHeight;

    setSize({ w: w, h: h });

    const moveNote = (e: MouseEvent): void => {
      let x: number = coord.x + (e.clientX - startX);
      let y: number = coord.y + (e.clientY - startY);

      x <= padding && (x = padding);
      y <= padding && (y = padding);

      let r = x + w;
      let b = y + h;

      W - padding < r && (x = W - padding - w);
      H - padding < b && (y = H - padding - h);

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
      style={{
        top: coord.y,
        left: coord.x,
        width: size.w,
        height: size.h,
        maxWidth: W - coord.x - padding,
        maxHeight: H - coord.y - padding,
      }}>
      <div className="top_bar" onMouseDown={mouseDownNote}>
        <div>-</div>
        <div>x</div>
      </div>
      <textarea>{props.note.text}</textarea>
    </div>
  );
};

export default NotePad;
