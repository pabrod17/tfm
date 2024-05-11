package com.example.tfmmobile.ui.club

import com.example.tfmmobile.domain.model.PlayerModel
import com.example.tfmmobile.domain.model.SeasonModel
import com.example.tfmmobile.domain.model.TeamModel

sealed class PlayersState {

    data object Loading: PlayersState()
    data class Error(var error:String): PlayersState()
    data class Success(val players: List<PlayerModel>): PlayersState()
}