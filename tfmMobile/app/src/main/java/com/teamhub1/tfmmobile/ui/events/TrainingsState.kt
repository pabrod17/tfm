package com.teamhub1.tfmmobile.ui.events

import com.teamhub1.tfmmobile.domain.model.TrainingModel

sealed class TrainingsState {

    data object Loading: TrainingsState()
    data class Error(var error:String): TrainingsState()
    data class Success(val seasons: List<TrainingModel>): TrainingsState()
}