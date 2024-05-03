package com.example.tfmmobile.data.provider.network

import com.example.tfmmobile.data.provider.network.response.TeamResponse
import retrofit2.http.GET
import retrofit2.http.Path

interface TeamApiService {

    @GET("teams/hola")
    suspend fun getTeams():TeamResponse


}