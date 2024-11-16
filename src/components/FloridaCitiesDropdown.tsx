import { useEffect, useRef, useState } from 'react';

const FloridaCitiesDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  // Close dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside); // Add touch support
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Ensure dropdown scrolls into view on input focus
  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
          className="z-10 absolute max-h-[300px] overflow-y-auto bg-white divide-y divide-gray-100 rounded-lg shadow w-full sm:w-44 mt-2 dark:bg-gray-700"
        >
          {/* Search input field */}
          <div className="p-2">
            <input
              type="text"
              value={searchQuery}
              onFocus={handleInputFocus}
              placeholder="Search City"
              className="w-full p-2 h-8 text-sm border rounded-sm focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FloridaCitiesDropdown;
