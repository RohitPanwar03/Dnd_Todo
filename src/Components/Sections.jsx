import React, { useState } from 'react'
import Header from './Header';
import Todo from './Todo';
import { useDrop } from 'react-dnd';
import toast from 'react-hot-toast';
import { Modal } from 'antd';
import CreateTodo from './CreateTodo';

const Sections = ({ status, Tasks, setTasks, todo, inProgress, review, closed }) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'todo',
        drop: (item) => additemtoCollection(item.id),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    }))

    let text = "Todo";
    let bg = "bg-slate-500"
    let TodotoMap = todo

    if (status === "InProgress") {
        text = "InProgress";
        bg = "bg-purple-500"
        TodotoMap = inProgress
    }
    if (status === "Review") {
        text = "Review";
        bg = "bg-blue-500"
        TodotoMap = review
    }
    if (status === "Closed") {
        text = "Closed";
        bg = "bg-green-500"
        TodotoMap = closed
    }

    const additemtoCollection = (id) => [
        setTasks((prev) => {
            const modifiedTodo = prev.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        status: status
                    }
                }
                return todo
            })
            localStorage.setItem('todo', JSON.stringify(modifiedTodo))
            toast.success("Todo Status Changed")
            return modifiedTodo;
        })
    ]

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div ref={drop} className={`w-64 rounded-md ${isOver ? "bg-slate-200" : ""}`}>
            <Header text={text} count={TodotoMap.length} bg={bg} />
            {TodotoMap.length > 0 && TodotoMap.map((todo) => <Todo key={todo.id} Tasks={Tasks} setTasks={setTasks} todo={todo} />)}
            {
                status == "Todo" ?
                    (
                        <div>
                            <button className='mt-4 w-full rounded-md bg-white text-blue-400 border-blue-400 border-2 p-2 hover:bg-blue-400 hover:text-white cursor-pointer' type="primary" onClick={showModal}>
                                Add Todo
                            </button>
                            <Modal title="Add Todo" open={isModalOpen}
                                cancelButtonProps={{ hidden: true }}
                                okButtonProps={{ hidden: true }}
                                onCancel={handleCancel}>
                                <CreateTodo />
                            </Modal>

                        </div>
                    ) : (
                        <></>
                    )
            }
        </div>
    )
}

export default Sections
