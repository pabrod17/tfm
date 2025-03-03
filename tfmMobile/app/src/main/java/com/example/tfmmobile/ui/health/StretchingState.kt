package com.example.tfmmobile.ui.health

sealed class StretchingState {

    data object Loading: StretchingState()
    data class Error(var error:String): StretchingState()
    data class Success(val id: Long,
                       val stretchingName: String,
                       val description: String,
                       val stretchingType: String): StretchingState()
}