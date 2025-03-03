package com.example.tfmmobile.ui.club.adapter

sealed class PlayerCategory(var isSelected: Boolean = false) {

    object PointGuard : PlayerCategory() {
        override fun toString() = "PointGuard"
    }
    object ShootingGuard : PlayerCategory() {
        override fun toString() = "ShootingGuard"
    }
    object SmallForward : PlayerCategory() {
        override fun toString() = "SmallForward"
    }
    object PowerForward : PlayerCategory() {
        override fun toString() = "PowerForward"
    }
    object Center : PlayerCategory() {
        override fun toString() = "Center"
    }
    object Injured : PlayerCategory() {
        override fun toString() = "injured"
    }
}