package com.example.tfmmobile.ui.health

sealed class LesionState {

    data object Loading: LesionState()
    data class Error(var error:String): LesionState()
    data class Success(val id: Long,
                       val lesionName: String,
                       val description: String,
                       val medication: String,
                       val lesionType: String): LesionState()
}