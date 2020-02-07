## JSX 表示对象
下面两种代码等价  Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。
```
const elemet = (
 <h1 className="greeting">
    Hello, world!
  </h1>
</h1>);


const element  = React.createElement(                               
  'h1',
  {className: 'greeting'},                                
  'Hello, world!'
);

// 这是简化创建element过的结构
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```
## React 只更新它需要更新的部分


##  state
1.不要直接修改 State
2.State 的更新可能是异步的
3.数据是向下流动的。父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是 class 组件。 