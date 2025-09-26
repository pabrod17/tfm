package com.teamhub1.tfmmobile.data.provider

import android.util.Log
import com.teamhub1.tfmmobile.data.provider.network.StretchingApiService
import com.teamhub1.tfmmobile.domain.model.StretchingModel
import com.teamhub1.tfmmobile.domain.model.stretching.StretchingRepository
import javax.inject.Inject

class StretchingRepositoryImpl @Inject constructor(private val apiService: StretchingApiService) : StretchingRepository {

    override suspend fun findStretchingById(stretchingId: Long): StretchingModel? {
        runCatching { apiService.findStretchingById(stretchingId) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/STRECHINGS by id FALLO: ${it}") }
        return null
    }

    override suspend fun findAllStretchings(): List<StretchingModel>? {
        runCatching { apiService.findAllStretchings() }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.map { it.toDomain() } }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/STRECHINGS lista FALLO: ${it}") }
        return null
    }


}