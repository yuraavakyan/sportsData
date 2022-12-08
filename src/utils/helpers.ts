import cricket from '../assets/icons/cricket.png';
import football from '../assets/icons/football.png';
import basketball from '../assets/icons/basketball.png';
import ballSports from '../assets/icons/balls-sports.png';
import tournament from '../assets/icons/countries.png';
import region from '../assets/icons/trophy.png';
import { TGameData, TSportsRegionsTournaments } from '../components/Sidebar/types';

export const group = (items: TGameData[], fn: (next: TGameData) => string) => items.reduce((acc: any, next: TGameData) => {
    const prop = fn(next);
    return {
        ...acc,
        [prop]: acc[prop] ? [...acc[prop], next] : [next],
    };
}, {});

export const sportIcons: { [key: string]: string } = {
    'Cricket': cricket,
    'Basketball': basketball,
    'Football': football,
    '': ballSports
}

export const parseIntoTree = (array: TGameData[]) => {
    const groupedData = group(array, (item: TGameData) => item.sport.alias);
    Object.keys(groupedData).map((sport: string) => {
        const groupedByRegion = group(groupedData[sport], (item: TGameData) => item.region.alias);
        Object.keys(groupedByRegion).map((region: string) => {
            const groupedByTournament = group(groupedByRegion[region], (item: TGameData) => item.tournament.alias);
            groupedByRegion[region] = groupedByTournament;
        })
        groupedData[sport] = groupedByRegion;
    })
    return groupedData;
}

export const extractData = (array: TGameData[], key: string) => {
    const resultObj: TSportsRegionsTournaments = {}
    array.forEach((el: any) => {
        resultObj[el[key].id] = el[key].alias
    })
    return resultObj;
}

export const linkIcons: { [key: string]: string } = {
    'region': region,
    'tournament': tournament
}