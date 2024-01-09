const InfoCardSmall = ({
  children,
  title,
  titleClassName,
  className,
  altTitle,
}: any) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md ${className} shadow-md relative`}
    >
      <div className="relative w-full">
        {title && (
          <div className="flex justify-between">
            <h1
              className={`text-2xl text-gray-700 dark:text-gray-50 ${titleClassName}`}
            >
              {title}
            </h1>
            {altTitle}
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default InfoCardSmall;
