    import PropTypes from 'prop-types';
    import './TodoListContent.css'
    
    export default function TodoListContent({todoList, updateTodoState}) {
        return todoList.map((item, index) => (
                <li key={item.value}>
                    <div className='TodoItem'>
                        <input type="checkbox" value={item.value} checked={item.state} onChange={ (e) => {
                            updateTodoState(index, e.target.checked)
                            console.log("checkbox:" + e.target.checked)
                        }}/>
                        {item.value}
                    </div>
                </li>
            )
        )
    }

    TodoListContent.propTypes = {
        todoList: PropTypes.array.isRequired,
        updateTodoState: PropTypes.func.isRequired
    }

    TodoListContent.defaultProps = {
        todoList: []
    }