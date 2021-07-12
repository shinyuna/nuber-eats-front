interface RestaurantBannerProps {
  coverImage: string;
  name: string;
  category: string;
  address: string;
}

const RestaurantBanner = ({ coverImage, name, category, address }: RestaurantBannerProps) => {
  return (
    <div
      className="relative bg-gray-200 bg-center bg-cover py-36 "
      style={{
        backgroundImage: `url(${coverImage})`,
      }}
    >
      <div
        className="absolute bottom-0 left-0 flex items-end w-full h-1/2"
        style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0) 100%)` }}
      >
        <div className="px-10 py-6 text-white sm:px-5">
          <div>
            <h4 className="page-h4">{name}</h4>
            <h5 className="mb-1 text-sm">{category}</h5>
            <p className="text-sm">
              {address} • <button className="font-medium underline">More info</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantBanner;
