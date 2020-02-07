import { withRouter } from 'next/router'
import Link from 'next/link'

const News = ({ router }) => {
  return (
    <div>
      <div>{router.query.name}is MVP</div>
      <Link href="/"><a>返回首页</a></Link>
    </div>
  )
}

export default withRouter(News)