package com.example.tfmmobile.ui.club.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.domain.model.PlayerModel

class PlayerAdapter (private var playerList: List<PlayerModel> = emptyList(),
                     private val onItemSelected:(PlayerModel) -> Unit) : RecyclerView.Adapter<PlayerViewHolder>(){

    fun updateList(list:List<PlayerModel>) {
        playerList = list
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PlayerViewHolder {
        return PlayerViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_player, parent, false)
        )
    }

    override fun onBindViewHolder(holder: PlayerViewHolder, position: Int) {
        holder.render(playerList[position], onItemSelected )
    }

    override fun getItemCount() = playerList.size

}