import { useEffect, useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setCounter((prev) => prev + 1);
  const onChange = (e) => setKeyword(e.target.value);

  // useEffect 를 사용하지 않으면 input에 값을 입력하는 동안 계~속 재렌더링 된다. keyword가 변경될 때만! 실행된다.
  useEffect(() => {
    console.log("SEARCH FOR", keyword);
  }, [keyword]);
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={keyword}
        onChange={onChange}
      />
      <h1>{counter}</h1>
      <button onClick={onClick}>Click Me!</button>
    </div>
  );
}

export default App;
