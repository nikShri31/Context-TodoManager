import { createContext, useContext } from "react";

export const TodoContext = createContext({

    todos: [{
        id: 1,
        todo: 'todo msg',
        checked: false
    },],
    // ** ab todos[{}] k baaad hmko baad m todos m add,update, delete nd check bhi toh krna pdega
    // ** but yha bs function define krna h unko koi functionality nhi deni h

       addTodo: (id) => { },
    updateTodo: (id, todo) => { },
    deleteTodo: (id) => { },
    toggleTodo: (id) => { },

})
//  **1. At first hmko creactecontext ka use krna h fir hum todos variable bna k usme array pass
//       krte h nd us array m kafi alg alg properties pass kr skte h. 

export const useTodo = () => useContext(TodoContext);

// **2. uske baad ek custom hook m usecontext hook ko paas krenge or isme vhi variavle use krenge 
//      jisme humnme createcontext ko rkha h ab aage bs useTodo function hi paas krna h 
//     { createContext, useContext } dono isi se mil jayenge.

//***  Ab provider bhi add krna h Provider ko bhi hum add krke ek variable m pass kr denge
export const TodoProvider = TodoContext.Provider;

