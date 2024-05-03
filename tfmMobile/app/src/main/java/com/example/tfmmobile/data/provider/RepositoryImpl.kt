package com.example.tfmmobile.data.provider

import android.util.Log
import com.example.tfmmobile.data.provider.network.TeamApiService
import com.example.tfmmobile.data.provider.network.response.TeamResponse
import com.example.tfmmobile.domain.model.Repository
import com.example.tfmmobile.domain.model.Team
import com.example.tfmmobile.domain.model.TeamModel
import javax.inject.Inject

class RepositoryImpl @Inject constructor(private val apiService: TeamApiService):Repository {
    override suspend fun getTeams(userId: Long): TeamModel? {
//        Peticion Retrofit
        runCatching { apiService.getTeams() }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/TEAMS FALLO: ${it}") }
        return null
    }
}