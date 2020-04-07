import React from 'react';
import '../../public/css/main.scss';
const Header = () =>
    <div className="top">
        <div>这是头部</div>
        <div>
            <i className="logo"/>
        </div>
        <div className="nav">
            <a href="/index.html">首页</a> <a href="/teacher.html">教师</a> <a href="/course.html">课程</a>
        </div>
    </div>
;

export default Header;