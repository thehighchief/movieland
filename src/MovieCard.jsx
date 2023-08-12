const MovieCard = ({movie: { Poster, Title, Type, Year}}) => {
    return (
        <div className="moviecard">

            <h1>{Year}</h1>

            <div className="moviecard-img">
                <img src={Poster !== 'N/A' ? Poster : "https://via.placeholder.com/400"} alt="" />
            </div>

            <div className="moviecard-info">
                <span>{Type}</span>
                <p>{Title}</p>
            </div>

        </div>
    );
}
 
export default MovieCard;