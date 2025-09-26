package com.teamhub1.tfmmobile.ui.plays.adapter.categories

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.ui.plays.adapter.PlayCategory

class PlayCategoriesAdapter (private val categories:List<PlayCategory>, private val onItemSelected:(Int) -> Unit) :
    RecyclerView.Adapter<PlayCategoriesViewHolder>(){
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PlayCategoriesViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_plays_play_category, parent, false)
        return PlayCategoriesViewHolder(view)
    }

    override fun getItemCount() = categories.size

    override fun onBindViewHolder(holder: PlayCategoriesViewHolder, position: Int) {
        holder.render(categories[position], onItemSelected)
    }
}