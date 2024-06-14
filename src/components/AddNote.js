import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/noteContext'

function AddNote(props) {
    const context = useContext(noteContext);
    const{addNote}=context;
    
    const [note, setNote] = useState({title:"",description:"",tag:""});

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        props.showAlert("Note added Successfuly",'success');
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
                <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onchange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" name="description" id="description" value={note.description} onChange={onchange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" name="tag" id="tag" value={note.tag} onChange={onchange}/>
            </div>
            <button disabled={(note.title.length<5 || note.description.length<5)} type="submit" className="btn btn-primary" onClick={handleClick}>Add a note</button>
        </form>
        </div>
    </div>
  )
}

export default AddNote