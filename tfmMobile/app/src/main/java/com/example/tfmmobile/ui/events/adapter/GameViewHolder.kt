package com.example.tfmmobile.ui.events.adapter

import android.os.Build
import android.view.View
import androidx.annotation.RequiresApi
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.databinding.ItemGameBinding
import com.example.tfmmobile.domain.model.GameModel
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class GameViewHolder(view: View): RecyclerView.ViewHolder(view) {

    private val binding = ItemGameBinding.bind(view)

    @RequiresApi(Build.VERSION_CODES.O)
    fun render(game: GameModel, onItemSelected: (GameModel) -> Unit) {

        binding.parent.setOnClickListener {
            onItemSelected(game)
        }


        binding.tvTitleTeam.text = game.rival
        binding.tvDatesValue.text = formatDate(game.gameDate)
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