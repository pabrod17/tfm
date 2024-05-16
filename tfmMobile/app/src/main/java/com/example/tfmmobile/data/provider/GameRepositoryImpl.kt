package com.example.tfmmobile.data.provider

import android.util.Log
import com.example.tfmmobile.data.provider.network.GameApiService
import com.example.tfmmobile.data.provider.network.SeasonApiService
import com.example.tfmmobile.domain.model.GameModel
import com.example.tfmmobile.domain.model.game.GameRepository
import javax.inject.Inject

class GameRepositoryImpl @Inject constructor(private val apiService: GameApiService) : GameRepository {
    override suspend fun getGameById(gameId: Long): GameModel? {
        runCatching { apiService.getGameById(gameId) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/GAMES by id FALLO: ${it}") }
        return null
    }

    override suspend fun getGames(): List<GameModel>? {
        runCatching { apiService.getGames() }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.map { it.toDomain() } }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/GAMES lista FALLO: ${it}") }
        return null
    }

    override suspend fun updateGame(
        gameId: Long,
        gameDate: String,
        rival: String,
        description: String
    ): GameModel? {
        runCatching { apiService.updateGame(gameId, gameDate, rival, description) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/GAMES update FALLO: ${it}") }
        return null
    }

    override suspend fun addGame(
        teamId: Long,
        seasonId: Long,
        gameDate: String,
        rival: String,
        description: String
    ): GameModel? {
        runCatching {
            apiService.addGame(teamId, seasonId, gameDate, rival,
            description) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/GAMES ADD NEW FALLO: ${it}") }
        return null
    }
}