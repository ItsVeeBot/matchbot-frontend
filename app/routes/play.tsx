import { useState, type ChangeEvent} from "react";
import type { Route } from "./+types/play";
import IonIconClient from "~/modules/ionIconClient";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Match Game Player View" },
  ];
}

export default function Play({params}: Route.ComponentProps) {
    const [cardValue, setCardValue] = useState("")
    const [cardLocked, setCardLocked] = useState(false)

    const handleCardUpdate = (event: ChangeEvent<HTMLDivElement>) => {
        setCardValue(event.currentTarget.innerText)
    }

    const buttonClass = "rounded-md bg-blue-400 p-2 "
  return(
    <div className="flex flex-col items-center align-middle">
        <div className="flex items-center">
            {cardLocked && <IonIconClient name="lock-closed" size="large" className="text-5xl" />}
            <div className="flex w-[880px] h-[480px] bg-blue-300 p-10">
                <div className="flex border-8 border-blue-800 w-full h-full justify-center items-center text-center text-7xl font-hand">
                    <div
                        contentEditable={!cardLocked}
                        onInput={handleCardUpdate}
                        className="flex h-full w-full text-center whitespace-normal align-middle justify-center items-center text-wrap"
                    />
                    
                </div>
            </div>
            {cardLocked && <IonIconClient name="lock-closed" size="large" className="text-5xl" />}
        </div>
        <button className={buttonClass} onClick={()=>{setCardLocked(!cardLocked)}}>{cardLocked ? "Unlock Card" : "Lock Card"}</button>
        {cardLocked && <button className={buttonClass} onClick={()=>{}}>Reveal card</button>}
    </div>
  )
}