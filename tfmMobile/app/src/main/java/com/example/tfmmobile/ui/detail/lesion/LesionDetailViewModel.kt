package com.example.tfmmobile.ui.detail.lesion

import android.app.Activity
import android.content.Context
import android.content.Intent
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.tfmmobile.domain.model.usecase.GameUseCase
import com.example.tfmmobile.domain.model.usecase.LesionUseCase
import com.example.tfmmobile.ui.detail.season.SeasonDetailState
import com.example.tfmmobile.ui.home.MainActivity
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import javax.inject.Inject

@HiltViewModel
class LesionDetailViewModel @Inject constructor(private val lesionUseCase: LesionUseCase) : ViewModel() {

    private var _state = MutableStateFlow<LesionDetailState>(LesionDetailState.Loading)
    val state: StateFlow<LesionDetailState> = _state

    fun getLesionById(id:Long){
        viewModelScope.launch {
//            hilo principal
            _state.value= LesionDetailState.Loading
            val result = withContext(Dispatchers.IO) { lesionUseCase(id) } //hilo secundario
            if (result!=null){
                _state.value = LesionDetailState.Success(
                    result.id, result.lesionName,
                    result.description, result.medication, result.lesionType
                )
            } else {
                _state.value = LesionDetailState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

    }


}