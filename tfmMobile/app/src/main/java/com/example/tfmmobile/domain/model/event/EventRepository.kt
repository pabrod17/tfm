package com.example.tfmmobile.domain.model.event

import com.example.tfmmobile.domain.model.EventModel
import com.example.tfmmobile.domain.model.GameModel
import com.example.tfmmobile.domain.model.PlayerModel

interface EventRepository {

    suspend fun getEventById(eventId:Long): EventModel?
    suspend fun getEvents(): List<EventModel>?
    suspend fun updateEvent(eventId:Long,
                            title:String,
                            startDate: String,
                            finishDate: String): EventModel?

    suspend fun addEvent(title:String,
                         startDate: String,
                         finishDate: String): EventModel?

    suspend fun removeEvent(eventId:Long)

}