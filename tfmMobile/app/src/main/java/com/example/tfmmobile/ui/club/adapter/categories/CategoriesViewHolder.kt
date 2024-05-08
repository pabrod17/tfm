package com.example.tfmmobile.ui.club.adapter.categories

import android.view.View
import android.widget.TextView
import androidx.appcompat.widget.AppCompatImageView
import androidx.core.content.ContextCompat
import androidx.core.content.ContextCompat.getString
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.ui.club.ClubCategory

class CategoriesViewHolder(view: View) : RecyclerView.ViewHolder(view) {

    private val tvCategoryName:TextView = view.findViewById(R.id.tvCategoryName)
//    private val divider:View = view.findViewById(R.id.divider)
    private val cardClubLayout:View = view.findViewById(R.id.cardClubLayout)
    private val cardImage: AppCompatImageView = view.findViewById(R.id.cardImage)

    fun render(clubCategory: ClubCategory) {
        tvCategoryName.text= "Ejemplo"

        when(clubCategory) {
            ClubCategory.Players -> {
                tvCategoryName.text = getString(tvCategoryName.context, R.string.players)
//                divider.setBackgroundColor(ContextCompat.getColor(divider.context, R.color.cardPlayer2))
                cardClubLayout.background = ContextCompat.getDrawable(cardClubLayout.context, R.drawable.gradient_background_club_category_player)
                cardImage.setImageResource(R.drawable.player)

            }
            ClubCategory.Seasons -> {
                tvCategoryName.text = getString(tvCategoryName.context, R.string.seasons)
//                divider.setBackgroundColor(ContextCompat.getColor(divider.context, R.color.cardSeason1))
                cardClubLayout.background = ContextCompat.getDrawable(cardClubLayout.context, R.drawable.gradient_background_club_category_season)
                cardImage.setImageResource(R.drawable.season)
            }
            ClubCategory.Teams -> {
                tvCategoryName.text = getString(tvCategoryName.context, R.string.teams)
//                divider.setBackgroundColor(ContextCompat.getColor(divider.context, R.color.cardTeam1))
                cardClubLayout.background = ContextCompat.getDrawable(cardClubLayout.context, R.drawable.gradient_background_club_category_team)
//                cardImage.setImageResource(R.drawable.team)
            }
        }
    }
}