package com.teamhub1.tfmmobile.ui.health

import com.teamhub1.tfmmobile.domain.model.LesionModel

sealed class LesionsState {

    data object Loading: LesionsState()
    data class Error(var error:String): LesionsState()
    data class Success(val lesions: List<LesionModel>): LesionsState()
}