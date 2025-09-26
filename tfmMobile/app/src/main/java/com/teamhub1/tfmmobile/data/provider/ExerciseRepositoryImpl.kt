package com.teamhub1.tfmmobile.data.provider

import android.util.Log
import com.teamhub1.tfmmobile.data.provider.network.ExerciseApiService
import com.teamhub1.tfmmobile.domain.model.ExerciseModel
import com.teamhub1.tfmmobile.domain.model.exercise.ExerciseRepository
import javax.inject.Inject

class ExerciseRepositoryImpl @Inject constructor(private val apiService: ExerciseApiService) : ExerciseRepository {

    override suspend fun findExerciseById(exerciseId: Long): ExerciseModel? {
        runCatching { apiService.findExerciseById(exerciseId) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/EXERCISES by id FALLO: ${it}") }
        return null
    }

    override suspend fun findAllExercises(): List<ExerciseModel>? {
        runCatching { apiService.findAllExercises() }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.map { it.toDomain() } }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/EXERCISES lista FALLO: ${it}") }
        return null
    }


}