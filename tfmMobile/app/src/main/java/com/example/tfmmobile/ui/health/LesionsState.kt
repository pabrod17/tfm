package com.example.tfmmobile.ui.health

import com.example.tfmmobile.domain.model.LesionModel

sealed class LesionsState {

    data object Loading: LesionsState()
    data class Error(var error:String): LesionsState()
    data class Success(val lesions: List<LesionModel>): LesionsState()
}