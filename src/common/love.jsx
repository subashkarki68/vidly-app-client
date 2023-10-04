import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

function Love({ id, isLoved, onLoveClick }) {
  return (
    <Button
      onClick={() => onLoveClick(id)}
      variant={isLoved ? "danger" : "secondary"}
      className="love-icon"
    >
      <FontAwesomeIcon icon={faHeart} />
    </Button>
  );
}

export default Love;
