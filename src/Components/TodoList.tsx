import React from 'react';
import "./TodoList.css"
import Todo from "../models";
import SingleTodo from "./SingleTodo";
import {Droppable} from "react-beautiful-dnd";

interface Props{
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({todos, setTodos, completedTodos, setCompletedTodos}) => {
    return (
        <div className={"container"}>
            <Droppable droppableId={"TodosList"}>
                {
                    (provided, snapshot) => (
                        <div
                            className={`todos ${snapshot.isDraggingOver ? "gragactive" : ""}`}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <span className="todos__heading">
                                Активные задачи
                            </span>
                            {
                                todos.map((todo, index) => (
                                        <SingleTodo
                                            index={index}
                                            todo={todo}
                                            key={todo.id}
                                            todos={todos}
                                            setTodos={setTodos}
                                       />
                                  ))
                             }
                            {provided.placeholder}
                        </div>
                    )
                }

            </Droppable>

            <Droppable droppableId={"TodosRemove"}>
                {
                    (provided, snapshot) => (
                        <div
                            className={`todos remove ${snapshot.isDraggingOver ? "gragactive" : ""}`}
                             ref={provided.innerRef}
                             {...provided.droppableProps}
                        >
                            <span className="todos__heading">
                                Завершенные задачи
                            </span>
                            {
                                completedTodos.map((todo, index) => (
                                    <SingleTodo
                                        index={index}
                                        todo={todo}
                                        key={todo.id}
                                        todos={completedTodos}
                                        setTodos={setCompletedTodos}
                                    />
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </div>
    );
};

export default TodoList;
