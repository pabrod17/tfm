package com.example.tfmmobile.data.provider.network

import com.example.tfmmobile.data.provider.network.response.TrainingResponse
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path
import retrofit2.http.Query

interface TrainingApiService {

    @GET("trainings/{trainingId}")
    suspend fun getTrainingById(@Path("trainingId") trainingId: Long): TrainingResponse

    @GET("trainings/user")
    suspend fun getTrainings(): List<TrainingResponse>

    @PUT("trainings/{trainingId}")
    suspend fun updateTraining(
        @Path("trainingId") trainingId: Long, @Query("trainingDate") trainingDate: String,
        @Query("durationMinutes") durationMinutes: String,
        @Query("description") description: String,
        @Query("objective") objective: String
    ): TrainingResponse

    @POST("trainings")
    suspend fun addTraining(
        @Query("teamId") teamId: Long?,
        @Query("seasonId") seasonId: Long?,
        @Query("trainingDate") trainingDate: String,
        @Query("durationMinutes") durationMinutes: String,
        @Query("description") description: String,
        @Query("objective") objective: String
    ): TrainingResponse
}