package com.example.tfmmobile.ui.health.adapter.categories

import android.graphics.Color
import android.os.Build
import android.view.View
import android.widget.TextView
import androidx.annotation.RequiresApi
import androidx.appcompat.widget.AppCompatImageView
import androidx.cardview.widget.CardView
import androidx.core.content.ContextCompat
import androidx.core.content.ContextCompat.getString
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.ui.club.ClubCategory
import com.example.tfmmobile.ui.events.EventsCategory
import com.example.tfmmobile.ui.health.HealthCategory
import com.google.android.material.card.MaterialCardView

class CategoriesViewHolder(view: View) : RecyclerView.ViewHolder(view) {

    private val tvCategoryNameHealth: TextView = view.findViewById(R.id.tvCategoryNameHealth)

    //    private val divider:View = view.findViewById(R.id.divider)
    private val cardHealthLayout: View = view.findViewById(R.id.cardHealthLayout)
    private val cardImageHealth: AppCompatImageView = view.findViewById(R.id.cardImageHealth)
    private val healthCategoryPrincipal: CardView = view.findViewById(R.id.healthCategoryPrincipal)

    @RequiresApi(Build.VERSION_CODES.P)
    fun render(healthCategory: HealthCategory, isSelected: Boolean, onItemSelected: (Int) -> Unit) {
        tvCategoryNameHealth.text = "Ejemplo"


        itemView.setOnClickListener { onItemSelected(layoutPosition) }


        when (healthCategory) {
            HealthCategory.Lesion -> {
                tvCategoryNameHealth.text = getString(tvCategoryNameHealth.context, R.string.lesion)
                cardHealthLayout.background = ContextCompat.getDrawable(
                    cardHealthLayout.context,
                    R.drawable.gradient_background_healthj_category_lesion_card
                )
                cardImageHealth.setImageResource(R.drawable.lesion)
                healthCategoryPrincipal.cardElevation = 10F
                healthCategoryPrincipal.outlineSpotShadowColor = Color.TRANSPARENT

                if (healthCategory.isSelected) {
//                    cardHealthLayout.background = ContextCompat.getDrawable(
//                        cardHealthLayout.context,
//                        R.drawable.gradient_background_healthj_category_lesion_card_selected
//                    )
                    healthCategoryPrincipal.outlineSpotShadowColor = Color.WHITE
                    healthCategoryPrincipal.cardElevation = 40F
                }


            }

            HealthCategory.Exercises -> {
                tvCategoryNameHealth.text = getString(tvCategoryNameHealth.context, R.string.exercises)
//                divider.setBackgroundColor(ContextCompat.getColor(divider.context, R.color.cardSeason1))
                cardHealthLayout.background = ContextCompat.getDrawable(
                    cardHealthLayout.context,
                    R.drawable.gradient_background_healthj_category_exercise_card
                )
                cardImageHealth.setImageResource(R.drawable.exercise)
                healthCategoryPrincipal.cardElevation = 10F
                healthCategoryPrincipal.outlineSpotShadowColor = Color.TRANSPARENT

                if (healthCategory.isSelected) {
//                    cardHealthLayout.background = ContextCompat.getDrawable(
//                        cardHealthLayout.context,
//                        R.drawable.gradient_background_healthj_category_exercise_card_selected
//                    )
                    healthCategoryPrincipal.outlineSpotShadowColor = Color.WHITE
                    healthCategoryPrincipal.cardElevation = 40F
                }
            }

            HealthCategory.Stretchings -> {
                tvCategoryNameHealth.text = getString(tvCategoryNameHealth.context, R.string.stretchings)
//                divider.setBackgroundColor(ContextCompat.getColor(divider.context, R.color.cardSeason1))
                cardHealthLayout.background = ContextCompat.getDrawable(
                    cardHealthLayout.context,
                    R.drawable.gradient_background_healthj_category_stretching_card
                )
                cardImageHealth.setImageResource(R.drawable.stretching)
                healthCategoryPrincipal.cardElevation = 10F
                healthCategoryPrincipal.outlineSpotShadowColor = Color.TRANSPARENT

                if (healthCategory.isSelected) {
//                    cardHealthLayout.background = ContextCompat.getDrawable(
//                        cardHealthLayout.context,
//                        R.drawable.gradient_background_healthj_category_stretching_card_selected
//                    )
                    healthCategoryPrincipal.outlineSpotShadowColor = Color.WHITE
                    healthCategoryPrincipal.cardElevation = 40F
                }
            }
        }
    }
}