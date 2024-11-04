import React, { useState, useEffect } from 'react';
import './NewTaskDialog.css';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { IoMdClose } from "react-icons/io";

const NewTaskDialog = ({ openDialog, setOpenDialog, addOrEditTask, initialData }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'low',
        dueDate: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                title: '',
                description: '',
                priority: 'low',
                dueDate: ''
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addOrEditTask({ ...formData, id: initialData ? initialData.id : Date.now() });
        setOpenDialog(false);
        setFormData({ title: '', description: '', priority: 'low', dueDate: '' });
    };

    return (
        <Dialog
            open={openDialog}
            PaperProps={{
                style: {
                    width: '40vw',
                    height: '500px',
                    borderRadius: '8px',
                }
            }}>
            <DialogTitle
                style={{
                    fontSize: 28,
                    fontWeight: 600,
                    color: '#000000',
                    padding: '16px 25px 0 25px'
                }}>
                Add New Task
            </DialogTitle>
            <IoMdClose
                size={30}
                className='dialog-icon'
                onClick={() => setOpenDialog(false)}
            />
            <DialogContent>
                <form className='dialog-form' onSubmit={handleSubmit}>
                    <div>
                        <div className='dialog-input-field'>
                            <label htmlFor='title'>Task Title*</label>
                            <input
                                type='text'
                                name='title'
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='dialog-input-field'>
                            <label htmlFor='description'>Task Description</label>
                            <textarea
                                type='text'
                                name='description'
                                rows={5}
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='dialog-input-field'>
                            <label htmlFor='priority'>Priority</label>
                            <select
                                name='priority'
                                value={formData.priority}
                                onChange={handleChange}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div className='dialog-input-field'>
                            <label htmlFor='dueDate'>Due Date</label>
                            <input
                                type='date'
                                name='dueDate'
                                value={formData.dueDate}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            className='dialog-button'
                            type='submit'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default NewTaskDialog;