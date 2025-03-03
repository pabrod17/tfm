package com.example.tfmmobile.ui.health.adapter.categories

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.ui.health.adapter.ExerciseCategory
import com.example.tfmmobile.ui.health.adapter.LesionCategory
import com.example.tfmmobile.ui.health.adapter.StretchingCategory

class StretchingCategoriesAdapter (private val categories:List<StretchingCategory>, private val onItemSelected:(Int) -> Unit) :
    RecyclerView.Adapter<StretchingCategoriesViewHolder>(){
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): StretchingCategoriesViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_health_lesion_category, parent, false)
        return StretchingCategoriesViewHolder(view)
    }

    override fun getItemCount() = categories.size

    override fun onBindViewHolder(holder: StretchingCategoriesViewHolder, position: Int) {
        holder.render(categories[position], onItemSelected)
    }
}