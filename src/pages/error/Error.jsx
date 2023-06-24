const Error = () => {
  return (
    <div className="h-screen w-screen">
      <main className="grid min-h-full min-w-full place-items-center bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xl sm:text-2xl font-semibold text-[#6439FF]">
            404
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Page not found
          </h1>
          <p className="mt-6 text-lg sm:text-xl text:xl leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#"
              className="rounded-md bg-[#6439FF] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#8160f7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              Go back home
            </a>
            <a
              href="#"
              className="text-lg sm:text-base font-semibold text-gray-900 mt-2 sm:mt-0"
            >
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Error;
