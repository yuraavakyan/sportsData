import React, { SyntheticEvent, useState } from 'react'
import { group } from '../../utils/helpers'
import Tournament from '../Tournament/Tournament'
import region from '../../assets/icons/countries.png';
import { TRegionData, TSportsData, TTournamentData } from '../Sidebar/types';

type TProps = {
    regionTitle: string,
    regionData: TTournamentData,
}

const Region = ({ regionTitle, regionData }: TProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const toggleOpen = (e: SyntheticEvent) => {
        e.stopPropagation()
        setOpen(!open)
    }
    return (
        <div onClick={toggleOpen} className='expandable-sub-link'>
            <div className='link-title'>
                <img className='link-icon' src={region} />
                <div>{regionTitle}</div>
            </div>
            {open && (
                <>
                    <div className='group-title'>tournaments:</div>
                    <div>
                        {
                            Object.keys(regionData).map((el: string) => (
                                regionData[el] && (
                                    <Tournament
                                        key={el}
                                        tournamentTitle={el}
                                        tournamentData={regionData[el]}
                                    />
                                )
                            ))
                        }
                    </div>
                </>
            )}
        </div>
    )
}

export default Region