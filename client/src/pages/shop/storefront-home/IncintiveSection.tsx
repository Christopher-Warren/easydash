export default function IncintiveSection() {
  return (
    <div className="relative bg-gray-800 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://www.chriswarren.tech/images/easydash/login.png"
          alt=""
          className="w-full h-full object-top object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gray-900 bg-opacity-50"
      />
      <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Only pay Stripe transacion fees
        </h2>
        <p className="mt-3 text-xl text-white">
          Once your shop reaches a large audience, you may need to upgrade to a
          faster database, or a more performant backend. Until then, you only
          pay when you finalize transactions.
        </p>
        <a
          href="#"
          className="mt-8 w-full block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
        >
          Read our story
        </a>
      </div>
    </div>
  );
}
