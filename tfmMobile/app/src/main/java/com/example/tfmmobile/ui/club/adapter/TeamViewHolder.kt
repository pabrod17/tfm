package com.example.tfmmobile.ui.club.adapter

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.databinding.ItemTeamBinding
import com.example.tfmmobile.domain.model.Team

class TeamViewHolder(view: View): RecyclerView.ViewHolder(view) {

    private val binding = ItemTeamBinding.bind(view)

    fun render(team: Team, onItemSelected:(Team) -> Unit){
//        val context = binding.tvTitleTeam.context
//        binding.tvTitleTeam.text = context.getString(team.teamName)

        binding.parent.setOnClickListener {
            onItemSelected(team)
        }
        binding.ivTeam.setImageResource(R.drawable.team)
        binding.tvTitleTeam.text = team.teamName
    }
}