package com.example.tfmmobile.data.provider

import android.util.Log
import com.example.tfmmobile.data.provider.network.TeamApiService
import com.example.tfmmobile.data.provider.network.response.TeamResponse
import com.example.tfmmobile.domain.model.Repository
import com.example.tfmmobile.domain.model.Team
import com.example.tfmmobile.domain.model.TeamModel
import com.google.gson.annotations.SerializedName
import javax.inject.Inject

class RepositoryImpl @Inject constructor(private val apiService: TeamApiService):Repository {
    override suspend fun getTeamById(id: Long): TeamModel? {
//        Peticion Retrofit
        runCatching { apiService.getTeamById(id) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/TEAMS FALLO: ${it}") }
        return null
    }

    override suspend fun updateTeam(id: Long,
    teamName:String,
    arenaName: String,
    ownerName: String,
    description: String): TeamModel? {
//        Peticion Retrofit
        runCatching { apiService.updateTeam(id, teamName, arenaName, ownerName, description) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/TEAMS FALLO: ${it}") }
        return null
    }
}