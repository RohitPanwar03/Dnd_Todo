import React, { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TodoContext } from './../Context/TodoProvider';
import toast from 'react-hot-toast';

const CreateTodo = () => {

    const { Tasks, setTasks } = useContext(TodoContext)
    const [title, settitle] = useState('')
    const [desc, setdesc] = useState('')

    const handlesubmit = (e) => {
        e.preventDefault();
        const todo = {
            id: uuidv4(),
            title: title,
            desc: desc,
            status: "Todo"
        };

        if (todo.title.length < 3 || todo.desc.length < 3) {
            toast.error("Please Enter in Range")
        }
        else {
            setTasks([...Tasks, todo]);
            localStorage.setItem("todo", JSON.stringify([...Tasks, todo]));
            toast.success("Todo Created Successfully")
        }

        settitle('');
        setdesc('');
    }

    return (
        <div>
            <form onSubmit={handlesubmit}>
                <div className='flex flex-col gap-2  '>

                    <input className='border-2 mt-4 p-2 rounded-md outline-none'
                        placeholder="Enter a title..."
                        type="text"
                        value={title}
                        onChange={(e) => settitle(e.target.value)} />
                    <textarea className='border-2 p-4 rounded-md outline-none'
                        placeholder="Enter a desc..."
                        name="desc" id="desc"
                        value={desc}
                        onChange={(e) => setdesc(e.target.value)}></textarea>
                    <button className=' rounded-md bg-white text-blue-600 border-blue-600 border-2 p-2 hover:bg-blue-600 hover:text-white cursor-pointer'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateTodo
