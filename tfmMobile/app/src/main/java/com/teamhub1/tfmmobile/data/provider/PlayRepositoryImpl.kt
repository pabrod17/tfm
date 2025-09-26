package com.teamhub1.tfmmobile.data.provider

import android.util.Log
import com.teamhub1.tfmmobile.data.provider.network.PlayApiService
import com.teamhub1.tfmmobile.domain.model.PlayModel
import com.teamhub1.tfmmobile.domain.model.play.PlayRepository
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