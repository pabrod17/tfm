package com.example.tfmmobile.data.provider

import android.util.Log
import com.example.tfmmobile.TfmMobileApp.Companion.prefs
import com.example.tfmmobile.data.provider.network.TeamApiService
import com.example.tfmmobile.data.provider.network.UserApiService
import com.example.tfmmobile.data.provider.network.dto.ChangePasswordDto
import com.example.tfmmobile.data.provider.network.dto.LoginDto
import com.example.tfmmobile.data.provider.network.dto.SignUpDto
import com.example.tfmmobile.data.provider.network.dto.UserDto
import com.example.tfmmobile.domain.model.UserModel
import com.example.tfmmobile.domain.model.user.UserRepository
import javax.inject.Inject

class UserRepositoryImpl @Inject constructor(private val apiService: UserApiService): UserRepository {
    override suspend fun login(userName: String, password: String): UserModel? {
//        Peticion Retrofit
        runCatching { apiService.login(LoginDto(userName, password)) }
            .onSuccess {
                prefs.saveUserPassword(password)
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/USER LOGIN: ${it}") }
        return null
    }

    override suspend fun signUp(
        userName: String,
        firstName: String,
        lastName: String,
        email: String,
        password: String
    ): UserModel? {
        runCatching { apiService.signUp(SignUpDto(userName, firstName, lastName, email, password)) }
            .onSuccess {
                prefs.saveUserPassword(password)
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/USER SIGN_UP: ${it}") }
        return null
    }

    override suspend fun updateProfile(
        id: Long,
        userName: String,
        firstName: String,
        lastName: String,
        email: String,
    ): UserModel? {
        runCatching { apiService.updateProfile(id, UserDto(userName, firstName, lastName, email)) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                prefs.saveUserName(userName)
                prefs.saveUserFirstName(firstName)
                prefs.saveUserSurnames(lastName)
                prefs.saveUserEmail(email)
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/USER UPDATE_PROFILE: ${it}") }
        return null
    }

    override suspend fun changePassword(id: Long, oldPassword: String, newPassword: String) {
        runCatching { apiService.changePassword(id, ChangePasswordDto(oldPassword, newPassword)) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                prefs.saveUserPassword(newPassword)
                return it }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/USER CHANGE_PASSWORD: ${it}") }
    }

}