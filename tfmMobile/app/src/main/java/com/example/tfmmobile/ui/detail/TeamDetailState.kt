package com.example.tfmmobile.ui.detail

sealed class TeamDetailState {
    data object Loading:TeamDetailState()
    data class Error(var error:String):TeamDetailState()
    data class Success(val data:String, val description:String):TeamDetailState()

}