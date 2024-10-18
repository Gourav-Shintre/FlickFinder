import axios from "axios";
const registerUser =async(name,email,password)=>{
  const url ="https://backend-flickfinder.vercel.app/auth/signup"
  try {
    const response = await axios.post(url,{name,email,password},
      {
        headers : {
           "Content-Type":'application/json'
        }
      });
      return response.data
    
  } catch (error) {
    throw new Error(error ?.response.data.status ||"Failed to register user. User is already registered")
    
  }
  

}

export default registerUser;