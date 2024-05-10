package com.example.tfmmobile.ui.club

import com.google.gson.annotations.SerializedName

sealed class PlayerState {

    data object Loading: PlayerState()
    data class Error(var error:String): PlayerState()
    data class Success(val id:Long,
                       val playerName: String,
                       val primaryLastName: String,
                       val secondLastName: String,
                       val position: String,
                       val trends: String,
                       val phoneNumber: String,
                       val email: String,
                       val dni: String,
                       val teamId:Long,
                       val injured:Boolean): PlayerState()
}