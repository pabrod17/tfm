package com.example.tfmmobile.ui.health

sealed class HealthCategory(var isSelected: Boolean = false) {
    object Lesion : HealthCategory(isSelected = true)
    object Exercises : HealthCategory()
    object Stretchings : HealthCategory()
}