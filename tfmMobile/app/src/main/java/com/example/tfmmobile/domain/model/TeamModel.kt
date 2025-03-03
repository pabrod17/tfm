package com.example.tfmmobile.domain.model

import com.google.gson.annotations.SerializedName

data class TeamModel(
    val id: Long,
    val teamName: String,
    val arenaName: String,
    val ownerName: String,
    val description: String
)
