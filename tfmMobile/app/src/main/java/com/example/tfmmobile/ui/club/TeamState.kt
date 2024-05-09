package com.example.tfmmobile.ui.club

import com.example.tfmmobile.ui.detail.TeamDetailState

sealed class TeamState {

    data object Loading: TeamState()
    data class Error(var error:String): TeamState()
    data class Success(val teamName:String,
                       val arenaName:String,
                       val ownerName:String,
                       val description:String): TeamState()
}