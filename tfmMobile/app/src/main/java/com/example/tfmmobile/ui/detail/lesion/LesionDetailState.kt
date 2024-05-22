package com.example.tfmmobile.ui.detail.lesion

sealed class LesionDetailState {
    data object Loading: LesionDetailState()
    data class Error(var error:String): LesionDetailState()
    data class Success(val id: Long,
                       val lesionName: String,
                       val description: String,
                       val medication: String,
                       val lesionType: String): LesionDetailState()

}