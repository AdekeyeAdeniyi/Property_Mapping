import { useEffect, useRef, useState } from 'react';
import { GetCity } from 'react-country-state-city';

const FloridaCitiesDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cities, setCities] = useState<any[]>([]); // Array to hold cities
  const [filteredCities, setFilteredCities] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>(''); // State for selected city
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch cities in Florida when component mounts
  useEffect(() => {
    const fetchCities = async () => {
      const cityList = await GetCity(233, 1436); // Fetch cities using GetCity API
      setCities(cityList);
      setFilteredCities(cityList); // Initially, all cities are shown
    };

    fetchCities();

    // Close dropdown if clicking outside of it
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

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

  // Ensure dropdown scrolls into view on input focus
  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  // Handle city selection
  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem('selectedCity', city);
    console.log('Selected city:', city); // Log selected city
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div
      className="relative inline-block text-left w-full sm:w-auto"
      ref={dropdownRef}
    >
      <button
        id="dropdownButton"
        onClick={toggleDropdown}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        <span>{selectedCity || 'Select City'}</span>
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
          className="z-10 absolute max-h-[300px] overflow-y-auto bg-white divide-y divide-gray-100 rounded-lg shadow w-full sm:w-44 mt-2 dark:bg-gray-700"
        >
          {/* Search input field */}
          <div className="p-2">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleInputFocus}
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
                  <button
                    className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleCitySelect(city.name)} // Pass city name to handler
                  >
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
