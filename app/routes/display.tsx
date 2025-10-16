import { useState, useEffect } from "react";
import type { Route } from "./+types/display";
import { animated, useSpring } from "@react-spring/web"
import IonIconClient from "~/modules/ionIconClient";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Match Game Player Display" },
  ];
}

export default function Display({params}: Route.ComponentProps) {

    const [visible, setVisible] = useState(false)
    const [playerName, setPlayerName] = useState("Panelist "+params.playerId)
    const [cardText, setCardText] = useState("...")
    const [triangle, setTriangle] = useState(false)
    const [circle, setCircle] = useState(false)
    const [locked, setLocked] = useState(false)

    const buttonClass = "rounded-md bg-blue-400 p-2 "

    // useSpring updates when `visible` changes if we pass an object that references it
    const props = useSpring({
        opacity: visible ? 1 : 0,
        y: visible ? 56 : -100,
        // optional: smoother animation config
        config: { tension: 170, friction: 26 },
        // only set initial from on mount
        from: { opacity: 0, y: -100 }
    })

  return(
    <div className="flex flex-col w-full h-screen justify-end items-center">
        <div className="h-[100px]"></div>
        <animated.div
            style={{
                opacity: props.opacity,
                transform: props.y.to((y: number) => `translateY(${y}px)`),
            }}
            className="flex w-[880px] h-[480px] bg-blue-300 p-10"
        >
            <div className="flex border-8 border-blue-800 w-full h-full justify-center items-center text-center text-7xl font-hand">
                {cardText}
            </div>
        </animated.div>
        <div className="flex w-[1920px] h-[280px] justify-center items-end">
            <div className="p-8 bg-black">
                <IonIconClient name="triangle" size="large" className={`text-8xl ${triangle ? "text-green-300" : "text-green-800"} `} />
            </div>
            <div className={`text-8xl w-[1080px] h-8/10 flex items-center justify-center ${locked ? "bg-amber-100" : "bg-amber-300"}`}>
                {playerName}
            </div>
            <div className="p-8 bg-black">
                <IonIconClient name="ellipse" size="large" className={`text-8xl ${circle ? "text-red-300" : "text-red-800"}`} />
            </div>
        </div>
        <div className="flex gap-4">
            <button className={buttonClass} onClick={()=>{setVisible(!visible)}}>{visible ? "Hide Card" : "Show Card"}</button>
            <button className={buttonClass} onClick={()=>{setTriangle(!triangle)}}>{triangle ? "Triangle Off" : "Triangle On"}</button>
            <button className={buttonClass} onClick={()=>{setCircle(!circle)}}>{circle ? "Circle Off" : "Circle On"}</button>
            <button className={buttonClass} onClick={()=>{setLocked(!locked)}}>{locked ? "Lock Off" : "Lock On"}</button>
        </div>
    </div>
  )
}