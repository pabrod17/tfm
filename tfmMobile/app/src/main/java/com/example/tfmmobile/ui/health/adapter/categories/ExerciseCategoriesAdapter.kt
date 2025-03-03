package com.example.tfmmobile.ui.health.adapter.categories

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.ui.health.adapter.ExerciseCategory
import com.example.tfmmobile.ui.health.adapter.LesionCategory

class ExerciseCategoriesAdapter (private val categories:List<ExerciseCategory>, private val onItemSelected:(Int) -> Unit) :
    RecyclerView.Adapter<ExerciseCategoriesViewHolder>(){
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ExerciseCategoriesViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_health_lesion_category, parent, false)
        return ExerciseCategoriesViewHolder(view)
    }

    override fun getItemCount() = categories.size

    override fun onBindViewHolder(holder: ExerciseCategoriesViewHolder, position: Int) {
        holder.render(categories[position], onItemSelected)
    }
}