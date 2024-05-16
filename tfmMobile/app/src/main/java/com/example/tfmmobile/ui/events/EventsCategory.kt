package com.example.tfmmobile.ui.events

sealed class EventsCategory(var isSelected: Boolean = false) {
    object Games : EventsCategory(isSelected = true)
    object Trainings : EventsCategory()
}