package com.teamhub1.tfmmobile.ui.calendar

import com.teamhub1.tfmmobile.domain.model.EventModel

sealed class EventsState {

    data object Loading: EventsState()
    data class Error(var error:String): EventsState()
    data class Success(val seasons: List<EventModel>): EventsState()
}