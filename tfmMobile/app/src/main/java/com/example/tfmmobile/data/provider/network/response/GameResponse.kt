package com.example.tfmmobile.data.provider.network.response

import com.example.tfmmobile.domain.model.GameModel
import com.google.gson.annotations.SerializedName

class GameResponse (@SerializedName("id") val id: Long,
                    @SerializedName("gameDate") val gameDate:String,
                    @SerializedName("rival") val rival: String,
                    @SerializedName("description") val description: String) {

    fun toDomain(): GameModel {
        return GameModel(
            id = id,
            gameDate = gameDate,
            rival = rival,
            description = description)
    }
}