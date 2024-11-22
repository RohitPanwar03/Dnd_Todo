import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const TodoContext = createContext()

const TodoProvider = ({ children }) => {

    const [Tasks, setTasks] = useState([])

    return (
        <TodoContext.Provider value={{ Tasks, setTasks }}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoProvider
