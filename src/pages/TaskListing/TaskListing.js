import React, {useState} from 'react';
import './TaskListing.css';
import NewTaskDialog from '../../components/NewTaskDialog';

export default function TaskListing() {
    const [openDialog, setOpenDialog] = useState(false);

    const initialData = [
        {
            id: 1,
            one: "one",
            two: 'two',
            three: 'three',
            four: 'asdf',
            five: 'fasdf',
            six: 'asdf'
        },
        {
            id: 2,
            one: "one",
            two: 'two',
            three: 'three',
            four: 'asdf',
            five: 'fasdf',
            six: 'asdf'
        }
    ];

    return (
        <div className='tasklisting-container'>
            <div className='tasklisting-title'>
                <h1>TASK MANAGEMENT</h1>
            </div>
            <div>
                <button onClick={() => setOpenDialog(true)}>+ New Task</button>
                <table className="tasklisting-table">
                    <thead>
                        <tr>
                            <th style={{ minWidth: "10vw" }}>
                                <div className="tasklisting-table-header">Completed</div>
                            </th>
                            <th style={{ minWidth: "10vw" }}>
                                <div className="tasklisting-table-header">Delete</div>
                            </th>
                            <th style={{ minWidth: "20vw" }}>
                                <div className="tasklisting-table-header">Task Title</div>
                            </th>
                            <th style={{ minWidth: "15vw" }}>
                                <div className="tasklisting-table-header">Task Description</div>
                            </th>
                            <th style={{ minWidth: "15vw" }}>
                                <div className="tasklisting-table-header">Priority</div>
                            </th>
                            <th style={{ minWidth: "15vw" }}>
                                <div className="tasklisting-table-header">Due Date</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {initialData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.one}</td>
                                <td>{item.one}</td>
                                <td>{item.one}</td>
                                <td>{item.one}</td>
                                <td>{item.one}</td>
                                <td>{item.one}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <NewTaskDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </div>
    );
};