
import './TodoList.css'
import { useEffect, useState } from 'react';
import TodoListContent from './TodoListContent'

function TodoList() {

    const [todoList, setTodoList] = useState([]);
    const [inputValue, setInputValue] = useState([])
    const [leftCount, setLeftCount] = useState(0)

    function addTodo() {
        let newTodoList = [{value: inputValue, state: false}, ...todoList]
        setTodoList(newTodoList)
        updateLocal(newTodoList)
        setInputValue("")
        updateLeftCount()
    }

    /**
     * 更新TODO项完成状态
     */
    function updateTodoState(index, checked) {
        let newTodoList = [...todoList]
        newTodoList[index].state = checked;
        setTodoList(newTodoList)
        
        let localTodoList = JSON.parse(localStorage.getItem('todoList'))
        localTodoList.map((item, index) => {
            if(item.value == newTodoList[index].value){
                item.state = newTodoList[index].state
            }
        })
        localStorage.setItem('todoList', JSON.stringify(localTodoList))

        updateLeftCount()
    }

    function updateLeftCount(){
        let localTodoList = JSON.parse(localStorage.getItem('todoList')) || []
        console.log(`updateLeftCount: ${JSON.stringify(localTodoList)}`)
        if(localTodoList.length > 0){
            let newLeftCount = 0
            localTodoList.map((item) => {
                if(item.state == false) {
                    newLeftCount += 1
                }
            })
            setLeftCount(newLeftCount)
        }else{
            setLeftCount(0)
        }   
    }

    function updateLocal(newTodoList){
        localStorage.setItem('todoList', JSON.stringify(newTodoList))   
    }

    function all() {
        setTodoList(getLocalTodoList()) 
        console.log(`all1: ${JSON.stringify(getLocalTodoList())}`)
    }

    function active() {
        console.log(`active1: ${JSON.stringify(localStorage.getItem('todoList'))}`)
        const newTodoList = getLocalTodoList().filter(item=>item.state == false)
        console.log(`active2: ${JSON.stringify(newTodoList)}`)
        setTodoList(newTodoList) 
    }

    function getLocalTodoList(){
        const localTodoList = JSON.parse(localStorage.getItem('todoList'))
        return localTodoList
    }

    function completed() {
        const newTodoList = JSON.parse(localStorage.getItem('todoList')).filter(item=>item.state == true)
        setTodoList(newTodoList) 
    }

    function clearCompleted() {
        const newTodoList = JSON.parse(localStorage.getItem('todoList')).filter(item=>item.state == false)
        setTodoList(newTodoList) 
        updateLocal(newTodoList)
    }

    function clearAll() {
        const newTodoList = []
        setTodoList(newTodoList) 
        updateLocal(newTodoList)
        setLeftCount(0)
    }

    useEffect(() => {
        const localStore = localStorage.getItem('todoList')
        if(localStore) {
            console.log(`useEffect: ${JSON.stringify(JSON.parse(localStore))}`)
            setTodoList(JSON.parse(localStore))
        }else{
            setTodoList([])
        }
        updateLeftCount()
    }, [])

    return (
      <div className='TodoListContainer'>
        {/* 标题 */}
        <div className='TodoListTitle'>Todos</div>
        {/* 输入框 */}
        <div className='TodoListInput' >
            <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>  
            <div className='Add' onClick={() => addTodo()}>添加任务</div>
        </div>
        {/* 任务列表 */}
        <div className='TodoListContent'>{
         todoList.length > 0 ?
         <ul><TodoListContent todoList={todoList} updateTodoState={(index, value)=>updateTodoState(index, value)}></TodoListContent></ul> : 
         <div>任务列表为空，请添加任务</div>
         }
        </div>
        {/**底部功能列表 */}
        <div className='TodoListFooter'>
            <div>{leftCount} items left</div>
            <div className='ActionContainer'>
                <div className='Action' onClick={() => all()}>All</div>
                <div className='Action' onClick={() => active()} >Active</div>
                <div className='Action'onClick={() => completed()} >Complete</div>
            </div>
            <div className='Action' onClick={()=>clearCompleted()} >Clear Complete</div>
            <div className='Action' onClick={()=>clearAll()} >Clear All</div>
        </div>
        
       </div>
    );
}

export default TodoList;

