const Day = props => {
  const clickHandler = e => {
    e.preventDefault();
    props.onClick(props.days);
  };

  return <span onClick={clickHandler}>{props.children}</span>;
};

export default Day;
