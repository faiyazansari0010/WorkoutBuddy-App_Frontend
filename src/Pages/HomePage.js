import React from "react";
import Form from "../Components/Form";
import Records from "../Components/Records";

const HomePage = () => {
  return (
    <div style={{display:"flex", justifyContent:"space-around"}}>
      <Form />
      <Records />
    </div>
  );
};

export default HomePage;
