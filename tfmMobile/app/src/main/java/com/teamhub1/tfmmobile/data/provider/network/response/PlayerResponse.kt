package com.teamhub1.tfmmobile.data.provider.network.response

import com.teamhub1.tfmmobile.domain.model.PlayerModel
import com.google.gson.annotations.SerializedName

data class PlayerResponse (@SerializedName("id") val id:Long,
                           @SerializedName("playerName") val playerName: String,
                           @SerializedName("primaryLastName") val primaryLastName: String,
                           @SerializedName("secondLastName") val secondLastName: String,
                           @SerializedName("position") val position: String,
                           @SerializedName("trends") val trends: String,
                           @SerializedName("phoneNumber") val phoneNumber: String,
                           @SerializedName("email") val email: String,
                           @SerializedName("dni") val dni: String,
                           @SerializedName("teamId") val teamId:Long,
                           @SerializedName("injured") val injured:Boolean) {

    fun toDomain(): PlayerModel {
        return PlayerModel(
            id = id,
            playerName = playerName,
            primaryLastName = primaryLastName,
            secondLastName = secondLastName,
            position = position,
            trends = trends,
            phoneNumber = phoneNumber,
            email = email,
            dni = dni,
            teamId = teamId,
            injured = injured
            )
    }
}