package com.example.tfmmobile.ui.login

import com.example.tfmmobile.ui.detail.TeamDetailState
import com.google.gson.annotations.SerializedName

sealed class LoginState {

    data object Loading: LoginState()
    data class Error(var error:String): LoginState()
    data class Success(val id: Long,
                       val userName:String,
                       val firstName: String,
                       val lastName: String,
                       val email: String,
                       val role: String): LoginState()
}