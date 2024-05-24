package com.example.tfmmobile.ui.detail.play

sealed class PlayDetailState {
    data object Loading : PlayDetailState()
    data class Error(var error: String) : PlayDetailState()
    data class Success(
        val id: Long,
        val title: String,
        val playType: String,
        val gesture: String,
        val pointGuardText: String,
        val shootingGuardText: String,
        val smallForwardText: String,
        val powerForwardText: String,
        val centerText: String,
        val description: String
    ) : PlayDetailState()

}