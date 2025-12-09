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
    const [triangleImageUrl, setTriangleImageUrl] = useState("MGLogo.webp")
    const [circleImageUrl, setCircleImageUrl] = useState("MGLogo.webp")
    const [triangleAnswer, setTriangleAnswer] = useState("")
    const [circleAnswer, setCircleAnswer] = useState("")

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
        socket.on("requestTwitchPlayers", (triangleName, triangleImageUrl, circleName, circleImageUrl)=>{
            setTriangleName(triangleName)
            setTriangleImageUrl(triangleImageUrl)
            setCircleName(circleName)
            setCircleImageUrl(circleImageUrl)
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
            <PlayerLectern score={triangleScore} iconName="triangle" iconColorOff="text-green-800" iconColorOn="text-green-300" playerName={triangleName} playerImageUrl={triangleImageUrl} playerAnswer={triangleAnswer}/>
            <PlayerLectern score={circleScore} iconName="ellipse" iconColorOff="text-red-800" iconColorOn="text-red-300" playerName={circleName} playerImageUrl={circleImageUrl} playerAnswer={circleAnswer} />
        </div>
    )
}

