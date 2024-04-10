import { useState,useEffect } from 'react'
import { TodoProvider } from './contexts/TodoContext'
import './App.css'
import TodoItem from './components/TodoItem'
import TodoForm from './components/TodoForm'

function App() {
  const [todos, setTodos] = useState([]) //**  todos as an array hi define kiya h humne context m bhi.

  // ** sabhi methods {addTodo, updateTodo, deleteTodo, checked} ko functionality hum yha pr denge **

  //** yha lafda pdega addTodo m hmko "todo" jo h usko 'todos m add krna hoga 
  //   or Todos ek array h so JS jai ho ;) 


  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }
  // ** ruko yha ..prev ka use kiya h taki todos m jo bhi values ho vo as it is hi aajaye
  // ** Jab hum todo add krenge toh new id deni hogi or sath m jo purana todo h vo bhi as it is rkhna pdega

  // Sbka number aayega

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
    //** kyuki todos ek array h toh "MAP" ka use krenge , map m ek callback lgayenge 
    // ** agr prevTodo ki id hmari given id se match hogi toh todo ko update kr denge vrna prevTodo as it is rhega 
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }
  // ** kyuki new array m hmko given id nd values ko chhod kr baki sari ids nd values chahiye
  ///    toh "FILTER" ka use krenge toh jo hmara new array hoga usme given id wale todo ko chhod kr baki sari values hongi
  
  const toggleTodo = (id) => {   //console.log(id);
    
    setTodos((prev) =>      
      prev.map((prevTodo) =>     // agr hmari id kisi ek todo ki id se match ho jaye toh ? 
        prevTodo.id === id     // new array m us previous todo ki value toh pass ho hi 
        ? { ...prevTodo, checked: !prevTodo.checked}   // **but sath m checked ki value reverse ho jaye
        : prevTodo))                  // athva vhi preveous todo return ho jaye
  }
   
  //** lo ji toh humne todos m sb functions add kr diye but but but wait for the twist
       // todo ki values kha se layenge or new values kha rkhenge? 

  // ** Local Storage  **
     // isme hum get nd set ka use krte h google krke syntax mil jayega so....
         // ** localStorage.getItem("todos") - getter
         // ** JSON use krna hi pdega

    useEffect(() => {
      const todos =JSON.parse(localStorage.getItem("todos")) //JSON.parse() ; string ko js m convert krna h 
      if (todos && todos.length > 0) {
        setTodos(todos)
      }
    }, [])

    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos)) // string m dena h 
    }, [todos])
    
  

  return (
    // TodoProvider m hmaesha koi value provide krni pdti h 
    // yha humne sari values  Destucture krke provider m daal di
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleTodo }}>

      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id}
                className='w-full'
              >
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
};

export default App;
