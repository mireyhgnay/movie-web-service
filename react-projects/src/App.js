import { useState } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]); // 배열 안에 toDo를 넣어줄 것임(setToDos 함수를 사용해서!)

  const onChange = (e) => {
    setToDo(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (toDo === "") return;

    // toDo는 우리가 input을 통해 작성해서 등록한 요소이고, 초기에는 아무것도 들어있지 않는 비어있는 Array에 toDo가 더해진 것이다.
    setToDos((currentArray) => [toDo, ...currentArray]);

    setToDo("");
  };

  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          value={toDo}
          onChange={onChange}
          type="text"
          placeholder="Write to do..."
        />
        <button type="button">Add To Do</button>
      </form>

      <hr />

      <ul>
        {toDos.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
