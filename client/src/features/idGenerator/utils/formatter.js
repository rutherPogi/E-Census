import dayjs from 'dayjs';

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

export const formatEmail = (value) => {
  if (!value) return '';
  return value.trim().toLowerCase(); // Remove spaces & convert to lowercase
};

export const formatDate = (value, format = 'YYYY-MM-DD') => {
  if (!value) return '';
  return dayjs(value).format(format);
};

export const formatCurrency = (value) => {
  if (!value) return;
  const plainNumber = value.toString().replace(/[^\d.]/g, ''); // Allow decimal points
  return `${parseFloat(plainNumber).toLocaleString()}`;
};

export const formatAge = (value) => {
  if (!value) return '';

  // Remove non-numeric characters
  let age = value.replace(/\D/g, '');

  // Convert to number and cap at 99
  age = Math.min(parseInt(age, 10) || 0, 99);

  return age.toString();
};

export const formatters = {
  phone: formatPhoneNumber,
  email: formatEmail,
  date: formatDate,
  currency: formatCurrency,
  age: formatAge,
};
