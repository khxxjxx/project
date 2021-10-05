const Main: React.FC = props => {
  return (
    <div className="main">
      <div className="title">Note</div>
      {props.children}
    </div>
  );
};

export default Main;
