import React, { useContext, useEffect, useState } from 'react'
import { TodoContext } from './../Context/TodoProvider';
import Sections from './Sections';

const TodoList = () => {

    const { Tasks, setTasks } = useContext(TodoContext)
    const [todo, settodo] = useState([])
    const [inProgress, setinProgress] = useState([])
    const [review, setreview] = useState([])
    const [closed, setclosed] = useState([])

    useEffect(() => {
        setTasks(JSON.parse(localStorage.getItem('todo')));
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const ftodo = Tasks.filter((todo) => todo.status === 'Todo')
        const finProgress = Tasks.filter((todo) => todo.status === 'InProgress')
        const freview = Tasks.filter((todo) => todo.status === 'Review')
        const fclosed = Tasks.filter((todo) => todo.status === 'Closed');


        settodo(ftodo)
        setinProgress(finProgress)
        setreview(freview)
        setclosed(fclosed)
    }, [Tasks])

    const statuses = ["Todo", "InProgress", "Review", "Closed"]

    return (
        <div className='flex gap-16 mt-8'>
            {
                statuses.map((status, index) => {
                    return (

                        <Sections
                            key={index}
                            status={status}
                            Tasks={Tasks}
                            setTasks={setTasks}
                            todo={todo}
                            inProgress={inProgress}
                            review={review}
                            closed={closed}
                        />
                    )
                })
            }
        </div>
    )
}

export default TodoList
