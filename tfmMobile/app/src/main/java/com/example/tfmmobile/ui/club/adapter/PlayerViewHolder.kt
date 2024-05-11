package com.example.tfmmobile.ui.club.adapter

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.databinding.ItemPlayerBinding

class PlayerViewHolder(view: View): RecyclerView.ViewHolder(view) {

    private val binding = ItemPlayerBinding.bind(view)

    fun render(player: BaseModel.Player, onItemSelected: (BaseModel) -> Unit) {

        binding.parent.setOnClickListener {
            onItemSelected(player)
        }

        val playerModel = player.playerModel
        binding.tvTitleTeam.text = playerModel.playerName
        binding.tvSurnamesValue.text = playerModel.primaryLastName + " "+ playerModel.secondLastName
        binding.tvPositionValue.text = playerModel.position
        binding.cardImage.setImageResource(R.drawable.player)
    }
}