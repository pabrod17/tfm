package com.teamhub1.tfmmobile.ui.events.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.domain.model.TrainingModel

class TrainingAdapter (private var trainingList: List<TrainingModel> = emptyList(),
                       private val onItemSelected:(TrainingModel) -> Unit) : RecyclerView.Adapter<TrainingViewHolder>(){

    fun updateList(list:List<TrainingModel>) {
        trainingList = list.sortedBy { it.id } // Por ejemplo, ordena por el nombre de los jugadores
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TrainingViewHolder {
        return TrainingViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_training, parent, false)
        )
    }

    override fun onBindViewHolder(holder: TrainingViewHolder, position: Int) {
        holder.render(trainingList[position], onItemSelected )
    }

    override fun getItemCount() = trainingList.size

}