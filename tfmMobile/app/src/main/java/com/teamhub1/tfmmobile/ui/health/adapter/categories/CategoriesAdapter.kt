package com.teamhub1.tfmmobile.ui.health.adapter.categories

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.ui.health.HealthCategory

class CategoriesAdapter(private val categories:List<HealthCategory>, private val onItemSelected:(Int) -> Unit) :
    RecyclerView.Adapter<CategoriesViewHolder>() {

    private var selectedPosition: Int = categories.indexOfFirst { it.isSelected }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CategoriesViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_health_category, parent, false)
        return CategoriesViewHolder(view)
    }

    override fun onBindViewHolder(holder: CategoriesViewHolder, position: Int) {
        holder.render(categories[position], position == selectedPosition, onItemSelected)

    }

    fun getSelectedPosition(): Int {
        return selectedPosition
    }

    override fun getItemCount() = categories.size

}