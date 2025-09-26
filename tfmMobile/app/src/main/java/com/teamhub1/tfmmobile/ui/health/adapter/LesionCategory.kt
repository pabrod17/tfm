package com.teamhub1.tfmmobile.ui.health.adapter

sealed class LesionCategory(var isSelected: Boolean = false) {

    object Muscle : LesionCategory() {
        override fun toString() = "Muscle"
    }
    object Tendon : LesionCategory() {
        override fun toString() = "Tendon"
    }
    object Joint : LesionCategory() {
        override fun toString() = "Joint"
    }
    object Spine : LesionCategory() {
        override fun toString() = "Spine"
    }
    object Psychological : LesionCategory() {
        override fun toString() = "Psychological"
    }
}