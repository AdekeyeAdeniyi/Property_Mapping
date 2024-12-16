import { PropertyDetailsProps } from '../types/types';
import DefaultImage from '../assets/images/default.png';

const PropertyDetails = ({ property, handleClose }: PropertyDetailsProps) => {
  const address = `${property.address.street} ${property.address.city}, ${property.address.state}`;
  return (
    <>
      {property.owner ? (
        <div className="flex flex-col md:flex-row gap-4">
          {/* Image */}
          <div className="flex-shrink-0 w-full md:w-1/2 h-56 md:h-auto">
            <img
              src={DefaultImage}
              alt={property._id}
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-2 text-md font-normal w-full md:w-1/2">
            <h2 className="text-md font-bold text-gray-800 uppercase">
              {property.owner.fullName}
            </h2>
            <p className="flex gap-2">
              <span className="font-semibold">Address:</span>{' '}
              <span>{address}</span>
            </p>
            <ul>
              {property.owner.emails.map(email => (
                <li key={email}>
                  <span className="font-semibold">Email:</span>{' '}
                  <span>{email}</span>
                </li>
              ))}
            </ul>
            <ul>
              {property.owner.phoneNumbers.map(phoneNumber => (
                <li key={phoneNumber.number} className="flex gap-2">
                  <span className="font-semibold">{phoneNumber.type}:</span>
                  <span>{phoneNumber.number}</span>
                </li>
              ))}
            </ul>

            {handleClose && (
              <div className="flex items-center gap-2 mt-4 md:mt-auto">
                <button
                  onClick={handleClose}
                  className="inline-flex justify-center items-center px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col gap-5">
          <p className="text-center text-2xl font-bold text-red-600">
            No Record Found
          </p>

          {handleClose && (
            <button
              onClick={handleClose}
              className="inline-flex justify-center items-center px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700"
            >
              Close
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default PropertyDetails;
