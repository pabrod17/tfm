package com.teamhub1.tfmmobile.domain.model.game

import com.teamhub1.tfmmobile.domain.model.GameModel

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