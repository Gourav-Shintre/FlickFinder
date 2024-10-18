import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FavouriteMovies() {
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavourites = JSON.parse(localStorage.getItem("favouriteMovies")) || [];
    setFavouriteMovies(storedFavourites);
  }, []);

  const handleViewMore = (movieId) => {
    navigate(`/detailedView/${movieId}`);
  };

  const handleRemove = (movieId) => {
    const updatedFavourites = favouriteMovies.filter(movie => movie.imdbID !== movieId);
    setFavouriteMovies(updatedFavourites);
    localStorage.setItem("favouriteMovies", JSON.stringify(updatedFavourites));
  };

  if (favouriteMovies.length === 0) {
    return <div className="text-6xl flex justify-center min-h-96 items-center font-mono">No favourite movies added yet.</div>;
  }

  return (
    <div className="flex flex-wrap justify-center max-w-6xl w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto my-4">
      {favouriteMovies.map((movie, index) => (
        <div
          key={movie.imdbID}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 min-h-[500px]"
        >
          <div
            className="relative transform hover:-translate-y-2 transition ease-in-out duration-500 shadow-lg hover:shadow-2xl movie-item text-white movie-card"
            data-movie-id={movie.imdbID}
          >
        
            <button
  className="absolute top-2 right-2 text-red-900 font-extrabold rounded-full p-3 hover:bg-red-600 focus:outline-none  transition-all duration-200 ease-in-out"
  onClick={() => handleRemove(movie.imdbID)}
  aria-label="Remove from favorites"
  style={{ zIndex: 20 }} 
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={3} 
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
</button>


        
            <div className="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent"></div>

          
            <div className="relative group z-10 px-10 pt-10 space-y-6 movie_info">
              <div className="poster__info align-self-end w-full">
                <div className="h-32"></div>
                <div className="space-y-6 detail_info">
                  <div className="flex flex-col space-y-2 inner">
                    <h3 className="text-2xl font-bold text-white">
                      {movie.Title}
                    </h3>

                  
                    {movie.Plot
                      ? index === 1 
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
  );
}

export default FavouriteMovies;
