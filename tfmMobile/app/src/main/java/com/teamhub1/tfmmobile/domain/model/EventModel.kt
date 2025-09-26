package com.teamhub1.tfmmobile.domain.model

data class EventModel (
    val id: Long,
    val title: String,
    val startDate: String,
    val finishDate: String,
    val eventType: String,
    val gameId: Long,
    val trainingId: Long)