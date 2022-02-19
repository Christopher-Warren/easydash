import { Fragment, useState } from 'react'

const TextInput = ({
  value,
  onChange,
  autoFocus,
  disabled,
  className,
  id,
  placeholder,
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  const [isFocused, setIsFocused] = useState(autoFocus)

  // All of the label elements positions are starting from the PARENT
  // instead of the <input />

  return (
    <Fragment>
      <input
        id={id}
        autoFocus={autoFocus}
        className={`self-center border-b-2 focus:border-purple-400 outline-none ${disabled} row-span-1 ${className} `}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        onBlur={(e) => setIsFocused(false)}
        onFocus={(e) => setIsFocused(true)}
      ></input>
      <label className={`absolute ml-.5  ${isFocused && ' -mt-4'}`}>name</label>
    </Fragment>
  )
}

export default TextInput
