function HomeActivityCards() {
  return (
    <div className="max-width mt-10">
      <div className="homeactivitycard grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <div className="h-full">
          <div className="h-full rounded-xl bg-primary px-3 py-5 text-center text-white">
            <span className="text-2xl font-bold sm:text-3xl">9+</span>
            <h1 className="my-2 text-sm font-medium sm:text-xl">
              Years of Experience
            </h1>
            <h3 className="text-sm font-medium sm:text-lg">Graphic Design</h3>
          </div>
        </div>
        <div className="h-full">
          <div className="h-full rounded-xl bg-[#E85426] px-3 py-5 text-center text-white">
            <span className="text-sm font-semibold sm:text-lg">Customer</span>
            <h1 className="my-2 text-lg font-semibold sm:text-3xl">
              Satisfaction
            </h1>
            <h3 className="text-sm font-medium sm:text-lg">
              is Our Top Priority
            </h3>
          </div>
        </div>
        <div className="h-full">
          <div className="h-full rounded-xl bg-primary px-3 py-5 text-center text-white">
            <span className="text-2xl font-bold sm:text-3xl">100%</span>
            <h1 className="my-2 text-base font-semibold sm:text-2xl">
              Satisfaction
            </h1>
            <h3 className="text-sm font-medium sm:text-lg">Guaranteed</h3>
          </div>
        </div>
        <div className="h-full">
          <div className="h-full rounded-xl bg-[#E85426] px-3 py-5 text-center text-white">
            <span className="text-lg font-semibold sm:text-3xl">Emergency</span>
            <h1 className="my-2 font-medium sm:text-xl">Services</h1>
            <h3 className="text-sm font-semibold sm:text-2xl">Available</h3>
          </div>
        </div>
        <div className="h-full">
          <div className="h-full rounded-xl bg-primary px-3 py-5 text-center text-white">
            <span className="text-xl font-semibold sm:text-3xl">Easy</span>
            <h1 className="my-2 text-base font-semibold sm:text-2xl">
              Communication
            </h1>
            <h3 className="text-sm font-medium sm:text-lg">Quality Results</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeActivityCards;
