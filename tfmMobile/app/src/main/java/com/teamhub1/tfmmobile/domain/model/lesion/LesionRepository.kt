package com.teamhub1.tfmmobile.domain.model.lesion

import com.teamhub1.tfmmobile.domain.model.LesionModel

interface LesionRepository {

    suspend fun findLesionById(lesionId: Long): LesionModel?
    suspend fun findAllLesion(): List<LesionModel>?

}