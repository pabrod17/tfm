package com.example.tfmmobile.ui.events

import com.example.tfmmobile.domain.model.GameModel

sealed class GamesState {

    data object Loading: GamesState()
    data class Error(var error:String): GamesState()
    data class Success(val seasons: List<GameModel>): GamesState()
}