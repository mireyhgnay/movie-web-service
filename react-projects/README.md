# ReactJS 영화 웹 서비스 만들기

<br>

### useEffect

컴포넌트가 처음 딱 한번만 render 할 때 실행되고, 이후 State가 변경되더라도 그 코드가 실행되지 않도록 한다.

<br>

**사용 방법**

```jsx
import { useEffect } from "react";

function App() {
  console.log("I run all the time");
  };

  useEffect(() => {
    console.log("I run only once");
  }, []);

  return <div></div>;
}

export default App;
```

useEffect 첫 인자로 준 함수는 첫 렌더링때만 실행되고, 이후 재렌더링 되는 순간에도 출력되지 않는다.

- [] : 빈 배열은 첫 렌더링 될 때만 실행된다.
- [keyword] : 배열 안에 있는 값이 변경될 때만 실행된다.

<br>

### useEffect :: Cleanup Function

```jsx
useEffect(() => {
  console.log("첫 렌더링 때 실행된다!");
  return function () {
    // return 이후 실행시키면, 파괴될 때 실행되는 것
    console.log("컴포넌트가 사라질 때 실행된다!");
  };
}, []);
```

return 이후 실행되는 함수는 컴포넌트가 사라질 때 실행되는 함수이다.

useEffect를 잘 이해하고 사용해야한드아!!
