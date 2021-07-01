import React, { useRef, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [Num, setNum] = useState(1);

  function getData() {
    axios
      .get("http://localhost:8080/api")
      .then((res) => {
        const temp = res.data;
        setData(temp);
        console.log("got data");
      })
      .catch((err) => {
        console.log("err");
      });
  }

  function handleSubmit(e) {
    // e.preventDefault();
    const payload = {
      title: textRef.current.value,
      body: textRef2.current.value,
    };

    axios({
      url: "http://localhost:8080/save",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("data has been sent to the server");
      })
      .catch(() => {
        console.log("data has not been sent");
      });
    e.target.reset(); //reseting input fields
  }

  const textRef = useRef();
  const textRef2 = useRef();

  useEffect(() => {
    getData();
  }, []);

  function displayData(post) {
    if (!post.length) return null;

    return data.map((data, index) => (
      <div key={index}>
        <h3>{data.title}</h3>
        <p>{data.body}</p>
      </div>
    ));
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter word" ref={textRef} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>

          <Form.Label>Body</Form.Label>
          <Form.Control type="text" placeholder="Enter word" ref={textRef2} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <div>{displayData(data)}</div>
    </>
  );
}

export default App;
