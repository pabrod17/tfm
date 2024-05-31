package com.example.tfmmobile.domain.model.usecase

import com.example.tfmmobile.domain.model.event.EventRepository
import com.example.tfmmobile.domain.model.game.GameRepository
import javax.inject.Inject

class EventUseCase @Inject constructor(private val eventRepository: EventRepository) {

    suspend operator fun invoke(id:Long) = eventRepository.getEventById(id)
    suspend operator fun invoke() = eventRepository.getEvents()

    suspend operator fun invoke(eventId:Long,
                                title:String,
                                startDate: String,
                                finishDate: String) = eventRepository.updateEvent(eventId, title, startDate, finishDate)

    suspend operator fun invoke(title:String,
                                startDate: String,
                                finishDate: String) = eventRepository.addEvent(title, startDate, finishDate)
    suspend operator fun invoke(eventId:Long,
                                isGetEvent: Boolean) = eventRepository.removeEvent(eventId)
}