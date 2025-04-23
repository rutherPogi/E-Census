export const ACCOUNT_TABLE_HEADERS = [
  'User ID',
  'Name',
  'Username',
  'Position',
  'Actions'
];

export const BARANGAY_OPTIONS = [
  { value: 'Sta. Rosa', label: 'Sta. Rosa' },
  { value: 'Sta. Maria', label: 'Sta. Maria' },
  { value: 'Sta. Lucia', label: 'Sta. Lucia' },
  { value: 'San Rafael', label: 'San Rafael' },
  { value: 'Yawran', label: 'Yawran' },
  { value: 'Raele', label: 'Raele' }
];


export const POSITION_MAP = {
  'admin': '#d32f2f',
  'manager': '#7b1fa2',
  'supervisor': '#1976d2',
  'level 1': '#388e3c',
  'level 2': '#f57c00',
  'level 3': '#0097a7'
};


export const POSITION_OPTIONS = [
  { value: 'Admin', label: 'Admin' },
  { value: 'MSWDO', label: 'MSWDO' },
  { value: 'Barangay Official', label: 'Barangay Official' },
];

export const INITIAL_FORM_DATA = {
  accountName: "",
  username: "",
  password: "",
  position: "",
  barangay: ''
};

export const INITIAL_BULK_STATE = {
  position: "",
  barangay: '',
  count: ''
};

  export const INITIAL_BULK_ERROR_STATE = {
    position: false,
    barangay: false,
    count: false
  };

export const INITIAL_ERROR_STATE = {
  accountName: false,
  username: false,
  password: false,
  position: false,
  prefix: false,
  position2: false,
  count: false,
  startNumber: false
};



