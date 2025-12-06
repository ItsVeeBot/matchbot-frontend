import { useEffect, useState, type ChangeEvent, type SetStateAction } from "react"
import type { Socket } from "socket.io-client"
import IonIconClient from "~/modules/IonIconClient"

interface PlayerViewProps{
    playerId: string,
    socket: Socket
}

export default function PlayerView(props: PlayerViewProps){

    const [visible, setVisible] = useState(false)
    const [triangle, setTriangle] = useState(false)
    const [circle, setCircle] = useState(false)
    const [locked, setLocked] = useState(false)
    const [playerName, setPlayerName] = useState("Panelist " + props.playerId)
    const [cardText, setCardText] = useState("...")


    const handleSetPlayerName = (event: ChangeEvent<HTMLInputElement>) =>{
        setPlayerName(event.target.value)
    }

    const sendName = () => {
        props.socket.emit("setName", props.playerId, playerName)
    }

    useEffect(()=>{
        props.socket.on("submit", (room, text:string)=>{
            if(room === props.playerId){
                setCardText(text)
            }
        })
        props.socket.on("setTriangle", (room, visibility:boolean)=>{
            if(room === props.playerId){
                setTriangle(visibility)
            }
        })
        props.socket.on("setCircle", (room, visibility:boolean)=>{
            if(room === props.playerId){
                setCircle(visibility)
            }
        })
        props.socket.on("setLocked", (room, visibility:boolean)=>{
            if(room === props.playerId){
                setLocked(visibility)
            }
        })
        props.socket.on("setVisible", (room, visibility:boolean)=>{
            if(room === props.playerId){
                setVisible(visibility)
            }
        })

        return()=>{
            props.socket.off("submit")
            props.socket.off("setName")
            props.socket.off("setTriangle")
            props.socket.off("setCircle")
            props.socket.off("setLocked")
            props.socket.off("setVisible")
        }
    }, [])

    return(
        <div>
            <div className="flex items-center  bg-blue-300 p-2 text-4xl h-[6rem] font-hand">
                <IonIconClient name={visible ? "eye" : "eye-off"} className="text-4xl flex-none" />
                <div className="line-clamp-2 text-ellipsis w-full">
                    {cardText}
                </div>
            </div>
            <div className="flex justify-center">
                <div className="flex p-2 bg-black items-center">
                    <IonIconClient name="triangle" size="medium" className={`text-xl ${triangle ? "text-green-300" : "text-green-800"} `} />
                </div>
                <div className={`text-3xl w-full flex items-center ${locked ? "bg-amber-100" : "bg-amber-300"}`}>
                    {/* {playerName} */}
                    <input type="text" className="text-center w-full h-full" value={playerName} onChange={handleSetPlayerName} />
                    <button className="flex rounded-md bg-blue-400 m-2 p-2" onClick={sendName}>
                        <IonIconClient name="person"  />
                    </button>
                </div>
                <div className="flex p-2 bg-black items-center">
                    <IonIconClient name="ellipse" size="medium" className={`text-xl ${circle ? "text-red-300" : "text-red-800"}`} />
                </div>
            </div>
            <div className="flex justify-center">
                <button className="flex rounded-md bg-green-400 m-2 p-2">
                        <IonIconClient name="checkmark" className="text-4xl" />
                </button>
                <button className="flex rounded-md bg-red-400 m-2 p-2">
                        <IonIconClient name="close" className="text-4xl" />
                </button>
                <button className="flex rounded-md bg-blue-400 m-2 p-2">
                        <IonIconClient name="eye" className="text-4xl" />
                </button>
                <button className="flex rounded-md bg-blue-400 m-2 p-2">
                        <IonIconClient name="tv" className="text-4xl" />
                </button>
                <button className="flex rounded-md bg-blue-400 m-2 p-2">
                        <IonIconClient name="game-controller" className="text-4xl" />
                </button>
            </div>
        </div>
    )
}