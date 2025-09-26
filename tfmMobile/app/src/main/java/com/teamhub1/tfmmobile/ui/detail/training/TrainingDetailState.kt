package com.teamhub1.tfmmobile.ui.detail.training

sealed class TrainingDetailState {
    data object Loading: TrainingDetailState()
    data class Error(var error:String): TrainingDetailState()
    data class Success(val id: Long,
                       val trainingDate: String,
                       val durationMinutes: String,
                       val description: String,
                       val objective: String): TrainingDetailState()

}