import cricket from '../assets/icons/cricket.png';
import football from '../assets/icons/football.png';
import basketball from '../assets/icons/basketball.png';
import ballSports from '../assets/icons/balls-sports.png';
import tournament from '../assets/icons/countries.png';
import region from '../assets/icons/trophy.png';
import { TGameData, TRegionData, TTournamentData, TSportsData } from '../components/sidebar/types';
import Region from '../components/Region/Region';

type TGroupObject = {
    [key: string]: TSportsData | TRegionData | TTournamentData
}


export const group = (items: any, fn: (next: any) => string) => items.reduce((acc: any, next: any) => {
    const prop = fn(next);
    return {
        ...acc,
        [prop]: acc[prop] ? [...acc[prop], next] : [next],
    };
}, {});

export const sportIcons: any = {
    'Cricket': cricket,
    'Basketball': basketball,
    'Football': football,
    '': ballSports
}

export const updateGame = (prevArray: any, row: any) => {
    const result = prevArray.map((el: any) => {
        if (el._id === row._id) {
            return {
                ...el,
                match_info: row.match_info ? row.match_info : el.match_info,
                markets_count: row.markets_count ? row.markets_count : el.markets_count
            };
        } else {
            return el
        }
    })
    return result;
}

export const deleteGame = (prevArray: any, row: any) => {
    return prevArray.filter((el: any) => el._id !== row._id)
}

export const addGame = (prevArray: any, row: any) => {
    return prevArray.push(row)
}

export const parseIntoTree = (array: TGameData[]) => {
    const groupedData = group(array, (item: any) => item.sport.alias);
    Object.keys(groupedData).map((sport: any) => {
        const groupedByRegion = group(groupedData[sport], (item: any) => item.region.alias);
        Object.keys(groupedByRegion).map((region: any) => {
            const groupedByTournament = group(groupedByRegion[region], (item: any) => item.tournament.alias);
            groupedByRegion[region] = groupedByTournament;
        })
        groupedData[sport] = groupedByRegion;
    })
    return groupedData;
}

export const extractData = (array: TGameData[], key: string) => {
    const resultObj: any = {}
    array.forEach((el: any) => {
        resultObj[el[key].id] = el[key].alias
    })
    return resultObj;
}

export const linkIcons = {
    'region': region,
    'tournament': tournament
}