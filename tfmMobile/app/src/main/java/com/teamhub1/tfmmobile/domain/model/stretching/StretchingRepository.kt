package com.teamhub1.tfmmobile.domain.model.stretching

import com.teamhub1.tfmmobile.domain.model.StretchingModel

interface StretchingRepository {

    suspend fun findStretchingById(stretchingId: Long): StretchingModel?
    suspend fun findAllStretchings(): List<StretchingModel>?

}