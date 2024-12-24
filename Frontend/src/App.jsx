import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [Position, setPosition] = useState({ top: 350, left: 0 });
  const [isMoving, setIsMoving] = useState(true);
  const [CarPosition, setCarPosition] = useState({ left: 1200, top: 350 });
  const [isCarPaused, setIsCarPaused] = useState(false);
  const [isCrashed, setIsCrashed] = useState(false);

  useEffect(() => {
    let interval;
    if (isMoving) {
      interval = setInterval(() => {
        setPosition((prev) => ({
          ...prev,
          left: prev.left + 10 < window.innerWidth - 100 ? prev.left + 10 : prev.left,
        }));
      }, 100);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isMoving]);

  useEffect(() => {
    let interval;
    if (!isCarPaused) {
      interval = setInterval(() => {
        setCarPosition((prev) => ({
          ...prev,
          left: prev.left - 20,
        }));
      }, 100);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isCarPaused]);

  useEffect(() => {
    if (CarPosition.left <= 0) {
      setCarPosition((prev) => ({ ...prev, left: 1200 }));
    }
  }, [CarPosition.left]);

  useEffect(() => {
    if (
      Position.left < CarPosition.left + 100 &&
      Position.left + 100 > CarPosition.left &&
      Position.top === CarPosition.top
    ) {
      HandleCarCrash();
    }
  }, [Position, CarPosition]);

  const Jump = () => {
    setPosition((prev) => ({ ...prev, top: 200, left: prev.left + 50 }));

    setTimeout(() => {
      setPosition((prev) => ({ ...prev, top: 350 }));
    }, 500);
  };

  const HandleCarCrash = () => {
    setIsCrashed(true);
    setIsCarPaused(true);
    setIsMoving(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === ' ') {
        setIsMoving((prev) => !prev);
        setIsCarPaused((prev) => !prev);
      } else if (event.key === 'ArrowUp') {
        Jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const HandleRestart = () =>{
    setCarPosition({left: 1200, top: 350 })
    setPosition({top:350, left:0})
    setIsCrashed(false)
    setIsMoving(true)
    setIsCarPaused(false)

  }
  return (
    <div className="MainDiv">
      <img
        src="https://t3.ftcdn.net/jpg/02/92/57/14/360_F_292571491_R01YTzyvuceDL3UujKe7z38awUeUwtnD.jpg"
        className="BackgroundImage"
      />
      <img
        src="https://www.freeiconspng.com/thumbs/car-png/red-sports-car-ferrari-png-23.png"
        className="Car"
        style={{ position: 'absolute', left: CarPosition.left, top: CarPosition.top }}
      />
      <img
        src="https://img.pikbest.com/origin/09/31/35/85apIkbEsTN6w.png!sw800"
        className="dog"
        style={{ position: 'absolute', left: Position.left, top: Position.top }}
        tabIndex={0}
      />
      {isCrashed &&
      <div className='Message'> 
      <div className='GameOverMessage'>Car got crashed, Game Over</div>
      <button onClick={
        HandleRestart
      } className='Restart'> Restart?</button>
      </div>
      }
    </div>
  );
};

export default App;
