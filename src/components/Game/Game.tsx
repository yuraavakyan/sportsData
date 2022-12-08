import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TGameData } from "../Sidebar/types";
type TProps = {
    gameData: TGameData,
}

const Game = ({ gameData }: TProps) => {
    const { home, away, match_info, markets_count, _id } = gameData;
    const navigate = useNavigate()

    const [scoreChanged, setScoreChanged] = useState(false)
    const [marketsCountChanged, setMarketsCountChanged] = useState(false)

    useEffect(() => {
        setScoreChanged(true);
        setTimeout(() => setScoreChanged(false), 1000)
    }, [match_info])

    useEffect(() => {
        setMarketsCountChanged(true);
        setTimeout(() => setMarketsCountChanged(false), 1000)
    }, [markets_count])

    const handleGameClick = (e: SyntheticEvent) => {
        e.stopPropagation();
        navigate(`/games/${_id}`)
    }
    return (
        <div className="expandable-sub-link">
            <div className="game">
                <div onClick={handleGameClick}>{`${home.alias} vs ${away.alias} `}<span className={scoreChanged ? 'score' : ''}>{match_info.score}</span></div>
                {match_info.time && <div className="group-title">time: {match_info.time}</div>}
            </div>
            <div className="group-title">markets count: <span className={marketsCountChanged ? 'markets-count' : ''}>{markets_count}</span></div>
        </div>
    )
}

export default Game;