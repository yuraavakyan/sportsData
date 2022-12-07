import React, { useState } from 'react'
import { group, sportIcons } from '../../utils/helpers'
import Region from '../Region/Region'
import { TGameData, TRegionData, TSportsData } from '../sidebar/types'

type TProps = {
    sportTitle: string,
    sportData: TRegionData,
}

const Sport = ({ sportTitle, sportData }: TProps) => {

    const [open, setOpen] = useState<boolean>(false);
    const toggleOpen = () => {
        setOpen(!open)
    }

    return (
        <div onClick={toggleOpen} className='expandable-link'>
            <div className='link-title'>
                <img className='link-icon' src={sportIcons[sportTitle]} />
                <div>{sportTitle}</div>
                {/* <div className='games-count'>{sportData.length}</div> */}
            </div>
            {open && (
                <>
                    <div className='group-title'>regions:</div>
                    <div>
                        {Object.keys(sportData).map((el: string) => (
                            <Region
                                key={el}
                                regionTitle={el}
                                regionData={sportData[el]}
                            />
                        ))}
                    </div>
                </>

            )}
        </div>

    )
}

export default Sport