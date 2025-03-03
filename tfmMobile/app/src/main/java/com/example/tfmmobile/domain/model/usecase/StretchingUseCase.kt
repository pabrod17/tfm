package com.example.tfmmobile.domain.model.usecase

import com.example.tfmmobile.domain.model.stretching.StretchingRepository
import javax.inject.Inject

class StretchingUseCase @Inject constructor(private val stretchingRepository: StretchingRepository) {

    suspend operator fun invoke(id:Long) = stretchingRepository.findStretchingById(id)
    suspend operator fun invoke() = stretchingRepository.findAllStretchings()


}