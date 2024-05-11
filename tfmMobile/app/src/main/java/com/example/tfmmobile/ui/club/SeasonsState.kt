package com.example.tfmmobile.ui.club

import com.example.tfmmobile.domain.model.SeasonModel
import com.example.tfmmobile.domain.model.TeamModel

sealed class SeasonsState {

    data object Loading: SeasonsState()
    data class Error(var error:String): SeasonsState()
    data class Success(val seasons: List<SeasonModel>): SeasonsState()
}