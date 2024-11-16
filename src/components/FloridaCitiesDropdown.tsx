import { useEffect, useRef, useState } from 'react';
import { City, State } from 'country-state-city';
import { ICity } from 'country-state-city';

interface FloridaCitiesDropdownProps {
  onSelect?: (selectedCity: ICity) => void;
}

const FloridaCitiesDropdown: React.FC<FloridaCitiesDropdownProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cities, setCities] = useState<ICity[]>([]);
  const [filteredCities, setFilteredCities] = useState<ICity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const floridaState = State.getStateByCodeAndCountry('FL', 'US');

  // Fetch cities in Florida when the component mounts
  useEffect(() => {
    if (floridaState) {
      const cityList = City.getCitiesOfState('US', floridaState.isoCode);
      setCities(cityList);
      setFilteredCities(cityList); // Initially, all cities are shown
    }
  }, [floridaState]);

  // Filter cities based on search query
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = cities.filter(city =>
      city.name.toLowerCase().includes(query)
    );
    setFilteredCities(filtered);
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  // Close dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        id="dropdownButton"
        onClick={toggleDropdown}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        <span>Select City</span>
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="z-10 absolute h-[300px] overflow-y-auto bg-white divide-y divide-gray-100 rounded-lg shadow w-44 mt-2 dark:bg-gray-700"
        >
          {/* Search input field */}
          <div className="p-2">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search City"
              className="w-full p-2 h-8 text-sm border rounded-sm focus:outline-none"
            />
          </div>

          {/* Dropdown list */}
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownButton"
          >
            {filteredCities.length > 0 ? (
              filteredCities.map((city, index) => (
                <li key={index}>
                  <button className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    {city.name}
                  </button>
                </li>
              ))
            ) : (
              <li>
                <span className="block px-4 py-2 text-left text-gray-500">
                  No cities found
                </span>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FloridaCitiesDropdown;
