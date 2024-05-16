package com.example.tfmmobile.ui.events

sealed class GameState {

    data object Loading: GameState()
    data class Error(var error:String): GameState()
    data class Success(val id: Long,
                       val gameDate: String,
                       val rival: String,
                       val description: String): GameState()
}