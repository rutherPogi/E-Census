import dayjs from 'dayjs';

export const formatCurrency = (value) => {
  if (!value) return '0';
  const plainNumber = value.toString().replace(/[^\d.]/g, ''); // Allow decimal points
  return `${parseFloat(plainNumber).toLocaleString()}`;
};

export const formatDate = (value) => {
  if (!value) return 'N/A';
  return dayjs(value).format('MM/DD/YYYY');
};

export const formatNumber = (value) => {
  if (!value) return '0';
  const plainNumber = value.toString().replace(/[^\d.]/g, ''); // Allow decimal points
  return parseFloat(plainNumber).toLocaleString();
};

export const formatters = {
  currency: formatCurrency,
  date: formatDate,
  number: formatNumber,
};
