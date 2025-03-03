package com.example.tfmmobile.data.provider.network

import com.example.tfmmobile.data.provider.network.response.SeasonResponse
import com.example.tfmmobile.data.provider.network.response.TeamResponse
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path
import retrofit2.http.Query

interface SeasonApiService {

    @GET("seasons/{id}")
    suspend fun getSeasonById(@Path("id") id:Long): SeasonResponse

    @GET("seasons")
    suspend fun getSeasons(): List<SeasonResponse>

    @PUT("seasons/{id}")
    suspend fun updateSeason(@Path("id") id:Long, @Query("startDate") startDate: String,
                           @Query("endDate") endDate: String,
                           @Query("seasonName") seasonName: String,
                           @Query("description") description: String): SeasonResponse

    @POST("seasons")
    suspend fun addSeason(@Query("startDate") startDate: String,
                          @Query("endDate") endDate: String,
                          @Query("seasonName") seasonName: String,
                          @Query("description") description: String): SeasonResponse
}