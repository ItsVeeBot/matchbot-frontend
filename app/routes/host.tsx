import PlayerView from "~/modules/host/PlayerView";
import type { Route } from "./+types/host";
import { socket } from "~/socket"
import { useEffect, useState, type ChangeEvent } from "react";
import IonIconClient from "~/modules/IonIconClient";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Match Game Host View" },
  ];
}

export default function Host() {

  const [selectedPlayer, setSelectedPlayer] = useState('triangle')

  const [lecternCopied, setLecternCopied] = useState(false)
  const [sfxCopied, setSfxCopied] = useState(false)

  const handleSelectPlayer = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedPlayer(event.target.value)
  }

  const resetAllScores = () => {
    socket.emit("resetScore", "triangle")
    socket.emit("resetScore", "circle")
    for(let i=1; i<=6; i++){
      socket.emit("setTriangle", i.toString(), false)
      socket.emit("setCircle", i.toString(), false)
    }
  }

  const openTwitchSignups = ()=>{
    socket.emit("openTwitchSignups")
  }

  const closeTwitchSignups = ()=>{
    socket.emit("closeTwitchSignups")
  }

  const clearTwitchSignups = ()=>{
    socket.emit("clearTwitchSignups")
  }

  const requestTwitchPlayers = ()=>{
    socket.emit("requestTwitchPlayers")
  }

  const requestTwitchAnswer = ()=>{
    socket.emit("requestTwitchAnswer", selectedPlayer)
  }

  const clearAnswers = ()=>{
    socket.emit("clearAnswers")
  }

  const stopSounds = ()=>{
    socket.emit("stopSounds")
  }

  const playRandom = ()=>{
    socket.emit("playSound", "random", 0)
  }

  const playThink = (think:number)=>{
    socket.emit("playSound", "think", think)
  }

  useEffect(()=>{
    socket.emit("subscribe", "all")
  }, [])
  
  const copyLecternToClipboard = () => {
        setLecternCopied(true)
        navigator.clipboard.writeText(window.location.origin+"/lectern")
    }
    useEffect(() => {
        if (lecternCopied) {
            const timer = setTimeout(() => setLecternCopied(false), 2000)
            return () => clearTimeout(timer)
        }
    }, [lecternCopied])

  const copySfxToClipboard = () => {
        setSfxCopied(true)
        navigator.clipboard.writeText(window.location.origin+"/sfx")
    }
    useEffect(() => {
        if (sfxCopied) {
            const timer = setTimeout(() => setSfxCopied(false), 2000)
            return () => clearTimeout(timer)
        }
    }, [sfxCopied])

  const buttonClass = "rounded-md bg-blue-400 p-2 w-full"

  const playerViews = []
  for(let i=1; i<=6; i++){
    playerViews.push(<PlayerView key={i.toString()} playerId={i.toString()} socket={socket} selectedPlayer={selectedPlayer} />)
  }
  
  return(
    <div className="flex flex-col text-center gap-4 p-4">
        <div className="flex gap-2 justify-center">
          <div className="border border-default rounded-lg">
            <div className="font-semibold">Current Player:</div>
            <ul className="border-t rounded-lg">
              <li className="w-full border-default flex">
                <div className="flex flex-col items-center p-3">
                  <label htmlFor="player-selector-triangle">
                    <IonIconClient name="triangle" size="medium" className="text-4xl text-green-800" />
                  </label>
                  <input type="radio" value="triangle" checked={selectedPlayer==="triangle"} onChange={handleSelectPlayer} id="player-selector-triangle" name="player-selector" />
                </div>
                <div className="flex flex-col items-center p-3">
                  <label htmlFor="player-selector-circle">
                    <IonIconClient name="ellipse" size="medium" className="text-4xl text-red-800" />
                  </label>
                  <input type="radio" value="circle" checked={selectedPlayer==="circle"} onChange={handleSelectPlayer} id="player-selector-circle" name="player-selector" />
                </div>
              </li>
            </ul>
          </div>
          <div className="border border-default rounded-lg">
            <div className="font-semibold">Game Controls</div>
            <div className="border-t rounded-lg p-2 flex flex-col gap-2">
              <button className={buttonClass} onClick={resetAllScores}>Reset all scores</button>
              <button className={buttonClass} onClick={requestTwitchAnswer}>Request Answer</button>
              <button className={buttonClass} onClick={clearAnswers}>Clear Answers</button>
            </div>
          </div>
          <div className="border border-default rounded-lg">
            <div className="font-semibold">Twitch Integration Controls</div>
            <div className="border-t rounded-lg p-2 flex flex-col gap-2">
              <div className="flex gap-2">
                <button className={buttonClass} onClick={openTwitchSignups}>Open Signups</button>
                <button className={buttonClass} onClick={closeTwitchSignups}>Close Signups</button>
              </div>
              <div className="flex gap-2">
                <button className={buttonClass} onClick={requestTwitchPlayers}>Select Players</button>
                <button className={buttonClass} onClick={clearTwitchSignups}>Clear Signups</button>
              </div>
            </div>
          </div>
          <div className="border border-default rounded-lg">
            <div className="font-semibold">Think Music Controls</div>
            <div className="border-t rounded-lg p-2 flex flex-col gap-2">
              <button className={buttonClass} onClick={stopSounds}>Stop</button>
              <button className={buttonClass} onClick={playRandom}>Random</button>
              <div className="flex gap-2">
                <button className={buttonClass} onClick={()=>{playThink(1)}}>1</button>
                <button className={buttonClass} onClick={()=>{playThink(2)}}>2</button>
                <button className={buttonClass} onClick={()=>{playThink(3)}}>3</button>
                <button className={buttonClass} onClick={()=>{playThink(4)}}>4</button>
              </div>
            </div>
          </div>
          <div className="border border-default rounded-lg">
            <div className="font-semibold">Other URLs</div>
            <div className="border-t rounded-lg p-2 flex flex-col gap-2">
              <button className="flex rounded-md bg-blue-400 m-2 p-2" onClick={copyLecternToClipboard}>
                      <IonIconClient name={lecternCopied ? "checkmark" : "people"} className="text-4xl" />
              </button>
              <button className="flex rounded-md bg-blue-400 m-2 p-2" onClick={copySfxToClipboard}>
                      <IonIconClient name={sfxCopied ? "checkmark" : "volume-high"} className="text-4xl" />
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {playerViews}
        </div>
    </div>
  )
}