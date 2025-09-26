package com.teamhub1.tfmmobile.data.provider.network.response

import com.teamhub1.tfmmobile.domain.model.StretchingModel
import com.google.gson.annotations.SerializedName

class StretchingResponse (@SerializedName("id") val id: Long,
                          @SerializedName("stretchingName") val stretchingName:String,
                          @SerializedName("description") val description: String,
                          @SerializedName("stretchingType") val stretchingType: String) {

    fun toDomain(): StretchingModel {
        return StretchingModel(
            id = id,
            stretchingName = stretchingName,
            description = description,
            stretchingType = stretchingType)
    }
}