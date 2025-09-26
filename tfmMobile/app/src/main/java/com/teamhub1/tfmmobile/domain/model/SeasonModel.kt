package com.teamhub1.tfmmobile.domain.model

data class SeasonModel (
    val id: Long,
    val startDate: String,
    val endDate: String,
    val seasonName: String,
    val description: String
)