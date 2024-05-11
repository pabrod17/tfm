package com.example.tfmmobile.ui.club.adapter

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.databinding.ItemSeasonBinding
import com.example.tfmmobile.domain.model.SeasonModel

class SeasonViewHolder(view: View): RecyclerView.ViewHolder(view) {

    private val binding = ItemSeasonBinding.bind(view)

    fun render(season: SeasonModel, onItemSelected: (SeasonModel) -> Unit) {

        binding.parent.setOnClickListener {
            onItemSelected(season)
        }

        binding.tvTitleTeam.text = season.seasonName
        binding.tvStartDateValue.text = season.startDate
        binding.tvFinishDateValue.text = season.endDate
        binding.cardImage.setImageResource(R.drawable.season)
    }
}