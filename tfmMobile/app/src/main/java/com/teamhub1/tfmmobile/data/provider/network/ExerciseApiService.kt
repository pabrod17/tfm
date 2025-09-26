package com.teamhub1.tfmmobile.data.provider.network

import com.teamhub1.tfmmobile.data.provider.network.response.ExerciseResponse
import retrofit2.http.GET
import retrofit2.http.Path

interface ExerciseApiService {

    @GET("exercises/{exerciseId}")
    suspend fun findExerciseById(@Path("exerciseId") exerciseId: Long): ExerciseResponse

    @GET("exercises/")
    suspend fun findAllExercises(): List<ExerciseResponse>

}