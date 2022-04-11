import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "./styles.css";
const Item = ({
  name,
  id,
  setItem,
  items,
  editStatus,
  editStatusFunc,
  trackedId,
  editInput,
}) => {
  const handleRemove = (id) => {
    const newList = items.filter((a) => a.id !== id);
    localStorage.removeItem("list");
    localStorage.setItem("list", JSON.stringify(newList));
    setItem(newList);
  };

  const handleEdit = (id) => {
    trackedId(id);
    if (editStatus) {
      editInput(name);
    }
    editStatusFunc(!editStatus);
  };
  return (
    <div className="item">
      <h2>{name}</h2>
      <div className="item-btn">
        <button className="btn" onClick={() => handleRemove(id)}>
          <FaTrashAlt />
        </button>
        <button className="btn" type="button" onClick={() => handleEdit(id)}>
          <FaEdit />
        </button>
      </div>
    </div>
  );
};

export default Item;
