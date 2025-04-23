export const INITIAL_VALUES = (userID) => {
  return{
    userID: userID,
    postType: '',
    postTitle: '', 
    postDescription: '', 
    images: []
  };
};

export const INITIAL_ERRORS = {
  postTitle: '', 
  postDescription: '', 
  postType: '',
  images: ''
}

export const SUFFIX_OPTIONS = [
  { value: 'Jr', label: 'Jr - Junior' },
  { value: 'Sr', label: 'Sr - Senior' },
  { value: 'III', label: 'III - Third' },
  { value: 'IV', label: 'IV - Fourth' },
  { value: 'V', label: 'V - Fifth' },
];