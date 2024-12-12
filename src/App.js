import logo from './logo.svg';
import './App.css';
import React from 'react';
import orderBy from 'lodash/orderBy'


/* basic React Handler

function App() {

  let clickHandler = (name) => {
    console.log(name);
  };

  const clickHandlerWEvent = (name, e) =>{
    console.log(name, e);
  };

  const [count, setCount] = React.useState(0);
  const [form, setForm] = React.useState({
      name: 'originName',
  });
  const handleChangeName = ()=>{
    setForm({...form, name: 'changeName'});
  }
  return (
    <div className="App">
      <button onClick={()=>clickHandler('test')}> click me </button>
      <button onClick={(e)=>clickHandlerWEvent('test2', e)}> click me </button>
      <button onClick={()=>setCount(count+1)}> {count} </button>
      <button onClick={handleChangeName}> {form.name} </button>


    </div>
  );
}*/

const defaultList = [
    {
        // 评论id
        rpid: 3,
        // 用户信息
        user: {
            uid: '13258165',
            avatar: '',
            uname: '周杰伦',
        },
        // 评论内容
        content: '哎哟，不错哦',
        // 评论时间
        ctime: '10-18 08:15',
        like: 88,
    },
    {
        rpid: 2,
        user: {
            uid: '36080105',
            avatar: '',
            uname: '许嵩',
        },
        content: '我寻你千百度 日出到迟暮',
        ctime: '11-13 11:29',
        like: 88,
    },
    {
        rpid: 1,
        user: {
            uid: '30009257',
            uname: '黑马前端',
        },
        content: '学前端就来黑马',
        ctime: '10-19 09:00',
        like: 66,
    },
    {
        rpid: 4,
        user: {
            uid: '30009257',
            uname: '黑马前端',
        },
        content: '学前端就来',
        ctime: '11-19 09:00',
        like: 55,
    },
]
// 当前登录用户信息
const user = {
    // 用户id
    uid: '30009257',
    // 用户昵称
    uname: '黑马前端',
}

/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

// 导航 Tab 数组
const tabs = [
    { type: 'hot', text: '最热' },
    { type: 'time', text: '最新' },
]

const App = () => {

    const [activeTab, setActiveTab] = React.useState('hot')
    const [list, setList] = React.useState(defaultList)

    const [newComment, setNewComment] = React.useState('')

    const onDelete = (rpid) => {
      setList(list.filter(item => item.rpid !== rpid))
    }

    const onToggle = (type) => {
      setActiveTab(type);
      let newList;
      if (type === 'time') {
          newList = orderBy(list, 'ctime', 'desc');
      } else {
          newList = orderBy(list, 'like', 'desc');
      }
      setList(newList);
    }

    const handleAddComment = () => {
        if (!newComment.trim()) {
            alert('comments are not empty');
            return;
        }
        const newRpid = list.length > 0 ?  Math.max(...list.map(item => item.rpid)) + 1  : 1;
        const newEntry = {
            rpid: newRpid,
            user,
            content: newComment,
            ctime: new Date().toLocaleString(),
            like: 0,
        };
        setList([newEntry, ...list]);
        setNewComment('')
    }
    return (
        <div className="app">
            {/* 导航 Tab */}
            <div className="reply-navigation">
                <ul className="nav-bar">
                    <li className="nav-title">
                        <span className="nav-title-text">评论</span>
                        {/* 评论数量 */}
                        <span className="total-reply">{list.length}</span>
                    </li>
                    <li className="nav-sort">
                        {/* 高亮类名： active */}
                        {tabs.map((item) => {
                            return (
                                <div
                                key={item.type}
                                className={
                                    item.type === activeTab ? 'nav-item active' : 'nav-item'
                                }
                                onClick={()=> onToggle(item.type)}
                                >
                                    {item.text}
                                </div>
                            )
                        })}
                    </li>
                </ul>
            </div>

            <div className="reply-wrap">
                {/* 发表评论 */}
                <div className="box-normal">
                    <div className="reply-box-wrap">
                        {/* 评论框 */}
                        <textarea
                            className="reply-box-textarea"
                            placeholder="发一条友善的评论"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        {/* 发布按钮 */}
                        <div className="reply-box-send">
                            <div className="send-text" onClick={handleAddComment}>发布</div>
                        </div>
                    </div>
                </div>
                {/* 评论列表 */}
                    <div className="reply-list">
                        {/* 评论项 */}
                        {list.map(item => {
                            return (
                                <div key={item.rpid} className="reply-item">

                                    <div className="content-wrap">
                                        {/* 用户名 */}
                                        <div className="user-info">
                                            <div className="user-name">{item.user.uname}</div>
                                        </div>
                                        {/* 评论内容 */}
                                        <div className="root-reply">
                                            <span className="reply-content">{item.content}</span>
                                            <div className="reply-info">
                                                {/* 评论时间 */}
                                                <span className="reply-time">{item.ctime}</span>
                                                {/* 评论数量 */}
                                                <span className="reply-time">点赞数:{item.like}</span>
                                                {user.uid === item.user.uid && (
                                                    <span className="delete-btn"
                                                    onClick={() => onDelete(item.rpid)}
                                                    >
                                                    删除
                                                  </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                })}
                </div>
            </div>
        </div>
    )
}
export default App;
