package com.teamhub1.tfmmobile.ui.health

import com.teamhub1.tfmmobile.domain.model.StretchingModel

sealed class StretchingsState {

    data object Loading: StretchingsState()
    data class Error(var error:String): StretchingsState()
    data class Success(val strechings: List<StretchingModel>): StretchingsState()
}