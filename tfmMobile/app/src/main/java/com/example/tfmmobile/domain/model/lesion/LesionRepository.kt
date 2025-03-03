package com.example.tfmmobile.domain.model.lesion

import com.example.tfmmobile.domain.model.GameModel
import com.example.tfmmobile.domain.model.LesionModel
import com.example.tfmmobile.domain.model.TrainingModel

interface LesionRepository {

    suspend fun findLesionById(lesionId: Long): LesionModel?
    suspend fun findAllLesion(): List<LesionModel>?

}