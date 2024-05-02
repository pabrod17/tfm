package com.example.tfmmobile.ui.club.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.domain.model.Team

class TeamAdapter (private var teamList: List<Team> = emptyList(),
    private val onItemSelected:(Team) -> Unit) : RecyclerView.Adapter<TeamViewHolder>(){

    fun updateList(list:List<Team>) {
        teamList = list
//        Avisamos de que la lista ha cambiado
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TeamViewHolder {
        return TeamViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_team, parent, false)
        )
    }

    override fun onBindViewHolder(holder: TeamViewHolder, position: Int) {
        holder.render(teamList[position], onItemSelected )
    }

    override fun getItemCount() = teamList.size
}