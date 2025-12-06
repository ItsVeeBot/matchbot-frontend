import { useEffect, useState, type ChangeEvent} from "react";
import type { Route } from "./+types/play";
import IonIconClient from "~/modules/IonIconClient";
import { socket } from "~/socket"


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Match Game Player View" },
  ];
}



export default function Play({params}: Route.ComponentProps) {

    if(params.playerId.toLowerCase()==="all"){
        return(
        <>
            no.
        </>
        )
    }

    const [cardValue, setCardValue] = useState("")
    const [cardLocked, setCardLocked] = useState(false)
    const [cardVisible, setCardVisible] = useState(false)


    // Listen for when the server unlocks me.
    useEffect(()=>{
        socket.emit("subscribe", params.playerId)
        socket.on("setLocked", (_, state)=>{
            setCardLocked(state)
            setCardVisible(false)
        })

        return()=>{
            socket.off("setLocked")
        }
    }, [])

    // When card is locked, send the text to the server.
    useEffect(()=>{
        if(cardLocked){
            socket.emit("submit", params.playerId, cardValue)
        }
        socket.emit("setLocked", params.playerId, cardLocked)
    }, [cardLocked])
    
    // When card visibility is toggled, send the state to the server.
    useEffect(()=>{
        socket.emit("setVisible", params.playerId, cardVisible)
    }, [cardVisible])

    const handleCardUpdate = (event: ChangeEvent<HTMLDivElement>) => {
        setCardValue(event.currentTarget.innerText)
    }

    const buttonClass = "rounded-md bg-blue-400 p-2 "

    function DisplayWidgets() {
    return(
        <div className="flex flex-col p-8">
            {cardLocked && <IonIconClient name="lock-closed" size="large" className="text-5xl" />}
            {cardVisible && <IonIconClient name="eye" size="large" className="text-5xl" />}
        </div>
    )
    }
  return(
    <div className="flex flex-col items-center align-middle">
        <div className="flex items-center">
            <DisplayWidgets />
            <div className="flex w-[880px] h-[480px] bg-blue-300 p-10">
                <div className="flex border-8 border-blue-800 w-full h-full justify-center items-center text-center text-7xl font-hand">
                    <div
                        contentEditable={!cardLocked}
                        onInput={handleCardUpdate}
                        className="flex h-full w-full text-center whitespace-normal align-middle justify-center items-center text-wrap"
                    />
                    
                </div>
            </div>
            <DisplayWidgets />
        </div>
        <button className={buttonClass} onClick={()=>{setCardLocked(!cardLocked)}}>{cardLocked ? "Unlock Card" : "Lock Card"}</button>
        {cardLocked && <button className={buttonClass} onClick={()=>{setCardVisible(!cardVisible)}}>{cardVisible ? "Hide Card" : "Show Card"}</button>}
    </div>
  )
}