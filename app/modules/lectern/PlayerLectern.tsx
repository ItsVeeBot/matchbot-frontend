import IonIconClient from "../IonIconClient"

interface PlayerLecternProps{
    score: number,
    iconName: string,
    iconColorOff: string,
    iconColorOn: string,
    playerName: string,
    playerAnswer: string
}

export default function PlayerLectern(props: PlayerLecternProps){

    const lecternSymbols = []
    for(let i=1; i<=6; i++){
        lecternSymbols.push(<IonIconClient key={props.iconName+i} name={props.iconName} size="large" className={`text-2xl ${props.score>=i ? props.iconColorOn : props.iconColorOff}`} />)
    }

    return(
        <div className="flex flex-col items-center">
            {props.playerAnswer &&
                    <div className="bg-amber-200 speech-bubble text-xl">
                        {props.playerAnswer}
                    </div>
            }
            <div>
                {props.playerName}
            </div>
            <div className="justify-center">
                <div className="bg-black w-fit">
                    {lecternSymbols}
                </div>
            </div>
            <div className="bg-amber-400 h-2 w-[calc(100%+1rem)] drop-shadow-lg" />
            <div className="bg-amber-300 p-6 drop-shadow-lg">
                <div className="bg-blue-400 rounded-4xl p-0 px-6 pb-4 grid place-items-center">
                    <IonIconClient name={props.iconName} size="large" className="-m-6 col-start-1 row-start-1 text-9xl text-amber-300" />
                    <IonIconClient name={props.iconName} size="large" className={`col-start-1 row-start-1 text-8xl ${props.iconColorOff}`} />
                    <div className="col-start-1 row-start-1 text-8xl text-white font-egg pl-2 pt-2">
                        {props.score}
                    </div>
                </div>
            </div>
            <div className="bg-amber-400 h-6 w-[calc(100%-2rem)]" />
        </div>
    )
}