package com.example.tfmmobile.data.provider.network

import com.example.tfmmobile.data.provider.network.response.PlayerResponse
import com.example.tfmmobile.data.provider.network.response.TeamResponse
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path
import retrofit2.http.Query

interface PlayerApiService {

    @GET("players/{playerId}")
    suspend fun getPlayerById(@Path("playerId") playerId:Long): PlayerResponse

    @GET("players/user")
    suspend fun getPlayers(): List<PlayerResponse>

    @PUT("players/{playerId}")
    suspend fun updatePlayer(@Path("playerId") playerId:Long,
                             @Query("playerName") playerName: String,
                             @Query("primaryLastName") primaryLastName: String,
                             @Query("secondLastName") secondLastName: String,
                             @Query("position") position: String,
                             @Query("trends") trends: String,
                             @Query("phoneNumber") phoneNumber: String,
                             @Query("email") email: String,
                             @Query("dni") dni: String): PlayerResponse

    @POST("players")
    suspend fun addPlayer(@Query("teamId") teamId:Long,
                          @Query("playerName") playerName: String,
                          @Query("primaryLastName") primaryLastName: String,
                          @Query("secondLastName") secondLastName: String,
                          @Query("position") position: String,
                          @Query("trends") trends: String,
                          @Query("phoneNumber") phoneNumber: String,
                          @Query("email") email: String,
                          @Query("dni") dni: String
                          ): PlayerResponse

}