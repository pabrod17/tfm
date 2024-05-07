package com.example.tfmmobile.ui.club

import com.example.tfmmobile.domain.model.TeamModel

sealed class TeamsState {

    data object Loading: TeamsState()
    data class Error(var error:String): TeamsState()
    data class Success(val teams: List<TeamModel>): TeamsState()
}