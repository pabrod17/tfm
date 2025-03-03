package com.example.tfmmobile.domain.model

data class UserModel (
    val id: Long,
    val userName: String,
    val firstName: String,
    val lastName: String,
    val email: String,
    val role: String
)