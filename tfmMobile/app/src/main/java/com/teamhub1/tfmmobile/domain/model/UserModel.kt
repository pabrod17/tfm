package com.teamhub1.tfmmobile.domain.model

data class UserModel (
    val id: Long,
    val userName: String,
    val firstName: String,
    val lastName: String,
    val email: String,
    val role: String
)