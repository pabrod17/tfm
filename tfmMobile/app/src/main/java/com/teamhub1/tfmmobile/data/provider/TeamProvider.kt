package com.teamhub1.tfmmobile.data.provider

import com.teamhub1.tfmmobile.domain.model.Team
import javax.inject.Inject

class TeamProvider @Inject constructor() {

    var description =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"


    fun getTeams(): List<Team> {
        return listOf(
            Team(1, "Real Madrid", "WiZink Center", "Real Madrid de Baloncesto", description),
            Team(2, "Valencia", "Pabellón Fuente de San Luís", "Juan Roig Alfonso", description),
            Team(3, "Valencia", "Pabellón Fuente de San Luís", "Juan Roig Alfonso", description),
            Team(4, "Valencia", "Pabellón Fuente de San Luís", "Juan Roig Alfonso", description),
            Team(5, "Valencia", "Pabellón Fuente de San Luís", "Juan Roig Alfonso", description),
            Team(6, "Valencia", "Pabellón Fuente de San Luís", "Juan Roig Alfonso", description),
            Team(7, "Valencia", "Pabellón Fuente de San Luís", "Juan Roig Alfonso", description),
            Team(7, "Valencia", "Pabellón Fuente de San Luís", "Juan Roig Alfonso", description),
            Team(7, "Valencia", "Pabellón Fuente de San Luís", "Juan Roig Alfonso", description),
            Team(7, "Valencia", "Pabellón Fuente de San Luís", "Juan Roig Alfonso", description),
            Team(7, "Valencia", "Pabellón Fuente de San Luís", "Juan Roig Alfonso", description),
            Team(7, "Valencia", "Pabellón Fuente de San Luís", "Juan Roig Alfonso", description),
            Team(7, "Valencia", "Pabellón Fuente de San Luís", "Juan Roig Alfonso", description),
            Team(7, "Valencia", "Pabellón Fuente de San Luís", "Juan Roig Alfonso", description),
            Team(7, "Valencia", "Pabellón Fuente de San Luís", "Juan Roig Alfonso", description),
            Team(8, "Valencia", "Pabellón Fuente de San Luís", "Juan Roig Alfonso", description)

        )
    }
}