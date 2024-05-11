package com.example.tfmmobile.ui.club.adapter

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.databinding.ItemPlayerBinding
import com.example.tfmmobile.domain.model.PlayerModel

class PlayerViewHolder(view: View): RecyclerView.ViewHolder(view) {

    private val binding = ItemPlayerBinding.bind(view)

    fun render(player: PlayerModel, onItemSelected: (PlayerModel) -> Unit) {

        binding.parent.setOnClickListener {
            onItemSelected(player)
        }

        binding.tvNameAndSurnamesValue.text =player.playerName + " " + player.primaryLastName + " " + player.secondLastName
        binding.tvPositionValue.text = player.position
        if(player.injured) {
            binding.ivPlayerDetailInjured.visibility = View.VISIBLE
        }
        binding.cardImage.setImageResource(R.drawable.player)
    }
}