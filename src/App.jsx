import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import searchIcon from "./assets/search.svg"
import loader from "./assets/loader.svg"

const App = () => {
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)


    // this async function id decleared outside the useEffect hook so my searchIcon can be able to call it to make a fetch
    const fetchMovie = async (title) => {

        try {
            const api_url = 'http://www.omdbapi.com/?apikey=a68d0280'

            const res = await fetch(`${api_url}&s=${title}`)
            if(!res.ok) {
                throw Error('Couldnt fetch from resourse, Try Again')
            }
            const data = await res.json()
            console.log(data)

            if (data.Response === "True") {
                setMovies(data.Search);
                setError(null);
                setLoading(false)
            }else{
                // setMovies([])
                throw Error('No movies found');
            }
            
        } catch(err) {
            // console.log(err)
            setError(err.message)
            setLoading(false)
            setMovies([])
        }
        
    }

   

    useEffect(() => {
        // this check is to make sure this hook dosent run when the page opens without any movie name provided
        if(searchTerm.length > 0) {

            fetchMovie(searchTerm)
        }else {
            setLoading(false)
            setError('Please enter movie name ')
        }
    

    },[searchTerm])


    return (
        <div className="app">
            <div className="container">
                <header>
                    <h1>MovieLand</h1>
                </header>

                <div className="app-search">

                    <input 
                        placeholder="search for movie" 
                        onChange={(e)=> {setSearchTerm(e.target.value)}}
                        value={searchTerm}
                        autoFocus
                    />

                    <img 
                        src={searchIcon} 
                        alt="search" 
                        onClick={()=> fetchMovie(searchTerm) }
                    />
                </div>

                <div className="app-moviecard">
                    {loading && <img src={loader}/>}
                    {error && <div className="empty">{error}</div>}
                    <div className="moviecard-container">
                        {movies && movies.map((movie) => (
                            <MovieCard key={movie.imdbID} movie={movie}                                />
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
    );
}
 
export default App;