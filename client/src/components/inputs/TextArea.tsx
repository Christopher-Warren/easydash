interface InputProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  containerClassName?: string
}

const TextArea = ({
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
      <textarea
        id={id}
        autoFocus={autoFocus}
        className={`peer h-full border-2 p-1.5 focus:border-purple-300 outline-none disabled:bg-gray-50 disabled:cursor-not-allowed ${className} w-full  placeholder-transparent`}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
      ></textarea>
      <label
        htmlFor={id}
        className="absolute transition-all left-0 -top-6 ml-2 mt-1 text-sm text-gray-400 pointer-events-none
        peer-focus:-top-6
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

export default TextArea
