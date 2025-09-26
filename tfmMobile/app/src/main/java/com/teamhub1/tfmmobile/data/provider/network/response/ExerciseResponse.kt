package com.teamhub1.tfmmobile.data.provider.network.response

import com.teamhub1.tfmmobile.domain.model.ExerciseModel
import com.google.gson.annotations.SerializedName

class ExerciseResponse (@SerializedName("id") val id: Long,
                        @SerializedName("exerciseName") val exerciseName:String,
                        @SerializedName("description") val description: String,
                        @SerializedName("objective") val objective: String,
                        @SerializedName("exerciseType") val exerciseType: String) {

    fun toDomain(): ExerciseModel {
        return ExerciseModel(
            id = id,
            exerciseName = exerciseName,
            description = description,
            objective = objective,
            exerciseType = exerciseType)
    }
}