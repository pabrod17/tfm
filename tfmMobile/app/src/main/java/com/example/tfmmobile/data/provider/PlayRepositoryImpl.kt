package com.example.tfmmobile.data.provider

import android.util.Log
import com.example.tfmmobile.data.provider.network.PlayApiService
import com.example.tfmmobile.data.provider.network.PlayerApiService
import com.example.tfmmobile.data.provider.network.response.PlayerResponse
import com.example.tfmmobile.domain.model.PlayModel
import com.example.tfmmobile.domain.model.PlayerModel
import com.example.tfmmobile.domain.model.Repository
import com.example.tfmmobile.domain.model.TeamModel
import com.example.tfmmobile.domain.model.play.PlayRepository
import com.example.tfmmobile.domain.model.player.PlayerRepository
import javax.inject.Inject

class PlayRepositoryImpl @Inject constructor(private val apiService: PlayApiService):
    PlayRepository {
    override suspend fun findPlayById(playId: Long): PlayModel? {
        runCatching { apiService.findPlayById(playId) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/PLAYS by id FALLO: ${it}") }
        return null
    }

    override suspend fun findPlaysByUserId(): List<PlayModel>? {
        runCatching { apiService.findPlaysByUserId() }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.map { it.toDomain() } }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/PLAYS lista FALLO: ${it}") }
        return null
    }

    override suspend fun updatePlay(
        playId: Long,
        title: String,
        playType: String,
        gesture: String,
        pointGuardText: String,
        shootingGuardText: String,
        smallForwardText: String,
        powerForwardText: String,
        centerText: String,
        description: String
    ): PlayModel? {
        runCatching { apiService.updatePlay(playId,
            title,
            playType,
            gesture,
            pointGuardText,
            shootingGuardText,
            smallForwardText,
            powerForwardText,
            centerText,
            description) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/PLAYS update FALLO: ${it}") }
        return null
    }

    override suspend fun addPlay(
        teamId:Long,
        title: String,
        playType: String,
        gesture: String,
        pointGuardText: String,
        shootingGuardText: String,
        smallForwardText: String,
        powerForwardText: String,
        centerText: String,
        description: String
    ): PlayModel? {
        runCatching { apiService.addPlay(teamId,
            title,
            playType,
            gesture,
            pointGuardText,
            shootingGuardText,
            smallForwardText,
            powerForwardText,
            centerText,
            description) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/PLAYS ADD NEW FALLO: ${it}") }
        return null
    }


}