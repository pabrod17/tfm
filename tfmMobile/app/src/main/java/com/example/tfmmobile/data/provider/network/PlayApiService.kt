package com.example.tfmmobile.data.provider.network

import com.example.tfmmobile.data.provider.network.response.LesionResponse
import com.example.tfmmobile.data.provider.network.response.PlayResponse
import com.example.tfmmobile.data.provider.network.response.PlayerResponse
import com.example.tfmmobile.data.provider.network.response.StretchingResponse
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path
import retrofit2.http.Query

interface PlayApiService {

    @GET("plays/{playId}")
    suspend fun findPlayById(@Path("playId") playId: Long): PlayResponse

    @GET("plays/user")
    suspend fun findPlaysByUserId(): List<PlayResponse>

    @PUT("plays/{playId}")
    suspend fun updatePlay(@Path("playId") playId:Long,
                             @Query("title") title: String,
                             @Query("playType") playType: String,
                             @Query("gesture") gesture: String,
                             @Query("pointGuardText") pointGuardText: String,
                             @Query("shootingGuardText") shootingGuardText: String,
                             @Query("smallForwardText") smallForwardText: String,
                             @Query("powerForwardText") powerForwardText: String,
                             @Query("centerText") centerText: String,
                             @Query("description") description: String): PlayResponse

    @POST("plays")
    suspend fun addPlay(@Query("teamId") teamId:Long,
                        @Query("title") title: String,
                        @Query("playType") playType: String,
                        @Query("gesture") gesture: String,
                        @Query("pointGuardText") pointGuardText: String,
                        @Query("shootingGuardText") shootingGuardText: String,
                        @Query("smallForwardText") smallForwardText: String,
                        @Query("powerForwardText") powerForwardText: String,
                        @Query("centerText") centerText: String,
                        @Query("description") description: String
    ): PlayResponse

}