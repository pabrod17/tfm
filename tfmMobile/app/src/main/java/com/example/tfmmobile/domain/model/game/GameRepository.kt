package com.example.tfmmobile.domain.model.game

import com.example.tfmmobile.domain.model.GameModel
import com.example.tfmmobile.domain.model.PlayerModel

interface GameRepository {

    suspend fun getGameById(gameId:Long): GameModel?
    suspend fun getGames(): List<GameModel>?
    suspend fun updateGame(gameId:Long,
                           gameDate: String,
                           rival: String,
                           description: String): GameModel?

    suspend fun addGame(teamId:Long,
                        seasonId: Long,
                        gameDate: String,
                        rival: String,
                        description: String): GameModel?
}