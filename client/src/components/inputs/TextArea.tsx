const TextArea = ({
  onChange,
  value,
  className,
  placeholder,
}: React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>) => {
  return (
    <textarea
      placeholder={placeholder}
      className={`resize-none row-span-6 col-span-2 ${className}`}
      value={value}
      onChange={onChange}
    ></textarea>
  )
}

export default TextArea
