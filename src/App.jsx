import './App.css'
import TodoList from './Components/TodoList';
import { Toaster } from './../node_modules/react-hot-toast/src/components/toaster';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { useContext, useEffect, useState } from 'react';
import { TodoContext } from './Context/TodoProvider';

function App() {

  const { Tasks, setTasks } = useContext(TodoContext)
  const savedTasks = JSON.parse(localStorage.getItem('todo')) || []
  const [searchText, setsearchText] = useState('')

  useEffect(() => {
    if (searchText.length > 0) {
      const stodo = savedTasks.filter((todo) => {
        if (todo.title.toLowerCase().includes(searchText.toLowerCase())) {
          return todo
        }
      })
      setTasks(stodo)
    }
    else {
      setTasks(savedTasks)
    }
  }, [searchText])


  return (
    <DndProvider backend={HTML5Backend}>

      <Toaster />
      <div className='mt-12 h-screen flex flex-col items-center '>
        <h1 className=' m-8 text-4xl font-bold underline'><i>Kanban's Board</i></h1>
        <div className='border-2 rounded-md flex justify-between w-1/2'>
          <input className='p-4 w-full outline-none' type="text" placeholder='Search...' value={searchText} onChange={(e) => setsearchText(e.target.value)} />
          <button className='p-4' >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>

          </button>
        </div>
        <TodoList />
      </div >
    </DndProvider>
  )
}

export default App
