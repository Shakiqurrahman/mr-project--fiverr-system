function HomeActivityCards() {
  return (
    <div className="max-width mt-10">
      <div className="homeactivitycard grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <div className="h-full">
          <div className="h-full rounded-xl bg-primary px-3 py-5 text-center text-white">
            <span className="text-2xl font-semibold sm:text-3xl">8+</span>
            <h1 className="my-2 text-sm font-medium sm:text-base">
              Years of Experience
            </h1>
            <h3 className="text-sm font-normal sm:text-base">Graphic Design</h3>
          </div>
        </div>
        <div className="h-full">
          <div className="h-full rounded-xl bg-[#E85426] px-3 py-5 text-center text-white">
            <span className="text-sm sm:text-base">Customer</span>
            <h1 className="my-2 text-lg sm:text-2xl">Satisfaction</h1>
            <h3 className="text-sm font-normal sm:text-base">
              is Our Top Priority
            </h3>
          </div>
        </div>
        <div className="h-full">
          <div className="h-full rounded-xl bg-primary px-3 py-5 text-center text-white">
            <span className="text-2xl font-semibold sm:text-3xl">100%</span>
            <h1 className="my-2 text-base sm:text-[20px]">Satisfaction</h1>
            <h3 className="text-sm font-normal sm:text-base">Guaranteed</h3>
          </div>
        </div>
        <div className="h-full">
          <div className="h-full rounded-xl bg-[#E85426] px-3 py-5 text-center text-white">
            <span className="text-lg sm:text-3xl">Emergency</span>
            <h1 className="my-2">Services</h1>
            <h3 className="text-sm font-normal sm:text-base">Available</h3>
          </div>
        </div>
        <div className="h-full">
          <div className="h-full rounded-xl bg-primary px-3 py-5 text-center text-white">
            <span className="text-xl sm:text-3xl">Easy</span>
            <h1 className="my-2 text-base font-medium sm:text-lg">
              Communication
            </h1>
            <h3 className="text-sm font-normal sm:text-base">
              Quality Results
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeActivityCards;
