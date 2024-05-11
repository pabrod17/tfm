package com.example.tfmmobile.ui.club.adapter

import android.os.Build
import android.view.View
import android.widget.TextView
import androidx.annotation.RequiresApi
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.databinding.ItemSeasonBinding
import com.example.tfmmobile.domain.model.SeasonModel
import java.text.SimpleDateFormat
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.Locale

class SeasonViewHolder(view: View): RecyclerView.ViewHolder(view) {

    private val binding = ItemSeasonBinding.bind(view)
    @RequiresApi(Build.VERSION_CODES.O)
    fun render(season: SeasonModel, onItemSelected: (SeasonModel) -> Unit) {

        binding.parent.setOnClickListener {
            onItemSelected(season)
        }


        binding.tvTitleTeam.text = season.seasonName
        binding.tvDatesValue.text = formatDate(season.startDate) + " / " + formatDate(season.startDate)
        binding.cardImage.setImageResource(R.drawable.season)
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun formatDate(dateToFormat: String) : String {
        val formatterBD = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSZ")
        val formatterDeseado = DateTimeFormatter.ofPattern("yyyy-MM-dd")
        val fecha = LocalDateTime.parse(dateToFormat, formatterBD)
        return formatterDeseado.format(fecha)
    }
}