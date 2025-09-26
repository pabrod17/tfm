package com.teamhub1.tfmmobile.data.provider.network.response

import com.teamhub1.tfmmobile.domain.model.PlayModel
import com.google.gson.annotations.SerializedName

class PlayResponse (@SerializedName("id") val id: Long,
                    @SerializedName("title") val title:String,
                    @SerializedName("playType") val playType:String,
                    @SerializedName("gesture") val gesture: String,
                    @SerializedName("pointGuardText") val pointGuardText: String,
                    @SerializedName("shootingGuardText") val shootingGuardText: String,
                    @SerializedName("smallForwardText") val smallForwardText: String,
                    @SerializedName("powerForwardText") val powerForwardText: String,
                    @SerializedName("centerText") val centerText: String,
                    @SerializedName("description") val description: String) {

    fun toDomain(): PlayModel {
        return PlayModel(
            id = id,
            title = title,
            playType = playType,
            gesture = gesture,
            pointGuardText = pointGuardText,
            shootingGuardText = shootingGuardText,
            smallForwardText = smallForwardText,
            powerForwardText = powerForwardText,
            centerText = centerText,
            description = description)
    }
}