import React, {useState} from 'react';
import axios from 'axios';
import './css/App.css';
import Stream from './component/Stream.js';
import Nav from './component/Nav.js';

function App() {
  const [url, setUrl] = useState();
  const [data, setData] = useState();
  const [format, setFormat] = useState();

const handle = () => {
  const conurl = encodeURIComponent(url);
  console.log(url, conurl);
  //axios.get('http://localhost:5000/down?url=' + url)
  axios.get('https://lonely-cyan-fez.cyclic.app/down?url=' + url)
  .then((res) => {
    if (res.data?.error) {
      console.log(res.data.error);
    } else {
      setFormat(res.data.link);
      setData(res.data.info);
      console.log(data);
    }
  })
  .catch((err) => {
     console.log(err.message);
  });
};

const downlink = format?.map((entry, index) => {
      return (
        <li>
          <a href={entry.url} target="_blank" rel="noreferrer" key={index}>
            <button>Download {entry.qualityLabel} Video : {entry.fps? "Yes" : "False"}</button>
          </a>
        </li>
      )
  });

  return (
    <div className="relative w-screen h-screen flex items-start justify-start">
    
    <Stream data={data} down={downlink}/>
    <Nav/>
    
      <div className='flex mt-[15%] justify-start items-start flex-col'>
        <div className='relative flex flex-col'>
          <div className='text-6xl text-pink-600 font-bold'>Gun YT</div>
          <div className='text-4xl text-slate-100 font-bold'>Downloader</div>
        </div>
         <form onSubmit={e => e.preventDefault()} className="flex w-[90%] h-14">
          <input 
            id="linkInput" 
            type="url" 
            placeholder="Search or Paste an Url" 
            onChange={(e) => setUrl(e.target.value)}
            pattern="^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$"
            title="Enter a correct link!"
            className="rounded-l-sm w-full h-full pl-2"
          />
          <button onClick={handle} className="bg-slate-100 rounded-r-sm p-3">V</button>
        </form>
        
        <div className="flex w-[90%] h-10 gap-3 justify-evenly items-center mt-3">
          <a href="https://youtube.com"><button className="bg-slate-100 rounded-lg h-10 grow px-8">Open Youtube</button></a>
        </div>
        
      </div>
    </div>
  );
}

export default App;