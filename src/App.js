import {useState, useEffect, useRef, useCallback} from 'react';
import Player from './components/Player/Player';
import alanBtn from "@alan-ai/alan-sdk-web";


function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [alanInstance, setAlanInstance] = useState();

  const playingSong = useCallback(() => {
     alanInstance.playText("Playing")
     setIsPlaying(true);
  }, [alanInstance])

  const pausedSong = useCallback(() => {
    alanInstance.playText("Paused")
    setIsPlaying(false);
 }, [alanInstance])

 const skipSong = useCallback(() => {
  alanInstance.playText("Skipped forward")
  setCurrentSongIndex(prevIndex => prevIndex + 1);
}, [alanInstance])

const goBack = useCallback(() => {
  alanInstance.playText("Playing previous")
  setCurrentSongIndex(prevIndex => prevIndex - 1);
}, [alanInstance])

  useEffect(() => {
    window.addEventListener('playing-song', playingSong)
    window.addEventListener('paused-song', pausedSong)
    window.addEventListener('skip-song', skipSong)
    window.addEventListener('go-back', goBack)

    return () => {
      window.removeEventListener('playing-song', playingSong)
      window.removeEventListener('paused-song', pausedSong)
      window.removeEventListener('skip-song', skipSong)
      window.removeEventListener('go-back', goBack)
    }
  }, [playingSong, pausedSong, skipSong, goBack])

  const alanBtnInstance = useRef(null);


useEffect(() => {
  if (alanInstance != null) return

  setAlanInstance(
    alanBtn({
      
      key: '3ba9218e66ce950c6eb0e61364f7fc8e2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command }) => {
        window.dispatchEvent(new CustomEvent(command))
      }
    })
  )
}, [])


  const [songs] = useState([
    {
      title: "See you again",
      artist: "Wiz Khalifa",
      img_src: "./images/song-3.jpg",
      src: "./music/see-you-again.mp3"
    },
    {
      title: "Perfect",
      artist: "Ed Sheeran",
      img_src: "./images/song-2.jpg",
      src: "./music/perfect.mp3"
    },
    {
      title: "Faded",
      artist: "Alan Walker",
      img_src: "./images/song-1.jpg",
      src: "./music/faded.mp3"
    },
    {
      title: "Love the way you lie",
      artist: "Eminem",
      img_src: "./images/song-4.jpg",
      src: "./music/love-the-way-you-lie.mp3"
    }
  ]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex]);

  return (
    <div className="App">
      <Player 
        currentSongIndex={currentSongIndex} 
        setCurrentSongIndex={setCurrentSongIndex} 
        nextSongIndex={nextSongIndex} 
        songs={songs}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
} 

export default App;
