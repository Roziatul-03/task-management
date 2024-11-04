import React from 'react';
import './NewTaskDialog.css';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { IoMdClose } from "react-icons/io";

const NewTaskDialog = ({ openDialog, setOpenDialog }) => {
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
                <form className='dialog-form'>
                    <div>
                        <div className='dialog-input-field'>
                            <label htmlFor='taskTitle'>Task Title</label>
                            <input type='text' name='taskTitle' required />
                        </div>
                        <div className='dialog-input-field'>
                            <label htmlFor='taskDetails'>Task Details</label>
                            <textarea type='text' name='taskDetails' rows={5} />
                        </div>
                        <div className='dialog-input-field'>
                            <label htmlFor='priority'>Priority</label>
                            <select name='priority'>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div className='dialog-input-field'>
                            <label htmlFor='dueDate'>Due Date</label>
                            <input type='date' name='dueDate' />
                        </div>
                        <button
                            className='dialog-button'
                            type='submit'
                            onClick={() => setOpenDialog(false)}
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