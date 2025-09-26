package com.teamhub1.tfmmobile.domain.model.usecase

import com.teamhub1.tfmmobile.domain.model.exercise.ExerciseRepository
import javax.inject.Inject

class ExerciseUseCase @Inject constructor(private val exerciseRepository: ExerciseRepository) {

    suspend operator fun invoke(id:Long) = exerciseRepository.findExerciseById(id)
    suspend operator fun invoke() = exerciseRepository.findAllExercises()


}