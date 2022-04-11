import React, { useEffect, useState } from "react";
import Item from "./Item.js";

import "./styles.css";

const App = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [calledItem, setCalledItem] = useState("");
  const getInputValue = (event) => {
    const userValue = event.target.value;
    setInput(userValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      const id = new Date().getTime().toString();
      const dataType = { name: input, id: id };
      const oldData = items;
      const forLocalStorage = [...oldData, dataType];
      localStorage.setItem("list", JSON.stringify(forLocalStorage));
      setItems([...oldData, dataType]);
    }
    setInput("");
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const newData = items.map((a) => {
      if (a.id === calledItem) {
        a.name = input;
        return a;
      }
      return a;
    });
    localStorage.removeItem("list");
    localStorage.setItem("list", JSON.stringify(newData));
    setItems(newData);
    setInput("");
    setIsEditing(false);
  };

  const getData = () => {
    const localData = localStorage.getItem("list");
    return localData ? JSON.parse(localData) : [];
  };

  useEffect(() => {
    setItems(getData);
  }, []);
  return (
    <form
      className="form-container"
      action=""
      onSubmit={!isEditing ? handleSubmit : handleEditSubmit}
    >
      <div className="upper-container">
        <h2 className="title">Todo-List</h2>
        <div>
          <input
            type="text"
            name=""
            id=""
            onChange={getInputValue}
            value={input}
          />
          {!isEditing ? (
            <button className="submit-btn" type="submit">
              submit
            </button>
          ) : (
            <button className="submit-btn" type="submit">
              edit
            </button>
          )}
        </div>
      </div>
      <div className="list">
        {items.map((a) => {
          return (
            <Item
              name={a.name}
              key={a.id}
              id={a.id}
              setItem={setItems}
              items={items}
              editStatus={isEditing}
              editStatusFunc={setIsEditing}
              trackedId={(id) => setCalledItem(id)}
              setInputValue={setInput}
            />
          );
        })}
      </div>
    </form>
  );
};

export default App;
