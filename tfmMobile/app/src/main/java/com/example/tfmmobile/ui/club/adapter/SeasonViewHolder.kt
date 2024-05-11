package com.example.tfmmobile.ui.club.adapter

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.databinding.ItemSeasonBinding

class SeasonViewHolder(view: View): RecyclerView.ViewHolder(view) {

    private val binding = ItemSeasonBinding.bind(view)

    fun render(season: BaseModel.Season, onItemSelected: (BaseModel) -> Unit) {

        binding.parent.setOnClickListener {
            onItemSelected(season)
        }

        val seasonModel = season.seasonModel
        binding.tvTitleTeam.text = seasonModel.seasonName
        binding.tvStartDateValue.text = seasonModel.startDate
        binding.tvFinishDateValue.text = seasonModel.endDate
        binding.cardImage.setImageResource(R.drawable.season)
    }
}