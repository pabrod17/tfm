package com.teamhub1.tfmmobile.ui.plays.adapter

sealed class PlayCategory(var isSelected: Boolean = false) {

    object Defense : PlayCategory() {
        override fun toString() = "Defense"
    }
    object Attack : PlayCategory() {
        override fun toString() = "Attack"
    }
}