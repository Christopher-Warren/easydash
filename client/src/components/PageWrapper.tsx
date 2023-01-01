const PageWrapper = (props: any) => {
  return (
    <div
      className={`relative mx-auto py-20 pt-32 pd:mt-20 min-h-screen px-5 max-w-7xl  dark:text-gray-200 text-gray-700`}
    >
      {props.children}
    </div>
  );
};
export default PageWrapper;
