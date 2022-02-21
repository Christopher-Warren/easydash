interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  containerClassName?: string
}

const TextInput = ({
  value,
  onChange,
  autoFocus,
  disabled,
  className,
  id,
  placeholder,
  containerClassName,
}: InputProps) => {
  return (
    <div className={`relative ${containerClassName}`}>
      <input
        id={id}
        autoFocus={autoFocus}
        className={`peer border-b-2   focus:border-purple-300 px-1 pt-3.5  outline-none disabled:bg-gray-50 disabled:cursor-not-allowed ${className} w-full  
        placeholder-transparent`}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
      ></input>
      <label
        htmlFor={id}
        className="absolute transition-all left-0 px-1 pt-3.5  -top-5 text-sm text-gray-400 pointer-events-none
        peer-focus:-top-5
        peer-focus:text-sm
        peer-focus:text-purple-400

        peer-placeholder-shown:text-gray-400
        peer-placeholder-shown:text-base
        peer-placeholder-shown:top-0"
      >
        {placeholder}
      </label>
    </div>
  )
}

export default TextInput
