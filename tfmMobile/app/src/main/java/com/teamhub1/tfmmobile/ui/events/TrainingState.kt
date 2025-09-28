package com.teamhub1.tfmmobile.ui.events

sealed class TrainingState {

    data object Loading: TrainingState()
    data class Error(var error:String): TrainingState()
    data class Success(val id: Long,
                       val trainingDate: String,
                       val durationMinutes: Int,
                       val description: String,
                       val objective: String): TrainingState()
}