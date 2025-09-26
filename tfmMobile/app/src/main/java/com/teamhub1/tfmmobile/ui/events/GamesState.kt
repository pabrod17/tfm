package com.teamhub1.tfmmobile.ui.events

import com.teamhub1.tfmmobile.domain.model.GameModel

sealed class GamesState {

    data object Loading: GamesState()
    data class Error(var error:String): GamesState()
    data class Success(val seasons: List<GameModel>): GamesState()
}