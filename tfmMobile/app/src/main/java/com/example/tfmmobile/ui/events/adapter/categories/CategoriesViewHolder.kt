package com.example.tfmmobile.ui.events.adapter.categories

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
import com.google.android.material.card.MaterialCardView

class CategoriesViewHolder(view: View) : RecyclerView.ViewHolder(view) {

    private val tvCategoryNameEvent: TextView = view.findViewById(R.id.tvCategoryNameEvent)

    //    private val divider:View = view.findViewById(R.id.divider)
    private val cardEventsLayout: View = view.findViewById(R.id.cardEventsLayout)
    private val cardImageEvents: AppCompatImageView = view.findViewById(R.id.cardImageEvents)
    private val eventsCategoryPrincipal: CardView = view.findViewById(R.id.eventsCategoryPrincipal)

    @RequiresApi(Build.VERSION_CODES.P)
    fun render(eventsCategory: EventsCategory, onItemSelected: (Int) -> Unit) {
        tvCategoryNameEvent.text = "Ejemplo"


        itemView.setOnClickListener { onItemSelected(layoutPosition) }


        when (eventsCategory) {
            EventsCategory.Games -> {
                tvCategoryNameEvent.text = getString(tvCategoryNameEvent.context, R.string.games)
                cardEventsLayout.background = ContextCompat.getDrawable(
                    cardEventsLayout.context,
                    R.drawable.gradient_background_events_category_game2_new
                )
                cardImageEvents.setImageResource(R.drawable.game)
                eventsCategoryPrincipal.cardElevation = 10F
                eventsCategoryPrincipal.outlineSpotShadowColor = Color.TRANSPARENT

                if (eventsCategory.isSelected) {
//                    cardEventsLayout.background = ContextCompat.getDrawable(
//                        cardEventsLayout.context,
//                        R.drawable.gradient_background_events_category_game_selected
//                    )
                    eventsCategoryPrincipal.outlineSpotShadowColor = Color.WHITE
                    eventsCategoryPrincipal.cardElevation = 40F
                }


            }

            EventsCategory.Trainings -> {
                tvCategoryNameEvent.text = getString(tvCategoryNameEvent.context, R.string.trainings)
//                divider.setBackgroundColor(ContextCompat.getColor(divider.context, R.color.cardSeason1))
                cardEventsLayout.background = ContextCompat.getDrawable(
                    cardEventsLayout.context,
                    R.drawable.gradient_background_events_category_training2
                )
                cardImageEvents.setImageResource(R.drawable.training)
                eventsCategoryPrincipal.outlineSpotShadowColor = Color.TRANSPARENT

                if (eventsCategory.isSelected) {
//                    cardEventsLayout.background = ContextCompat.getDrawable(
//                        cardEventsLayout.context,
//                        R.drawable.gradient_background_events_category_training_selected
//                    )
                    eventsCategoryPrincipal.outlineSpotShadowColor = Color.WHITE
                    eventsCategoryPrincipal.cardElevation = 40F
                }
            }
        }
    }
}