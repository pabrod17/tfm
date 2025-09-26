package com.teamhub1.tfmmobile.domain.model.user

import com.teamhub1.tfmmobile.domain.model.UserModel

interface UserRepository {

    suspend fun login(userName: String, password:String): UserModel?
    suspend fun signUp(userName: String, firstName: String, lastName: String, email: String, password:String): UserModel?
    suspend fun updateProfile(id: Long, userName: String, firstName: String, lastName: String, email: String): UserModel?
    suspend fun changePassword(id: Long, oldPassword: String, newPassword: String)

}