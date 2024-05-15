package com.example.tfmmobile.ui.detail.season

sealed class SeasonDetailState {
    data object Loading: SeasonDetailState()
    data class Error(var error:String): SeasonDetailState()
    data class Success(val id: Long,
                       val startDate: String,
                       val endDate: String,
                       val seasonName: String,
                       val description:String): SeasonDetailState()

}