package com.example.tfmmobile.ui.club.adapter

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.databinding.ItemTeamBinding
import com.example.tfmmobile.domain.model.Team
import com.example.tfmmobile.domain.model.TeamModel

class TeamViewHolder(view: View): RecyclerView.ViewHolder(view) {

    private val binding = ItemTeamBinding.bind(view)

    fun render(team: BaseModel.Team, onItemSelected: (BaseModel) -> Unit) {
//        val context = binding.tvTitleTeam.context
//        binding.tvTitleTeam.text = context.getString(team.teamName)

        binding.parent.setOnClickListener {
            onItemSelected(team)
        }

        val teamModel = team.teamModel
        binding.tvTitleTeam.text = teamModel.teamName
        binding.tvArenaNameValue.text = teamModel.arenaName
        binding.tvOwnerNameValue.text = teamModel.ownerName
        binding.cardImage.setImageResource(R.drawable.team)
    }
}