const LoadingSpinner = () => {
  return (
    <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center z-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className="animate-spin text-purple-500  absolute w-52"
      >
        <path
          d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
          fill="currentColor"
          stroke="none"
          transform="matrix(1,0,0,1,0,0)"
        />
      </svg>
    </div>
  )
}

export default LoadingSpinner
