import { PRICEINDICATOR } from '../constants';

const PriceIndicator: React.FC = () => {
  return (
    <div>
      <h2 className="text-black text-xs md:text-sm w-fit font-semibold bg-white p-2 rounded">
        Maker Indicators:
      </h2>

      <div className="flex flex-col gap-2 pt-2">
        <div
          className="inline-block py-[5px] px-[10px] rounded text-xs md:text-sm text-white font-semibold w-fit"
          style={{ backgroundColor: PRICEINDICATOR.low }}
        >
          Low Income: 300k-500k
        </div>
        <div
          className="inline-block py-[5px] px-[10px] rounded text-xs md:text-sm text-white font-semibold w-fit"
          style={{ backgroundColor: PRICEINDICATOR.medium }}
        >
          Medium Income: 500k-800k
        </div>
        <div
          className="inline-block py-[5px] px-[10px] rounded text-xs md:text-sm text-white font-semibold w-fit"
          style={{ backgroundColor: PRICEINDICATOR.high }}
        >
          High Income: 800k+
        </div>
      </div>
    </div>
  );
};

export default PriceIndicator;
