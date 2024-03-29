const LoginWrapper = ({ children }) => {
  return (
    <div className="h-screen w-full flex items-center justify-center lg:justify-end">
      <div className="absolute hidden lg:block  w-1/4  h-screen left-0 overflow-hidden border-r-2 border-blue-200 drop-shadow-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="1000"
          height="1080"
          preserveAspectRatio="none"
          viewBox="0 0 1000 1080"
        >
          <g mask='url("#SvgjsMask1300")' fill="none">
            <rect
              width="1000"
              height="1080"
              x="0"
              y="0"
              fill="url(#SvgjsLinearGradient1301)"
            ></rect>
            <path
              d="M1000 0L890.42 0L1000 499.91z"
              fill="rgba(255, 255, 255, .1)"
            ></path>
            <path
              d="M890.42 0L1000 499.91L1000 678.46L707.7099999999999 0z"
              fill="rgba(255, 255, 255, .075)"
            ></path>
            <path
              d="M707.71 0L1000 678.46L1000 686.4200000000001L394.56000000000006 0z"
              fill="rgba(255, 255, 255, .05)"
            ></path>
            <path
              d="M394.55999999999995 0L1000 686.4200000000001L1000 916.2600000000001L295.10999999999996 0z"
              fill="rgba(255, 255, 255, .025)"
            ></path>
            <path
              d="M0 1080L286.64 1080L0 930z"
              fill="rgba(0, 0, 0, .1)"
            ></path>
            <path
              d="M0 930L286.64 1080L658.4 1080L0 614.6700000000001z"
              fill="rgba(0, 0, 0, .075)"
            ></path>
            <path
              d="M0 614.6700000000001L658.4 1080L801.77 1080L0 343.8500000000001z"
              fill="rgba(0, 0, 0, .05)"
            ></path>
            <path
              d="M0 343.85L801.77 1080L832.72 1080L0 338.65000000000003z"
              fill="rgba(0, 0, 0, .025)"
            ></path>
          </g>
          <defs>
            <mask id="SvgjsMask1300">
              <rect width="1000" height="1080" fill="#ffffff"></rect>
            </mask>
            <linearGradient
              x1="-2%"
              y1="1.85%"
              x2="102%"
              y2="98.15%"
              gradientUnits="userSpaceOnUse"
              id="SvgjsLinearGradient1301"
            >
              <stop stopColor="rgba(22, 114, 209, 1)" offset="0"></stop>
              <stop stopColor="rgba(158, 0, 141, 1)" offset="1"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div
        className={`max-w-lg flex-grow lg:mr-40 xl:mr-96 transition-none lg:p-0 p-4 `}
      >
        {children}
      </div>
    </div>
  );
};
export default LoginWrapper;
