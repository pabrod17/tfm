package com.teamhub1.tfmmobile.data.provider.network.response

import com.teamhub1.tfmmobile.domain.model.TeamModel
import com.google.gson.annotations.SerializedName

data class TeamsResponse (@SerializedName("teams") val teams: List<TeamResponse>) {

    fun toDomain(): List<TeamModel> {
        println("CONVIRTIENDOOOOOOOOO!!!")
        println("CONVIRTIENDOOOOOOOOO!!!")
        println("CONVIRTIENDOOOOOOOOO!!!")
        println("CONVIRTIENDOOOOOOOOO!!!")
        println("CONVIRTIENDOOOOOOOOO!!!")
        return teams.map { it.toDomain()}
    }
}