package com.example.tfmmobile.ui.events.adapter

import android.os.Build
import android.view.View
import androidx.annotation.RequiresApi
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.databinding.ItemTrainingBinding
import com.example.tfmmobile.domain.model.TrainingModel
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class TrainingViewHolder(view: View): RecyclerView.ViewHolder(view) {

    private val binding = ItemTrainingBinding.bind(view)

    @RequiresApi(Build.VERSION_CODES.O)
    fun render(training: TrainingModel, onItemSelected: (TrainingModel) -> Unit) {

        binding.parent.setOnClickListener {
            onItemSelected(training)
        }


        binding.tvTitleTeam.text = training.objective
        binding.tvDatesValue.text = formatDate(training.trainingDate)
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