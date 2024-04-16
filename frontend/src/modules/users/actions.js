import * as actionTypes from './actionTypes';
import backend from '../../backend';

const signUpCompleted = authenticatedUser => ({
    type: actionTypes.SIGN_UP_COMPLETED,
    authenticatedUser
});

export const signUp = (user, onSuccess, onErrors, reauthenticationCallback) => dispatch =>
    backend.userService.signUp(user,
        authenticatedUser => {
            dispatch(signUpCompleted(authenticatedUser));
            onSuccess();
        },
        onErrors,
        reauthenticationCallback);

const loginCompleted = authenticatedUser => ({
    type: actionTypes.LOGIN_COMPLETED,
    authenticatedUser
});

export const login = (userName, password, onSuccess, onErrors, reauthenticationCallback) => dispatch =>
    backend.userService.login(userName, password,
        authenticatedUser => {
            dispatch(loginCompleted(authenticatedUser));
            onSuccess();
        },
        onErrors,
        reauthenticationCallback
    );

export const tryLoginFromServiceToken = reauthenticationCallback => dispatch =>
    backend.userService.tryLoginFromServiceToken(
        authenticatedUser => {
            if (authenticatedUser) {
                dispatch(loginCompleted(authenticatedUser));
            }
        },
        reauthenticationCallback
    );
    

export const logout = () => {

    backend.userService.logout();

    return {type: actionTypes.LOGOUT};

};

export const updateProfileCompleted = user => ({
    type: actionTypes.UPDATE_PROFILE_COMPLETED,
    user
})

export const updateProfile = (user, onSuccess, onErrors) => dispatch =>
    backend.userService.updateProfile(user, 
        user => {
            dispatch(updateProfileCompleted(user));
            onSuccess();
        },
        onErrors);

export const changePassword = (id, oldPassword, newPassword, onSuccess, onErrors) => dispatch =>
    backend.userService.changePassword(id, oldPassword, newPassword, onSuccess, onErrors);






export const signUpByCoach = (user, onSuccess, onErrors)  =>{
    backend.userService.signUpByCoach(user, onSuccess, onErrors);
    return {type: actionTypes.SIGN_UP_BY_COACH_COMPLETED};
}
    



const findUsersByCoachIdCompleted = users => ({
    type: actionTypes.FIND_USERS_BY_COACH_ID_COMPLETED,
    users
});

export const findUsersByCoachId = (onSuccess, onErrors) => dispatch => {
    backend.userService.findUsersByCoachId(
        users => {
            dispatch(findUsersByCoachIdCompleted(users));
            onSuccess();
        },
        onErrors);
}

const findUsersByAdminIdCompleted = users => ({
    type: actionTypes.FIND_USERS_BY_ADMIN_ID_COMPLETED,
    users
});

export const findUsersByAdminId = (onSuccess, onErrors) => dispatch => {
    backend.userService.findUsersByAdminId(
        users => {
            dispatch(findUsersByAdminIdCompleted(users));
            onSuccess();
        },
        onErrors);
}

export const removeUserByCoach = (userIdByCoach, onSuccess, onErrors) => {
    backend.userService.removeUserByCoach(userIdByCoach, onSuccess, onErrors);
    return {type: actionTypes.REMOVE_USER_BY_COACH_COMPLETED};
}

export const removeUserByAdmin = (userIdByAdmin, onSuccess, onErrors) => {
    backend.userService.removeUserByAdmin(userIdByAdmin, onSuccess, onErrors);
    return {type: actionTypes.REMOVE_USER_BY_ADMIN_COMPLETED};
}