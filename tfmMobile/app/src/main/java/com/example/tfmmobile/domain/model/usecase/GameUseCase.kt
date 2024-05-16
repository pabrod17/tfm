package com.example.tfmmobile.domain.model.usecase

import com.example.tfmmobile.domain.model.game.GameRepository
import javax.inject.Inject

class GameUseCase @Inject constructor(private val gameRepository: GameRepository) {

    suspend operator fun invoke(id:Long) = gameRepository.getGameById(id)
    suspend operator fun invoke() = gameRepository.getGames()

    suspend operator fun invoke(gameId: Long,
                                gameDate: String,
                                rival: String,
                                description: String) = gameRepository.updateGame(gameId, gameDate, rival, description)

    suspend operator fun invoke(teamId: Long,
                                seasonId: Long,
                                gameDate: String,
                                rival: String,
                                description: String) = gameRepository.addGame(teamId, seasonId, gameDate, rival, description)
}