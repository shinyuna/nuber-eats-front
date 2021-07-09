import eventImage from '../assets/images/banner2.png';

export const EventBanner = () => {
  return (
    <section className="flex items-center justify-between px-10 py-6 bg-gray-900 min-w-max">
      <div className="w-1/3 text-white">
        <h1 className="mb-2 text-4xl">Crave it? Get it.</h1>
        <p className="font-extralight">Search for a favorite restaurant, cuisine, or dish.</p>
      </div>
      <div className="flex justify-center w-2/3">
        <div className="flex w-1/2 overflow-hidden rounded-xl">
          <div className="flex flex-col justify-between w-4/6 p-5 bg-red-100">
            <p className="text-3xl font-semibold break-words  md:text-xl">
              Unlimited $0 delivery fee + 5% off with Eats Pass
            </p>
            <button className="px-4 py-2 text-sm text-white bg-gray-900 rounded-full">Try 1 month free →</button>
          </div>
          <img className="w-2/6" src={eventImage} alt="event banner" />
        </div>
      </div>
    </section>
  );
};
