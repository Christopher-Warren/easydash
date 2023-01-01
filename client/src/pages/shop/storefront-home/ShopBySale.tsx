import imgone from "../../../assets/images/createorder.png";
import imgtwo from "../../../assets/images/createshot.png";
import imgthree from "../../../assets/images/editshot.png";
import imgfour from "../../../assets/images/homeshot.png";
import imgfive from "../../../assets/images/ordershot.png";
import imgsix from "../../../assets/images/productsshot.png";
import imgseven from "../../../assets/images/dash.png";

export default function ShopBySale() {
  return (
    <div className="bg-gray-50">
      <div className="pt-32 overflow-hidden sm:pt-14">
        <div className="">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative pt-48 pb-16 sm:pb-24">
              <div>
                <h2
                  id="sale-heading"
                  className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl"
                >
                  Your huge sale.
                  <br />
                  Up to 50% off.
                </h2>
                <div className="mt-6 text-base">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Shop the sale<span aria-hidden="true"> &rarr;</span>
                  </a>
                </div>
              </div>

              <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 sm:top-6 sm:translate-x-0">
                <div className="ml-24 flex space-x-6 min-w-max sm:ml-3 lg:space-x-8">
                  <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                    <div className="flex-shrink-0">
                      <img
                        className="h-64 w-64 rounded-lg object-left object-cover md:h-72 md:w-72"
                        src={imgone}
                        alt=""
                      />
                    </div>

                    <div className="mt-6 flex-shrink-0 sm:mt-0">
                      <img
                        className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                        src={imgtwo}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="flex space-x-6 sm:-mt-20 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                    <div className="flex-shrink-0">
                      <img
                        className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                        src={imgthree}
                        alt=""
                      />
                    </div>

                    <div className="mt-6 flex-shrink-0 sm:mt-0">
                      <img
                        className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                        src={imgfour}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                    <div className="flex-shrink-0">
                      <img
                        className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                        src={imgfive}
                        alt=""
                      />
                    </div>

                    <div className="mt-6 flex-shrink-0 sm:mt-0">
                      <img
                        className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                        src={imgsix}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
