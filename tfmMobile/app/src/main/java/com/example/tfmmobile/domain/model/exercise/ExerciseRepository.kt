package com.example.tfmmobile.domain.model.exercise

import com.example.tfmmobile.domain.model.ExerciseModel
import com.example.tfmmobile.domain.model.GameModel
import com.example.tfmmobile.domain.model.LesionModel
import com.example.tfmmobile.domain.model.TrainingModel

interface ExerciseRepository {

    suspend fun findExerciseById(exerciseId: Long): ExerciseModel?
    suspend fun findAllExercises(): List<ExerciseModel>?

}