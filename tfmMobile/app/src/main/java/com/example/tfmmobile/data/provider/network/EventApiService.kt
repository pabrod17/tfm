package com.example.tfmmobile.data.provider.network

import com.example.tfmmobile.data.provider.network.response.EventResponse
import com.example.tfmmobile.data.provider.network.response.GameResponse
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path
import retrofit2.http.Query

interface EventApiService {

    @GET("events/{eventId}")
    suspend fun getEventById(@Path("eventId") eventId:Long): EventResponse

    @GET("events/user")
    suspend fun getEvents(): List<EventResponse>

    @PUT("events/{eventId}")
    suspend fun updateEvent(@Path("eventId") eventId:Long, @Query("title") title: String,
                             @Query("startDate") startDate: String,
                             @Query("finishDate") finishDate: String): EventResponse

    @POST("events")
    suspend fun addEvent(@Query("title") title: String,
                        @Query("startDate") startDate: String,
                        @Query("finishDate") finishDate: String): EventResponse

    @DELETE("events/{eventId}")
    suspend fun removeEvent(@Path("eventId") eventId:Long)

}