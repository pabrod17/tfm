package com.example.tfmmobile.ui.health

import com.example.tfmmobile.domain.model.ExerciseModel
import com.example.tfmmobile.domain.model.StretchingModel

sealed class StretchingsState {

    data object Loading: StretchingsState()
    data class Error(var error:String): StretchingsState()
    data class Success(val strechings: List<StretchingModel>): StretchingsState()
}