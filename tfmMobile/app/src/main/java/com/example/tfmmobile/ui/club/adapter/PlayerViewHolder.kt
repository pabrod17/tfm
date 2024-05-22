package com.example.tfmmobile.ui.club.adapter

import android.view.View
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.databinding.ItemPlayerBinding
import com.example.tfmmobile.domain.model.PlayerModel

class PlayerViewHolder(view: View) : RecyclerView.ViewHolder(view) {

    private val binding = ItemPlayerBinding.bind(view)
    private val textPosition: TextView = view.findViewById(R.id.tvPositionValue)

    fun render(player: PlayerModel, onItemSelected: (PlayerModel) -> Unit) {

        binding.parent.setOnClickListener {
            onItemSelected(player)
        }

        binding.tvNameAndSurnamesValue.text =
            player.playerName + " " + player.primaryLastName + " " + player.secondLastName
        if (player.position.equals("Base")) {
            binding.tvPositionValue.text =
                ContextCompat.getString(binding.tvPositionValue.context,
                    R.string.position1)
            binding.tvPositionValue.setTextColor(
                ContextCompat.getColor(
                    textPosition.context,
                    R.color.position4
                )
            )

        }
        if (player.position.equals("Escolta")) {
            binding.tvPositionValue.text =
                ContextCompat.getString(binding.tvPositionValue.context,
                    R.string.position2)
            binding.tvPositionValue.setTextColor(
                ContextCompat.getColor(
                    textPosition.context,
                    R.color.position5
                )
            )

        }
        if (player.position.equals("Alero")) {
            binding.tvPositionValue.text =
                ContextCompat.getString(binding.tvPositionValue.context,
                    R.string.position3)
            binding.tvPositionValue.setTextColor(
                ContextCompat.getColor(
                    textPosition.context,
                    R.color.position3
                )
            )
        }
        if (player.position.equals("AlaPivot")) {
            binding.tvPositionValue.text =
                ContextCompat.getString(binding.tvPositionValue.context,
                    R.string.position4)
            binding.tvPositionValue.setTextColor(
                ContextCompat.getColor(
                    textPosition.context,
                    R.color.position2
                )
            )
        }
        if (player.position.equals("Pivot")) {
            binding.tvPositionValue.text =
                ContextCompat.getString(binding.tvPositionValue.context,
                    R.string.position5)
            binding.tvPositionValue.setTextColor(
                ContextCompat.getColor(
                    textPosition.context,
                    R.color.position1
                )
            )
        }

        if (player.injured) {
            binding.ivPlayerDetailInjured.visibility = View.VISIBLE
        } else {
            binding.ivPlayerDetailInjured.visibility =
                View.GONE
        }
        binding.cardImage.setImageResource(R.drawable.player)
    }
}