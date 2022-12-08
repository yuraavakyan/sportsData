import React from 'react'
import { useParams } from 'react-router-dom'

const GamePage = () => {
    const params = useParams();
    return (
        <div>Game: {params.id}</div>
    )
}

export default GamePage