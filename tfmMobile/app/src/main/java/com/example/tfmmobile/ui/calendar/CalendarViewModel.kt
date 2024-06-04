package com.example.tfmmobile.ui.calendar

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.widget.Toast
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.tfmmobile.R
import com.example.tfmmobile.TfmMobileApp
import com.example.tfmmobile.domain.model.EventModel
import com.example.tfmmobile.domain.model.usecase.EventUseCase
import com.example.tfmmobile.ui.users.password.UserPasswordState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import javax.inject.Inject

@HiltViewModel
class CalendarViewModel @Inject constructor(
    private val eventUseCase: EventUseCase,
) : ViewModel() {

        private var _stateEvents = MutableStateFlow<EventsState>(EventsState.Loading)
    val stateEvents: StateFlow<EventsState> = _stateEvents
    private var _events = MutableStateFlow<List<EventModel>>(emptyList())
    val events: StateFlow<List<EventModel>> = _events

    private var _stateEvent = MutableStateFlow<EventState>(EventState.Loading)
    val stateEvent: StateFlow<EventState> = _stateEvent

    fun getEvents(): List<EventModel> {
        viewModelScope.launch {
//            hilo principal
            _stateEvents.value = EventsState.Loading
            val result = withContext(Dispatchers.IO) { eventUseCase() } //hilo secundario
            if (result != null) {
                _stateEvents.value = EventsState.Success(result)
                _events.value = result
//                _team.value = result

            } else {
                _stateEvents.value =
                    EventsState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

        return _events.value
    }

    fun addEvent(
        title:String,
        startDate: String,
        finishDate: String,
        context: Context
    ) {
        viewModelScope.launch {
//            hilo principal
            _stateEvent.value = EventState.Loading
            val result = withContext(Dispatchers.IO) {
                eventUseCase(title, startDate, finishDate)
            } //hilo secundario
            if (result != null) {
                _stateEvent.value = EventState.Success(
                    result.id, result.title,
                    result.startDate, result.finishDate, result.eventType
                )
//                getEvents()
            } else {
                Toast.makeText(context, R.string.errorAddEvent, Toast.LENGTH_LONG).show()
                _stateEvent.value = EventState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }
    }

    fun clearEvents() {
        _events.value = emptyList()
    }

//    fun deleteEvent(id:Long, context: Context){
//        viewModelScope.launch {
////            hilo principal
//            _stateEvent.value= EventState.Loading
//            val result = withContext(Dispatchers.IO) { eventUseCase(id, false) } //hilo secundario
//            getEvents()
//        }
////            hilo principal
//    }


}