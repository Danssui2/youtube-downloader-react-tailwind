import React, {useState} from 'react'
import Modal from './Modal.js'
import Tutor from '../img/tutorial.png'
import Ab from '../img/info.png'
import Copyright from '../img/copyright.png'
import Git from '../img/github.png'

const Tab = (props) => {
  let [modal, setModal] = useState([]);
  
  return (
    <>
    {modal}
      <button 
        className="w-[80%] lg:w-[50%] h-32 bg-white rounded-xl shadow-xl p-3 flex items-center justify-center flex-col gap-2 hover:scale-110 transition"
        onClick={props.github? () => window.open(props.github, '_blank') : () => setModal(modal.concat(<Modal isopen="true" key={modal.length} title={props.title} z="20" hopen="100%" bgcolor="white">{props.content}</Modal>))}
        >
        <img src={props.icon} className="h-8" alt=""/>
        <div className="text-lg font-medium">{props.title}</div>
      </button>
    </>
  )
}

const Guide = () => {
  
  const Content =
  <div className="p-2 w-full">
How to download Youtube Video using this app <br></br>
1. Search or paste link into the box <br></br>
2. Click the Video<br></br>
3. Click Download and choose Quality<br></br>
4. You'll redirected to a link<br></br>
5. Click three dots on the right corner and Download :)
</div>
  
  return (
    <Tab 
      icon={Tutor} 
      title="Tutorial" 
      content={Content}
    />
  )
}

const About = () => {
  const Content =
  <div className="p-2 w-full">
This web app allow you to Download youtube videos to your storage. <br></br>
But this can't download copyrighted videos.
</div>
  
  return (
    <Tab 
      icon={Ab} 
      title="About"
      content={Content}
    />
  )
}

const Credits = () => {
  const Content =
  <div className="p-2 w-full">
Thanks to all author for the open source library!.<br></br>
See more on package.json!
</div>
  return (
    <Tab 
      icon={Copyright} 
      title="Credits"
      content={Content}
    />
  )
}

const Github = () => {
  return (
    <Tab 
      icon={Git} 
      title="Github"
      github="https://github.com/Danssui2"
    />
  )
}

export {
  Guide, About, Credits, Github
}