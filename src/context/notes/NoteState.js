import NoteContext from './noteContext';
import {useState} from 'react'

const NoteState=(props)=>{
    const NoteInitial=[
        {
          "_id": "6660345a58f84d77a9e73055",
          "user": "66603341f2347b59af33c243",
          "title": "my title",
          "description": "Do some work",
          "tag": "personal",
          "date": "2024-06-05T09:48:10.418Z",
          "__v": 0
        },
        {
          "_id": "6660355ec0d648cf4edd6faa",
          "user": "66603341f2347b59af33c243",
          "title": "my title1",
          "description": "Do some work",
          "tag": "personal",
          "date": "2024-06-05T09:52:30.911Z",
          "__v": 0
        },
        {
          "_id": "66603563c0d648cf4edd6fac",
          "user": "66603341f2347b59af33c243",
          "title": "my title2",
          "description": "Do some work",
          "tag": "personal",
          "date": "2024-06-05T09:52:35.089Z",
          "__v": 0
        }
      ];
      const [notes, setNotes] = useState(NoteInitial);
      const addNote=(title,description,tag)=>{
        console.log("adding a note");
        //TODO API CALL
        const note={
            "_id": "66603563c0d648cf4edd6faac",
          "user": "66603341f2347b59af33c243",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2024-06-05T09:52:35.089Z",
          "__v": 0
        }
        setNotes(notes.concat(note));
      }
      const deleteNote=()=>{
        
      }
      const editNote=()=>{
        
      }
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;