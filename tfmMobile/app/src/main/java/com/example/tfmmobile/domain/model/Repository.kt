package com.example.tfmmobile.domain.model

import com.example.tfmmobile.data.provider.network.response.TeamResponse

interface Repository {
    suspend fun getTeams(userId:Long): TeamModel?
}