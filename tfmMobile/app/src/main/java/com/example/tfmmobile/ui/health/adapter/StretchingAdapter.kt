package com.example.tfmmobile.ui.health.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.domain.model.StretchingModel

class StretchingAdapter (
    var stretchingsList: List<StretchingModel> = emptyList(),
    private val onItemSelected:(StretchingModel) -> Unit) : RecyclerView.Adapter<StretchingViewHolder>(){

    fun updateList(list:List<StretchingModel>) {
        stretchingsList = list.sortedBy { it.id }
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): StretchingViewHolder {
        return StretchingViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_stretching, parent, false)
        )
    }

    override fun onBindViewHolder(holder: StretchingViewHolder, position: Int) {
        holder.render(stretchingsList[position], onItemSelected )
    }

    override fun getItemCount() = stretchingsList.size

}