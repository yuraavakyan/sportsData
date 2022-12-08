export type TTeam = {
    abbreviation: string,
    alias: string,
    country: string,
    country_code: string,
    gender: string,
    id: string,
    image: {
        big: string,
        medium: string,
        small: string,
        time: number,
    },
    name: string,
    manager: string,
    short_name: string
}

export type TSportRegionTournament = {
    alias: string,
    id: string,
    name: string,
    order: number,
}

export type TMatchInfo = {
    score?: string,
    scores?: {
        score: string,
        period: number,
        type: string
    }[],
    time?: string,
    server?: string,
}

export type TGameData = {
    away: TTeam,
    date: {
        start?: number,
        start_day?: number,
        start_hour?: number,
        start_pretty?: Date,
    }
    home: TTeam,
    markets_count: number,
    match_info: TMatchInfo,
    region: TSportRegionTournament,
    sport: TSportRegionTournament,
    tournament: TSportRegionTournament,
    _id: string,
    status: {
        alias?: string,
        id?: string,
        name?: string,
        origin_id?: string,
        short_name?: string,
    }
}

export type TTournamentData = {
    [key: string]: TGameData[]
}

export type TRegionData = {
    [key: string]: TTournamentData
}

export type TSportsData = {
    [key: string]: TRegionData
}

export type TSportsRegionsTournaments = {
    [key: string]: string,
}
//TODO weird behavior
export type TUpdateSportRegionTournament = {
    [key: string]: string
}

export type TUpdateGameInfo = {
    _new?: boolean,
    _remove?: boolean,
    match_info?: TMatchInfo,
    sport: TUpdateSportRegionTournament,
    region: TUpdateSportRegionTournament,
    tournament: TUpdateSportRegionTournament,
    _id: string,
    markets_count?: number,
}

export type TInitialData = {
    sid: string,
    data: TGameData[]
}
