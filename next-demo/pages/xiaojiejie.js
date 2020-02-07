import { withRouter} from 'next/router'
import Link from 'next/link'
import axios from 'axios'

const Xiaojiejie = ({router,list})=>{
    return (
        <div>
            <div>{router.query.name},来为我们服务了 .<br/>{list}</div>
            <Link href="/"><a>返回首页</a></Link>
        </div>
    )
}

// Xiaojiejie.getInitialProps = async ()=>{
//     const promise =new Promise((resolve)=>{
//             axios('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList').then(
//                 (res)=>{
//                     console.log('远程数据结果：',res)
//                     resolve(res.data.data)
//                 }
//             )
//     })
//     return await promise
// }

export default withRouter(Xiaojiejie)