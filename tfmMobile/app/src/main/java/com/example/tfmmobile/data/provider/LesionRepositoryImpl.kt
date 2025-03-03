package com.example.tfmmobile.data.provider

import android.util.Log
import com.example.tfmmobile.data.provider.network.LesionApiService
import com.example.tfmmobile.domain.model.LesionModel
import com.example.tfmmobile.domain.model.lesion.LesionRepository
import javax.inject.Inject

class LesionRepositoryImpl @Inject constructor(private val apiService: LesionApiService) : LesionRepository {

    override suspend fun findLesionById(lesionId: Long): LesionModel? {
        runCatching { apiService.findLesionById(lesionId) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/LESION by id FALLO: ${it}") }
        return null
    }

    override suspend fun findAllLesion(): List<LesionModel>? {
        runCatching { apiService.findAllLesion() }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.map { it.toDomain() } }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/LESION lista FALLO: ${it}") }
        return null
    }


}