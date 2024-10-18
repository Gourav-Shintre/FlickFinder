import axios from "axios";
const OMDB_API_KEY = '583b73fe';
const moviesId=[
  'tt0299108',
  'tt2905838',
  'tt1187043',
  'tt1270797',
  'tt0341384',
  'tt4154796',

]
const fetchMovies = async ()=>{
 try {
  const moviepromise = moviesId.map((id)=>{
    return axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${OMDB_API_KEY}`)

  })
  const response = await Promise.all(moviepromise)
  return response.map(response=>response.data)
  
 }
 catch (error) {
  console.error('Error fetching movies:', error);
    throw error;
  
 }
}

export default fetchMovies
