const Item = props => {
  const deleteHandler = () => {
    props.onDelete(props.id);
  };
  const clickHandler = () => {
    props.onClick(props.id);
  };

  return (
    <li className={`${props.clicked ? 'clicked' : ''}`}>
      <input
        onClick={clickHandler}
        className="checkbox"
        type="checkbox"
        id={props.id}
      />
      <label htmlFor={props.id} />
      {props.children}
      <button className="delete" onClick={deleteHandler}>
        ✕
      </button>
    </li>
  );
};

export default Item;
