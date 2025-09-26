package com.teamhub1.tfmmobile.domain.model.season

import com.teamhub1.tfmmobile.domain.model.SeasonModel

interface SeasonRepository {

    suspend fun getSeasonById(id:Long): SeasonModel?
    suspend fun getSeasons(): List<SeasonModel>?
    suspend fun updateSeason(id: Long,
                             startDate: String,
                             endDate: String,
                             seasonName: String,
                             description: String): SeasonModel?

    suspend fun addSeason(startDate: String,
                          endDate: String,
                          seasonName: String,
                          description: String): SeasonModel?
}