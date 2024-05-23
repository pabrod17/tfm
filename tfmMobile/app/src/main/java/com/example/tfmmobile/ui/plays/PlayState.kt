package com.example.tfmmobile.ui.plays

sealed class PlayState {

    data object Loading: PlayState()
    data class Error(var error:String): PlayState()
    data class Success(val id: Long,
                       val title: String,
                       val playType: String,
                       val gesture: String,
                       val pointGuardText: String,
                       val shootingGuardText: String,
                       val smallForwardText: String,
                       val powerForwardText: String,
                       val centerText: String,
                       val description: String): PlayState()
}