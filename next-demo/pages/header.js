// import Head from 'next/head'
import MyHeader from '../components/myheader'
import { Button } from 'antd'

import '../static/test.css'
export default function Header() {

  return (
    <div>
      {/* <Head>
        <title>header</title>
        <meta charSet='utf-8' />
      </Head> */}
      <MyHeader />
      <h1>Header</h1>
      <Button type='primary'>我是antd的按钮</Button>
    </div>
  )
}
