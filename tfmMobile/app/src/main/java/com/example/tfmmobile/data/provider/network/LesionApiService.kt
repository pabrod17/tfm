package com.example.tfmmobile.data.provider.network

import com.example.tfmmobile.data.provider.network.response.LesionResponse
import com.example.tfmmobile.data.provider.network.response.StretchingResponse
import retrofit2.http.GET
import retrofit2.http.Path

interface LesionApiService {

    @GET("lesion/{lesionId}")
    suspend fun findLesionById(@Path("lesionId") lesionId: Long): LesionResponse

    @GET("lesion/")
    suspend fun findAllLesion(): List<LesionResponse>

}