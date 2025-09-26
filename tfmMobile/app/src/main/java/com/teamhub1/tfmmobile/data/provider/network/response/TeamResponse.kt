package com.teamhub1.tfmmobile.data.provider.network.response

import com.teamhub1.tfmmobile.domain.model.TeamModel
import com.google.gson.annotations.SerializedName

data class TeamResponse (@SerializedName("id") val id: Long,
                         @SerializedName("teamName") val teamName:String,
                         @SerializedName("arenaName") val arenaName: String,
                         @SerializedName("ownerName") val ownerName: String,
                         @SerializedName("description") val description: String)
{
    fun toDomain():TeamModel{
        return TeamModel(
            id = id,
            teamName = teamName,
            arenaName = arenaName,
            ownerName = ownerName,
            description = description)
    }
}
