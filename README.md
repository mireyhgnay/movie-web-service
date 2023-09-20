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

### 우리가 값을 바꿀때마다 재렌더 되어야 한다는 것을 잊으면 안돼~~
