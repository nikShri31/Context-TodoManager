import React,{useState} from 'react'
import { useTodo } from '../contexts'

// **** TODO hmne add kr liya h ab us pr saveral operations perform krne h
// **** First jo todo add kiya h usko as prop yha layenge  

const TodoItem = ({ todo }) => {
  const { updateTodo, deleteTodo, toggleTodo } = useTodo()

  const [isTodoEditable, setIsTodoEditable] = useState(false)
  //**{id: 1,todo: 'todo msg',checked: false}
  const [todoMsg, setTodoMsg] = useState(todo.todo)

  //1. Edit Todo ----  ** updateTodo: (id, todo) => { } **
  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg })
    setIsTodoEditable(false)
  }

  // 2. Toggle TODO ---- ** toggleTodo: (id) => { },**
  const toggleCompleted = () => {
    toggleTodo(todo.id)
  }
  return (
    <div className={`flex border border-black/10 rounded-lg py-1.5 gap-x-3  shadow-sm shadow-white/50 duration-300 
     text-black ${todo.checked ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"}`}>

      <input type='checkbox'
        className='cursor-pointer'
        checked={todo.checked}
        onChange={toggleCompleted}
      />
      <input type='text'
        className={`border outline-none w-full bg-transparent rounded-lg 
             ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"}
             ${todo.checked ? "line-through" : ""}
            `}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      <button className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center 
                          items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.checked) return;
          if (isTodoEditable) editTodo()
          else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.checked}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      {/** Delete Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  )
}

export default TodoItem;