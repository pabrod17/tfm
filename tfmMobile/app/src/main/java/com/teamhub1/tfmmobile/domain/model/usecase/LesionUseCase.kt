package com.teamhub1.tfmmobile.domain.model.usecase

import com.teamhub1.tfmmobile.domain.model.lesion.LesionRepository
import javax.inject.Inject

class LesionUseCase @Inject constructor(private val lesionRepository: LesionRepository) {

    suspend operator fun invoke(id:Long) = lesionRepository.findLesionById(id)
    suspend operator fun invoke() = lesionRepository.findAllLesion()


}