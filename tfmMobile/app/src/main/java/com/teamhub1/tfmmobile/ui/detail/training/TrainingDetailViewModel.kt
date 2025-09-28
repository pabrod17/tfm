package com.teamhub1.tfmmobile.ui.detail.training

import android.app.Activity
import android.content.Context
import android.widget.Toast
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.domain.model.usecase.TrainingUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import javax.inject.Inject

@HiltViewModel
class TrainingDetailViewModel @Inject constructor(private val trainingUseCase: TrainingUseCase) : ViewModel() {

    private var _state = MutableStateFlow<TrainingDetailState>(TrainingDetailState.Loading)
    val state: StateFlow<TrainingDetailState> = _state

    fun getTrainingById(id:Long){
        viewModelScope.launch {
//            hilo principal
            _state.value= TrainingDetailState.Loading
            val result = withContext(Dispatchers.IO) { trainingUseCase(id) } //hilo secundario
            if (result!=null){
                _state.value = TrainingDetailState.Success(
                    result.id, result.trainingDate,
                    result.durationMinutes, result.description,
                    result.objective
                )
            } else {
                _state.value = TrainingDetailState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

    }

    fun updateTraining(id: Long,
                       trainingDate: String,
                       durationMinutes: Int,
                       description: String,
                       objective: String,
                       context: Context
    ){
        viewModelScope.launch {
//            hilo principal
            _state.value= TrainingDetailState.Loading
            val result = withContext(Dispatchers.IO) {
                trainingUseCase(id, trainingDate, durationMinutes, description, objective) } //hilo secundario
            if (result!=null){
                _state.value = TrainingDetailState.Success(
                    result.id, result.trainingDate,
                    result.durationMinutes, result.description,
                    result.objective
                )
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO")
                (context as? Activity)?.finish() // Cerrar la actividad actual
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO 222222222222")
            } else {
                Toast.makeText(context, R.string.errorUpdateTraining, Toast.LENGTH_LONG).show()
                _state.value = TrainingDetailState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

    }

}