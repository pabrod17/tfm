package com.teamhub1.tfmmobile.data.provider.network.response

import com.teamhub1.tfmmobile.TfmMobileApp.Companion.prefs
import com.teamhub1.tfmmobile.domain.model.UserModel
import com.google.gson.annotations.SerializedName

data class LoginResponse(
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