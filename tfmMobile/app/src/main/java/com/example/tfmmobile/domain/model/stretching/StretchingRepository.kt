package com.example.tfmmobile.domain.model.stretching

import com.example.tfmmobile.domain.model.GameModel
import com.example.tfmmobile.domain.model.LesionModel
import com.example.tfmmobile.domain.model.StretchingModel
import com.example.tfmmobile.domain.model.TrainingModel

interface StretchingRepository {

    suspend fun findStretchingById(stretchingId: Long): StretchingModel?
    suspend fun findAllStretchings(): List<StretchingModel>?

}