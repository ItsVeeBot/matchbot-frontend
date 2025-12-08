import { useEffect, useState } from "react";
import type { Route } from "./+types/lectern";
import PlayerLectern from "~/modules/lectern/PlayerLectern";
import { socket } from "~/socket"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Match Game Lectern View" },
  ];
}

export default function Lectern(){
    const [triangleScore, setTriangleScore] = useState(0)
    const [circleScore, setCircleScore] = useState(0)
    const [triangleName, setTriangleName] = useState("Triangle")
    const [circleName, setCircleName] = useState("Circle")
    const [triangleAnswer, setTriangleAnswer] = useState("Triangle Answer Text")
    const [circleAnswer, setCircleAnswer] = useState("Circle Answer Text")

    useEffect(()=>{
        socket.emit("subscribe", "lectern")

        const handleAdd = (player: string) => {
            if (player === "triangle") {
                setTriangleScore(prev => prev + 1)
            } else {
                setCircleScore(prev => prev + 1)
            }
        }

        const handleSub = (player: string) => {
            if (player === "triangle") {
                setTriangleScore(prev => prev - 1)
            } else {
                setCircleScore(prev => prev - 1)
            }
        }

        const handleReset = (player: string) => {
            if (player === "triangle") {
                setTriangleScore(0)
            } else {
                setCircleScore(0)
            }
        }

        socket.on("addScore", handleAdd)
        socket.on("subScore", handleSub)
        socket.on("resetScore", handleReset)
        socket.on("answer", (userShape, msg)=>{
            if(userShape === "triangle"){
                setTriangleAnswer(msg)
            }
            else{
                setCircleAnswer(msg)
            }
        })
        socket.on("requestTwitchPlayers", (triangleName, circleName)=>{
            setTriangleName(triangleName)
            setCircleName(circleName)
        })

        return ()=>{
            socket.off("addScore", handleAdd)
            socket.off("subScore", handleSub)
            socket.off("resetScore", handleReset)
            socket.off("answer")
            socket.off("requestTwitchPlayers")
        }
    }, [])

    return(
        <div className="flex gap-6 w-full h-screen justify-center items-end">
            <PlayerLectern score={triangleScore} iconName="triangle" iconColorOff="text-green-800" iconColorOn="text-green-300" playerName={triangleName} playerAnswer={triangleAnswer}/>
            <PlayerLectern score={circleScore} iconName="ellipse" iconColorOff="text-red-800" iconColorOn="text-red-300" playerName={circleName} playerAnswer={circleAnswer} />
        </div>
    )
}

