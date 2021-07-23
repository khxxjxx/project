import React, { useState, useEffect } from 'react';
import List from './List';

const Input = props => {
  let lists = localStorage.getItem(props.now);
  lists === null ? (lists = []) : (lists = JSON.parse(lists));

  const [input, setInput] = useState('');
  const [list, setList] = useState(lists);

  useEffect(() => {
    setList(lists);
  }, [props.now]);

  useEffect(() => {
    localStorage.setItem(props.now, JSON.stringify(list));
  }, [list]);

  const inputValue = e => {
    setInput(e.target.value);
  };

  const submit = e => {
    e.preventDefault();
    input !== '' &&
      setList(prevList => {
        return [...prevList, { id: list.length, value: input, clicked: false }];
      });
    setInput('');
  };

  const onDeleteHandler = id => {
    if (window.confirm('리스트에서 완전히 삭제하시겠습니까?')) {
      const newList = list.filter(list => list.id !== id);
      setList(newList);
    }
  };

  const onClickHandler = id => {
    let newList = [...list];
    newList[newList.findIndex(list => list.id === id)].clicked =
      !newList[newList.findIndex(list => list.id === id)].clicked;
    setList(newList);
  };

  return (
    <>
      <form className="input" onSubmit={submit}>
        <input
          type="text"
          value={input}
          placeholder="할일을 적어주세요"
          onChange={inputValue}
        />
      </form>
      <List
        list={list}
        id={list.id}
        clicked={list.clicked}
        onDelete={onDeleteHandler}
        onClick={onClickHandler}
        setList={setList}
      />
    </>
  );
};

export default Input;
