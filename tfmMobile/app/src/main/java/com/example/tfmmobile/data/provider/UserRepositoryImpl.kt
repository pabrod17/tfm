package com.example.tfmmobile.data.provider

import android.util.Log
import com.example.tfmmobile.data.provider.network.TeamApiService
import com.example.tfmmobile.data.provider.network.UserApiService
import com.example.tfmmobile.data.provider.network.dto.LoginDto
import com.example.tfmmobile.domain.model.UserModel
import com.example.tfmmobile.domain.model.user.UserRepository
import javax.inject.Inject

class UserRepositoryImpl @Inject constructor(private val apiService: UserApiService): UserRepository {
    override suspend fun login(userName: String, password: String): UserModel? {
//        Peticion Retrofit
        runCatching { apiService.login(LoginDto(userName, password)) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/USER LOGIN: ${it}") }
        return null
    }
}