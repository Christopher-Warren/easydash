import { Fragment } from 'react'

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
      ></input>
      <label className="absolute ml-.5 -mt-4">name</label>
    </Fragment>
  )
}

export default TextInput
