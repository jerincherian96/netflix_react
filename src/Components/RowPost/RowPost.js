import React,{useEffect,useState} from 'react'
import {imageUrl,API_KEY} from '../../constants/constants'
import './RowPost.css'
import Youtube from 'react-youtube'
import axios from '../../axios'
function RowPost(props) {
    const [movies, setMovies] = useState([])
    const [urlid,setUrlid] = useState('')
    useEffect(() => {
      axios.get(props.url).then((response)=>{
          setMovies(response.data.results)
      })
      
    }, [])
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    };
    const handleMovie=(id)=>{
       axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
         if(response.data.results.length!==0){
            setUrlid(response.data.results[0])
         }
       })
    }
  return (
    <div className='row'>
         <h2>{props.title}</h2>
            <div className='posters'>
               {movies.map((obj)=>
                 <img onClick={()=>handleMovie(obj.id)} className={props.isSmall?'smallPoster':'poster'} alt='poster' src={`${imageUrl+obj.backdrop_path}`} />

               )}
            </div>
           {urlid &&  <Youtube opts={opts} videoId={urlid.key}/>}
    </div>
  )
}

export default RowPost