/* eslint-disable import/prefer-default-export */
export const apiUrl = process.env.NODE_ENV === 'production'
  ? 'https://vax-data.herokuapp.com/api/orders'
  : 'http://localhost:3001/api/orders';
