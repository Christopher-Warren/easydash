const TextInput = ({
  value,
  onChange,
  autoFocus,
  disabled,
  className,
  id,
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  return (
    <input
      id={id}
      autoFocus={autoFocus}
      className={`self-center border-b-2 focus:border-purple-400 outline-none ${disabled} row-span-1 ${className}`}
      value={value}
      onChange={onChange}
      disabled={disabled}
    ></input>
  )
}

export default TextInput
