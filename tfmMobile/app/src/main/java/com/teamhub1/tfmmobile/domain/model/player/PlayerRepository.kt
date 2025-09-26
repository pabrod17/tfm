package com.teamhub1.tfmmobile.domain.model.player

import com.teamhub1.tfmmobile.domain.model.PlayerModel

interface PlayerRepository {

    suspend fun getPlayerById(playerId:Long): PlayerModel?
    suspend fun getPlayers(): List<PlayerModel>?
    suspend fun updatePlayer(playerId:Long,
                             playerName: String,
                             primaryLastName: String,
                             secondLastName: String,
                             position: String,
                             trends: String,
                             phoneNumber: String,
                             email: String,
                             dni: String): PlayerModel?

    suspend fun addPlayer(teamId:Long,
                          playerName: String,
                          primaryLastName: String,
                          secondLastName: String,
                          position: String,
                          trends: String,
                          phoneNumber: String,
                          email: String,
                          dni: String): PlayerModel?
}