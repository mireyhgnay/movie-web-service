# ReactJS 영화 웹 서비스 만들기

<br>

### vanilla.html

- react-dom은 React Element를 HTML에 두는 역할을 한다.
- ReactDOM.render 에서 render는 React Element를 가지고 HTML로 만들어 배치한다는 것이다.
- JavaScript를 이용해 Element를 생성했고, React JS가 그걸 HTML로 번역한다.

<br>

### react.html

React는 이미 알고있다!!

- property에 id, style 등을 넣으면 HTML 태그에 넣어준다.
- 하지만 on + event 형식으로 프로퍼티에 추가해주면 태그안에 인라인으로 들어가 있지 않다.

리액트는 프로퍼티에 추가해주는 형식에 따라 노출/미노출을 알아서 판단해준다. 리액트는 이미 알고있는거야~~~

<br>

### jsx.html

- babel : JSX로 적은 코드를 브라우저가 이해할 수 있는 형태로 바꿔준다.

리액트를 사용하면 변경된 부분만 업데이트가 된다는 것이 가장 큰 장점이다. 그게 왜 좋은건가?

일반 자바스크립트를 쓴 브라우저는 노드 정보가 바뀔때마다 노드 트리를 처음부터 다시 생성합니다. (5단계를 걸쳐서)

근데 리액트는 가상돔을 사용해서 우리 시야에 보이는 부분만 수정해서 보여주고

모든 업데이트가 끝나면 일괄로 합쳐서 실제 돔에 던져준다고 합니다.

프론트엔드는 렌더 트리 단계를 얼마나 최적화 하는가가 중요하다!!

<br>

### STATE

- state는 기본적으롤 데이터가 저장되는 곳

<br>

아래 코드를 실행하고 버튼을 클릭해서 countUp 함수가 실행은 되서 count가 증가는 하지만,  
UI에 렌더 되지 않는다. 정확히는 재렌더링!

왜냐면 맨처음 브라우저가 render 된 후, 재렌더해라! 라는 코드가 없다.  
클릭 후, Container 가 재렌더되서 UI가 업데이트 되어야한다.

```jsx
let counter = 0;
function countUp() {
  counter += 1;
}

const Container = () => (
  <div>
    <h3>Total clicks: {couter}</h3>
    <button onClick={countUp}>Click Me!</button>
  </div>
);

ReactDOM.render(<Container />, root); // 맨처음 렌더 이후, 함수를 실행한 후에 업데이트한 내용을 재렌더 하라는 코드가 없음
```

<br>

우리가 의도한대로 counter 가 증가하기 위해 재렌더를 위해서는 아래 코드 로직으로 구현되어야 한다!

```jsx
let counter = 0;
function countUp() {
  counter += 1;
  render(); // 함수 실행 후, Container 재렌더
}

function render() {
  ReactDOM.render(<Container />, root);
}

const Container = () => (
  <div>
    <h3>Total clicks: {couter}</h3>
    <button onClick={countUp}>Click Me!</button>
  </div>
);

render(); // 맨처음 로드될 때 render
```

1. 우리가 처음 브라우저에 렌더링 할때는 counter 0
2. 버튼 클릭해 함수 호출
3. 전체가 다시 리렌더

#### 우리가 값을 바꿀때마다 재렌더 되어야 한다는 것을 잊으면 안돼~~

<br>

### 데이터를 저장했다가 컴포넌트를 재렌더링하기 :: `useState()`

컴포넌트 업데이트할 때마다 App 컴포넌트를 계속 재렌더링 하는건 비효율적이니!

```jsx
const data = React.useState();
console.log(data);

// result : [undefined, function]
```

결과로 찍히는 배열에 첫번째 요소는 담고있는 데이터이고,

두번째 요소에 있는 이 함수는 data를 바꿀 때 사용하는 함수이다.

<br>

```jsx
const counter = data[0]; // data
function countUp() {
  // 두번쨰 요소 function
  // code
}
```

<br>

위에서 쓴 것 처럼 함수와 초기값 변수를 각각 쓰는 것보다 더 효율적으로 쓰기 위해서 아래처럼 써야한다.

```jsx
const food = ["tomato", "banana"];

// 아래처럼 쓰는 것 보다는?
const myFavFood = food[0];
const mySecondFavFood = food[1];

// 이렇게 분해해서 쓰는 것이 효율적! useState 도 같은 방식
const [myFavFood, mySecondFavFood] = food;
```

아무튼 중요한건?

#### useState()의 배열 첫번째 요소는 담고있는 Data, 두번째 요소는 함수가 담기는데 앞 Data 를 바꿀 때 사용하는 함수이다!!

<br>

### setCounter로 업데이트 + 리렌더링까지 모두 해결하기!

