import React, {useState} from 'react';
import axios from 'axios';
import './css/App.css';
import Stream from './component/Stream.js';
import {Download, RightArrow} from './component/Icons.js';
import {Guide, About, Credits, Github} from './component/Subcontent.js';

// Bad code implementation 🙏

function App() {
  const [url, setUrl] = useState();
  const [data, setData] = useState();
  const [format, setFormat] = useState();
  const [search, setSearch] = useState();

const handle = (val) => {
  if (val !== undefined || val !== null || val !== "" || val !== "undefined") {
    //axios.get('http://localhost:5000/down?url=' + val)
    axios.get('https://agreeable-coffee-citrus.glitch.me/down?url=' + val)
    .then((res) => {
      if (res.data?.error) {
        console.log(res.data.error);
      } else {
        if (res.data.link) {
          setFormat(res.data.link);
          setData(res.data.info);
          console.log(res.data);
        } else {
          setSearch(res.data.searchres);
        }
      }
    })
    .catch((err) => {
       console.log(err.message);
    });
  }
};

  const downlink = format?.map((entry, index) => {
      return (
        <li key={index}>
          <a href={entry.url} target="_blank" rel="noreferrer">
            <button className="font-medium p-1 m-2 bg-base-100">{entry.qualityLabel}. Video : {entry.fps? "Yes" : "No"}, Audio: {entry.audioQuality? "Yes" : "No"}</button>
          </a>
        </li>
      )
  });
  
  const searchComponent = search?.map((entry, index) => {
      return(
        <div 
          key={index} 
          className="card w-64 bg-base-100 shadow-xl shrink-0 mb-2" 
          onClick={() => {setUrl(url => entry?.url, handle(entry?.url))}}
        >
          <img src={entry?.bestThumbnail?.url} alt="" />
          <div className="card-body">
            <h2 className="card-title">{entry?.title}</h2>
            <p>{entry?.author?.name}</p>
            <p>{entry?.views}</p>
            <p>{entry?.duration}</p>
            <p>{entry?.uploadedAt}</p>
          </div>
        </div>
      )
  });

  return (
    <div className="relative w-screen h-screen lg:flex">
      
      <div className="lg:invisible">
        <Stream data={data} down={downlink} pos="fixed"/>
      </div>
      
      <div className="relative h-[40%] pb-[20%] w-full flex items-center justify-center lg:w-[40%] lg:h-screen lg:pb-[5%]">
        <div className='flex mt-[10%] justify-center items-center flex-col hover:z-10'>
          <div className='relative flex self-start ml-[5%]'>
            <div className='text-5xl text-purple-600 font-bold'>YT</div>
            <div className='absolute top-3 ml-14 text-2xl text-slate-600 font-bold'>Downloader</div>
          </div>
          <form onSubmit={e => e.preventDefault()} className="flex w-[90%] h-14 mt-2">
            <input 
              id="linkInput" 
              type="text" 
              placeholder="Search or Paste an Url" 
              onChange={(e) => setUrl(e.target.value)}
              title="Enter a correct link!"
              className="rounded-l-md w-full h-full pl-2 border-l-2 border-t-2 border-b-2 border-purple-600 shadow-md outline-transparent"
            />
            <button onClick={() => handle(url)} className="bg-purple-600 rounded-r-md p-1 w-16 h-auto text-slate-100 shadow-xl flex justify-center items-center hover:scale-105 transition"><Download/></button>
          </form>
          
          <div className="w-[90%] h-10 mt-4">
            <a href="https://youtube.com"><button className="bg-rose-500 rounded-lg h-10 grow px-5 shadow-lg shadow-rose-600 text-white font-medium flex justify-center items-center gap-1 hover:scale-110 transition">Open Youtube <RightArrow/></button></a>
          </div>
        
        </div>
      </div>
      
      
      {search? 
        <div className="flex overflow-scroll flex-col w-screen h-[80%] items-center pt-3 bg-[#FFFFFF99] border border-slate-200 rounded-t-2xl lg:invisible">{searchComponent}</div>
      :
        <div className="fixed bottom-0 mt-5 w-full grid grid-cols-2 content-center place-items-center gap-y-6 pt-5 px-4 pb-[20%] bg-[#FFFFFF95] rounded-t-xl backdrop-blur z-1 lg:invisible">
          <Guide/>
          <About/>
          <Credits/>
          <Github/>
        </div>
      }
      
      <div className="relative flex justify-center items-center invisible lg:visible w-[60%] h-full bg-[#FFFFFF90] border border-slate-200 rounded-l-2xl">
        <div className="invisible lg:visible">
          <Stream data={data} down={downlink}/>
        </div>
        
        {search? 
          <div className="flex overflow-scroll flex-col w-screen h-full items-center pt-3 bg-[#FFFFFF99] border border-slate-200 rounded-t-2xl">{searchComponent}</div>
        :
          <div className="w-full grid grid-cols-2 content-center place-items-center gap-y-[20%] pt-5 px-4">
            <Guide/>
            <About/>
            <Credits/>
            <Github/>
          </div>
        }
        
      </div>
      
    </div>
  );
}

export default App;
