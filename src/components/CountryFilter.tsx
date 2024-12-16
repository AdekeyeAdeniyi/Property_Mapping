import React, { useState, useEffect, useRef } from 'react';
import { State, City, IState, ICity } from 'country-state-city';
import { StateCityListProps } from '../types/types';

const StateCityList: React.FC<StateCityListProps> = ({
  countryCode,
  handleFetchProperties,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [excludedCities, setExcludedCities] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [, setSelectAll] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stateList = State.getStatesOfCountry(countryCode);
    setStates(stateList);

    // Load state and cities from localStorage
    const storedState = localStorage.getItem('statecode');
    if (storedState) {
      setSelectedState(storedState);
      const cityList = City.getCitiesOfState(countryCode, storedState);
      setCities(cityList);

      // Load selected and unselected cities from localStorage
      const storedCities = localStorage.getItem('cities');
      if (storedCities) {
        const citiesData = JSON.parse(storedCities);
        setExcludedCities(new Set(citiesData.excludedCities));
      }
    }
  }, [countryCode]);

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const stateCode = event.target.value;
    setSelectedState(stateCode);
    localStorage.setItem('statecode', stateCode); // Save to localStorage

    const { latitude, longitude } = {
      ...states.find(state => state.isoCode === stateCode),
    };

    if (latitude && longitude) {
      localStorage.setItem(
        'latlng',
        JSON.stringify({ lat: Number(latitude), lng: Number(longitude) })
      );
    }

    const cityList = City.getCitiesOfState(countryCode, stateCode);
    setCities(cityList);
  };

  const handleCityToggle = (city: string) => {
    setExcludedCities(prev => {
      const newExcludedCities = new Set(prev);
      if (newExcludedCities.has(city)) {
        newExcludedCities.delete(city); // Deselect city
      } else {
        newExcludedCities.add(city); // Select city
      }
      localStorage.setItem(
        'cities',
        JSON.stringify({ excludedCities: [...newExcludedCities] })
      );
      return newExcludedCities;
    });
  };

  const handleSelectAllCities = () => {
    setSelectAll(true);
    setExcludedCities(new Set()); // Clear excludedCities to select all cities
    localStorage.setItem('cities', JSON.stringify({ excludedCities: [] }));
  };

  const handleDeselectAllCities = () => {
    setSelectAll(false);
    const allCities = cities.map(city => city.name);
    setExcludedCities(new Set(allCities)); // Select all cities for exclusion
    localStorage.setItem(
      'cities',
      JSON.stringify({ excludedCities: allCities })
    );
  };

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchPropertiesData = () => {
    const selectedCities = cities
      .filter(city => !excludedCities.has(city.name)) // Filter out excluded cities
      .map(city => city.name);

    handleFetchProperties(selectedState, selectedCities);
  };

  return (
    <div ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(prev => !prev)}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-[#019344] rounded-lg hover:bg-[#1a5a38] focus:ring-4 focus:outline-none focus:ring-[#3cce81] transition-all"
        type="button"
      >
        {selectedState ? selectedState : 'Filter'}
        <svg
          className="w-2.5 h-2.5 ms-2.5"
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

      {isDropdownOpen && (
        <div className="z-10 bg-white rounded-lg shadow w-60 p-4 mt-3">
          {/* Dropdown for selecting a state */}
          <div className="pb-2">
            <label
              htmlFor="state-select"
              className="block font-medium text-gray-900 text-base"
            >
              Select a State
            </label>
            <select
              id="state-select"
              onChange={handleStateChange}
              value={selectedState || ''}
              className="w-full p-2.5 mt-1 border border-gray-300 rounded-lg"
            >
              <option value="">--Select a State--</option>
              {states.map(state => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          {/* City search and selection */}
          {selectedState && (
            <div>
              <div className="pb-2">
                <label htmlFor="input-group-search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="input-group-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                    placeholder="Search city"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Radio buttons for select/deselect all */}
              <div className="pb-2">
                <div className="flex justify-between py-2">
                  <button
                    type="button"
                    onClick={handleSelectAllCities}
                    className="text-sm text-blue-500"
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    onClick={handleDeselectAllCities}
                    className="text-sm text-blue-500"
                  >
                    Deselect All
                  </button>
                </div>
              </div>

              <ul
                className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 "
                aria-labelledby="dropdownSearchButton"
              >
                {filteredCities.map(city => (
                  <li key={city.name}>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 ">
                      <input
                        type="checkbox"
                        value={city.name}
                        onChange={() => handleCityToggle(city.name)}
                        checked={!excludedCities.has(city.name)}
                        id={`checkbox-${city.name}`}
                        className="h-5 w-5"
                      />
                      <label
                        htmlFor={`checkbox-${city.name}`}
                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded"
                      >
                        {city.name}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedState && (
            <button
              onClick={() => {
                setIsDropdownOpen(prev => !prev), fetchPropertiesData();
              }}
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-center text-white mt-3 bg-[#019344] rounded-lg hover:bg-[#1a5a38] focus:ring-4 focus:outline-none focus:ring-[#3cce81] transition-all"
              type="button"
            >
              Search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default StateCityList;
