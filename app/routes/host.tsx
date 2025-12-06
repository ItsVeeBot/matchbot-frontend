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
  
  useEffect(()=>{
    socket.emit("subscribe", "all")
  }, [])
  
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
            </div>
          </div>
          <div className="border border-default rounded-lg">
            <div className="font-semibold">Twitch Integration Controls</div>
            <div className="border-t rounded-lg p-2 flex flex-col gap-2">
              <div className="flex gap-2">
                <button className={buttonClass}>Connect Twitch</button>
                <button className={buttonClass}>Clear Signups</button>
              </div>
              <div className="flex gap-2">
                <button className={buttonClass}>Open Signups</button>
                <button className={buttonClass}>Close Signups</button>
              </div>
              <div className="flex gap-2">
                <button className={buttonClass}>Select Players</button>
              </div>
            </div>
          </div>
          <div className="border border-default rounded-lg">
            <div className="font-semibold">Think Music Controls</div>
            <div className="border-t rounded-lg p-2 flex flex-col gap-2">
              <button className={buttonClass}>Stop</button>
              <button className={buttonClass}>Random</button>
              <div className="flex gap-2">
                <button className={buttonClass}>1</button>
                <button className={buttonClass}>2</button>
                <button className={buttonClass}>3</button>
                <button className={buttonClass}>4</button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {playerViews}
        </div>
    </div>
  )
}