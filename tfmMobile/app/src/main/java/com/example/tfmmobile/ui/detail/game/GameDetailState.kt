package com.example.tfmmobile.ui.detail.game

sealed class GameDetailState {
    data object Loading: GameDetailState()
    data class Error(var error:String): GameDetailState()
    data class Success(val id: Long,
                       val gameDate: String,
                       val rival: String,
                       val description: String): GameDetailState()

}