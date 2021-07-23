import React from 'react';
import Item from './Item';

const List = props => {
  return (
    <div className="list">
      <ul>
        {props.list.map(list => (
          <Item
            key={list.id}
            id={list.id}
            clicked={list.clicked}
            onDelete={props.onDelete}
            onClick={props.onClick}>
            {list.value}
          </Item>
        ))}
      </ul>
    </div>
  );
};

export default List;
