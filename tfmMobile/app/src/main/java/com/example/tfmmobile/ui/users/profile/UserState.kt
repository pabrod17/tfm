package com.example.tfmmobile.ui.users.profile

sealed class UserState {

    data object Loading: UserState()
    data class Error(var error:String): UserState()
    data class Success(val id: Long,
                       val userName:String,
                       val firstName: String,
                       val lastName: String,
                       val email: String,
                       val role: String): UserState()
}