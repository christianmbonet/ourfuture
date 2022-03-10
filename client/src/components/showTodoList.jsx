import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateTodo  from "./updateTodo";

function TodoCard({ data, handleEdit, handleDelete }) {
    const { _id, title, description } = data;

    return (
        <li key={_id}>
            <div className="title-description">
                <h3 className='cardItemTitle'>{title}</h3>
                <p className='cardItemDescription'>{description}</p>
            </div>

            <div className="button-container">
                <button className="editButton" name={_id} onClick={handleEdit}>
                    Edit
                </button>
                <button className="deleteButton" name={_id} onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </li>
    );
}

function ShowTodoList() {
    const [todo, setTodo] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState("");
    const [update, setUpdate] = useState(false);

    useEffect(
        function () {
            axios
                .get("/api/todo")
                .then((res) => {
                    console.log(res.data);
                    setTodo(res.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        },
        [update]
    );

    function handleEdit(e) {
        setId(e.target.name); 
        setOpen(true);
    }

    function handleUpdate() {
        console.log("update:", update, !update);
        setUpdate(!update);
    }

    function handleDelete(e) {
        axios.delete(`/api/todo/${e.target.name}`);

        setTodo((data) => {
            return data.filter((todo) => todo._id !== e.target.name);
        });
    }

    function handleClose() {
        setId("");
        setOpen(false);
    }

    return (
        <section className="container">
            <Link to="/create-todo" className="button-new">
                <button className="addShowButton">Add</button>
            </Link>
            <section className="contents">
                <h1>Visions of the Future</h1>
                <p className='actionCall'>What does our future need?</p>
                <ul className="list-container">
                    {todo.map((data) => (
                        <TodoCard
                            data={data}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))}
                </ul>
            </section>
            {open ? (
                <section className="update-container">
                    <div className="update-contents">
                        <p onClick={handleClose} className="close">
                            &times;
                        </p>

                        <UpdateTodo
                            _id={id}
                            handleClose={handleClose}
                            handleUpdate={handleUpdate}
                        />
                    </div>
                </section>
            ) : (
                ""
            )}
        </section>
    );
}

export default ShowTodoList;