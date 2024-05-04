package com.example.tfmmobile.domain.model.user

import com.example.tfmmobile.domain.model.UserModel

interface UserRepository {

    suspend fun login(userName: String, password:String): UserModel?

}