package com.example.tfmmobile.ui.detail.player

sealed class PlayerDetailState {
    data object Loading: PlayerDetailState()
    data class Error(var error:String): PlayerDetailState()
    data class Success(val id: Long,
                       val playerName: String,
                       val primaryLastName: String,
                       val secondLastName: String,
                       val position: String,
                       val trends: String,
                       val phoneNumber: String,
                       val email: String,
                       val dni: String,
                       val teamId: Long,
                       val injured: Boolean): PlayerDetailState()

}