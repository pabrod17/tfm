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

    private var isIconSelected = false // Estado inicial: no seleccionado

    @RequiresApi(Build.VERSION_CODES.O)
    fun render(event: EventModel, onItemSelected: (EventModel) -> Unit, onDeleteIconClicked: (EventModel) -> Unit) {

        binding.parent.setOnClickListener {
            onItemSelected(event)
        }



        binding.tvTitle.text = event.title
        binding.tvDatesValue.text = formatDate(event.startDate) + " / " + formatDate(event.finishDate)

        when (event.eventType) {
            "Game" -> {
                cardEventsLayout.background = ContextCompat.getDrawable(
                    cardEventsLayout.context,
                    R.drawable.gradient_background_events_category_game
                )
            }
            "Training" -> {
                cardEventsLayout.background = ContextCompat.getDrawable(
                    cardEventsLayout.context,
                    R.drawable.gradient_background_events_category_training
                )
            }
            else -> {

                cardEventsLayout.background = ContextCompat.getDrawable(
                    cardEventsLayout.context,
                    R.drawable.gradient_background_plays_category_play_card
                )
            }
        }
//        binding.cardImage.setImageResource(R.drawable.game)
    }

    private fun dpToPx(dp: Float, context: Context): Float {
        return dp * context.resources.displayMetrics.density
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun formatDate(dateToFormat: String) : String {
        val formatterBD = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSZ")
        val formatterDeseado = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")
        val fecha = LocalDateTime.parse(dateToFormat, formatterBD)
        val fechaMas2Horas = fecha.plusHours(2)
        return formatterDeseado.format(fechaMas2Horas)
    }

}