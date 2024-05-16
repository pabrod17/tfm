package com.example.tfmmobile.ui.events.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.domain.model.GameModel

class GameAdapter (private var gameList: List<GameModel> = emptyList(),
                   private val onItemSelected:(GameModel) -> Unit) : RecyclerView.Adapter<GameViewHolder>(){

    fun updateList(list:List<GameModel>) {
        gameList = list
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): GameViewHolder {
        return GameViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_game, parent, false)
        )
    }

    override fun onBindViewHolder(holder: GameViewHolder, position: Int) {
        holder.render(gameList[position], onItemSelected )
    }

    override fun getItemCount() = gameList.size

}