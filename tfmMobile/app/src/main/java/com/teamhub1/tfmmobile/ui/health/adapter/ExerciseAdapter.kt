package com.teamhub1.tfmmobile.ui.health.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.domain.model.ExerciseModel

class ExerciseAdapter (
    var exercisesList: List<ExerciseModel> = emptyList(),
    private val onItemSelected:(ExerciseModel) -> Unit) : RecyclerView.Adapter<ExerciseViewHolder>(){

    fun updateList(list:List<ExerciseModel>) {
        exercisesList = list.sortedBy { it.id }
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ExerciseViewHolder {
        return ExerciseViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_exercise, parent, false)
        )
    }

    override fun onBindViewHolder(holder: ExerciseViewHolder, position: Int) {
        holder.render(exercisesList[position], onItemSelected )
    }

    override fun getItemCount() = exercisesList.size

}