import React, { useEffect, useState } from 'react'
import axios from './axios'
import "./Row.css"
import ReactPlayer from 'react-player/youtube';
import movieTrailer from 'movie-trailer';
function Row({title, fetchUrl, largPosters}) {
    const [movies, setMovies] = useState([])
    const imageBaseUrl = "https://image.tmdb.org/t/p/original/"
    const [movieUrl, setMovieUrl] = useState("")
    const [show, setShow] = useState(false)
    console.log(show)

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },

    };
    useEffect(() => {
        // get the Movies from API
        const getData = async () => {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            
        }
        getData();  
    }, [fetchUrl])

    const getMovieUrl = async (e) => {
        await movieTrailer(e.target.alt).then((url) => {
            setMovieUrl(url);
            setShow(!show)
        })
        .catch(error => console.log(error))

    }

    return (
        <div className='row'>
            <h2 className='row_title'>{title}</h2>
            <div className="row_posters">
                {movies.map((movie, index) => {
                    return (
                        <img onClick={getMovieUrl} key={index} className={`row_poster ${largPosters ? "big_row_poster" : ""}`} src={largPosters ? imageBaseUrl + movie.poster_path : imageBaseUrl + movie.backdrop_path} alt={movie?.title || movie?.original_title || movie?.name} />
                    )
                })}
            </div>
            {show ? <ReactPlayer opts={opts} controls={true} width={"100%"} url={movieUrl}/> : null }
        </div>
    )
}

export default Row