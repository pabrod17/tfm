package com.teamhub1.tfmmobile.ui.login

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