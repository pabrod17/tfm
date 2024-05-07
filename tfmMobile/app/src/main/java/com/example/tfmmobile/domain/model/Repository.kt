package com.example.tfmmobile.domain.model

import com.example.tfmmobile.data.provider.network.response.TeamResponse

interface Repository {
    suspend fun getTeamById(id:Long): TeamModel?
    suspend fun getTeams(): List<TeamModel>?
    suspend fun updateTeam(id: Long,
                           teamName:String,
                           arenaName: String,
                           ownerName: String,
                           description: String): TeamModel?

}