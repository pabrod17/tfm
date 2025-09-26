package com.teamhub1.tfmmobile.domain.model.exercise

import com.teamhub1.tfmmobile.domain.model.ExerciseModel

interface ExerciseRepository {

    suspend fun findExerciseById(exerciseId: Long): ExerciseModel?
    suspend fun findAllExercises(): List<ExerciseModel>?

}