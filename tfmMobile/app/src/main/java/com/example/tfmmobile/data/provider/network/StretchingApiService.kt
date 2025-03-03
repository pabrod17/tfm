package com.example.tfmmobile.data.provider.network

import com.example.tfmmobile.data.provider.network.response.StretchingResponse
import retrofit2.http.GET
import retrofit2.http.Path

interface StretchingApiService {

    @GET("stretchings/{stretchingId}")
    suspend fun findStretchingById(@Path("stretchingId") stretchingId: Long): StretchingResponse

    @GET("stretchings/")
    suspend fun findAllStretchings(): List<StretchingResponse>

}