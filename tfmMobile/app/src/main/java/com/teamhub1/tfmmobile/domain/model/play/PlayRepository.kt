package com.teamhub1.tfmmobile.domain.model.play

import com.teamhub1.tfmmobile.domain.model.PlayModel

interface PlayRepository {

    suspend fun findPlayById(playId:Long): PlayModel?
    suspend fun findPlaysByUserId(): List<PlayModel>?
    suspend fun updatePlay(playId: Long,
                           title: String,
                           playType: String,
                           gesture: String,
                           pointGuardText: String,
                           shootingGuardText: String,
                           smallForwardText: String,
                           powerForwardText: String,
                           centerText: String,
                           description: String): PlayModel?

    suspend fun addPlay(teamId:Long,
                        title: String,
                        playType: String,
                        gesture: String,
                        pointGuardText: String,
                        shootingGuardText: String,
                        smallForwardText: String,
                        powerForwardText: String,
                        centerText: String,
                        description: String): PlayModel?
}