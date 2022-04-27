const Checkbox = ({
  name,
  value,
  onChange,
  id,
  checked,
  className,
  label,
}: any) => {
  return (
    <>
      <label className={`relative inline-block ${className}`} htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="peer absolute opacity-0 w-full h-full "
        ></input>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={checked ? 'white' : 'none'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`inline-block mr-4 rounded dark:bg-gray-800 bg-gray-50  border-2 border-purple-400
          peer-focus-visible:outline outline-2 outline-offset-2 outline-purple-300
        peer-checked:bg-purple-600  transition-all duration-100
          ${checked ? '' : ''}
             
             `}
          aria-hidden
        >
          <polyline
            points="20 6 9 17 4 12"
            className={`transition-all duration-100 ${
              checked ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </svg>
        {label}
      </label>
    </>
  )
}

export default Checkbox
