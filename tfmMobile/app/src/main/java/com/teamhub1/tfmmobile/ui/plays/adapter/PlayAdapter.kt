package com.teamhub1.tfmmobile.ui.plays.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.domain.model.PlayModel

class PlayAdapter (
    var playList: List<PlayModel> = emptyList(),
    private val onItemSelected:(PlayModel) -> Unit) : RecyclerView.Adapter<PlayViewHolder>(){

    fun updateList(list:List<PlayModel>) {
        playList = list.sortedBy { it.id }
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PlayViewHolder {
        return PlayViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_play, parent, false)
        )
    }

    override fun onBindViewHolder(holder: PlayViewHolder, position: Int) {
        holder.render(playList[position], onItemSelected )
    }

    override fun getItemCount() = playList.size

}