package com.example.tfmmobile.ui.plays

sealed class PlaysCategory(var isSelected: Boolean = false) {
    object Plays : PlaysCategory(isSelected = true)
}