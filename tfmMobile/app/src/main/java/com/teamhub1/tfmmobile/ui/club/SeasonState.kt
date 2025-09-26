package com.teamhub1.tfmmobile.ui.club

sealed class SeasonState {

    data object Loading: SeasonState()
    data class Error(var error:String): SeasonState()
    data class Success(val id:Long,
                       val startDate: String,
                       val endDate: String,
                       val seasonName: String,
                       val description: String): SeasonState()
}