package com.teamhub1.tfmmobile.ui.calendar

sealed class EventState {

    data object Loading: EventState()
    data class Error(var error:String): EventState()
    data class Success(val id: Long,
                       val title: String,
                       val startDate: String,
                       val finishDate: String,
                       val eventType: String): EventState()
}