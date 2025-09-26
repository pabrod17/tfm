package com.teamhub1.tfmmobile.ui.plays.adapter.categories

import android.graphics.Color
import android.os.Build
import android.view.View
import android.widget.TextView
import androidx.annotation.RequiresApi
import androidx.cardview.widget.CardView
import androidx.core.content.ContextCompat
import androidx.core.content.ContextCompat.getString
import androidx.recyclerview.widget.RecyclerView
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.ui.plays.PlaysCategory

class CategoriesViewHolder(view: View) : RecyclerView.ViewHolder(view) {

    private val tvCategoryNamePlays: TextView = view.findViewById(R.id.tvCategoryNamePlays)

    private val cardPlayshLayout: View = view.findViewById(R.id.cardPlayshLayout)
    private val playsCategoryPrincipal: CardView = view.findViewById(R.id.playsCategoryPrincipal)

    @RequiresApi(Build.VERSION_CODES.P)
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
                playsCategoryPrincipal.cardElevation = 10F
                playsCategoryPrincipal.outlineSpotShadowColor = Color.TRANSPARENT

                if (playsCategory.isSelected) {
//                    cardPlayshLayout.background = ContextCompat.getDrawable(
//                        cardPlayshLayout.context,
//                        R.drawable.gradient_background_plays_category_play_card_selected
//                    )
                    playsCategoryPrincipal.outlineSpotShadowColor = Color.WHITE
                    playsCategoryPrincipal.cardElevation = 40F
                }


            }

        }
    }
}