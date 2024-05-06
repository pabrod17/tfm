package com.example.tfmmobile.domain.model.user

import com.example.tfmmobile.domain.model.UserModel

interface UserRepository {

    suspend fun login(userName: String, password:String): UserModel?
    suspend fun signUp(userName: String, firstName: String, lastName: String, email: String, password:String): UserModel?

}