import  { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false); // State for marking favorite
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?i=${id}&apikey=583b73fe`
        );
        setMovie(response.data);

      
        const storedFavourites = JSON.parse(localStorage.getItem("favouriteMovies")) || [];
        const isFav = storedFavourites.some(favMovie => favMovie.imdbID === id);
        setIsFavourite(isFav);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return (
      <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
        <svg
          className="text-gray-300 animate-spin"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
        >
          {/* Spinner SVG */}
        </svg>
      </div>
    );
  }

  const handleFavouriteClick = () => {
    const storedFavourites = JSON.parse(localStorage.getItem("favouriteMovies")) || [];

    if (isFavourite) {
   
      const updatedFavourites = storedFavourites.filter(favMovie => favMovie.imdbID !== movie.imdbID);
      localStorage.setItem("favouriteMovies", JSON.stringify(updatedFavourites));
      setIsFavourite(false);
    } else {
    
      storedFavourites.push(movie);
      localStorage.setItem("favouriteMovies", JSON.stringify(storedFavourites));
      setIsFavourite(true);
    }
  };

  const handleViewMore = (movieId) => {
    navigate(`/detailedView/${movieId}`);
  };

  return (
    <div className="flex flex-wrap justify-center max-w-6xl w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto my-4">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 min-h-[500px]">
        <div
          className="relative transform hover:-translate-y-2 transition ease-in-out duration-500 shadow-lg hover:shadow-2xl movie-item text-white movie-card"
          data-movie-id={movie.imdbID}
        >
       
          <div className="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent"></div>

     
          <div className="relative cursor-pointer group z-10 px-10 pt-10 space-y-6 movie_info">
            <div className="poster__info align-self-end w-full">
              <div className="h-32"></div>
              <div className="space-y-6 detail_info">
                <div className="flex flex-col space-y-2 inner">
                  <a
                    className={`relative flex items-center w-min flex-shrink-0 p-1 text-center text-white rounded-full group ${
                      isFavourite ? "text-red-700" : "text-white"
                    }`}
                    onClick={handleFavouriteClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-10 h-10 transition-colors duration-300 ease-in-out ${
                        isFavourite ? "fill-red-700" : "hover:fill-red-700"
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      />
                    </svg>
                 
                    {isFavourite && (
                      <div className="absolute transition-opacity duration-500 ease-in-out text-xl font-bold text-white pr-2 ml-14">
                        Favourite
                      </div>
                    )}
                  </a>
                  <h3 className="text-2xl font-bold text-white">
                    {movie.Title}
                  </h3>
                </div>

                <div className="flex flex-row justify-between datos flex justify-between">
                  <div className="flex flex-col datos_col">
                    <div className="popularity">
                      {movie.imdbRating || "N/A"}
                    </div>
                    <div className="text-sm text-gray-400">Ratings:</div>
                  </div>
                  <div className="flex flex-col datos_col">
                    <div className="release">{movie.Runtime || "N/A"}</div>
                    <div className="text-sm text-gray-400">Runtime:</div>
                  </div>
                </div>

                <div className="flex flex-col overview">
                  <div className="text-xs text-gray-400 mb-2">Genre:</div>
                  <p className="text-xs text-gray-100 mb-6">
                    {movie.Genre || "No overview available"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Movie Poster */}
          <img
            className="absolute inset-0 transform w-full -translate-y-4"
            src={movie.Poster}
            alt={movie.Title}
            style={{
              filter: "grayscale(0)",
              objectFit: "cover",
              maxHeight: "500px",
              width: "100%",
            }}
          />

          <div className="poster__footer flex flex-row relative pb-10 space-x-4 z-10">
            <h1 className="flex items-center py-2 px-4 rounded-full mx-auto text-white bg-red-500 hover:bg-red-700 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
              <div className="text-sm text-white ml-2" onClick={() => handleViewMore(movie.imdbID)}>
                View more
              </div>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
