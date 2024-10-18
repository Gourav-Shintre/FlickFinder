import React, { useEffect, useState,useRef } from 'react'
import fetchAllMovies from '../../service/FetchAllMovies';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function SearchBar() {
  const[searchTerm,setSearchTerm]=useState("");
  const [searchType, setSearchType] = useState("title");
  const[results,setResults]=useState([]);
  const [noResults,setNoResults]=useState(false);
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const[isOpen,setIsOpen]=useState(false)
  const searchBarRef = useRef(null);
  const navigate = useNavigate(); 
  useEffect(()=>{
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm)
      
    }, 300);
    return ()=>{
      clearTimeout(timer)
    }
  },[searchTerm])

  useEffect(()=>{
    if(debouncedTerm){
      fetchAllMovies(debouncedTerm,searchType)
      .then((data)=>{
        console.log(data);
        
        if(data && data.Search){
          setResults(data.Search)
          setNoResults(false)
        }else{
          setResults([]);
          setNoResults(true)
        }

      }).catch((error)=>{
        console.log("Error fetching search results...",error);
        

      })
    }
  },[debouncedTerm,searchType])

  const handleMovieClick =(movieId)=>{
    navigate(`/movie/${movieId}`)
  }
  const handleClickOutside=(e)=>{
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setIsOpen(false); // Close dropdown
    }
  }
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener on unmount or when isOpen changes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);




  return (
  <>
  <div ref={searchBarRef} className='relative'>
  <div className="flex items-center bg-gray-700 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring focus:ring-blue-300"
  onClick={()=>setIsOpen(true)}>
  <svg
          className="absolute left-2 top-2 w-5 h-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 4a7 7 0 100 14 7 7 0 000-14zm0 0L4 11m7-7l7 7"
          />
        </svg>
  <input
          type="text"
          placeholder="Search..."
          className="bg-transparent w-full text-white focus:outline-none"
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
        />
       
  </div>
  <select
  className="absolute right-2 top-2 bg-gray-700 text-white rounded"
  value={searchType}
  onChange={(e)=>setSearchType(e.target.value)}
  >
    <option value="title">Title</option>
  </select>
  {isOpen && searchTerm && (
         <div className="absolute bg-white text-black w-full mt-2 p-4 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {noResults ? (
            <p>No results found.</p>
          ) : (
            <ul className='max-h-40 and overflow-y-auto'>
              {results.map((movie) => (
                <li key={movie.imdbID} className="py-1 border-b cursor-pointer hover:bg-gray-100" onClick={()=>handleMovieClick(movie.imdbID)}>
                 <Link to={`/movie/${movie.imdbID}`}></Link>
                  {movie.Title} ({movie.Year})
                </li>
              ))}
            </ul>
          )}
        </div>
          )}
          </div>
  </>
  )
}

export default SearchBar