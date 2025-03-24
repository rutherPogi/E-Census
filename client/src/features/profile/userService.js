import { put } from '../../utils/api/apiService';



export async function updateUserProfile(userID, userData) {
  try {
    const response = await put(`/auth/users/${userID}`, userData);
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to update profile');
  }
}

export async function changeUserPassword(userID, oldPassword, newPassword) {
  try {
    const response = await put(`/auth/users/${userID}/password`, { oldPassword, newPassword });
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to change password');
  }
}