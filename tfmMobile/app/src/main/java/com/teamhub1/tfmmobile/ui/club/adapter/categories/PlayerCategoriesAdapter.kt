package com.teamhub1.tfmmobile.ui.club.adapter.categories

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.ui.club.adapter.PlayerCategory

class PlayerCategoriesAdapter (private val categories:List<PlayerCategory>, private val onItemSelected:(Int) -> Unit) :
    RecyclerView.Adapter<PlayerCategoriesViewHolder>(){
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PlayerCategoriesViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_club_player_category, parent, false)
        return PlayerCategoriesViewHolder(view)
    }

    override fun getItemCount() = categories.size

    override fun onBindViewHolder(holder: PlayerCategoriesViewHolder, position: Int) {
        holder.render(categories[position], onItemSelected)
    }
}