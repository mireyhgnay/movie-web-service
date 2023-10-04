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

useEffect를 잘 이해하고 사용해야한돠!!

<br>

---

<br>

> useEffect, useState, Props 를 만들어보면서 계속 연습한다.  
> 아래 내용은 노마드코더 7강 내용

### useState :: toDo 와 setToDo 는!

toDo 를 직접 사용해서 변경하지 않고,

우리는 함수(setToDo)를 사용하고 그 함수는 toDo를 수정하는 역할을 하는 것!

```jsx
const [toDo, setToDo] = useState("");

const onSubmit = (e) => {
  e.preventDefault();
  setToDo("");
};
```

위에 처럼 setTodo('') 함수를 사용해서 빈 값으로 변경해주는 것이다.

<br>

```jsx
const [toDo, setToDo] = useState("");

const onSubmit = (e) => {
  e.preventDefault();
  toDo = "";
};
```

위에처럼 toDo 값을 직접 변경해주면 안된다.

<br>

### 기존 배열에 새로운 element 추가하기

우선 먼저! 기존 배열에 새로운 요소를 추가해주고 싶다면?

```jsx
const food = ["banana", "apple"]; // 기존 toDos (currentArray)인 것!

// 아래처럼 추가하면
["peach", food];
// 결과는 배열 안에 food 배열이 추가되는 것
// result : ['peach', ['banana', 'apple']]
```

<br>

제대로 넣어주고 싶다면?

```jsx
const food = ["banana", "apple"]; // 기존 toDos (currentArray)인 것!

// 아래처럼 추가하면
["peach", ...food];
// 결과는 배열 안에 food 배열이 추가되는 것
// ['peach', 'banana', 'apple']
```

<br>
<br>

```jsx
const [toDo, setToDo] = useState("");
const [toDos, setToDos] = useState([]);

const onSubmit = (e) => {
  setToDos((currentArray) => [toDo, ...currentArray]);

  console.log(toDos);
};
```

- 기존 Element에 기존 []배열에 추가해주고 싶다면, 새로운 Array를 만들어서 추가해주어야 한다.

- toDo는 우리가 input을 통해 작성해서 등록한 요소이고, 초기에는 아무것도 들어있지 않는 비어있는 Array에 toDo가 더해진 것이다.

- 결국 맨 처음 input 에서 값을 받게 된다면, 빈배열[] 안에 input 으로 처음 받게 된 [toDo] 요소를 추가하게 된다. 그 동작을 반복하는 것이다.

<br>

**setToDos 동작 순서**

```jsx
// 1. input 에서 abc 를 받음. 현재는 빈 배열임
setToDos(([]) => ['abc', []]);
// result : ['abc']

// 2. input 에 두번째 텍스트 입력
setToDos((['abc']) => ['text', 'abc']);
// result : ['text', 'abc']

// 3. 위 동작이 input 에 입력될 때마다 반복되는 것임
```

<br>
<br>

### map()

map 함수는 array의 모든 item에 대해 실행된다. 그러고 새로운 배열로 반환해준다.

```jsx
const array = ["a", "b", "c", "d"];
array.map((item) => item.toUpperCase());
console.log(array);
// result : ["A", "B", "C", "D"]
```

<br>

### React Router

```bash
npm install react-router-dom
```

<Switch></Switch> 로 감싸준 이유는 한 번에 하나의 Route(page)만 렌더링 하기 위해서이다.
