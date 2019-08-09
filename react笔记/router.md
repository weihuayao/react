## BrowserRouter
浏览器的路由方式，也是我们一直在学习的路由方式，在开发中最常使用。

## HashRouter
在路径前加入#号成为一个哈希值。Hash模式的好处是，再也不会因为我们刷新而找不到我们的对应路径了。

## MemoryRouter
不存储history，所有路由过程保存在内存里，不能进行前进后退，因为地址栏没有发生任何变化。

## NativeRouter
经常配合ReactNative使用，多用于移动端

## StaticRouter
设置静态路由，需要和后台服务器配合设置，比如设置服务端渲染时使用。

## basename
basename的作用是个我们增加一级导航目录 

```
<Router basename="demo" forceRefresh={true}>   

http://localhost:3000/About  =  http://localhost:3000/demo/About

``` 
## forceRefresh
这个属性的作用是开启或者关闭ReactRouter，也就是说如果你把forceRefresh的值设置成真，它将关闭React路由系统，而真实的去服务器端请求信息。

##  prompt用法
需要注意的是，如果你用MemoryRouter路由模式，<Promp不起作用。
他有两个属性 ：
message：用于显示提示的文本信息。
when：传递布尔值，相当于标签的开关，默认是true，设置成false时，<Prompt>失效。
```
   constructor(props){
        super(props);
        this.state = {
            power: false 
        }
        this.changPower = this.changPower.bind(this);
    }

    changPower(){
        alert("已开启");
        this.setState({
            power: true
        })
    }

    render() {
        return (
            <div>
                关于  -> WDNMD
                <Prompt message="NM$L?" when={this.state.power}></Prompt>
                <button onClick = {this.changPower}>启用</button>
            </div>
        )
    }
```
上述代码如果 when 为false 则 Prompt 无效。