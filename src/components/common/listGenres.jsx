import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

function ListGenres({ listItems, onItemSelect, selectedItem }) {
  return (
    <ListGroup as="ul">
      {listItems.map((item) => (
        <ListGroup.Item
          as="li"
          key={item._id}
          active={item._id === selectedItem._id}
          action
          style={{ cursor: "pointer" }}
          onClick={() => onItemSelect(item)}
        >
          {item.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default ListGenres;
