package com.teamhub1.tfmmobile.data.provider.network.response

import com.teamhub1.tfmmobile.domain.model.UserModel
import com.google.gson.annotations.SerializedName

data class UserResponse (@SerializedName("id") val id: Long,
                         @SerializedName("userName") val userName:String,
                         @SerializedName("firstName") val firstName: String,
                         @SerializedName("lastName") val lastName: String,
                         @SerializedName("email") val email: String,
                         @SerializedName("role") val role: String,
                         @SerializedName("password") val password: String
    ) {

    fun toDomain(): UserModel {
        return UserModel(
            id = id,
            userName = userName,
            firstName = firstName,
            lastName = lastName,
            email = email,
            role = role)
    }
}