
function Error_page() {
  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <div className="text-center">
    <h1 className="text-6xl font-bold text-red-600 mb-2">Oops!</h1>
    <p className=" text-lg text-gray-700 mb-6">Something went wrong. Please try again later.</p>

    <a href="/home" className=" bg-black  text-white font-semibold py-2 px-4 rounded ">
      Go Back Home
    </a>
  </div>
</div>
    
    </>

  )
}

export default Error_page