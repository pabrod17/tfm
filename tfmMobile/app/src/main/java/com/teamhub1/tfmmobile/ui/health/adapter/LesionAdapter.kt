package com.teamhub1.tfmmobile.ui.health.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.domain.model.LesionModel

class LesionAdapter (
    var lesionList: List<LesionModel> = emptyList(),
    private val onItemSelected:(LesionModel) -> Unit) : RecyclerView.Adapter<LesionViewHolder>(){

    fun updateList(list:List<LesionModel>) {
        lesionList = list.sortedBy { it.id }
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): LesionViewHolder {
        return LesionViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_lesion, parent, false)
        )
    }

    override fun onBindViewHolder(holder: LesionViewHolder, position: Int) {
        holder.render(lesionList[position], onItemSelected )
    }

    override fun getItemCount() = lesionList.size

}