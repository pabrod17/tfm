package com.example.tfmmobile.data.provider.network.response

import com.example.tfmmobile.domain.model.TrainingModel
import com.google.gson.annotations.SerializedName

class TrainingResponse (@SerializedName("id") val id: Long,
                        @SerializedName("trainingDate") val trainingDate:String,
                        @SerializedName("durationMinutes") val durationMinutes: String,
                        @SerializedName("description") val description: String,
                        @SerializedName("objective") val objective: String) {

    fun toDomain(): TrainingModel {
        return TrainingModel(
            id = id,
            trainingDate = trainingDate,
            durationMinutes = durationMinutes,
            description = description,
            objective = objective)
    }
}