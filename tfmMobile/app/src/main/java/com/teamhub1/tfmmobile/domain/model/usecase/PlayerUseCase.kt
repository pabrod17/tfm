package com.teamhub1.tfmmobile.domain.model.usecase

import com.teamhub1.tfmmobile.domain.model.player.PlayerRepository
import javax.inject.Inject

class PlayerUseCase @Inject constructor(private val playerRepository: PlayerRepository) {

    suspend operator fun invoke(playerId:Long) = playerRepository.getPlayerById(playerId)
    suspend operator fun invoke() = playerRepository.getPlayers()

    suspend operator fun invoke(playerId:Long,
                                playerName: String,
                                primaryLastName: String,
                                secondLastName: String,
                                position: String,
                                trends: String,
                                phoneNumber: String,
                                email: String,
                                dni: String,
                                teamId: Long,
                                injured: Boolean) = playerRepository.updatePlayer(playerId, playerName, primaryLastName, secondLastName,
        position, trends, phoneNumber, email, dni)

    suspend operator fun invoke(teamId: Long,
                                playerName: String,
                                primaryLastName: String,
                                secondLastName: String,
                                position: String,
                                trends: String,
                                phoneNumber: String,
                                email: String,
                                dni: String) = playerRepository.addPlayer(teamId, playerName, primaryLastName, secondLastName,
        position, trends, phoneNumber, email,dni)

}