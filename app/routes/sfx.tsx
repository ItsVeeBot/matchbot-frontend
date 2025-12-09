import type { Route } from "./+types/sfx"
import { Howl } from "howler"
import { useEffect } from "react";
import { socket } from "~/socket"


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Match Game SFX View" },
  ];
}

export default function Sfx(){

    const dingSound = new Howl({src:"/matchding.wav"})
    const buzzSound = new Howl({src:"/matchbuzz.wav"})

    const thinkSounds = [
        new Howl({src:"/Think1.mp3", loop:true}),
        new Howl({src:"/Think2.mp3", loop:true}),
        new Howl({src:"/Think3.mp3", loop:true}),
        new Howl({src:"/Think4.mp3", loop:true})
    ]

    useEffect(()=>{
        socket.emit("subscribe", "sfx")
        socket.on("playSound", (sound: string, think: number)=>{
            if(sound==="ding"){
                dingSound.play()
            }
            else if(sound==="buzz"){
                buzzSound.play()
            }
            else if(sound==="random"){
                //Choose a random thinkSound and play it.
                console.log("Random think music GO")
                thinkSounds[Math.floor(Math.random()*thinkSounds.length)].play()
            }
            else if(sound==="think"){
                console.log("Think music #", think)
                thinkSounds[think-1].play()
            }
        })
        socket.on("stopSounds", ()=>{
            thinkSounds.forEach(element => {
                if(element.playing()){
                    element.once("fade", ()=>{
                        element.stop()
                        element.volume(1)
                    })
                    element.fade(1.0, 0.0, 1000)
                }
            });
        })

        return()=>{
            socket.off("playSound")
            socket.off("stopSounds")
        }
    }, [])

    return(
        <>
            click on this page to start sounds lmao
        </>
    )
}