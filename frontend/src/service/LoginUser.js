import axios from "axios";
const loginUser=async(email,password)=>{
  const url='https://backend-flickfinder.vercel.app/auth/login';
  try {
    const response = await axios.post(url,{email,password},{
      headers : {
        "Content-Type":'application/json'
      },
    });
    const token =response.data.jwtToken;
    localStorage.setItem('authToken',token);
    localStorage.setItem('userId',response.data.email)

    
    
    return response.data
    
    
  } catch (error) {
    throw new Error(error ?.response.data.status || "Failed to Login. Check your credentials")
    
  }

}
export {loginUser}