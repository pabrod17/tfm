package com.example.tfmmobile.data.provider.network

import com.example.tfmmobile.data.provider.network.dto.LoginDto
import com.example.tfmmobile.data.provider.network.response.LoginResponse
import com.example.tfmmobile.data.provider.network.response.TeamResponse
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

interface UserApiService {

    @POST("users/login")
    suspend fun login(@Body loginDto: LoginDto): LoginResponse
}