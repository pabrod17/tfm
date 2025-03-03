package com.example.tfmmobile.domain.model.usecase

import com.example.tfmmobile.domain.model.exercise.ExerciseRepository
import javax.inject.Inject

class ExerciseUseCase @Inject constructor(private val exerciseRepository: ExerciseRepository) {

    suspend operator fun invoke(id:Long) = exerciseRepository.findExerciseById(id)
    suspend operator fun invoke() = exerciseRepository.findAllExercises()


}