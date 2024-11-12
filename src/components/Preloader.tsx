import { useState, useEffect } from 'react';

// List of random titles
const titles = [
  {
    heading: 'Lawn Care Tips',
    title: 'How to keep your lawn healthy all year round',
  },
  { heading: 'Lawn Care', title: 'Top strategies for a beautiful, green yard' },
  {
    heading: 'Real Estate Insights',
    title: 'Finding your perfect home in a competitive market',
  },
  { heading: 'Real Estate', title: '5 Things Every Homebuyer Should Know' },
  {
    heading: 'Lawn Care Tips',
    title: 'Essential tools for maintaining a pristine lawn',
  },
  {
    heading: 'Real Estate Tips',
    title: 'How to sell your home quickly and for top dollar',
  },
];

const Preloader = () => {
  const [randomTitle, setRandomTitle] = useState<{
    heading: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * titles.length);
    setRandomTitle(titles[randomIndex]);
  }, []);

  return (
    <div className="loading fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 flex flex-col items-center justify-center">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>

      {randomTitle && (
        <>
          <h3 className="text-center text-white text-lg font-semibold mt-4">
            {randomTitle.heading}
          </h3>
          <p className="w-1/3 text-center text-white">{randomTitle.title}</p>
        </>
      )}
    </div>
  );
};

export default Preloader;
