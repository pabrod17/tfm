package com.example.tfmmobile.data.provider.network.response

import com.example.tfmmobile.TfmMobileApp
import com.example.tfmmobile.TfmMobileApp.Companion.prefs
import com.example.tfmmobile.domain.model.UserModel
import com.google.gson.annotations.SerializedName

data class SignUpResponse (
    @SerializedName("serviceToken") val serviceToken: String,
    @SerializedName("user") val user: UserResponse
) {

    fun toDomain(): UserModel {
        prefs.saveAuthToken(serviceToken)
        prefs.saveUserId(user.id.toString())
        prefs.saveUserName(user.userName)
        prefs.saveUserFirstName(user.firstName)
        prefs.saveUserSurnames(user.lastName)
        prefs.saveUserEmail(user.email)
        prefs.saveLoginState("opened")
        return UserModel(
            id = user.id,
            userName = user.userName,
            firstName = user.firstName,
            lastName = user.lastName,
            email = user.email,
            role = user.role)
    }
}