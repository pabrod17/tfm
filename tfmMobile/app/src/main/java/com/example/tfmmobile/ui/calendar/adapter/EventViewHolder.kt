package com.example.tfmmobile.ui.calendar.adapter

import android.content.Context
import android.os.Build
import android.view.View
import androidx.annotation.RequiresApi
import androidx.appcompat.widget.AppCompatImageView
import androidx.cardview.widget.CardView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.databinding.ItemEventBinding
import com.example.tfmmobile.databinding.ItemGameBinding
import com.example.tfmmobile.domain.model.EventModel
import com.example.tfmmobile.domain.model.GameModel
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class EventViewHolder(view: View): RecyclerView.ViewHolder(view) {

    private val binding = ItemEventBinding.bind(view)
    private val cardEventsLayout: View = view.findViewById(R.id.itemEventCard)
    private val ivEventGeneralDelete: CardView = view.findViewById(R.id.ivEventGeneralDelete)
    private val eventGeneralDeleteIcon: AppCompatImageView = view.findViewById(R.id.eventGeneralDeleteIcon)

    private var isIconSelected = false // Estado inicial: no seleccionado

    @RequiresApi(Build.VERSION_CODES.O)
    fun render(event: EventModel, onItemSelected: (EventModel) -> Unit, onDeleteIconClicked: (EventModel) -> Unit) {

        binding.parent.setOnClickListener {
            onItemSelected(event)
        }

        eventGeneralDeleteIcon.setOnClickListener {
            ivEventGeneralDelete.radius = dpToPx(360f, ivEventGeneralDelete.context)

            isIconSelected = !isIconSelected // Cambia el estado al hacer clic
            ivEventGeneralDelete.radius = dpToPx(360f, ivEventGeneralDelete.context)

            updateIconBackground() // Actualiza el color de fondo
            ivEventGeneralDelete.radius = dpToPx(360f, ivEventGeneralDelete.context)

            onDeleteIconClicked(event)
            ivEventGeneralDelete.radius = dpToPx(360f, ivEventGeneralDelete.context)

        }


        binding.tvTitle.text = event.title
        binding.tvDatesValue.text = formatDate(event.startDate) + " / " + formatDate(event.finishDate)
        ivEventGeneralDelete.radius = dpToPx(360f, ivEventGeneralDelete.context)

        when (event.eventType) {
            "Game" -> {
                cardEventsLayout.background = ContextCompat.getDrawable(
                    cardEventsLayout.context,
                    R.drawable.gradient_background_events_category_game
                )
                ivEventGeneralDelete.visibility = View.GONE
            }
            "Training" -> {
                cardEventsLayout.background = ContextCompat.getDrawable(
                    cardEventsLayout.context,
                    R.drawable.gradient_background_events_category_training
                )
                ivEventGeneralDelete.visibility = View.GONE
            }
            else -> {
                ivEventGeneralDelete.radius = dpToPx(360f, ivEventGeneralDelete.context)
                ivEventGeneralDelete.visibility = View.VISIBLE
                ivEventGeneralDelete.radius = dpToPx(360f, ivEventGeneralDelete.context)

                cardEventsLayout.background = ContextCompat.getDrawable(
                    cardEventsLayout.context,
                    R.drawable.gradient_background_plays_category_play_card
                )
                if(ivEventGeneralDelete.isSelected) {
                    ivEventGeneralDelete.radius = dpToPx(360f, ivEventGeneralDelete.context)
                }
                ivEventGeneralDelete.setOnClickListener {
                    ivEventGeneralDelete.radius = dpToPx(360f, ivEventGeneralDelete.context)
                }

            }
        }
//        binding.cardImage.setImageResource(R.drawable.game)
    }

    private fun updateIconBackground() {
        ivEventGeneralDelete.radius = dpToPx(360f, ivEventGeneralDelete.context)

        if (isIconSelected) {
            ivEventGeneralDelete.radius = dpToPx(360f, ivEventGeneralDelete.context)

            ivEventGeneralDelete.background = (ContextCompat.getDrawable(ivEventGeneralDelete.context, R.drawable.probando2))
            eventGeneralDeleteIcon.setImageResource(R.drawable.delete3nuevo)
            ivEventGeneralDelete.radius = dpToPx(360f, ivEventGeneralDelete.context)
        } else {
            ivEventGeneralDelete.radius = dpToPx(360f, ivEventGeneralDelete.context)

            ivEventGeneralDelete.background = (ContextCompat.getDrawable(ivEventGeneralDelete.context, R.drawable.probando1))
            eventGeneralDeleteIcon.setImageResource(R.drawable.delete2)
            ivEventGeneralDelete.radius = dpToPx(360f, ivEventGeneralDelete.context)
        }
        ivEventGeneralDelete.radius = dpToPx(360f, ivEventGeneralDelete.context)

    }

    private fun dpToPx(dp: Float, context: Context): Float {
        return dp * context.resources.displayMetrics.density
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun formatDate(dateToFormat: String) : String {
        val formatterBD = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSZ")
        val formatterDeseado = DateTimeFormatter.ofPattern("yyyy-MM-dd")
        val fecha = LocalDateTime.parse(dateToFormat, formatterBD)
        val fechaMasUnDia = fecha.plusDays(1)
        return formatterDeseado.format(fechaMasUnDia)
    }

}