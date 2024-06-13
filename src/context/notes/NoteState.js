import NoteContext from './noteContext';
import {useState} from 'react'

const NoteState=(props)=>{
    const host='http://localhost:5000'
    const NoteInitial=[];
      const [notes, setNotes] = useState(NoteInitial);

      const getNote= async()=>{
        const url=`${host}/api/notes/fetchallnotes`
        const response = await fetch(url, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2MDMzNDFmMjM0N2I1OWFmMzNjMjQzIn0sImlhdCI6MTcxNzU4MDYwOX0.ZiCp-98xB7FNjCqkXLBAepgxvpKr0EnZ8QajpjFtpiM"
            }
          });
          const json=await response.json();
          setNotes(json);
      }

      //Adding note
      const addNote= async (title,description,tag)=>{

        const url=`${host}/api/notes/addnotes`
        const response = await fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2MDMzNDFmMjM0N2I1OWFmMzNjMjQzIn0sImlhdCI6MTcxNzU4MDYwOX0.ZiCp-98xB7FNjCqkXLBAepgxvpKr0EnZ8QajpjFtpiM"
            },
            body: JSON.stringify({title,description,tag}), 
          });
          const note=await response.json();
          setNotes(notes.concat(note.data));
      }


      const deleteNote= async(id)=>{
        //TODO API CALL
        const url=`${host}/api/notes/deletenotes/${id}`
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2MDMzNDFmMjM0N2I1OWFmMzNjMjQzIn0sImlhdCI6MTcxNzU4MDYwOX0.ZiCp-98xB7FNjCqkXLBAepgxvpKr0EnZ8QajpjFtpiM"
            },
          });
        const allnote=notes.filter((note)=>{return (note._id!==id)});
        const json=await response.json();
        setNotes(allnote);
      }



      const editNote= async(id,title,description,tag)=>{
        
        const url=`${host}/api/notes/updatenotes/${id}`
        const response = await fetch(url, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2MDMzNDFmMjM0N2I1OWFmMzNjMjQzIn0sImlhdCI6MTcxNzU4MDYwOX0.ZiCp-98xB7FNjCqkXLBAepgxvpKr0EnZ8QajpjFtpiM"
            },
            body: JSON.stringify({title,description,tag}), 
          });
          const json=await response.json();

          let newNote=JSON.parse(JSON.stringify(notes));

          for(let i=0;i<newNote.length;i++){
            const element=notes[i];
            if(element._id===id){
              newNote[i].tag=tag;
              newNote[i].title=title;
              newNote[i].description=description;
              break;
            }
          }
          setNotes(newNote);
      }
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;