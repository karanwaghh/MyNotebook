import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState=(props)=>{
    const s1={
        "name":"karan",
        "class":"1A"
    }
    const [state,setState]=useState(s1);

    const update=()=>{
        setTimeout(() => {
            setState({
                "name":"Varun",
                "class":"5E"
            })
        }, 1000)
    }
    return(
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;