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

export const formatPhoneNumber = (value, type) => {
  if (!value) return '';

  // Remove non-numeric characters
  let plainNumber = value.replace(/\D/g, '');

  if (type === 'mobile') {
    return plainNumber.slice(0, 10); // Limit to 10 digits
  }

  if (type === 'landline') {
    if (plainNumber.length > 10) plainNumber = plainNumber.slice(0, 10); // Limit to 10 digits
    if (plainNumber.length >= 3) {
      return `(${plainNumber.slice(0, 2)}) ${plainNumber.slice(2, 6)}-${plainNumber.slice(6)}`;
    }
  }

  return plainNumber;
};

