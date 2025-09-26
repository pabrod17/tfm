package com.teamhub1.tfmmobile.ui.club.adapter

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.databinding.ItemTeamBinding
import com.teamhub1.tfmmobile.domain.model.TeamModel

class TeamViewHolder(view: View): RecyclerView.ViewHolder(view) {

    private val binding = ItemTeamBinding.bind(view)

    fun render(team: TeamModel, onItemSelected:(TeamModel) -> Unit){

        binding.parent.setOnClickListener {
            onItemSelected(team)
        }
        binding.cardImage.setImageResource(R.drawable.team)
        binding.tvTitleTeamValue.text = team.teamName
        binding.tvArenaNameValue.text = team.arenaName
    }
}