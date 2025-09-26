package com.teamhub1.tfmmobile.data.provider

import android.util.Log
import com.teamhub1.tfmmobile.data.provider.network.TeamApiService
import com.teamhub1.tfmmobile.domain.model.Repository
import com.teamhub1.tfmmobile.domain.model.TeamModel
import javax.inject.Inject

class RepositoryImpl @Inject constructor(private val apiService: TeamApiService):Repository {
    override suspend fun getTeamById(id: Long): TeamModel? {
//        Peticion Retrofit
        runCatching { apiService.getTeamById(id) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/TEAMS by id FALLO: ${it}") }
        return null
    }

    override suspend fun getTeams(): List<TeamModel>? {
//        Peticion Retrofit
        runCatching { apiService.getTeams() }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.map { it.toDomain() } }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/TEAMS lista FALLO: ${it}") }
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
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/TEAMS update FALLO: ${it}") }
        return null
    }

    override suspend fun addTeam(teamName:String,
                                    arenaName: String,
                                    ownerName: String,
                                    description: String): TeamModel? {
//        Peticion Retrofit
        runCatching { apiService.addTeam(teamName, arenaName, ownerName, description) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/TEAMS ADD NEW FALLO: ${it}") }
        return null
    }
}