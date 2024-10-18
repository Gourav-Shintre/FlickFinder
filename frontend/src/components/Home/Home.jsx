import { useEffect, useState } from "react";
import fetchMovies from "../../service/Movies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favouriteMovies, setFavouriteMovies] = useState(new Set());

  const navigate = useNavigate()
  const {id}=useParams()

  useEffect(() => {
    const getRandomMovies = async () => {
      try {
     
        const data = await fetchMovies();
        
          setMovies(data);
          const storedFavourites = JSON.parse(localStorage.getItem("favouriteMovies")) || [];
          setFavouriteMovies(new Set(storedFavourites.map(movie => movie.imdbID)));
        
      } catch (error) {
        console.error("Failed to fetch random movies:", error);
      } finally {
        setLoading(false);
      }
    };

    getRandomMovies();
  }, []);

  const handleFavouriteClick = (movie) => {
    const newFavourites = new Set(favouriteMovies); // Copy the current favourites

    if (newFavourites.has(movie.imdbID)) {
      // Remove movie from favourites
      newFavourites.delete(movie.imdbID);
    } else {
      // Add movie to favourites
      newFavourites.add(movie.imdbID);
    }

    setFavouriteMovies(newFavourites);

    // Update localStorage
    const updatedFavouriteMovies = movies.filter(m => newFavourites.has(m.imdbID));
    localStorage.setItem("favouriteMovies", JSON.stringify(updatedFavouriteMovies));
  };

  if (loading) {
    return <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
    <svg className="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
      width="24" height="24">
      <path
        d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
        stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
      <path
        d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
        stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900">
      </path>
    </svg>
  </div>
  }
  const handleViewMore =(movieId)=>{
    navigate(`/detailedView/${movieId}`)

  }

  return (
    <>
      <div className="flex flex-wrap justify-center max-w-6xl w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto my-4">
        {movies.map((movie, index) => (
          <div
            key={movie.imdbID}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 min-h-[500px]"
          >
            <div
              className="relative transform hover:-translate-y-2 transition ease-in-out duration-500 shadow-lg hover:shadow-2xl movie-item text-white movie-card"
              data-movie-id={movie.imdbID}
            >
              {/* Background overlay */}
              <div className="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent"></div>

              {/* Movie Information */}
              <div className="relative group z-10 px-10 pt-10 space-y-6 movie_info">
                <div className="poster__info align-self-end w-full">
                  <div className="h-32"></div>
                  <div className="space-y-6 detail_info">
                    <div className="flex flex-col space-y-2 inner">

                      {/* Heart Icon - Toggle Favourite */}
                      <a className={`relative flex items-center w-min flex-shrink-0 p-1 text-center text-white rounded-full group ${favouriteMovies.has(movie.imdbID) ? "text-red-700" : "text-white"}`} onClick={() => handleFavouriteClick(movie)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-10 h-10 transition-colors duration-300 ease-in-out cursor-pointer ${favouriteMovies.has(movie.imdbID) ? "fill-red-700" : "hover:fill-red-700"}`} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>

                        {/* Show "Added to Favourite" when clicked */}
                        {favouriteMovies.has(movie.imdbID) && (
                          <div className="absolute transition-opacity duration-500 ease-in-out text-xl font-bold text-white pr-2 ml-14">
                            Favourite
                          </div>
                        )}
                      </a>

                      <h3 className="text-2xl font-bold text-white">
                        {movie.Title}
                      </h3>

                      {/* Movie Plot - Truncate as per the index */}
                      {movie.Plot
                        ? index === 1 // Check if it's the second card (index 1)
                          ? movie.Plot.length > 100
                            ? `${movie.Plot.substring(0, 150)}...`
                            : movie.Plot
                          : movie.Plot.length > 15
                          ? `${movie.Plot.substring(0, 70)}...`
                          : movie.Plot
                        : "No plot available"}

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

              {/* View More Button */}
              <div className="poster__footer flex flex-row relative pb-10 space-x-4 z-10">
                <h1
                  className="flex items-center py-2 px-4 rounded-full mx-auto text-white bg-red-500 hover:bg-red-700 cursor-pointer"
                  onClick={() => handleViewMore(movie.imdbID)}
                >
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
                  <div className="text-sm text-white ml-2">View more</div>
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
