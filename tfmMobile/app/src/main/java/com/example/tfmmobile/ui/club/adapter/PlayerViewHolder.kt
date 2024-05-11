package com.example.tfmmobile.ui.club.adapter

import android.view.View
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.databinding.ItemPlayerBinding
import com.example.tfmmobile.domain.model.PlayerModel

class PlayerViewHolder(view: View): RecyclerView.ViewHolder(view) {

    private val binding = ItemPlayerBinding.bind(view)
    private val textPosition : TextView = view.findViewById(R.id.tvPositionValue)

    fun render(player: PlayerModel, onItemSelected: (PlayerModel) -> Unit) {

        binding.parent.setOnClickListener {
            onItemSelected(player)
        }

        binding.tvNameAndSurnamesValue.text =player.playerName + " " + player.primaryLastName + " " + player.secondLastName
        binding.tvPositionValue.text = player.position
        if(player.position.equals("Base")) {
            binding.tvPositionValue.setTextColor(ContextCompat.getColor(textPosition.context, R.color.green))
        }
        if(player.position.equals("Escolta")) {
            binding.tvPositionValue.setTextColor(ContextCompat.getColor(textPosition.context, R.color.blue))
        }
        if(player.position.equals("Alero")) {
            binding.tvPositionValue.setTextColor(ContextCompat.getColor(textPosition.context, R.color.yellow))
        }
        if(player.position.equals("AlaPivot")) {
            binding.tvPositionValue.setTextColor(ContextCompat.getColor(textPosition.context, R.color.orange))
        }
        if(player.position.equals("Pivot")) {
            binding.tvPositionValue.setTextColor(ContextCompat.getColor(textPosition.context, R.color.red))
        }
        if(player.injured) {
            binding.ivPlayerDetailInjured.visibility = View.VISIBLE
        }
        binding.cardImage.setImageResource(R.drawable.player)
    }
}