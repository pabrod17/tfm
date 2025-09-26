package com.teamhub1.tfmmobile.data.provider.network.response

import com.teamhub1.tfmmobile.domain.model.EventModel
import com.google.gson.annotations.SerializedName

class EventResponse (@SerializedName("id") val id: Long,
                     @SerializedName("title") val title:String,
                     @SerializedName("startDate") val startDate: String,
                     @SerializedName("finishDate") val finishDate: String,
                    @SerializedName("eventType") val eventType: String,
                     @SerializedName("gameId") val gameId: Long,
                     @SerializedName("trainingId") val trainingId: Long) {

    fun toDomain(): EventModel {
        return EventModel(
            id = id,
            title = title,
            startDate = startDate,
            finishDate = finishDate,
            eventType = eventType,
            gameId = gameId,
            trainingId = trainingId)
    }
}