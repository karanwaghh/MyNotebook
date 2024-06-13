import React,{useContext,useEffect, useRef,useState} from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';

function Notes() {
    const context = useContext(noteContext);
    const{notes,getNote,editNote}=context;

    const ref=useRef(null);
    const refClose=useRef(null);

    const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""});
    const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleClick=(e)=>{
      e.preventDefault();
      editNote(note.id,note.etitle,note.edescription,note.etag);
      refClose.current.click();
    }
    useEffect(() => {
      getNote();
      // eslint-disable-next-line
    }, [])

    const updateNote=(currentNote)=>{
      ref.current.click();
      setNote({id:currentNote._id,etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
    }
  return (
    <>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Update Note
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                  <div className="mb-3">
                      <label htmlFor="etitle" className="form-label">Title</label>
                      <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onchange}/>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="edescription" className="form-label">Description</label>
                      <input type="text" className="form-control" name="edescription" id="edescription" value={note.edescription} onChange={onchange}/>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="etag" className="form-label">Tag</label>
                      <input type="text" className="form-control" name="etag" id="etag" value={note.etag} onChange={onchange}/>
                  </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.length > 0 ? (
        notes.map((note) => {
          return <NoteItem note={note} updateNote={updateNote} key={note._id} />;
        })
      ) : (
        <p>No notes available</p>
      )}
    </div>
    </>
    
  )
}

export default Notes