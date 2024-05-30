package com.example.tfmmobile.data.provider.network.response

import com.example.tfmmobile.domain.model.EventModel
import com.example.tfmmobile.domain.model.GameModel
import com.google.gson.annotations.SerializedName

class EventResponse (@SerializedName("id") val id: Long,
                     @SerializedName("title") val title:String,
                     @SerializedName("startDate") val startDate: String,
                     @SerializedName("finishDate") val finishDate: String,
                    @SerializedName("eventType") val eventType: String) {

    fun toDomain(): EventModel {
        return EventModel(
            id = id,
            title = title,
            startDate = startDate,
            finishDate = finishDate,
            eventType = eventType)
    }
}