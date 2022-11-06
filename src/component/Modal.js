import React, {useState} from 'react';
import {X} from './Icons.js';
import {motion, AnimatePresence} from 'framer-motion';

const Modal = (props) => {
  
  const variable = {
    open: {height: props.hopen, zIndex: props.z, background: props.bgcolor, position: props.pos},
    closed: {height: props.hclosed, zIndex: props.z, background: props.bgcolor, position: props.pos}
  }
  
  const [isOpen, setOpen] = useState(props.isopen);
  
  return (
    <AnimatePresence>
      <motion.div
        initial= {'closed'}
        animate= {isOpen ? 'open' : 'closed'}
        variants= {variable}
        transition={{ease: "easeOut", duration: 0.5}}
        onTap= {() => setOpen(true)}
        className= 'fixed bottom-0 w-full bg-[#FFFFFF99] border border-slate-200 rounded-t-2xl backdrop-blur-lg'
      >
        {isOpen? 
          <div className="relative flex h-full w-full items-center flex-col">
            <div className="font-bold mt-4 mb-4">{props.title}</div>
            <button className="absolute bg-white rounded-lg h-8 w-8 left-3 top-3 flex justify-center items-center shadow hover:scale-110 transition" onClick={() => setOpen(isOpen => !isOpen)}><X/></button>
            {props.children}
          </div>
        :
          <div className="flex h-full w-full">
            {props.closedver}
          </div>
        }
      </motion.div>
    </AnimatePresence>
  );
}

Modal.defaultProps = {
  isopen: false,
  hopen: '95%',
  hclosed: '0%',
  title: '',
  z: 10,
  bgcolor: "#FFFFFF99",
  pos: "absolute",
  closedver: []
}

export default Modal;