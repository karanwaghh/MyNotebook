import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'

function NoteItem(props) {
    const{note,updateNote}=props;
    const context = useContext(noteContext);
    const {deleteNote}=context;
  return (
    <div className='col-md-3'>
        <div className="card my-3">
        <div className="card-body">
        <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-trash mx-3 mb-1" onClick={()=>deleteNote(note._id)}></i>
            <i className="fa-solid fa-pen-to-square mx-3 mb-1" onClick={()=>updateNote(note)}></i>
        </div>
            <p className="card-text">{note.description}</p>
            <div >
            <p className='btn btn-outline-secondary cursor-pointer-none'>{note.tag}</p>
            </div>
            <p></p>
        </div>
        </div>
    </div>
  )
}

export default NoteItem