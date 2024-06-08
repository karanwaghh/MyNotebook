import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/noteContext'

function AddNote() {
    const context = useContext(noteContext);
    const{addNote}=context;
    
    const [note, setNote] = useState({title:"",description:"",tag:"default"});
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
    }
    const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
        <div className="container my-3">
        <h2>Add a note</h2>
        <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" onChange={onchange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" name="description" id="description" onChange={onchange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" name="tag" id="tag" onChange={onchange}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleClick}>Add a note</button>
        </form>
        </div>
    </div>
  )
}

export default AddNote