import React, {useState} from 'react';
import abbreviate from 'number-abbreviate';
import Modal from './Modal.js';

const Stream = ({data, down}) => {
  
  /*data = {
    title: 'Shortest Video on Youtube',
    description: `All these "Shortest Video on Youtube" videos aren't even remotely funny, so your boy Mylo the Cat decided that it was time to step in.\n` +
      '\n' +
      'Add Mylo the Cat on Facebook - http://www.facebook.com/mylothecat \n' +
      '\n' +
      'Add Mylo the Cat on Twitter - http://www.twitter.com/MTCyall\n' +
      '\n' +
      'Full Series - http://www.youtube.com/playlist?list=PL1EBE78CC528B52E8&feature=viewall',
    lengthSeconds: '1',
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
  
  function desc(max = 15) {
    if (data) {
      const word = data?.description.split(' ')
      
      if (word.length > max) {
          return word.slice(0, max).join(' ') + '...'
      } else {
          return data?.description
      }
    }
  }
  
  const showDescModal = () => {
    setModal(modal.concat(<Modal isopen="true" key={modal.length} title="Description" z="20">{data?.description}</Modal>));
  }
  
  function ClosedUI() {
    return (
      <>
      {data ?
        <div className="relative w-full h-full flex items-center px-2 justify-evenly">
          <img src={data?.thumbnails[3].url} alt="thumbnail" className="rounded-md shadow-xl h-[80%] w-auto"/>
          <div className="flex flex-col mx-2 w-[60%]">
            <div className="text-sm font-medium">{data?.title}</div>
            <div className="text-xs font-light text-slate-500">{data?.ownerChannelName}</div>
          </div>
          <div className="text-md font-medium">Do</div>
        </div>
      :
        <div className="relative w-full h-full flex items-center px-2 justify-evenly">
            <div className="text-sm font-light">Gun Aji Joko Indra Duta Dadang Sity Choiriyah 16 Tahun 😋 Waris Amrih Rexim Emtees topy merah</div>
        </div>
      }
      </>
    )
  }
  
  return (
    <>
      {modal}
      <Modal title="Details" hclosed="10%" closedver={<ClosedUI />}>
        {data ?
          <div className="relative flex h-full w-full flex-col">
            <img src={data?.thumbnails[3].url} alt="thumbnail" className="rounded-xl shadow-xl"/>
            <p>{data?.title}</p>
            <div className="flex p-1">
              <p>{desc()}</p>
              <button className="bg-slate-100 p-1 px-3" onClick={showDescModal}>V</button>
            </div>
            <p>{data?.lengthSeconds}</p>
            <p>{abbreviate(data?.likes)}</p>
            <p>{abbreviate(data?.viewCount)}</p>
            <div className="dropdown dropdown-top">
              <label tabIndex={0} className="btn">Download</label>
              <ul tabIndex={0} className="dropdown-content shadow bg-base-100 rounded-box h-[15em] w-[50%] overflow-y-scroll flex flex-col">
                {down}
              </ul>
            </div>
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