package com.teamhub1.tfmmobile.domain.model.event

import com.teamhub1.tfmmobile.domain.model.EventModel

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