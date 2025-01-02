import { axiosInstance, handleError, handleResponse } from './axiosInstance'

export const userList = async (token, data) =>
    await axiosInstance(token)
        .get(`Users/${data}`)
        .then(handleResponse)
        .catch(handleError);

export const userRolesList = async (token) =>
    await axiosInstance(token)
        .get(`UserRoles`)
        .then(handleResponse)
        .catch(handleError);

        
export const getTestingOffice = async (token, params) =>
    await axiosInstance(token)
        .get(`TestingOffice${params}`)
        .then(handleResponse)
        .catch(handleError);
