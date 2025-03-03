package com.example.tfmmobile.domain.model.usecase

import com.example.tfmmobile.domain.model.Repository
import javax.inject.Inject

class GetTeamsUseCase @Inject constructor(private val repository: Repository) {

    suspend operator fun invoke(id:Long) = repository.getTeamById(id)
    suspend operator fun invoke() = repository.getTeams()

    suspend operator fun invoke(id: Long,
                                teamName:String,
                                arenaName: String,
                                ownerName: String,
                                description: String) = repository.updateTeam(id, teamName, arenaName, ownerName, description)

    suspend operator fun invoke(teamName:String,
                                arenaName: String,
                                ownerName: String,
                                description: String) = repository.addTeam(teamName, arenaName, ownerName, description)

}