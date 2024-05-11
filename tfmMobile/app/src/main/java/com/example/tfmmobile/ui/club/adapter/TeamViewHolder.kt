package com.example.tfmmobile.ui.club.adapter

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.databinding.ItemTeamBinding
import com.example.tfmmobile.domain.model.Team
import com.example.tfmmobile.domain.model.TeamModel

class TeamViewHolder(view: View): RecyclerView.ViewHolder(view) {

    private val binding = ItemTeamBinding.bind(view)

    fun render(team: TeamModel, onItemSelected:(TeamModel) -> Unit){
//        val context = binding.tvTitleTeam.context
//        binding.tvTitleTeam.text = context.getString(team.teamName)

        binding.parent.setOnClickListener {
            onItemSelected(team)
        }
        binding.cardImage.setImageResource(R.drawable.team)
        binding.tvTitleTeamValue.text = team.teamName
        binding.tvArenaNameValue.text = team.arenaName
//        binding.tvOwnerNameValue.text = team.ownerName
    }
}