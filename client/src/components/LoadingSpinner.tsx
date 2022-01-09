const LoadingSpinner = () => {
  /* <svg
        className="loader"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="loader-ring"
          fill="transparent"
          strokeWidth="6px"
          stroke="currentColor"
          strokeDashoffset="276.460"
          strokeDasharray="276.460 276.460"
          cx="50"
          cy="50"
          r="44"
        />
        <circle
          className="loader-ring-overlay"
          fill="transparent"
          strokeWidth="6px"
          stroke="#ec5c0e"
          strokeDashoffset="276.460"
          strokeDasharray="276.460 276.460"
          cx="50"
          cy="50"
          r="44"
        />
      </svg> */

  return (
    <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center z-50 text-purple-500">
      <svg
        className="loader"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="loader-ring"
          fill="transparent"
          strokeWidth="6px"
          stroke="currentColor"
          strokeDashoffset="276.460"
          strokeDasharray="276.460 276.460"
          cx="50"
          cy="50"
          r="44"
        />
        <circle
          className="loader-ring-overlay"
          fill="transparent"
          strokeWidth="6px"
          stroke="currentColor"
          strokeDashoffset="276.460"
          strokeDasharray="276.460 276.460"
          cx="50"
          cy="50"
          r="44"
        />
      </svg>
    </div>
  )
}

export default LoadingSpinner
