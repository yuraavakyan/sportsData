import { useState } from "react";
import { extractData, parseIntoTree } from "../../utils/helpers";
import { dataToFetchGames, dataToSend, pingData } from "../../utils/requestData";
import Sport from "../Sport/Sport";
import './sidebar.css'
import { TGameData, TInitialData, TSportsData, TSportsRegionsTournaments, TUpdateGameInfo } from "./types";

const serverUrl = 'wss://mob.blue-version.com/hub/ws-sport';

let socket = new WebSocket(serverUrl);

const Sidebar = () => {
    const [sportsData, setSportsData] = useState<TSportsData>({})
    const [sports, setSports] = useState<TSportsRegionsTournaments>({})
    const [regions, setRegions] = useState<TSportsRegionsTournaments>({})
    const [tournaments, setTournaments] = useState<TSportsRegionsTournaments>({})
    const [initialRid] = useState<String>(dataToFetchGames.rid)
    const [subscribeId, setSubscribeId] = useState<String>('')
    let pingpongInterval: any;

    const handleDataUpdate = (data: TUpdateGameInfo & TGameData) => {
        const { _new, _remove, _id, sport, region, tournament, match_info, markets_count } = data;
        const sportKey: string = sports[sport.id];
        const regionKey: string = regions[region.id];
        const tournamentKey: string = tournaments[tournament.id];
        const updatedSportsData: TSportsData = { ...sportsData };
        const gameIndexToUpdate: number = updatedSportsData[sportKey][regionKey][tournamentKey]?.findIndex((el: TGameData) => el._id === _id)
        if (_remove) {
            console.log('remove', data)
            updatedSportsData?.[sportKey]?.[regionKey]?.[tournamentKey].splice(gameIndexToUpdate, 1);
            if (!updatedSportsData?.[sportKey]?.[regionKey]?.[tournamentKey].length) {
                delete updatedSportsData?.[sportKey]?.[regionKey]?.[tournamentKey];
                if (!updatedSportsData?.[sportKey]?.[regionKey].length) {
                    delete updatedSportsData?.[sportKey]?.[regionKey];
                    if (!updatedSportsData?.[sportKey].length) {
                        delete updatedSportsData[sportKey];
                    }
                }
            }
        }
        if (_new) {
            console.log('new', data)
            setSports({ ...sports, [sport.id]: sport.alias });
            setRegions({ ...regions, [region.id]: region.alias });
            setTournaments({ ...tournaments, [tournament.id]: tournament.alias });
            const sportKey: string = sports[sport.id];
            const regionKey: string = regions[region.id];
            const tournamentKey: string = tournaments[tournament.id];
            if (sportKey && regionKey && tournamentKey) {
                updatedSportsData[sportKey][regionKey][tournamentKey].push(data);
            }
            else {
                updatedSportsData[sportKey][regionKey][tournamentKey] = [data];
            }
        }
        else {
            if (match_info) {
                updatedSportsData[sportKey][regionKey][tournamentKey][gameIndexToUpdate].match_info =
                    { ...updatedSportsData[sportKey][regionKey][tournamentKey][gameIndexToUpdate].match_info, ...match_info };
            }
            if (markets_count) {
                updatedSportsData[sportKey][regionKey][tournamentKey][gameIndexToUpdate].markets_count = markets_count;
            }
        }
        setSportsData(updatedSportsData)
    }

    const handleInitialDataFetch = (response: TInitialData) => {
        const { sid, data } = response
        if (data) {
            const parsedData = parseIntoTree(data)
            setSports(extractData(data, 'sport'));
            setRegions(extractData(data, 'region'));
            setTournaments(extractData(data, 'tournament'));
            setSportsData(parsedData);
            setSubscribeId(sid)
        }
    }

    socket.onopen = () => {
        socket.send(JSON.stringify(dataToSend));
    };

    socket.onclose = () => {
        clearInterval(pingpongInterval)
    }

    socket.onmessage = ((e) => {
        const responseData = JSON.parse(e.data)
        if (responseData.data.session) {
            pingpongInterval = setInterval(() => {
                socket.send(JSON.stringify(pingData))
            }, 10000)
            socket.send(JSON.stringify(dataToFetchGames))
        }
        if (responseData.rid === initialRid) handleInitialDataFetch(responseData.data)
        if (responseData.rid === subscribeId) handleDataUpdate(responseData.data[0])
    })

    return (
        <div className="sidebar">
            {(Object.keys(sportsData)).map((el: string) => (
                <Sport
                    key={el}
                    sportTitle={el}
                    sportData={sportsData[el]}
                />
            ))}
        </div>
    );
}

export default Sidebar;