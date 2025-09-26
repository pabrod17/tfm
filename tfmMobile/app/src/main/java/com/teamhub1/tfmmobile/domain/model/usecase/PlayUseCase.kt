package com.teamhub1.tfmmobile.domain.model.usecase

import com.teamhub1.tfmmobile.domain.model.play.PlayRepository
import javax.inject.Inject

class PlayUseCase @Inject constructor(private val playRepository: PlayRepository) {

    suspend operator fun invoke(playId: Long) = playRepository.findPlayById(playId)
    suspend operator fun invoke() = playRepository.findPlaysByUserId()

    suspend operator fun invoke(
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
    ) = playRepository.updatePlay(
        playId,
        title,
        playType,
        gesture,
        pointGuardText,
        shootingGuardText,
        smallForwardText,
        powerForwardText,
        centerText,
        description
    )

    suspend operator fun invoke(
        teamId: Long,
        title: String,
        playType: String,
        gesture: String,
        pointGuardText: String,
        shootingGuardText: String,
        smallForwardText: String,
        powerForwardText: String,
        centerText: String,
        description: String,
        isUpdate: Boolean
    ) = playRepository.addPlay(
        teamId,
        title,
        playType,
        gesture,
        pointGuardText,
        shootingGuardText,
        smallForwardText,
        powerForwardText,
        centerText,
        description
    )

}