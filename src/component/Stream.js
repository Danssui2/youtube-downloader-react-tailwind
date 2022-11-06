import React, {useState} from 'react';
import abbreviate from 'number-abbreviate';
import Modal from './Modal.js';
import {Eyes, Heart, Clock, Download, RightArrow, HamburgerRight} from './Icons.js';

const Stream = ({data, down, pos = "absolute"}) => {
  
  /*data = {
    title: 'Shortest Video on Youtube',
    description: `All these "Shortest Video on Youtube" videos aren't even remotely funny, so your boy Mylo the Cat decided that it was time to step in.\n` +
      '\n' +
      'Add Mylo the Cat on Facebook - http://www.facebook.com/mylothecat \n' +
      '\n' +
      'Add Mylo the Cat on Twitter - http://www.twitter.com/MTCyall\n' +
      '\n' +
      'Full Series - http://www.youtube.com/playlist?list=PL1EBE78CC528B52E8&feature=viewall',
    lengthSeconds: '90',
    ownerProfileUrl: 'http://www.youtube.com/user/hiddentracktv2',
    externalChannelId: 'UC9kN-ROrTY81zH856AxXuGQ',
    isFamilySafe: true,
    isUnlisted: false,
    hasYpcMetadata: false,
    viewCount: '37192920',
    category: 'Pets & Animals',
    publishDate: '2011-01-19',
    ownerChannelName: 'Mylo the Cat',
    uploadDate: '2011-01-19',
    videoId: 'tPEE9ZwTmy0',
    keywords: [
      'Shortest', 'Video',
      'on',       'Youtube',
      'ever',     'of',
      'all',      'time',
      'mylo',     'the',
      'cat',      'funny',
      'actually', 'lol',
      'viral',    'cute',
      'kitty'
    ],
    channelId: 'UC9kN-ROrTY81zH856AxXuGQ',
    isOwnerViewing: false,
    isCrawlable: true,
    allowRatings: true,
    isPrivate: false,
    isUnpluggedCorpus: false,
    isLiveContent: false,
    media: {},
    likes: 994969,
    dislikes: null,
    age_restricted: false,
    video_url: 'https://www.youtube.com/watch?v=tPEE9ZwTmy0',
    thumbnails: 'https://i.ytimg.com/vi/tPEE9ZwTmy0/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDEBj9S7dtDJhrRv3hN32OlzkFZxw'
  }*/
  
  const [modal, setModal] = useState([]);
  
  function sliceText(text, max = 8) {
    if (data) {
      const word = text?.split(' ')
      
      if (word?.length > max) {
          return word.slice(0, max).join(' ') + '...'
      } else {
          return text
      }
    }
  }
  
  function duration (val) {
    var sec_num = parseInt(val, 10); 
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
  }
  
  const showDescModal = () => {
    setModal(modal.concat(<Modal isopen="true" key={modal.length} title="Description" z="20"><div className="px-4">{data?.description}</div></Modal>));
  }
  
  function ClosedUI() {
    return (
      <>
      {data ?
        <div className="relative w-full h-full flex items-center px-2 justify-evenly">
          <img src={data?.thumbnails[3].url} alt="" className="rounded-md shadow-xl h-[80%] w-auto"/>
          <div className="flex flex-col mx-2 w-[60%]">
            <div className="text-sm font-medium">{sliceText(data?.title, 4)}</div>
            <div className="text-xs font-light text-slate-500">{data?.ownerChannelName}</div>
          </div>
          <div className="flex items-center justify-center"><Download/></div>
        </div>
      :
        <div className="relative w-full h-full flex items-center px-2 justify-evenly">
            <div className="text-sm font-light">Nothing :)</div>
        </div>
      }
      </>
    )
  }
  
  return (
    <>
      {modal}
      <Modal title="Details" hclosed="3.5em" pos={pos} closedver={<ClosedUI />}>
        {data ?
          <div className="relative flex h-full w-full flex-col px-4">
            <img src={data?.thumbnails[3].url} alt="Loading..." className="rounded-xl shadow-xl w-full h-[30%] mb-5"/>
            <div className="flex justify-evenly w-full mb-3">
              <div className="flex gap-1">
                <Heart/>
                {data?.likes? abbreviate(data?.likes) : 100}
              </div>
              <div className="flex gap-1">
                <Eyes/>
                {abbreviate(data?.viewCount)}
              </div>
              <div className="flex gap-1">
                <Clock/>
                {duration(data?.lengthSeconds)}
              </div>
            </div>
            <div className="text-lg font-medium">{data?.title}</div>
            <div className="text-md">{data?.ownerChannelName}</div>
            <div className="flex mb-10">
              <p className="text-sm">{sliceText(data?.description, 15)}</p>
              <button className="bg-white p-1 px-3 rounded-md hover:scale-110 transition" onClick={showDescModal}><HamburgerRight/></button>
            </div>
            <div className="flex w-screen">
              <div className="dropdown dropdown-top flex w-full">
                <button tabIndex={0} className="bg-purple-500 px-5 py-3 rounded-md text-white shadow-lg shadow-purple-600 font-medium flex items-center justify-center gap-1 hover:scale-110 transition">Download <Download/></button>
                <a href={data?.video_url}><button className="bg-rose-500 px-5 py-3 ml-3 rounded-md text-white shadow-lg shadow-rose-600 font-medium flex items-center justify-center gap-1 hover:scale-110 transition">YouTube <RightArrow/></button></a>
                <ul tabIndex={0} className="dropdown-content shadow bg-base-100 translate-y-[-0.8em] rounded-box h-[15em] w-[50%] overflow-y-scroll flex flex-col">
                  {down}
                </ul>
              </div>
            </div>
            <p className="text-sm font-light mt-3">*Copyright video cannot be downloaded.</p>
          </div>
        :
          <div className="relative flex h-full w-full flex-col justify-center items-center">
            <div className="text-sm font-light">There is nothing between us :)</div>
          </div>
        }
      </Modal>
    </>
  )
}

export default Stream;