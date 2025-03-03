package com.example.tfmmobile.ui.health.adapter.categories

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.ui.health.adapter.LesionCategory

class LesionCategoriesAdapter (private val categories:List<LesionCategory>, private val onItemSelected:(Int) -> Unit) :
    RecyclerView.Adapter<LesionCategoriesViewHolder>(){
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): LesionCategoriesViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_health_lesion_category, parent, false)
        return LesionCategoriesViewHolder(view)
    }

    override fun getItemCount() = categories.size

    override fun onBindViewHolder(holder: LesionCategoriesViewHolder, position: Int) {
        holder.render(categories[position], onItemSelected)
    }
}