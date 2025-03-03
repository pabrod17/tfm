package com.example.tfmmobile.ui.plays

import com.example.tfmmobile.domain.model.PlayModel

sealed class PlayssState {

    data object Loading: PlayssState()
    data class Error(var error:String): PlayssState()
    data class Success(val lesions: List<PlayModel>): PlayssState()
}