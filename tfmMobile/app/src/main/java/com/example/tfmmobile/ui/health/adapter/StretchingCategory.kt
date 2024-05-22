package com.example.tfmmobile.ui.health.adapter

sealed class StretchingCategory(var isSelected: Boolean = false) {

    object Hamstrings : StretchingCategory() {
        override fun toString() = "Hamstrings"
    }
    object Buttocks : StretchingCategory() {
        override fun toString() = "Buttocks"
    }
    object Calf : StretchingCategory() {
        override fun toString() = "Calf"
    }
    object Adductors : StretchingCategory() {
        override fun toString() = "Adductors"
    }
    object Shoulder : StretchingCategory() {
        override fun toString() = "Shoulder"
    }
    object Quadriceps : StretchingCategory() {
        override fun toString() = "Quadriceps"
    }
    object Back : StretchingCategory() {
        override fun toString() = "Back"
    }
    object Pectoral : StretchingCategory() {
        override fun toString() = "Pectoral"
    }
    object Crotch : StretchingCategory() {
        override fun toString() = "Crotch"
    }
    object Triceps : StretchingCategory() {
        override fun toString() = "Triceps"
    }
}