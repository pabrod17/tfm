package com.teamhub1.tfmmobile.ui.club

import com.teamhub1.tfmmobile.domain.model.PlayerModel

sealed class PlayersState {

    data object Loading: PlayersState()
    data class Error(var error:String): PlayersState()
    data class Success(val players: List<PlayerModel>): PlayersState()
}