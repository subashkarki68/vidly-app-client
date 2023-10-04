import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

function ListGenres({ defaultAll, listItems, onGenreChange }) {
  return (
    <ListGroup as="ul">
      <ListGroup.Item
        as="li"
        key="default"
        active
        style={{ cursor: "pointer" }}
      >
        {defaultAll}
      </ListGroup.Item>
      {listItems.map((item) => (
        <ListGroup.Item
          as="li"
          key={item._id}
          action
          style={{ cursor: "pointer" }}
          onClick={() => onGenreChange(item)}
        >
          {item.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default ListGenres;
