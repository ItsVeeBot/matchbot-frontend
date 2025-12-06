import PlayerView from "~/modules/host/PlayerView";
import type { Route } from "./+types/host";
import { socket } from "~/socket"
import { useEffect } from "react";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Match Game Host View" },
  ];
}

export default function Host() {

  useEffect(()=>{
    socket.emit("subscribe", "all")
  }, [])

  return(
    <div className="flex flex-col text-center">
        <div className="">
          Player Selector (Triangle vs Circle)
          Twitch Integration Controls
          Think Music Controls
        </div>
        <div className="grid grid-cols-3 gap-4">
          <PlayerView playerId="1" socket={socket} />
          <PlayerView playerId="2" socket={socket} />
          <PlayerView playerId="3" socket={socket} />
          <PlayerView playerId="4" socket={socket}/>
          <PlayerView playerId="5" socket={socket}/>
          <PlayerView playerId="6" socket={socket} />
        </div>
    </div>
  )
}