package com.example.tfmmobile.data.provider.network.response

import com.example.tfmmobile.domain.model.TeamModel
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