import React, {useEffect, useRef, useState} from 'react';
import Todo from "../models";
import {AiOutlineDelete} from "react-icons/ai";
import {BiEdit} from "react-icons/bi";
import {MdOutlineDone} from "react-icons/md";
import set = Reflect.set;
import {Draggable} from "react-beautiful-dnd";

type Props = {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    index: number
}

const SingleTodo = ({todo, todos, setTodos, index}:Props) => {

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [edit, setEdit] = useState<string>(todo.todo)

    const handleDone = (id:number) => {
        setTodos(
            todos.map((todo) => {
               return todo.id === id ? {...todo, isDone: !todo.isDone} : todo
            })
        )
    }

    const handleDelete = (id: number) => {
        setTodos(
            todos.filter(todo => todo.id !== id)
        )
    }

    const handleEdit = (e: React.FormEvent, id:number) => {
        e.preventDefault()

        setTodos(
            todos.map((todo) => {
                return todo.id === id ? {...todo, todo: edit} : todo
            })
        )
        setIsEdit(false)
    }

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [isEdit]);

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided) => (
                    <form
                        className="todos__single"
                        onSubmit={(e) => handleEdit(e, todo.id)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {
                            isEdit ? (
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className="todos__single--text"
                                    value={edit} onChange={(e) => setEdit(e.target.value)}
                                />
                            ) : (
                                todo.isDone ? (
                                    <span className="todos__single--text"><s>{todo.todo}</s></span>
                                ) : (
                                    <span className="todos__single--text">{todo.todo}</span>
                                )
                            )
                        }

                        <div>
                            {
                                todo.isDone ? "" : (
                                    <span title={"Редактировать"} className="icon" onClick={() => setIsEdit(!isEdit)}>
                                        <BiEdit />
                                    </span>
                                )
                            }
                            <span title={"Удалить"}  className="icon" onClick={() => handleDelete(todo.id)}>
                                <AiOutlineDelete />
                            </span>
                            {
                                todo.isDone ? "" : (
                                    <span title={"Завершить"}  className="icon" onClick={() => handleDone(todo.id)}>
                                        <MdOutlineDone />
                                    </span>
                                )
                            }

                        </div>
                    </form>
                )
            }
        </Draggable>

    );
};

export default SingleTodo;
