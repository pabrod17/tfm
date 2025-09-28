package com.teamhub1.tfmmobile.domain.model.usecase

import com.teamhub1.tfmmobile.domain.model.training.TrainingRepository
import javax.inject.Inject

class TrainingUseCase @Inject constructor(private val trainingRepository: TrainingRepository) {

    suspend operator fun invoke(id: Long) = trainingRepository.getTrainingById(id)
    suspend operator fun invoke() = trainingRepository.getTrainings()

    suspend operator fun invoke(
        trainingId: Long,
        trainingDate: String,
        durationMinutes: Int,
        description: String,
        objective: String
    ) = trainingRepository.updateTraining(
        trainingId,
        trainingDate,
        durationMinutes,
        description,
        objective
    )

    suspend operator fun invoke(
        teamId: Long,
        seasonId: Long,
        trainingDate: String,
        durationMinutes: Int,
        description: String,
        objective: String
    ) = trainingRepository.addTraining(
        teamId, seasonId, trainingDate, durationMinutes,
        description, objective
    )
}