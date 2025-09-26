package com.teamhub1.tfmmobile.ui.plays

import com.teamhub1.tfmmobile.domain.model.PlayModel

sealed class PlayssState {

    data object Loading: PlayssState()
    data class Error(var error:String): PlayssState()
    data class Success(val lesions: List<PlayModel>): PlayssState()
}