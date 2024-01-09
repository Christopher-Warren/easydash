import { useEffect, useRef } from "react";

const ErrorNotifications = () => {
  const ref: any = useRef(0);

  // const appError = useAppSelector((state) => state.error.value)
  // const dispatch = useAppDispatch()

  // useEffect(() => {
  // const el = document.querySelector(`#error-${0}`)
  // if (appError.length > 0) {
  //   ref.current = setTimeout(() => {
  //     el?.classList.add('error-fade-out')
  //     setTimeout(() => {
  //       el?.classList.remove('error-fade-out')
  //       // dispatch(removeError(0))
  //     }, 750)
  //   }, 5000)
  // }

  //   return function cleanup() {
  //     clearTimeout(ref.current)
  //   }
  // }, [appError.length, dispatch])

  return (
    <div className="fixed lg:bottom-20 bottom-5 lg:right-20 lg:left-auto right-1/4 left-1/4 z-20"></div>
  );
};

export default ErrorNotifications;
