import { SyntheticEvent, useState } from "react";
import Game from "../Game/Game";
import tournament from '../../assets/icons/trophy.png'
import { TGameData, TTournamentData } from "../sidebar/types";

type TProps = {
    tournamentTitle: string,
    tournamentData: TGameData[],
}

const Tournament = ({ tournamentTitle, tournamentData }: TProps) => {

    const [open, setOpen] = useState<boolean>(false);
    const toggleOpen = (e: SyntheticEvent) => {
        e.stopPropagation()
        setOpen(!open)
    }
    return (
        <div onClick={toggleOpen} className='expandable-sub-link'>
            <div className="link-title">
                <img className="link-icon" src={tournament} />
                <div>{tournamentTitle}</div>
                {/* <div className='games-count'>{tournamentData.length}</div> */}
            </div>
            {open && (
                <>
                    <div className='group-title'>games:</div>
                    <div>
                        {
                            tournamentData.map((el: TGameData) => <Game key={el._id} gameData={el} />)
                        }
                    </div>
                </>
            )}
        </div>
    )
}

export default Tournament;