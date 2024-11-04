import React, { useState } from 'react';
import './TaskListing.css';
import NewTaskDialog from '../../components/NewTaskDialog';
import { ImBin } from "react-icons/im";
import {
    TiArrowUnsorted,
    TiArrowSortedUp,
    TiArrowSortedDown,
} from "react-icons/ti";

export default function TaskListing() {
    const [openDialog, setOpenDialog] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'completed', direction: 'ascending' });

    const handleDelete = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    const toggleCompleted = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const addOrEditTask = (task) => {
        if (taskToEdit) {
            setTasks(tasks.map(t => (t.id === task.id ? task : t)));
        } else {
            setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
        }
        setTaskToEdit(null);
    };

    const openNewTaskDialog = () => {
        setTaskToEdit(null);
        setOpenDialog(true);
    };

    const openEditDialog = (task) => {
        setTaskToEdit(task);
        setOpenDialog(true);
    };

    const sortedTasks = [...tasks].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getArrowIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === "ascending" ? (
                <TiArrowSortedUp size={18} />
            ) : (
                <TiArrowSortedDown size={18} />
            );
        } else {
            return <TiArrowUnsorted size={18} />;
        }
    };

    return (
        <div className='tasklisting-container'>
            <div className='tasklisting-title'>
                <h1>TASK MANAGEMENT</h1>
            </div>
            <div className='tasklisting-content'>
                <button onClick={openNewTaskDialog}>
                    + New Task
                </button>
                {sortedTasks.length > 0 ? (
                    <table className="tasklisting-table">
                        <thead>
                            <tr>
                                <th style={{ width: '10%' }} onClick={() => requestSort('completed')}>
                                    Completed
                                    <span>{getArrowIcon("completed")}</span>
                                </th>
                                <th style={{ width: '10%' }}>
                                    Delete
                                </th>
                                <th style={{ width: '20%' }} onClick={() => requestSort('title')}>
                                    Task Title
                                    <span>{getArrowIcon("title")}</span>
                                </th>
                                <th style={{ width: '30%' }} onClick={() => requestSort('description')}>
                                    Task Description
                                    <span>{getArrowIcon("description")}</span>
                                </th>
                                <th style={{ width: '15%' }} onClick={() => requestSort('priority')}>
                                    Priority
                                    <span>{getArrowIcon("priority")}</span>
                                </th>
                                <th style={{ width: '15%' }} onClick={() => requestSort('dueDate')}>
                                    Due Date
                                    <span>{getArrowIcon("dueDate")}</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTasks.map((task) => (
                                <tr key={task.id} onClick={() => openEditDialog(task)}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={() => toggleCompleted(task.id)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </td>
                                    <td className='delete-icon'>
                                        <ImBin onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(task.id);
                                        }} />
                                    </td>
                                    <td className={`tasklisting-data ${task.completed ? 'completed' : ''}`}>
                                        {task.title}
                                    </td>
                                    <td className={`tasklisting-description ${task.completed ? 'completed' : ''}`}>
                                        {task.description}
                                    </td>
                                    <td className={`tasklisting-data ${task.completed ? 'completed' : ''}`}>
                                        {task.priority}
                                    </td>
                                    <td className={`tasklisting-data ${task.completed ? 'completed' : ''}`}>
                                        {task.dueDate}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className='tasklisting-empty-data'>
                        <p>No tasks available.</p>
                        <p>Click on the <strong>'New Task'</strong> button to add tasks.</p>
                    </div>
                )}
            </div>
            <NewTaskDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                addOrEditTask={addOrEditTask}
                initialData={taskToEdit}
            />
        </div>
    );
}