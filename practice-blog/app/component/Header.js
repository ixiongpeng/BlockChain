
import './Header.css'
import Link from 'next/link'

export default function Header() {
    return (<div className='headerContainer'>
        
            <div className='headerMain'>
                <span className='headerText'>博客系统</span>

                <div className='subject'>
                    <Link className='subjectItem' href='/home'>首页</Link>
                    <Link className='subjectItem' href='/type'>分类</Link>
                    <Link className='subjectItem' href='/about'>关于</Link>
                </div>

                <div className='search'>
                    <div className='searchContainer'>
                        <img className='searchImage' width="20" height="20"  src='/ic_search.svg' alt='search'></img>
                        <input className='searchInput' type='text' placeholder='搜索文章...'></input>
                    </div>
                    <span className='login'>登录</span>
                </div>
            </div>

        <hr></hr>

    </div>)
}