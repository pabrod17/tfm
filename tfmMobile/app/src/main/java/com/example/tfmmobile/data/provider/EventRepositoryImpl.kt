package com.example.tfmmobile.data.provider

import android.util.Log
import com.example.tfmmobile.data.provider.network.EventApiService
import com.example.tfmmobile.data.provider.network.GameApiService
import com.example.tfmmobile.domain.model.EventModel
import com.example.tfmmobile.domain.model.event.EventRepository
import com.example.tfmmobile.domain.model.game.GameRepository
import javax.inject.Inject

class EventRepositoryImpl @Inject constructor(private val apiService: EventApiService) :
    EventRepository {
    override suspend fun getEventById(eventId: Long): EventModel? {
        runCatching { apiService.getEventById(eventId) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/EVENTS by id FALLO: ${it}") }
        return null
    }

    override suspend fun getEvents(): List<EventModel>? {
        runCatching { apiService.getEvents() }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.map { it.toDomain() } }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/EVENTS lista FALLO: ${it}") }
        return null
    }

    override suspend fun updateEvent(
        eventId:Long,
        title:String,
        startDate: String,
        finishDate: String
    ): EventModel? {
        runCatching { apiService.updateEvent(eventId, title, startDate, finishDate) }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/EVENTS update FALLO: ${it}") }
        return null
    }

    override suspend fun addEvent(
        title:String,
        startDate: String,
        finishDate: String
    ): EventModel? {
        runCatching {
            apiService.addEvent(title, startDate, finishDate)
        }
            .onSuccess {
                Log.i("FUNCIONA", "${it}")
                return it.toDomain() }
            .onFailure { Log.i("FALLOOOOOOOO APIII", "/EVENTS ADD NEW FALLO: ${it}") }
        return null
    }
}