import { PRICEINDICATOR } from '../constants';

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
