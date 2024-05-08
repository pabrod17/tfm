package com.example.tfmmobile.ui.club

sealed class ClubCategory {
    object Teams : ClubCategory()
    object Seasons : ClubCategory()
    object Players : ClubCategory()
}