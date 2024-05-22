package com.example.tfmmobile.ui.detail.stretching

import android.app.Activity
import android.content.Context
import android.content.Intent
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.tfmmobile.domain.model.usecase.GameUseCase
import com.example.tfmmobile.domain.model.usecase.LesionUseCase
import com.example.tfmmobile.domain.model.usecase.StretchingUseCase
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
class StretchingDetailViewModel @Inject constructor(private val stretchingUseCase: StretchingUseCase) : ViewModel() {

    private var _state = MutableStateFlow<StretchingDetailState>(StretchingDetailState.Loading)
    val state: StateFlow<StretchingDetailState> = _state

    fun getStretchingById(id:Long){
        viewModelScope.launch {
//            hilo principal
            _state.value= StretchingDetailState.Loading
            val result = withContext(Dispatchers.IO) { stretchingUseCase(id) } //hilo secundario
            if (result!=null){
                _state.value = StretchingDetailState.Success(
                    result.id, result.stretchingName,
                    result.description, result.stretchingType
                )
            } else {
                _state.value = StretchingDetailState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

    }


}