counter를 업데이트 해야할 때 setCounter 함수를 쓴다.

```jsx
// counter는 담고있는 데이터, setCounter는 데이터를 업데이트 하는 함수
const [counter, setCounter] = React.useState(0);

const onClick = () => {
  setCounter(12345);
};
```

<br>

위의 setCounter 함수는 아래와 같이 동작한다.

```jsx
const [counter, setCounter] = React.useState(0);

const onClick = () => {
  // 1. setCounter 함수는 값을 하나 받는다 (12345 란 값을 받음)
  counter = 12345; // 2. 함수는 counter의 값을 업데이트 한다
  ReactDOM.render(<App />, root); // 3. 컴포넌트를 리렌더링 한다
};
```

setCounter 함수가 counter 값을 업데이트 해주고 리렌더링까지 모두 해결해주는 것이다.

업데이트 되어야 할 함수마다 계속 리렌더링 되는 코드를 넣어주지 않아도 되는 것이다!!

<br>

### JSX VS HTML

- class(HTML) 👉 className(JSX)
- for(HTML) 👉 htmlFor(JSX)

렌더링된 브라우저에서는 HTML 코드로 표시된다.

<br>

### Props

props는 부모 컴포넌트로부터 자식 컴포넌트에 데이터를 보낼 수 있게 해주는 방법이다.

```jsx
// 생략...
function App() {
  // 생략...

  return (
    <div>
      <h1>Super Converter</h1>
      <select value={index} onChange={onSelect}>
        <option value="-1">Select...</option>
        <option value="0">Minutes To Hours</option>
        <option value="1">Km To Miles</option>
      </select>

      <br />

      {index === "0" ? <MinutesToHours /> : null}
      {index === "1" ? <KmToMiles /> : null}
    </div>
  );
}
```

App컴포넌트가 부모 컴포넌트이고, MinutesToHours와 KmToMiles 컴포넌트가 자식 컴포넌트 이다.

<br>

### props 사용하기

```jsx
function Button(props) {
  return (
    <button
      type="button"
      style={{
        fontSize: props.big ? 18 : 16,
      }}
    >
      {props.text}
    </button>
  );
}

function App() {
  return (
    <div>
      <Button text="Save Change" big={true} />
      <Button text="Continue" big={false} />
    </div>
  );
}
```

text와 big 이란 props를 받아와 재사용하여 사용한다.

<br>

더 편리하게 사용하기 위해서는 아래처럼 사용하면 된다.

```jsx
function Button({ text, big }) {
  return (
    <button
      type="button"
      style={{
        fontSize: big ? 18 : 16,
      }}
    >
      {text}
    </button>
  );
}

function App() {
  return (
    <div>
      <Button text="Save Change" big={true} />
      <Button text="Continue" big={false} />
    </div>
  );
}
```

<br>

### 커스텀 컴포넌트에 이벤트리스너는 추가되지 않는다. 그저 props일 뿐!!!

아래 코드처럼 커스텀 컴포넌트 <Button /> 에만 onClick 을 추가해준다고 이벤트리스너가 추가되어 동작되지 않는다.  
그저 props 인 것!!  
실제 Button 컴포넌트에 등록해주어야 한다.

```jsx
function Button({ text }) {
  return <button>{text}</button>;
}
function App() {
  const [value, setValue] = React.useState("Save Changes");
  const changeValue = () => setValue("Revert Changes");
  return (
    <div>
      {/* 커스텀 컴포넌트에 onChange를 추가한다고 이벤트 리스너가 추가되게 아니다! */}
      <Button text={value} onClick={changeValue} />
      <Button text="Continue" />
    </div>
  );
}
```

<br>

실제 컴포넌트에 넣어주었을 때 동작!!!

```jsx
function Button({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;
}
function App() {
  const [value, setValue] = React.useState("Save Changes");
  const changeValue = () => setValue("Revert Changes");
  return (
    <div>
      {/* 커스텀 컴포넌트에 onChange를 추가한다고 이벤트 리스너가 추가되게 아니다! */}
      <Button text={value} onClick={changeValue} />
      <Button text="Continue" />
    </div>
  );
}
```

<br>

### React.memo

App컴포넌트 안에서 state가 업데이트 되기 떄문에 App 컴포넌트의 자식요소들까지 리렌더링 된다.

props가 변경되지 않는 Continue Button 까지 리렌더링 되는 것이다.

만약 App컴포넌트 안에 자식요소들이 1000개 넘는다고 가정해본다면 엄청 렌더링이 느려질 것임!

props 변경이 없는 Continue Button은 리렌더링 되지 않기 위해서는 React.memo를 사용해야하는 것이다~

React.memo는 처음에만 렌더링 되고, 그 이후 상태 업데이트 내용이 없으면 리렌더링 되지 않음!!
