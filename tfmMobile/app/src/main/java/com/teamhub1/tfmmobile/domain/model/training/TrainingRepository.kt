package com.teamhub1.tfmmobile.domain.model.training

import com.teamhub1.tfmmobile.domain.model.TrainingModel

interface TrainingRepository {

    suspend fun getTrainingById(trainingId: Long): TrainingModel?
    suspend fun getTrainings(): List<TrainingModel>?
    suspend fun updateTraining(
        trainingId: Long,
        trainingDate: String,
        durationMinutes: String,
        description: String,
        objective: String
    ): TrainingModel?

    suspend fun addTraining(
        teamId: Long,
        seasonId: Long,
        trainingDate: String,
        durationMinutes: String,
        description: String,
        objective: String
    ): TrainingModel?
}