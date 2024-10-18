import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DetailedView() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchFullMovieDetails = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=583b73fe`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchFullMovieDetails();
  }, [id]);

  return (
    <div>
      <h1 className="flex justify-center text-4xl text-slate-700">Detailed View</h1>
      {movie ? (
        <div className="flex flex-wrap justify-center max-w-6xl w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto my-4">
          <div className="w-full sm:w-2/3 md:w-2/3 lg:w-1/2 p-4 min-h-[400px]"> {/* Reduced height and increased width */}
            <div
              className="relative transform hover:-translate-y-2 transition ease-in-out duration-500 shadow-lg hover:shadow-2xl movie-item text-white movie-card"
              data-movie-id={movie.imdbID}
            >
              <div className="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent"></div>
              <div className="relative  group z-10 px-10 pt-10 space-y-6 movie_info">
                <div className="poster__info align-self-end w-full">
                  <div className="space-y-6 detail_info">
                    <div className="flex flex-col space-y-2 inner">
                     
                      <h3 className="text-2xl font-bold text-white">{movie.Title}</h3>
                    </div>

                    <div className="flex flex-row justify-between datos">
                      <div className="flex flex-col datos_col ">
                        <div className="popularity">{movie.imdbRating || 'N/A'}</div>
                        <div className="text-sm text-gray-400">Ratings:</div>
                      </div>

                      <div className="flex flex-col datos_col">
                        <div className="release">{movie.Runtime || 'N/A'}</div>
                        <div className="text-sm text-gray-400">Runtime:</div>
                      </div>
                    </div>

                    <div className="flex flex-col overview">
                      <div className="text-xs text-gray-400 mb-2">Genre:</div>
                      <p className="text-xs text-gray-100 mb-6">{movie.Genre || 'No overview available'}</p>
                    </div>
                  </div>
                  <p className=' text-sm text-gray-400'>Plot:<p className="text-xs text-gray-100 mb-6"> {movie.Plot || 'N/A'}</p></p>

                  
                  <div className="text-xs text-gray-100">
  <div className="flex flex-col mb-4">
    <p className='text-sm text-gray-400'>Released:     <span className="text-xs text-gray-100">{movie.Released || 'N/A'}</span></p>
    <br />
    <p className='text-sm text-gray-400'>Director:     <span className="text-xs text-gray-100">{movie.Director || 'N/A'}</span></p>
    <br />
    <p className='text-sm text-gray-400'>Actors:       <span className="text-xs text-gray-100">{movie.Actors || 'N/A'}</span></p>
    <br />
    <p className='text-sm text-gray-400'>Language:     <span className="text-xs text-gray-100">{movie.Language || 'N/A'}</span></p>
    <br />
    <p className='text-sm text-gray-400'>Awards:       <span className="text-xs text-gray-100">{movie.Awards || 'N/A'}</span></p>
    <br />
    <p className='text-sm text-gray-400'>IMDb Votes:   <span className="text-xs text-gray-100">{movie.imdbVotes || 'N/A'}</span></p>
    <br />
    {movie.totalSeasons && (
      <p className='text-sm text-gray-400'>Seasons: <span className="text-xs text-gray-100">{movie.totalSeasons}</span></p>
    )}
    {movie.Episode && (
      <p className='text-sm text-gray-400'>Episode: <span className="text-xs text-gray-100">{movie.Episode}</span></p>
    )}
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
                  filter: 'grayscale(0)',
                  objectFit: 'top',
                  maxHeight: '400px', // Reduced height
                  width: '100%',
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
}

export default DetailedView;
