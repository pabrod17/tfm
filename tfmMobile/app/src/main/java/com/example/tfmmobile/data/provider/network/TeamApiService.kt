package com.example.tfmmobile.data.provider.network

import com.example.tfmmobile.data.provider.network.dto.SignUpDto
import com.example.tfmmobile.data.provider.network.response.LoginResponse
import com.example.tfmmobile.data.provider.network.response.TeamResponse
import com.example.tfmmobile.data.provider.network.response.TeamsResponse
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path
import retrofit2.http.Query

interface TeamApiService {

    @GET("teams/{id}")
    suspend fun getTeamById(@Path ("id") id:Long):TeamResponse

    @GET("teams")
    suspend fun getTeams(): List<TeamResponse>

    @PUT("teams/{id}")
    suspend fun updateTeam(@Path ("id") id:Long, @Query("name") name: String,
        @Query("arenaName") arenaName: String,
        @Query("ownerName") ownerName: String,
        @Query("description") description: String): TeamResponse

    @POST("teams")
    suspend fun addTeam(@Query("name") name: String,
                           @Query("arenaName") arenaName: String,
                           @Query("ownerName") ownerName: String,
                           @Query("description") description: String): TeamResponse
}