package com.teamhub1.tfmmobile.data.provider.network.response

import com.teamhub1.tfmmobile.domain.model.LesionModel
import com.google.gson.annotations.SerializedName

class LesionResponse (@SerializedName("id") val id: Long,
                      @SerializedName("lesionName") val lesionName:String,
                      @SerializedName("description") val description: String,
                      @SerializedName("medication") val medication: String,
                      @SerializedName("lesionType") val lesionType: String) {

    fun toDomain(): LesionModel {
        return LesionModel(
            id = id,
            lesionName = lesionName,
            description = description,
            medication = medication,
            lesionType = lesionType)
    }
}