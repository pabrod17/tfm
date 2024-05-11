package com.example.tfmmobile.ui.club.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.domain.model.SeasonModel

class SeasonAdapter (private var seasonList: List<SeasonModel> = emptyList(),
                     private val onItemSelected:(SeasonModel) -> Unit) : RecyclerView.Adapter<SeasonViewHolder>(){

    fun updateList(list:List<SeasonModel>) {
        seasonList = list
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SeasonViewHolder {
        return SeasonViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_season, parent, false)
        )
    }

    override fun onBindViewHolder(holder: SeasonViewHolder, position: Int) {
        holder.render(seasonList[position], onItemSelected )
    }

    override fun getItemCount() = seasonList.size

}