package com.example.tfmmobile.ui.health.adapter

sealed class ExerciseCategory(var isSelected: Boolean = false) {

    object Tactic : ExerciseCategory() {
        override fun toString() = "Tactic"
    }
    object Technique : ExerciseCategory() {
        override fun toString() = "Technique"
    }
    object Physical : ExerciseCategory() {
        override fun toString() = "Physical"
    }
    object Global : ExerciseCategory() {
        override fun toString() = "Global"
    }
    object Specific : ExerciseCategory() {
        override fun toString() = "Specific"
    }
    object Psychological : ExerciseCategory() {
        override fun toString() = "Psychological"
    }
    object Strategy : ExerciseCategory() {
        override fun toString() = "Strategy"
    }
    object PreMatch : ExerciseCategory() {
        override fun toString() = "PreMatch"
    }
}