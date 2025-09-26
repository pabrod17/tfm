package com.teamhub1.tfmmobile.data.provider

import android.util.Log
import com.teamhub1.tfmmobile.data.provider.network.SeasonApiService
import com.teamhub1.tfmmobile.domain.model.SeasonModel
import com.teamhub1.tfmmobile.domain.model.season.SeasonRepository
import javax.inject.Inject

class SeasonRepositoryImpl @Inject constructor(private val apiService: SeasonApiService) : SeasonRepository {
    override suspend fun getSeasonById(id: Long): SeasonModel? {
        runCatching { apiService.getSeasonById(id) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/SEASONS by id FALLO: ${it}") }
        return null
    }

    override suspend fun getSeasons(): List<SeasonModel>? {
        runCatching { apiService.getSeasons() }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.map { it.toDomain() } }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/SEASONS lista FALLO: ${it}") }
        return null
    }

    override suspend fun updateSeason(
        id: Long,
        startDate: String,
        endDate: String,
        seasonName: String,
        description: String
    ): SeasonModel? {
        runCatching { apiService.updateSeason(id, startDate, endDate, seasonName,
            description) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/SEASONS update FALLO: ${it}") }
        return null
    }

    override suspend fun addSeason(
        startDate: String,
        endDate: String,
        seasonName: String,
        description: String
    ): SeasonModel? {
        runCatching { apiService.addSeason(startDate, endDate, seasonName,
            description) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/SEASONS ADD NEW FALLO: ${it}") }
        return null
    }
}