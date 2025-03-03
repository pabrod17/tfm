package com.example.tfmmobile.ui.club

sealed class ClubCategory(var isSelected: Boolean = false) {
    object Teams : ClubCategory()
    object Seasons : ClubCategory(isSelected = true)
    object Players : ClubCategory()
}