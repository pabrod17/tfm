package com.teamhub1.tfmmobile.domain.model

interface Repository {
    suspend fun getTeamById(id:Long): TeamModel?
    suspend fun getTeams(): List<TeamModel>?
    suspend fun updateTeam(id: Long,
                           teamName:String,
                           arenaName: String,
                           ownerName: String,
                           description: String): TeamModel?

    suspend fun addTeam(teamName:String,
                           arenaName: String,
                           ownerName: String,
                           description: String): TeamModel?

}