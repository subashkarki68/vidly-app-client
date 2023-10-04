import React from "react";
import { Container, Card } from "react-bootstrap";

const FormCard = ({ children }) => {
  return (
    <Container
      style={{ maxWidth: "600px", margin: "0 auto", textAlign: "left" }}
    >
      <Card
        style={{
          padding: "30px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        {children}
      </Card>
    </Container>
  );
};

export default FormCard;
