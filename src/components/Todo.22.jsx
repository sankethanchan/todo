import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

function Todo22() {
  const [todoList, setTodoList] = useState([]);
  const [editableId, setEditableId] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [editedDesc, setEditedDesc] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [newTask, setNewTask] = useState("");
  const [newDesc, setNewDesc] = useState("")
  const [newStatus, setNewStatus] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [editedDeadline, setEditedDeadline] = useState("");

  // Fetch tasks from database
  useEffect(() => { 
    axios.get("http://127.0.0.1:3001/getTodoList")
      .then((result) => {
        setTodoList(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Function to toggle the editable state for a specific row
  const toggleEditable = (id) => {
    const rowData = todoList.find((data) => data._id === id);
    if (rowData) {
      setEditableId(id);
      setEditedTask(rowData.task);
      setEditedTask(rowData.task);
      setEditedDesc(rowData.description);
      setEditedStatus(rowData.status);
      setEditedDeadline(rowData.deadline || "");
    } else {
      setEditableId(null);
      setEditedTask("");
      setEditedDesc("")
      setEditedStatus("");
      setEditedDeadline("");
    }
  };

  // Function to add task to the database
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask || !newDesc || !newStatus || !newDeadline) {
      alert("All fields must be filled out.");
      return;
    }

    axios
      .post("http://127.0.0.1:3001/addTodoList", {
        task: newTask,
        description: newDesc,
        status: newStatus,
        deadline: newDeadline,
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // Function to save edited data to the database
  const saveEditedTask = (id) => {
    const editedData = {
      task: editedTask,
      description: editedDesc,
      status: editedStatus,
      deadline: editedDeadline,
    };

    // If the fields are empty
    if (!editedTask || !editedDesc || !editedStatus || !editedDeadline) {
      alert("All fields must be filled out.");
      return;
    }

    // Updating edited data to the database through updateById API
    axios
      .post("http://127.0.0.1:3001/updateTodoList/" + id, editedData)
      .then((result) => {
        console.log(result);
        setEditableId(null);
        setEditedTask("");
        setEditedDesc("");
        setEditedStatus("");
        setEditedDeadline(""); // Clear the edited deadline
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // Delete task from database
  const deleteTask = (id) => {
    axios
      .delete("http://127.0.0.1:3001/deleteTodoList/" + id)
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <h2 className="text-center addtask">Add task </h2>
          <form className="addtask-details p-4">
            <div className="row">
              <div className="col-md-3">
                <label>Task</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Task"
                  onChange={(e) => setNewTask(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label>Description</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter description"
                  onChange={(e) => setNewDesc(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <label>Status</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Status"
                  onChange={(e) => setNewStatus(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <label>Deadline</label>
                <input
                  className="form-control"
                  type="datetime-local"
                  onChange={(e) => setNewDeadline(e.target.value)}
                />
              </div>
            </div>
            <button onClick={addTask} className="btn btn-success btn-sm">
              Add Task
            </button>
          </form>
        </div>


        <div className="col-md-12 mt-5">
          <h2 className="text-center task-h2"> Task List</h2>
          <div className="table-responsive ">
            <table className="table table-bordered table-newcolor">
              <thead className="tasklist thead-dark">
                <tr>
                  <th>Task</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Deadline</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {Array.isArray(todoList) ? (
                <tbody>
                  {todoList.map((data) => (
                    <tr key={data._id}>
                      <td>
                        {editableId === data._id ? (
                          <input
                            type="text"
                            className="form-control"
                            value={editedTask}
                            onChange={(e) => setEditedTask(e.target.value)}
                          />
                        ) : (
                          data.task
                        )}
                      </td>
                      <td>
                        {editableId === data._id ? (
                          <input
                            type="text" 
                            className="form-control"
                            value={editedDesc }
                            onChange={(e) => setEditedDesc(e.target.value)}
                          />
                        ) : (
                          data.description
                        )}
                      </td>
                      <td>
                        {editableId === data._id ? (
                          <input
                            type="text"
                            className="form-control"
                            value={editedStatus}
                            onChange={(e) => setEditedStatus(e.target.value)}
                          />
                        ) : (
                          data.status
                        )}
                      </td>
                      <td>
                        {editableId === data._id ? (
                          <input
                            type="datetime-local"
                            className="form-control"
                            value={editedDeadline}
                            onChange={(e) => setEditedDeadline(e.target.value)}
                          />
                        ) : data.deadline ? (
                          new Date(data.deadline).toLocaleString()
                        ) : (
                          ""
                        )}
                      </td>

                      <td>
                        {editableId === data._id ? (
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => saveEditedTask(data._id)}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className="btn edit btn-sm"
                            onClick={() => toggleEditable(data._id)}
                          >
                            Edit
                          </button>
                        )}
                        <button
                          className="btn delete btn-sm ml-1"
                          onClick={() => deleteTask(data._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="4"> Loading products...</td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
export default Todo22;
