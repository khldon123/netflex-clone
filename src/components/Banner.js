import React, { useEffect, useState } from 'react'
import axios from './axios'
import "./banner.css"
function Banner({fetchUrl}) {

    const [movie, setMovie] = useState([])
    const imageBaseUrl = "https://image.tmdb.org/t/p/original"
    useEffect(() => {
        // get movie from APi
        const getData = async () => {
            const request= await axios.get(fetchUrl)
            setMovie(request.data.results[Math.floor(Math.random()*request.data.results.length - 1)])
        }
        getData();
        return () => {};
        console.log("here is the banner");
    }, [fetchUrl])



    // put "..."  when the overview is longer than 180 letters
    const truncate = (input) => {
        if (input.length > 180) {
            return input.substring(0, 180) + '...';
        }
        return input;
    };
    return (
        <div className='banner'
            style={{
                backgroundImage:`linear-gradient(180deg,transparent, rgba(37,37,37,0.61), #111), url("${imageBaseUrl}${movie?.poster_path}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                height:"500px",

            }}
        >
            <div className="banner_content">
                <h1 className="banner_content_title">
                    {movie?.name || movie?.title || movie.original_name}
                </h1>
                <div className="banner_content_btns">
                    <button className='banner_content_btns_play btn'>play</button>
                    <button className='banner_content_btns_pause btn'>My List</button>
                </div>
                <p className='banner_content_des'>{truncate(`${movie?.overview}`)}</p>
            </div>
        </div>
    )
}

export default Banner