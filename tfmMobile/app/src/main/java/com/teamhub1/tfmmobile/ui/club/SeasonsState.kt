package com.teamhub1.tfmmobile.ui.club

import com.teamhub1.tfmmobile.domain.model.SeasonModel

sealed class SeasonsState {

    data object Loading: SeasonsState()
    data class Error(var error:String): SeasonsState()
    data class Success(val seasons: List<SeasonModel>): SeasonsState()
}