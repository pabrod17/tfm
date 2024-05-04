package com.example.tfmmobile.data.provider.network.response

import com.google.gson.annotations.SerializedName

data class UserResponse (@SerializedName("id") val id: Long,
                         @SerializedName("userName") val userName:String,
                         @SerializedName("firstName") val firstName: String,
                         @SerializedName("lastName") val lastName: String,
                         @SerializedName("email") val email: String,
                         @SerializedName("role") val role: String) {
}