package com.teamhub1.tfmmobile.domain.model.usecase

import com.teamhub1.tfmmobile.domain.model.season.SeasonRepository
import javax.inject.Inject

class SeasonUseCase @Inject constructor(private val seasonRepository: SeasonRepository) {

    suspend operator fun invoke(id:Long) = seasonRepository.getSeasonById(id)
    suspend operator fun invoke() = seasonRepository.getSeasons()

    suspend operator fun invoke(id: Long,
                                startDate: String,
                                endDate: String,
                                seasonName: String,
                                description: String) = seasonRepository.updateSeason(id, startDate, endDate, seasonName, description)

    suspend operator fun invoke(startDate: String,
                                endDate: String,
                                seasonName: String,
                                description: String) = seasonRepository.addSeason(startDate, endDate, seasonName, description)
}