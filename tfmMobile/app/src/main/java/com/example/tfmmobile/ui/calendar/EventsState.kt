package com.example.tfmmobile.ui.calendar

import com.example.tfmmobile.domain.model.EventModel

sealed class EventsState {

    data object Loading: EventsState()
    data class Error(var error:String): EventsState()
    data class Success(val seasons: List<EventModel>): EventsState()
}