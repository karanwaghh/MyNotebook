import React from 'react'
function About() {
  return (
    <div className=' my-4 px-5'>
    <div className='container'>
      <div className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        <strong>About the MyNotebook</strong>
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      The MyNotebook is a react app where you efficiently create, edit, and delete your personal notes, all stored securely in the cloud. Capture ideas, tasks, and important information with ease. Enjoy seamless access to your notes from any device, ensuring your thoughts are always organized and up-to-date.
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      <strong>How useful MyNotebook is?</strong>
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      MyNotebook saves your notes in the cloud, allowing you to access, edit, and delete them whenever you want. You can also use it as a daily tracker.
      </div>
    </div>
  </div>
</div>
</div>
    <div style={{display:"flex",justifyContent:"center",margin:"10rem"}}>
        Made With ❤️ By karanwaghh
    </div>
    </div>
  )
}

export default About