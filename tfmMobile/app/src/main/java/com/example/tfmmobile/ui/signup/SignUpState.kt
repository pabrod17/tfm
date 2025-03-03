package com.example.tfmmobile.ui.signup

sealed class SignUpState {

    data object Loading: SignUpState()
    data class Error(var error:String): SignUpState()
    data class Success(val id: Long,
                       val userName:String,
                       val firstName: String,
                       val lastName: String,
                       val email: String,
                       val role: String): SignUpState()
}