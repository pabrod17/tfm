package com.teamhub1.tfmmobile.domain.model

data class PlayerModel (
    val id: Long,
    val playerName: String,
    val primaryLastName: String,
    val secondLastName: String,
    val position: String,
    val trends: String,
    val phoneNumber: String,
    val email: String,
    val dni: String,
    val teamId: Long,
    val injured: Boolean
)