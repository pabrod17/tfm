package com.example.tfmmobile.ui.health.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.domain.model.LesionModel

class LesionAdapter (private var lesionList: List<LesionModel> = emptyList(),
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