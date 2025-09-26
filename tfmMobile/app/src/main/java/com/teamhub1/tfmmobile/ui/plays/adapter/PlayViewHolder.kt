package com.teamhub1.tfmmobile.ui.plays.adapter

import android.view.View
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.databinding.ItemPlayBinding
import com.teamhub1.tfmmobile.domain.model.PlayModel

class PlayViewHolder(view: View): RecyclerView.ViewHolder(view) {

    private val binding = ItemPlayBinding.bind(view)
    private val tvTypePlayValue: TextView = view.findViewById(R.id.tvTypePlayValue)


    fun render(play: PlayModel, onItemSelected: (PlayModel) -> Unit) {

        binding.parent.setOnClickListener {
            onItemSelected(play)
        }


        binding.tvNamePlayValue.text = play.title

        if (play.playType.equals("Defensa")) {
            binding.tvTypePlayValue.text =
                ContextCompat.getString(binding.tvTypePlayValue.context,
                    R.string.playsDefense)
            binding.tvTypePlayValue.setTextColor(
                ContextCompat.getColor(
                    tvTypePlayValue.context,
                    R.color.cardPlayDefense
                )
            )
        }
        if (play.playType.equals("Ataque")) {
            binding.tvTypePlayValue.text =
                ContextCompat.getString(binding.tvTypePlayValue.context,
                    R.string.playsAttack)
            binding.tvTypePlayValue.setTextColor(
                ContextCompat.getColor(
                    tvTypePlayValue.context,
                    R.color.cardPlayAttack2
                )
            )
        }

    }


}