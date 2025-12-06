import { useState } from "react";
import type { Route } from "./+types/lectern";
import PlayerLectern from "~/modules/lectern/PlayerLectern";

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

    return(
        <div className="flex gap-6 w-full h-screen justify-center items-end">
            <PlayerLectern score={triangleScore} iconName="triangle" iconColorOff="text-green-800" iconColorOn="text-green-300" playerName={triangleName} playerAnswer={triangleAnswer}/>
            <PlayerLectern score={circleScore} iconName="ellipse" iconColorOff="text-red-800" iconColorOn="text-red-300" playerName={circleName} playerAnswer={circleAnswer} />
        </div>
    )
}

