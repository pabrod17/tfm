package com.teamhub1.tfmmobile.ui.detail.team

sealed class TeamDetailState {
    data object Loading: TeamDetailState()
    data class Error(var error:String): TeamDetailState()
    data class Success(val id: Long,
                       val teamName:String,
                       val arenaName:String,
                       val ownerName:String,
                       val description:String): TeamDetailState()

}