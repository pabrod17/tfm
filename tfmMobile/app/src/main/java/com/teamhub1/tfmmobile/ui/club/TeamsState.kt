package com.teamhub1.tfmmobile.ui.club

import com.teamhub1.tfmmobile.domain.model.TeamModel

sealed class TeamsState {

    data object Loading: TeamsState()
    data class Error(var error:String): TeamsState()
    data class Success(val teams: List<TeamModel>): TeamsState()
}