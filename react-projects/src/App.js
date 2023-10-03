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

  useEffect(() => {
    console.log("첫 렌더링 때 실행된다!");
    return function () {
      // return 이후 실행시키면, 파괴될 때 실행되는 것
      console.log("컴포넌트가 사라질 때 실행된다!");
    };
  }, []);

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
