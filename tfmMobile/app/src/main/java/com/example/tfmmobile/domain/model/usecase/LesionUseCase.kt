package com.example.tfmmobile.domain.model.usecase

import com.example.tfmmobile.domain.model.game.GameRepository
import com.example.tfmmobile.domain.model.lesion.LesionRepository
import javax.inject.Inject

class LesionUseCase @Inject constructor(private val lesionRepository: LesionRepository) {

    suspend operator fun invoke(id:Long) = lesionRepository.findLesionById(id)
    suspend operator fun invoke() = lesionRepository.findAllLesion()


}