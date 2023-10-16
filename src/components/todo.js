import React, { useState } from "react";
import "./todo.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

export default function ToDo() {
    const [todos, setTodos] = useState([]);

    const addTodo = (todo) => {
        setTodos([...todos, { text: todo, isEditing: false, isSelected: false }]);
    };

    const deleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    const editTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].isEditing = true;
        setTodos(newTodos);
    };

    const saveTodo = (index, newText) => {
        const newTodos = [...todos];
        newTodos[index].text = newText;
        newTodos[index].isEditing = false;
        setTodos(newTodos);
    };

    const toggleSelectTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].isSelected = !newTodos[index].isSelected;
        setTodos(newTodos);
    };

    const deleteSelectedTodos = () => {
        const selectedTodos = todos.filter((todo) => todo.isSelected);
        if (selectedTodos.length === 0) {
            return; // no todo is selected, return without doing anything
        }
        const newTodos = todos.filter((todo) => !todo.isSelected);
        setTodos(newTodos);
    };

    const deleteAll = () => {
        setTodos([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTodo = e.target[0].value;
        if (!newTodo) {
            return; // don't add empty todos
        }
        addTodo(newTodo);
        e.target[0].value = "";
    };

    return (
        <div class="all">
            <div class="topSection h-40 d-flex flex-column justify-content-center
                align-items-center bg-primary">
                <h1 class="text-light text-bolder mb-3 mt-2">To-Do App!</h1>
                <form onSubmit={handleSubmit} class="form-group  w-100  p-3  d-flex flex-row justify-content-between align-items-start ">
                    <input
                        class="form-control m-1"
                        type="text"
                        placeholder="Add a new todo"
                        name="todo"
                    />
                    <button
                        type="submit"
                        class="btn btn-primary m-1 border-light "
                    >Add</button>
                    <button
                        type="button"
                        onClick={deleteSelectedTodos}
                        className="btn btn-danger m-1 btn-sm "
                    >Delete Selected</button>
                </form>
            </div>
            <div class="buttonSection h-70" style={{flexDirection: "column-reverse"}}>
                <ul className="list-group bg-Secondary container overflow-auto " >
                    {todos.map((todo, index) => (
                        <li key={index} class="list-group-item d-flex justify-content-between align-items-center">
                            <span
                                className={todo.isSelected ? "text-decoration-line-through" : ""}
                                onClick={() => toggleSelectTodo(index)}
                            >
                                {todo.isEditing ? (
                                    <input
                                        type="text"
                                        defaultValue={todo.text}
                                        onBlur={(e) => saveTodo(index, e.target.value)}
                                    />
                                ) : (
                                    <span>{todo.text}</span>
                                )}
                            </span>
                            <span className="buttonsLI d-flex flex-row ">
                                <button
                                    onClick={() => editTodo(index)}
                                    className="btn btn-primary p-2 m-1  border-light "
                                >Edit</button>
                                <button
                                    onClick={() => deleteTodo(index)}
                                    className="btn btn-primary p-2 m-1 border-light "
                                >Delete</button>
                                <div className="form-check m-1">
                                    <input
                                        className="form-check-input "
                                        type="checkbox"
                                        checked={todo.isSelected}
                                        onChange={() => toggleSelectTodo(index)}
                                    />
                                </div>
                            </span>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={deleteAll}
                    className="btn btn-danger p-2 border-light mt-3 deleteAll"
                >Delete All</button>
            </div>

        </div>
    );
}
