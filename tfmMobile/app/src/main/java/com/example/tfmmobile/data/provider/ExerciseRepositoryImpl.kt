package com.example.tfmmobile.data.provider

import android.util.Log
import com.example.tfmmobile.data.provider.network.ExerciseApiService
import com.example.tfmmobile.domain.model.ExerciseModel
import com.example.tfmmobile.domain.model.exercise.ExerciseRepository
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