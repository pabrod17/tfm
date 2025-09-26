package com.teamhub1.tfmmobile.data.provider.network

import com.teamhub1.tfmmobile.data.provider.network.response.LesionResponse
import retrofit2.http.GET
import retrofit2.http.Path

interface LesionApiService {

    @GET("lesion/{lesionId}")
    suspend fun findLesionById(@Path("lesionId") lesionId: Long): LesionResponse

    @GET("lesion/")
    suspend fun findAllLesion(): List<LesionResponse>

}