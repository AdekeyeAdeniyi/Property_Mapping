import { PRICEINDICATOR } from '../constants';
export const getThirtyFiveDaysBeforeDate = (): string => {
  const today = new Date();
  today.setDate(today.getDate() - 35);

  return today.toISOString().split('T')[0]; // Cleaner output
};

export const extractStoreProperties = (properties: []): any => {
  return properties.map(property => {
    const { zpid, address, imgSrc, latLong, hdpData } = property;

    return {
      zpid: zpid,
      address: address,
      imgSrc,
      latLong,
      hdpData,
    };
  });
};

export const convertToDollar = (amount: number) =>
  `$${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export const getStyleByPrice = (price: number) => {
  if (price >= 0 && price <= 500000) {
    return {
      background: PRICEINDICATOR.low,
    };
  } else if (price >= 50001 && price <= 800000) {
    return {
      background: PRICEINDICATOR.medium,
      glyphColor: '#000',
      borderColor: '#000',
    };
  } else if (price >= 80001) {
    return {
      background: PRICEINDICATOR.high,
      glyphColor: '#000',
      borderColor: '#000',
    };
  } else {
    return {
      background: 'transparent',
      glyphColor: '#000',
      borderColor: '#000',
    };
  }
};

export const convertTimestampToDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

export const isWithinUSABounds = (
  latitude: number,
  longitude: number
): boolean => {
  const USA_BOUNDS = {
    west: -125.0,
    east: -66.0,
    south: 24.396308,
    north: 49.384358,
  };

  return (
    latitude >= USA_BOUNDS.south &&
    latitude <= USA_BOUNDS.north &&
    longitude >= USA_BOUNDS.west &&
    longitude <= USA_BOUNDS.east
  );
};
