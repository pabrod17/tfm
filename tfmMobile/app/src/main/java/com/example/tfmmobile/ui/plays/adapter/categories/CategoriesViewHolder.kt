package com.example.tfmmobile.ui.plays.adapter.categories

import android.view.View
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.core.content.ContextCompat.getString
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.ui.plays.PlaysCategory

class CategoriesViewHolder(view: View) : RecyclerView.ViewHolder(view) {

    private val tvCategoryNamePlays: TextView = view.findViewById(R.id.tvCategoryNamePlays)

    private val cardPlayshLayout: View = view.findViewById(R.id.cardPlayshLayout)

    fun render(playsCategory: PlaysCategory, isSelected: Boolean, onItemSelected: (Int) -> Unit) {
        tvCategoryNamePlays.text = "Ejemplo"


        itemView.setOnClickListener { onItemSelected(layoutPosition) }


        when (playsCategory) {
            PlaysCategory.Plays -> {
                tvCategoryNamePlays.text = getString(tvCategoryNamePlays.context, R.string.plays)
                cardPlayshLayout.background = ContextCompat.getDrawable(
                    cardPlayshLayout.context,
                    R.drawable.gradient_background_plays_category_play_card
                )
                if (playsCategory.isSelected) {
                    cardPlayshLayout.background = ContextCompat.getDrawable(
                        cardPlayshLayout.context,
                        R.drawable.gradient_background_plays_category_play_card_selected
                    )
                }


            }

        }
    }
}