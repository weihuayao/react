# Next.js（代码示例均使用hook函数式声明）

## 1.特点

### 1.1 完善的React项目架构，搭建轻松

&emsp;&emsp;Webpack配置，服务器启动，路由配置，缓存能力，这些在它内部已经完善的为我们搭建完成了(create-next-app)

### 1.2 自带数据同步策略，解决服务端渲染最大难点

### 1.3 丰富的插件帮开发人员增加各种功能

### 1.4 灵活的配置，让开发变的更简单

## 2.安装

```shell
npm install -g create-next-app

npm create-next-app next-create
```

### 2.1 项目结构

&emsp;&emsp;components文件夹:这里是专门放置自己写的组件的，这里的组件不包括页面，指公用的或者有专门用途的组件。

&emsp;&emsp;pages文件夹：这里是放置页面的，这里边的内容会自动生成路由，并在服务器端渲染，渲染好后进行数据同步。

&emsp;&emsp;static文件夹： 这个是静态文件夹，比如项目需要的图片、图标和静态资源都可以放到这里。

&emsp;&emsp;package.json文件：定义了项目所需要的文件和项目的配置信息（名称、版本和许可证），最主要的是使用npm install 就可以下载项目所需要的所有包。

## 3.编写页面

&emsp;&emsp;在pages下新建好js页面,nextjs自动会配置路由。异常方便

```react
<!-- helloA.js  直接访问/helloA即可访问. 访问目录next/helloWorld.js  直接访问 /next/helloWorld  -->
export default () => (
  <div>
    <h1>this is A page</h1>
  </div>
)
```

## 4.路由跳转和query传递参数

&emsp;&emsp;页面跳转一般有两种形式，第一种是利用标签Link,第二种是用js编程的方式进行跳转，也就是利用Router组件。在Next.js中只能通过query（?id=1）来传递参数比如。

``` react
import Link from 'next/link'
import Router from 'next/router'

  function gotoNews() {
    // Router.push('/news?name=Durant') 或者下面这种
    Router.push({
      pathname: '/news',
      query: {
        name: 'Durant'
      }
    })
  }

 <li>携带参数路由跳转</li>
    <div>
      <div>  <Link href="/news?name=james"><a>james</a></Link></div>
      <div> <Link href={{ pathname: '/news', query: { name: 'wade' } }}><a>wade</a></Link></div>
    </div>

    <li>编程式路由跳转</li>
    <div>
      <button onClick={gotoNews}>杜兰特</button>
    </div>

    //另一个页面接受参数
      return (
    <div>
      <div>{router.query.name}is MVP</div>
      <Link href="/"><a>返回首页</a></Link>
    </div>
  )

  export default withRouter(News)

```

## 5.路由中六个钩子事件

&emsp;&emsp;路由的钩子事件，也就是当路由发生变化时，可以监听到这些变化事件，执行对应的函数。它一共有六个钩子事件。如下

 ```react
   //路由变化时
  Router.events.on('routeChangeStart', (...args) => {
    console.log('1.routeChangeStart->路由开始变化,参数为:', ...args)
  })

  //路由变化结束
  Router.events.on('routeChangeComplete', (...args) => {
    console.log('2.routeChangeComplete->路由结束变化,参数为:', ...args)
  })
  //触发history前
  Router.events.on('beforeHistoryChange', (...args) => {
    console.log('3,beforeHistoryChange->在改变浏览器 history之前触发,参数为:', ...args)
  })
  //路由跳转发生错误 需要注意的是404找不到路由页面不算错误
  Router.events.on('routeChangeError', (...args) => {
    console.log('4,routeChangeError->跳转发生错误,参数为:', ...args)
  })

  //hash 路由跳转模式
   Router.events.on('hashChangeStart', (...args) => {
   console.log('5,hashChangeStart->hash跳转开始时执行,参数为:', ...args)
   })

   Router.events.on('hashChangeComplete', (...args) => {
     console.log('6,hashChangeComplete->hash跳转完成时,参数为:', ...args)
   })
  ```

## 6.在getInitialProps用axios请求数据

&emsp;&emsp;在Next.js框架中提供了getInitialProps静态方法用来获取远端数据，这个是框架的约定，所以你也只能在这个方法里获取远端数据。(也可以在componentDidMount中获得但是不推荐)

```react
const Player = ({router,list})=>{
    return (
        <div>
            <div>{router.query.name} is MVP</div>
            <Link href="/"><a>返回首页</a></Link>
        </div>
    )
}
Player.getInitialProps = async ()=>{
    const promise =new Promise((resolve)=>{
            axios('url').then(
                (res)=>{
                    console.log('远程数据结果：',res)
                    resolve(res.data.data)
                }
            )
    })
    return await promise
}

export default withRouter(Player)
```

## 7.使用Style jsx 编写css样式

&emsp;&emsp;在Next.js中引入一个CSS样式是不可以用的，如果想用，需要额外的配置。nextjs框架为我们提供了一个style jsx特性，也就是把CSS用JSX的语法写出来。

```react
import React, { useState } from 'react'

export default function helloColor() {

  const [color, setColor] = useState('lightgreen')

  const changeColor = () => {
    setColor(color == 'lightgreen' ? 'red' : 'yellow')
  }
  return (
    <div>
      <div>
        <h1>color</h1>
        <button onClick={changeColor}>colorfully</button>
      </div>
      <style jsx>
        {
          ` div{ color:${color};}`
        }
      </style>
    </div>
  )
}
```

## 8.使用自定义css样式 、 antd样式

### 8.1 使用自定义css样式

``` react 
yarn add @zeit/next-css 

//先用yarn命令来安装@zeit/next-css包，它的主要功能就是让Next.js可以加载CSS文件，有了这个包才可以进行配置。

// 建立一个next.config.js.这个就是Next.js的总配置文件 配置如下

const withCss = require('@zeit/next-css')

if(typeof require !== 'undefined'){
    require.extensions['.css']=file=>{}
}

module.exports = withCss({})
```

### 8.2 使用antd样式

```react 
yarn add antd

yarn add babel-plugin-import

//根目录建立.babelrc 

{
  "presets": [
    //Next.js的总配置文件，相当于继承了它本身的所有配置
    "next/babel"
  ], 
  "plugins": [ //增加新的插件，这个插件就是让antd可以按需引入，包括CSS
    [
      "import",
      {
        "libraryName": "antd",
      }
    ]
  ]
}

```

## end 打包(完结)

&emsp;&emsp;使用antd样式打包会出问题,antd的bug,需要小小的配置一下。
然后就打包就完事 yarn build  -> yarn start。不打包不能start。开发yarn dev 就好了

```react 
package.json

"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start -p 80"
},

pages 目录下新建 _app.js文件

import App from 'next/app'

import 'antd/dist/antd.css'

export default App
```
