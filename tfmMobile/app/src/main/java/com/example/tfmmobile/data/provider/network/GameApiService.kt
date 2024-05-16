package com.example.tfmmobile.data.provider.network

import com.example.tfmmobile.data.provider.network.response.GameResponse
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path
import retrofit2.http.Query

interface GameApiService {

    @GET("games/{gameId}")
    suspend fun getGameById(@Path("gameId") gameId:Long): GameResponse

    @GET("games/user")
    suspend fun getGames(): List<GameResponse>

    @PUT("games/{gameId}")
    suspend fun updateGame(@Path("gameId") gameId:Long, @Query("gameDate") gameDate: String,
                             @Query("rival") rival: String,
                             @Query("description") description: String): GameResponse

    @POST("games")
    suspend fun addGame(@Query("teamId") teamId:Long,
                          @Query("seasonId") seasonId:Long,
                          @Query("gameDate") gameDate: String,
                          @Query("rival") rival: String,
                          @Query("description") description: String): GameResponse

}