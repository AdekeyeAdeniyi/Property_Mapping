import React, { useState, useEffect, useRef } from 'react';
import { GetState, GetCity } from 'react-country-state-city';
import { State, City } from 'react-country-state-city/dist/esm/types';
import { StateCityListProps } from '../types/types';

const StateCityList: React.FC<StateCityListProps> = ({
  countryCode,
  setNewCoordinate,
  handleFetchProperties,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [excludedCities, setExcludedCities] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const [isPinValid, setIsPinValid] = useState<boolean>(false);
  const [actualPin] = useState<string>('5678933');
  const [, setSelectAll] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const stateList = await GetState(countryCode);
        setStates(stateList);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, [countryCode]);

  const handleStateChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const stateCode = event.target.value;
    setSelectedState(stateCode);

    const stateValue = states.find(state => state.state_code === stateCode);

    try {
      const cityList = await GetCity(countryCode, stateValue!.id);
      setCities(cityList);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleCityToggle = (city: string) => {
    setExcludedCities(prev => {
      const newExcludedCities = new Set(prev);
      if (newExcludedCities.has(city)) {
        newExcludedCities.delete(city);
      } else {
        newExcludedCities.add(city);
      }
      return newExcludedCities;
    });
  };

  const handleSelectAllCities = () => {
    setSelectAll(true);
    setExcludedCities(new Set());
  };

  const handleDeselectAllCities = () => {
    setSelectAll(false);
    const allCities = cities.map(city => city.name);
    setExcludedCities(new Set(allCities));
  };

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchPropertiesData = () => {
    const selectedCities = cities
      .filter(city => !excludedCities.has(city.name))
      .map(city => city.name);

    if (selectedCities.length > 0) {
      const city = cities.find(city => city.name === selectedCities[0]);

      setNewCoordinate({
        lat: parseFloat(city!.latitude),
        lng: parseFloat(city!.longitude),
      });

      handleFetchProperties(selectedState, selectedCities);
    }
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow only numeric input
    if (/^\d*$/.test(value)) {
      setPin(value);

      // Set validity if PIN matches actual PIN
      setIsPinValid(value === actualPin);
    }
  };

  return (
    <div ref={dropdownRef}>
      {/* Dropdown Toggle */}
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
      {/* Dropdown Content */}
      {isDropdownOpen && (
        <div className="z-10 bg-white rounded-lg shadow w-60 p-4 mt-3">
          {/* Select State */}
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
                <option key={state.state_code} value={state.state_code}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          {/* City List */}
          <div className="pb-2">
            <label className="block font-medium text-gray-900 text-base">
              Cities
            </label>
            <input
              type="text"
              placeholder="Search Cities..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full p-2.5 mb-2 border border-gray-300 rounded-lg"
            />
            <div className="max-h-40 overflow-auto">
              {filteredCities.map(city => (
                <div key={city.name} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={!excludedCities.has(city.name)}
                    onChange={() => handleCityToggle(city.name)}
                    className="mr-2"
                  />
                  <label>{city.name}</label>
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between">
              <button
                onClick={handleSelectAllCities}
                className="text-sm text-blue-500"
              >
                Select All
              </button>
              <button
                onClick={handleDeselectAllCities}
                className="text-sm text-red-500"
              >
                Deselect All
              </button>
            </div>
          </div>

          {/* Enter PIN */}
          <div className="pb-2">
            <label
              htmlFor="pin-input"
              className="block font-medium text-gray-900 text-base"
            >
              Enter PIN
            </label>
            <input
              id="pin-input"
              type="text"
              value={pin}
              onChange={handlePinChange}
              maxLength={8}
              className="w-full p-2.5 mt-1 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Fetch Properties */}
          <button
            onClick={fetchPropertiesData}
            disabled={!isPinValid}
            className={`w-full mt-2 py-2 rounded-lg transition ${
              isPinValid
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Fetch Properties
          </button>
        </div>
      )}
      \
    </div>
  );
};

export default StateCityList;
