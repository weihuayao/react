import React from 'react'
import Com from '../components/com'
import Link from 'next/link'
import Router from 'next/router'

const Home = () => {

  function gotoB() {
    Router.push('/helloB')
  }

  function gotoNews() {
    // Router.push('/news?name=Durant') 或者下面这种
    Router.push({
      pathname: '/news',
      query: {
        name: 'Durant'
      }
    })
  }

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
  //路由跳转发生错误 需要注意的是404找不到路由页面不算错误，这个我们就不演示了。
  Router.events.on('routeChangeError', (...args) => {
    console.log('4,routeChangeError->跳转发生错误,参数为:', ...args)
  })

  //hash 路由跳转模式
  // Router.events.on('hashChangeStart', (...args) => {
  //   console.log('5,hashChangeStart->hash跳转开始时执行,参数为:', ...args)
  // })

  // Router.events.on('hashChangeComplete', (...args) => {
  //   console.log('6,hashChangeComplete->hash跳转完成时,参数为:', ...args)
  // })

  return (<div>
    <div>我是首页</div>
    <div>
      <Link href="/helloA">
        <a>
          <span>A页面</span>
          <span>前端博客</span>
        </a>
      </Link>
    </div>


    <div><Link href="/helloB"><a>B页面</a></Link></div>

    <div><Link href="/xiaojiejie"><a>小姐姐页面</a></Link></div>

    <div>
      <button onClick={() => { Router.push('/helloA') }}>
        go to helloA
      </button>
    </div>

    <div>
      <button onClick={gotoB}>
        go to helloB
      </button>
    </div>
    <hr />
    <li>携带参数路由跳转</li>
    <div>
      <div>  <Link href="/news?name=james"><a>james</a></Link></div>
      <div> <Link href={{ pathname: '/news', query: { name: 'wade' } }}><a>wade</a></Link></div>
    </div>

    <hr />
    <li>编程式路由跳转</li>
    <div>
      <button onClick={gotoNews}>杜兰特</button>
    </div>

    <hr />
    <li>样式</li>

    <div>  <Link href="/helloColor"><a>样式</a></Link></div>
    <hr />
    <li>懒加载</li>

    <div>  <Link href="/time"><a>样式</a></Link></div>
  </div>
  )
}


export default Home
