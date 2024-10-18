import axios from "axios";
const apiKey = "583b73fe";
const fetchAllMovies = async (searchTerm, searchType) => {
  let url = "";
  switch (searchType) {
    case "title":
      url = `http://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${apiKey}`;
      break;
    case "genre":
      url = `http://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&type=movie&apikey=${apiKey}`;
      break;
    default:
      throw new Error("Invalid search type");
  }
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export default fetchAllMovies;
