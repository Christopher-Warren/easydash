const Progress = ({ className, progress }: any) => {
  return (
    <div
      className={`${className} border border-gray-300 rounded overflow-hidden ${
        progress === 0 && 'hidden'
      }`}
    >
      <div
        style={{ width: `${progress}%` }}
        className={`bg-purple-500 w-full h-4  ${
          progress < 100 && 'animate-pulse'
        }`}
      ></div>
    </div>
  )
}

export default Progress
