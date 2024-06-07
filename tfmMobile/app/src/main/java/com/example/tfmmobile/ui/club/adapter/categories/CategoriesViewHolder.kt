package com.example.tfmmobile.ui.club.adapter.categories

import android.graphics.Color
import android.os.Build
import android.view.View
import android.widget.TextView
import androidx.annotation.RequiresApi
import androidx.appcompat.widget.AppCompatImageView
import androidx.cardview.widget.CardView
import androidx.core.content.ContextCompat
import androidx.core.content.ContextCompat.getString
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.ui.club.ClubCategory
import com.google.android.material.card.MaterialCardView

class CategoriesViewHolder(view: View) : RecyclerView.ViewHolder(view) {

    private val tvCategoryName: TextView = view.findViewById(R.id.tvCategoryName)

    //    private val divider:View = view.findViewById(R.id.divider)
    private val cardClubLayout: View = view.findViewById(R.id.cardClubLayout)
    private val cardImage: AppCompatImageView = view.findViewById(R.id.cardImage)
    private val clubCategoryPrincipal: CardView = view.findViewById(R.id.clubCategoryPrincipal)


    @RequiresApi(Build.VERSION_CODES.P)
    fun render(clubCategory: ClubCategory, isSelected: Boolean, onItemSelected: (Int) -> Unit) {
        tvCategoryName.text = "Ejemplo"


        itemView.setOnClickListener { onItemSelected(layoutPosition) }


        when (clubCategory) {
            ClubCategory.Players -> {
                tvCategoryName.text = getString(tvCategoryName.context, R.string.players)
//                divider.setBackgroundColor(ContextCompat.getColor(divider.context, R.color.cardPlayer2))
                cardClubLayout.background = ContextCompat.getDrawable(
                    cardClubLayout.context,
                    R.drawable.gradient_background_club_category_player
                )
                cardImage.setImageResource(R.drawable.player)

                clubCategoryPrincipal.cardElevation = 10F
                clubCategoryPrincipal.outlineSpotShadowColor = Color.TRANSPARENT

//                ivTeamDetail.strokeWidth = 0
//                ivTeamDetail.cardElevation = 10F
//                ivTeamDetail.outlineSpotShadowColor = Color.TRANSPARENT

                if (clubCategory.isSelected) {
//                    cardClubLayout.background = ContextCompat.getDrawable(
//                        cardClubLayout.context,
//                        R.drawable.gradient_background_club_category_player_selected
//                    )
                    clubCategoryPrincipal.outlineSpotShadowColor = Color.WHITE
                    clubCategoryPrincipal.cardElevation = 40F

//                    ivTeamDetail.strokeWidth = 4
//                    ivTeamDetail.strokeColor = Color.WHITE
//                    ivTeamDetail.outlineSpotShadowColor = Color.WHITE
//                    ivTeamDetail.cardElevation = 40F
                }


            }

            ClubCategory.Seasons -> {
                tvCategoryName.text = getString(tvCategoryName.context, R.string.seasons)
//                divider.setBackgroundColor(ContextCompat.getColor(divider.context, R.color.cardSeason1))
                cardClubLayout.background = ContextCompat.getDrawable(
                    cardClubLayout.context,
                    R.drawable.gradient_background_club_category_season
                )
                cardImage.setImageResource(R.drawable.season)
                clubCategoryPrincipal.cardElevation = 10F
                clubCategoryPrincipal.outlineSpotShadowColor = Color.TRANSPARENT

//                ivTeamDetail.strokeWidth = 0
//                ivTeamDetail.cardElevation = 10F
//                ivTeamDetail.outlineSpotShadowColor = Color.TRANSPARENT

                if (clubCategory.isSelected) {
//                    cardClubLayout.background = ContextCompat.getDrawable(
//                        cardClubLayout.context,
//                        R.drawable.gradient_background_club_category_season_selected
//                    )
                    clubCategoryPrincipal.outlineSpotShadowColor = Color.WHITE
                    clubCategoryPrincipal.cardElevation = 40F

//                    ivTeamDetail.strokeWidth = 4
//                    ivTeamDetail.strokeColor = Color.WHITE
//                    ivTeamDetail.outlineSpotShadowColor = Color.WHITE
//                    ivTeamDetail.cardElevation = 40F
                }
            }

            ClubCategory.Teams -> {
                tvCategoryName.text = getString(tvCategoryName.context, R.string.teams)
//                divider.setBackgroundColor(ContextCompat.getColor(divider.context, R.color.cardTeam1))
                cardClubLayout.background = ContextCompat.getDrawable(
                    cardClubLayout.context,
                    R.drawable.gradient_background_club_category_team
                )
                cardImage.setImageResource(R.drawable.team)
                clubCategoryPrincipal.outlineSpotShadowColor = Color.TRANSPARENT

//                ivTeamDetail.strokeWidth = 0
//                ivTeamDetail.cardElevation = 10F
//                ivTeamDetail.outlineSpotShadowColor = Color.TRANSPARENT

                if (clubCategory.isSelected) {
//                    cardClubLayout.background = ContextCompat.getDrawable(
//                        cardClubLayout.context,
//                        R.drawable.gradient_background_club_category_team_selected
//                    )
                    clubCategoryPrincipal.outlineSpotShadowColor = Color.WHITE
                    clubCategoryPrincipal.cardElevation = 40F

//                    ivTeamDetail.strokeWidth = 4
//                    ivTeamDetail.strokeColor = Color.WHITE
//                    ivTeamDetail.outlineSpotShadowColor = Color.WHITE
//                    ivTeamDetail.cardElevation = 40F
                }
            }
        }
    }
}