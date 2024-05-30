package com.example.tfmmobile.ui.calendar.adapter

import android.os.Build
import android.view.View
import androidx.annotation.RequiresApi
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.databinding.ItemEventBinding
import com.example.tfmmobile.databinding.ItemGameBinding
import com.example.tfmmobile.domain.model.EventModel
import com.example.tfmmobile.domain.model.GameModel
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class EventViewHolder(view: View): RecyclerView.ViewHolder(view) {

    private val binding = ItemEventBinding.bind(view)

    @RequiresApi(Build.VERSION_CODES.O)
    fun render(event: EventModel, onItemSelected: (EventModel) -> Unit) {

        binding.parent.setOnClickListener {
            onItemSelected(event)
        }


        binding.tvTitle.text = event.title
        binding.tvDatesValue.text = formatDate(event.startDate) + " / " + formatDate(event.finishDate)
//        binding.cardImage.setImageResource(R.drawable.game)
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