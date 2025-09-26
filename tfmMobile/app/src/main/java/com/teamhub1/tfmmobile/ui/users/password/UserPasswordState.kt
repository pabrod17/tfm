package com.teamhub1.tfmmobile.ui.users.password

sealed class UserPasswordState {

    data object Loading: UserPasswordState()
    data class Error(var error:String): UserPasswordState()
    data class Success(val id: String): UserPasswordState()
}