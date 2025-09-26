package com.teamhub1.tfmmobile.data.provider

import android.util.Log
import com.teamhub1.tfmmobile.data.provider.network.PlayerApiService
import com.teamhub1.tfmmobile.domain.model.PlayerModel
import com.teamhub1.tfmmobile.domain.model.player.PlayerRepository
import javax.inject.Inject

class PlayerRepositoryImpl @Inject constructor(private val apiService: PlayerApiService): PlayerRepository {
    override suspend fun getPlayerById(playerId: Long): PlayerModel? {
        runCatching { apiService.getPlayerById(playerId) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/PLAYERS by id FALLO: ${it}") }
        return null
    }

    override suspend fun getPlayers(): List<PlayerModel>? {
        runCatching { apiService.getPlayers() }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.map { it.toDomain() } }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/PLAYERS lista FALLO: ${it}") }
        return null
    }

    override suspend fun updatePlayer(
        playerId: Long,
        playerName: String,
        primaryLastName: String,
        secondLastName: String,
        position: String,
        trends: String,
        phoneNumber: String,
        email: String,
        dni: String
    ): PlayerModel? {
        runCatching { apiService.updatePlayer(playerId, playerName, primaryLastName, secondLastName,
            position, trends, phoneNumber, email, dni) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/PLAYERS update FALLO: ${it}") }
        return null
    }

    override suspend fun addPlayer(
        teamId: Long,
        playerName: String,
        primaryLastName: String,
        secondLastName: String,
        position: String,
        trends: String,
        phoneNumber: String,
        email: String,
        dni: String
    ): PlayerModel? {
        runCatching { apiService.addPlayer(teamId, playerName, primaryLastName, secondLastName,
            position, trends, phoneNumber, email,dni) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/PLAYERS ADD NEW FALLO: ${it}") }
        return null
    }


}