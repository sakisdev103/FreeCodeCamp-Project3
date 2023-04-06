import React, { useEffect, useState } from 'react';
import { drumArray } from './DrumPads';

const App = () => {
  const [audioName, setAudioName] = useState('Audio');

  //Managing click event and playing selected audio
  const handleClick= ({id, desc}) =>{
    setAudioName(desc);
    const selectedAudio = document.getElementById(id);
    selectedAudio.play();
  }

  //Get key press from keyboard
  const keyAudio = (e) =>{
    drumArray.forEach(element => {
      if(element.keyCode === e.code){
        handleClick(element);
        return
      }
    });
  }

  //Play the audio when pressing btn from keyboard
  useEffect(()=>{
    window.document.addEventListener('keypress', keyAudio);

    return () => {
      window.document.removeEventListener('keypress', keyAudio);
    }
  },[])

  return (
    <>
      <div className="center">
        <h1>Drum Pad</h1>
        <div id="drum-machine">
          <div id="display">
            <div className="sub-display">
              <p>{audioName}</p>
            </div>
          </div>
          <div className="drum-pads-container">
            {
              drumArray.map((audio)=>{
                return(
                  <div 
                    className='drum-pad'
                    id={audio.desc}
                    key={audio.keyCode}
                    onClick={()=>handleClick(audio)}
                  >
                    <p>{audio.id}</p>
                    <audio className='clip' src={audio.src} id={audio.id}></audio>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App