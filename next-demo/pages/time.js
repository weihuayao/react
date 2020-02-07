import React, { useState } from 'react'
import dynamic from 'next/dynamic'
// import moment from 'moment'

const LazyComponets = dynamic(import('../components/lazyComponets'))

function Time() {

  const [nowTime, setTime] = useState(Date.now())

  //   const changeTime=()=>{
  //     setTime(moment(Date.now()).format())
  // }
  const changeTime = async () => {
    const moment = await import('moment')//等待moment加载完成
    setTime(moment.default(Date.now()).format())
  }
  return (
    <div>
      <div>显示时间为:{nowTime}</div>
      <LazyComponets />
      <div><button onClick={changeTime}>改变时间格式</button></div>
      </div >
      )
    }
export default Time