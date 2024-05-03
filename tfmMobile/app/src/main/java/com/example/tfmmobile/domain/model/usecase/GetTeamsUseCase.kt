package com.example.tfmmobile.domain.model.usecase

import com.example.tfmmobile.domain.model.Repository
import javax.inject.Inject

class GetTeamsUseCase @Inject constructor(private val repository: Repository) {

    suspend operator fun invoke(userId:Long) = repository.getTeams(userId)


}