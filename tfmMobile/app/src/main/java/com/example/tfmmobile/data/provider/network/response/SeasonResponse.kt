package com.example.tfmmobile.data.provider.network.response

import com.example.tfmmobile.domain.model.SeasonModel
import com.example.tfmmobile.domain.model.TeamModel
import com.google.gson.annotations.SerializedName

class SeasonResponse (@SerializedName("id") val id: Long,
                      @SerializedName("startDate") val startDate:String,
                      @SerializedName("endDate") val endDate: String,
                      @SerializedName("seasonName") val seasonName: String,
                      @SerializedName("description") val description: String) {

    fun toDomain(): SeasonModel {
        return SeasonModel(
            id = id,
            startDate = startDate,
            endDate = endDate,
            seasonName = seasonName,
            description = description)
    }
}