package com.example.tfmmobile.data.provider

import android.util.Log
import com.example.tfmmobile.data.provider.network.TrainingApiService
import com.example.tfmmobile.domain.model.TrainingModel
import com.example.tfmmobile.domain.model.training.TrainingRepository
import javax.inject.Inject

class TrainingRepositoryImpl @Inject constructor(private val apiService: TrainingApiService) : TrainingRepository {
    override suspend fun getTrainingById(trainingId: Long): TrainingModel? {
        runCatching { apiService.getTrainingById(trainingId) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/TRAININGS by id FALLO: ${it}") }
        return null
    }

    override suspend fun getTrainings(): List<TrainingModel>? {
        runCatching { apiService.getTrainings() }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.map { it.toDomain() } }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/TRAININGS lista FALLO: ${it}") }
        return null
    }

    override suspend fun updateTraining(
        trainingId: Long,
        trainingDate: String,
        durationMinutes: String,
        description: String,
        objective: String
    ): TrainingModel? {
        runCatching { apiService.updateTraining(trainingId, trainingDate, durationMinutes, description, objective) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/TRAININGS update FALLO: ${it}") }
        return null
    }

    override suspend fun addTraining(
        teamId: Long,
        seasonId: Long,
        trainingDate: String,
        durationMinutes: String,
        description: String,
        objective: String
    ): TrainingModel? {
        runCatching {
            val adjustedTeamId = if (teamId < 1) null else teamId
            val adjustedSeasonId = if (seasonId < 1) null else seasonId
            apiService.addTraining(adjustedTeamId, adjustedSeasonId, trainingDate, durationMinutes,
            description, objective) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/TRAININGS ADD NEW FALLO: ${it}") }
        return null
    }
}