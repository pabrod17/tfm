package com.example.tfmmobile.ui.events

import com.example.tfmmobile.domain.model.TrainingModel

sealed class TrainingsState {

    data object Loading: TrainingsState()
    data class Error(var error:String): TrainingsState()
    data class Success(val seasons: List<TrainingModel>): TrainingsState()
}