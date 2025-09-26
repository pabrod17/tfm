package com.teamhub1.tfmmobile.ui.detail.event

import android.app.Activity
import android.content.Context
import android.widget.Toast
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.domain.model.usecase.EventUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import javax.inject.Inject

@HiltViewModel
class EventDetailViewModel @Inject constructor(private val eventUseCase: EventUseCase) : ViewModel() {

    private var _state = MutableStateFlow<EventDetailState>(EventDetailState.Loading)
    val state: StateFlow<EventDetailState> = _state

    fun getEventById(id:Long){
        viewModelScope.launch {
//            hilo principal
            _state.value= EventDetailState.Loading
            val result = withContext(Dispatchers.IO) { eventUseCase(id) } //hilo secundario
            if (result!=null){
                _state.value = EventDetailState.Success(
                    result.id, result.title,
                    result.startDate, result.finishDate, result.eventType
                )
            } else {
                _state.value = EventDetailState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

    }

    fun updateEvent(id: Long,
                    title:String,
                    startDate: String,
                    finishDate: String,
                     context: Context
    ){
        viewModelScope.launch {
//            hilo principal
            _state.value= EventDetailState.Loading
            val result = withContext(Dispatchers.IO) {
                eventUseCase(id, title, startDate, finishDate) } //hilo secundario
            if (result!=null){
                _state.value = EventDetailState.Success(
                    result.id, result.title,
                    result.startDate, result.finishDate, result.eventType
                )
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO")
                (context as? Activity)?.finish() // Cerrar la actividad actual
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO 222222222222")
            } else {
                Toast.makeText(context, R.string.errorUpdateGame, Toast.LENGTH_LONG).show()
                _state.value = EventDetailState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

    }

    fun deleteEvent(id:Long, context: Context){
        viewModelScope.launch {
//            hilo principal
            _state.value= EventDetailState.Loading
            val result = withContext(Dispatchers.IO) { eventUseCase(id, false) } //hilo secundario
            (context as? Activity)?.finish() // Cerrar la actividad actual

//            getEvents()
        }
//            hilo principal
    }

}