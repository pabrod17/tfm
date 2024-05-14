package com.example.tfmmobile.ui.club.adapter.categories

import android.view.View
import android.widget.TextView
import androidx.appcompat.widget.AppCompatImageView
import androidx.cardview.widget.CardView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.ui.club.adapter.PlayerCategory

class PlayerCategoriesViewHolder(view: View) : RecyclerView.ViewHolder(view) {

    private val tvPlayerCategoryName: TextView = view.findViewById(R.id.tvPlayerCategoryName)
    private val tvPlayerCategoryLayout: View = view.findViewById(R.id.tvPlayerCategory)
    private val ivPlayerDetailInjuredCard: CardView = view.findViewById(R.id.ivPlayerDetailInjuredCard)
    private val cardInjuredPlayer: AppCompatImageView = view.findViewById(R.id.cardInjuredPlayer)

    fun render(tvPlayerCategory: PlayerCategory, onItemSelected: (Int) -> Unit) {

        itemView.setOnClickListener { onItemSelected(layoutPosition) }

        when (tvPlayerCategory) {
            PlayerCategory.PointGuard -> {
                tvPlayerCategoryName.visibility = View.VISIBLE
                ivPlayerDetailInjuredCard.visibility = View.GONE
                tvPlayerCategoryName.text =
                    ContextCompat.getString(tvPlayerCategoryName.context, R.string.position1)
                tvPlayerCategoryLayout.background = ContextCompat.getDrawable(
                    tvPlayerCategoryLayout.context,
                    R.drawable.gradient_background_player_category_position1
                )
                if (tvPlayerCategory.isSelected) {
                    tvPlayerCategoryLayout.background = ContextCompat.getDrawable(
                        tvPlayerCategoryLayout.context,
                        R.drawable.gradient_background_player_category_position1_selected
                    )
                }
            }

            PlayerCategory.ShootingGuard -> {
                tvPlayerCategoryName.visibility = View.VISIBLE
                ivPlayerDetailInjuredCard.visibility = View.GONE
                tvPlayerCategoryName.text =
                    ContextCompat.getString(tvPlayerCategoryName.context, R.string.position2)
                tvPlayerCategoryLayout.background = ContextCompat.getDrawable(
                    tvPlayerCategoryLayout.context,
                    R.drawable.gradient_background_player_category_position2
                )
                if (tvPlayerCategory.isSelected) {
                    tvPlayerCategoryLayout.background = ContextCompat.getDrawable(
                        tvPlayerCategoryLayout.context,
                        R.drawable.gradient_background_player_category_position2_selected
                    )
                }
            }

            PlayerCategory.SmallForward -> {
                tvPlayerCategoryName.visibility = View.VISIBLE
                ivPlayerDetailInjuredCard.visibility = View.GONE
                tvPlayerCategoryName.text =
                    ContextCompat.getString(tvPlayerCategoryName.context, R.string.position3)
                tvPlayerCategoryLayout.background = ContextCompat.getDrawable(
                    tvPlayerCategoryLayout.context,
                    R.drawable.gradient_background_player_category_position3
                )
                if (tvPlayerCategory.isSelected) {
                    tvPlayerCategoryLayout.background = ContextCompat.getDrawable(
                        tvPlayerCategoryLayout.context,
                        R.drawable.gradient_background_player_category_position3_selected
                    )
                }
            }

            PlayerCategory.PowerForward -> {
                tvPlayerCategoryName.visibility = View.VISIBLE
                ivPlayerDetailInjuredCard.visibility = View.GONE
                tvPlayerCategoryName.text =
                    ContextCompat.getString(tvPlayerCategoryName.context, R.string.position4)
                tvPlayerCategoryLayout.background = ContextCompat.getDrawable(
                    tvPlayerCategoryLayout.context,
                    R.drawable.gradient_background_player_category_position4
                )
                if (tvPlayerCategory.isSelected) {
                    tvPlayerCategoryLayout.background = ContextCompat.getDrawable(
                        tvPlayerCategoryLayout.context,
                        R.drawable.gradient_background_player_category_position4_selected
                    )
                }
            }

            PlayerCategory.Center -> {
                tvPlayerCategoryName.visibility = View.VISIBLE
                ivPlayerDetailInjuredCard.visibility = View.GONE
                tvPlayerCategoryName.text =
                    ContextCompat.getString(tvPlayerCategoryName.context, R.string.position5)
                tvPlayerCategoryLayout.background = ContextCompat.getDrawable(
                    tvPlayerCategoryLayout.context,
                    R.drawable.gradient_background_player_category_position5
                )
                if (tvPlayerCategory.isSelected) {
                    tvPlayerCategoryLayout.background = ContextCompat.getDrawable(
                        tvPlayerCategoryLayout.context,
                        R.drawable.gradient_background_player_category_position5_selected
                    )
                }
            }

            PlayerCategory.Injured -> {
                tvPlayerCategoryName.visibility = View.GONE
                ivPlayerDetailInjuredCard.visibility = View.VISIBLE

                if (tvPlayerCategory.isSelected) {
                    ivPlayerDetailInjuredCard.setBackgroundColor(
                        ContextCompat.getColor(
                            ivPlayerDetailInjuredCard.context,
                            R.color.red
                        )
                    )
                    cardInjuredPlayer.setImageResource(R.drawable.trianglechangecolor)
                }

            }
        }
    }

}