package com.example.tfmmobile.ui.club

import androidx.lifecycle.ViewModel
import com.example.tfmmobile.data.provider.TeamProvider
import com.example.tfmmobile.domain.model.Team
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import javax.inject.Inject

@HiltViewModel
class ClubViewModel @Inject constructor(private val teamProvider: TeamProvider) : ViewModel() {

    private var _team = MutableStateFlow<List<Team>>(emptyList())
    val team: StateFlow<List<Team>> = _team

    var description =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"

    init {
        _team.value = teamProvider.getTeams()
    }


}