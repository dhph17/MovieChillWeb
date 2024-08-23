import { useParams } from "react-router-dom"
import { useEffect } from "react"



import './styles.scss'

const MovieList = () => {
    let { movielist } = useParams()


    return (
        <div className="type">{movielist}</div>
    )
}

export default MovieList