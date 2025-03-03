package com.example.tfmmobile.ui.detail.event

sealed class EventDetailState {
    data object Loading: EventDetailState()
    data class Error(var error:String): EventDetailState()
    data class Success(val id: Long,
                       val title: String,
                       val startDate: String,
                       val finishDate: String,
                       val eventType: String): EventDetailState()

}