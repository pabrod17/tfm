package com.example.tfmmobile.ui.club.adapter.categories

import android.content.Context
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
    private val playerCategoryPrincipal: CardView = view.findViewById(R.id.playerCategoryPrincipal)



    fun render(tvPlayerCategory: PlayerCategory, onItemSelected: (Int) -> Unit) {

        itemView.setOnClickListener { onItemSelected(layoutPosition) }

        when (tvPlayerCategory) {
            PlayerCategory.PointGuard -> {
                playerCategoryPrincipal.radius = dpToPx(10f, playerCategoryPrincipal.context)

                tvPlayerCategoryName.visibility = View.VISIBLE
                ivPlayerDetailInjuredCard.visibility = View.GONE
                tvPlayerCategoryName.text =
                    ContextCompat.getString(tvPlayerCategoryName.context, R.string.position1)
//                tvPlayerCategoryLayout.background = ContextCompat.getDrawable(
//                    tvPlayerCategoryLayout.context,
//                    R.drawable.gradient_background_player_category_position1
//                )
                tvPlayerCategoryName.setTextColor(ContextCompat.getColor(tvPlayerCategoryName.context, R.color.position4))
                tvPlayerCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvPlayerCategoryLayout.context, R.color.primaryDark))
                if (tvPlayerCategory.isSelected) {
//                    tvPlayerCategoryLayout.background = ContextCompat.getDrawable(
//                        tvPlayerCategoryLayout.context,
//                        R.drawable.gradient_background_player_category_position1_selected
//                    )
                    playerCategoryPrincipal.radius = dpToPx(10f, playerCategoryPrincipal.context)
                    tvPlayerCategoryName.setTextColor(ContextCompat.getColor(tvPlayerCategoryName.context, R.color.primaryDark))
                    tvPlayerCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvPlayerCategoryLayout.context, R.color.position4))
                }
            }

            PlayerCategory.ShootingGuard -> {
                playerCategoryPrincipal.radius = dpToPx(10f, playerCategoryPrincipal.context)

                tvPlayerCategoryName.visibility = View.VISIBLE
                ivPlayerDetailInjuredCard.visibility = View.GONE
                tvPlayerCategoryName.text =
                    ContextCompat.getString(tvPlayerCategoryName.context, R.string.position2)
//                tvPlayerCategoryLayout.background = ContextCompat.getDrawable(
//                    tvPlayerCategoryLayout.context,
//                    R.drawable.gradient_background_player_category_position2
//                )
                tvPlayerCategoryName.setTextColor(ContextCompat.getColor(tvPlayerCategoryName.context, R.color.position5))
                tvPlayerCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvPlayerCategoryLayout.context, R.color.primaryDark))
                if (tvPlayerCategory.isSelected) {
//                    tvPlayerCategoryLayout.background = ContextCompat.getDrawable(
//                        tvPlayerCategoryLayout.context,
//                        R.drawable.gradient_background_player_category_position2_selected
//                    )
                    playerCategoryPrincipal.radius = dpToPx(10f, playerCategoryPrincipal.context)
                    tvPlayerCategoryName.setTextColor(ContextCompat.getColor(tvPlayerCategoryName.context, R.color.primaryDark))
                    tvPlayerCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvPlayerCategoryLayout.context, R.color.position5))
                }
            }

            PlayerCategory.SmallForward -> {
                playerCategoryPrincipal.radius = dpToPx(10f, playerCategoryPrincipal.context)

                tvPlayerCategoryName.visibility = View.VISIBLE
                ivPlayerDetailInjuredCard.visibility = View.GONE
                tvPlayerCategoryName.text =
                    ContextCompat.getString(tvPlayerCategoryName.context, R.string.position3)
//                tvPlayerCategoryLayout.background = ContextCompat.getDrawable(
//                    tvPlayerCategoryLayout.context,
//                    R.drawable.gradient_background_player_category_position3
//                )
                tvPlayerCategoryName.setTextColor(ContextCompat.getColor(tvPlayerCategoryName.context, R.color.position3))
                tvPlayerCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvPlayerCategoryLayout.context, R.color.primaryDark))
                if (tvPlayerCategory.isSelected) {
//                    tvPlayerCategoryLayout.background = ContextCompat.getDrawable(
//                        tvPlayerCategoryLayout.context,
//                        R.drawable.gradient_background_player_category_position3_selected
//                    )
                    playerCategoryPrincipal.radius = dpToPx(10f, playerCategoryPrincipal.context)
                    tvPlayerCategoryName.setTextColor(ContextCompat.getColor(tvPlayerCategoryName.context, R.color.primaryDark))
                    tvPlayerCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvPlayerCategoryLayout.context, R.color.position3))
                }
            }

            PlayerCategory.PowerForward -> {
                playerCategoryPrincipal.radius = dpToPx(10f, playerCategoryPrincipal.context)

                tvPlayerCategoryName.visibility = View.VISIBLE
                ivPlayerDetailInjuredCard.visibility = View.GONE
                tvPlayerCategoryName.text =
                    ContextCompat.getString(tvPlayerCategoryName.context, R.string.position4)
//                tvPlayerCategoryLayout.background = ContextCompat.getDrawable(
//                    tvPlayerCategoryLayout.context,
//                    R.drawable.gradient_background_player_category_position4
//                )
                tvPlayerCategoryName.setTextColor(ContextCompat.getColor(tvPlayerCategoryName.context, R.color.position2))
                tvPlayerCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvPlayerCategoryLayout.context, R.color.primaryDark))
                if (tvPlayerCategory.isSelected) {
//                    tvPlayerCategoryLayout.background = ContextCompat.getDrawable(
//                        tvPlayerCategoryLayout.context,
//                        R.drawable.gradient_background_player_category_position4_selected
//                    )
                    playerCategoryPrincipal.radius = dpToPx(10f, playerCategoryPrincipal.context)
                    tvPlayerCategoryName.setTextColor(ContextCompat.getColor(tvPlayerCategoryName.context, R.color.primaryDark))
                    tvPlayerCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvPlayerCategoryLayout.context, R.color.position2))
                }
            }

            PlayerCategory.Center -> {
                playerCategoryPrincipal.radius = dpToPx(10f, playerCategoryPrincipal.context)

                tvPlayerCategoryName.visibility = View.VISIBLE
                ivPlayerDetailInjuredCard.visibility = View.GONE
                tvPlayerCategoryName.text =
                    ContextCompat.getString(tvPlayerCategoryName.context, R.string.position5)
//                tvPlayerCategoryLayout.background = ContextCompat.getDrawable(
//                    tvPlayerCategoryLayout.context,
//                    R.drawable.gradient_background_player_category_position5
//                )
                tvPlayerCategoryName.setTextColor(ContextCompat.getColor(tvPlayerCategoryName.context, R.color.position1))
                tvPlayerCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvPlayerCategoryLayout.context, R.color.primaryDark))
                if (tvPlayerCategory.isSelected) {
//                    tvPlayerCategoryLayout.background = ContextCompat.getDrawable(
//                        tvPlayerCategoryLayout.context,
//                        R.drawable.gradient_background_player_category_position5_selected
//                    )
                    playerCategoryPrincipal.radius = dpToPx(10f, playerCategoryPrincipal.context)
                    tvPlayerCategoryName.setTextColor(ContextCompat.getColor(tvPlayerCategoryName.context, R.color.primaryDark))
                    tvPlayerCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvPlayerCategoryLayout.context, R.color.position1))
                }
            }

            PlayerCategory.Injured -> {
                tvPlayerCategoryName.visibility = View.GONE
                ivPlayerDetailInjuredCard.visibility = View.VISIBLE
                playerCategoryPrincipal.radius = dpToPx(360f, playerCategoryPrincipal.context)
                ivPlayerDetailInjuredCard.setBackgroundColor(
                    ContextCompat.getColor(
                        ivPlayerDetailInjuredCard.context,
                        R.color.primaryDark
                    )
                )

                if (tvPlayerCategory.isSelected) {
                    ivPlayerDetailInjuredCard.setBackgroundColor(
                        ContextCompat.getColor(
                            ivPlayerDetailInjuredCard.context,
                            R.color.injured
                        )
                    )
                    playerCategoryPrincipal.radius = dpToPx(360f, playerCategoryPrincipal.context)
                    cardInjuredPlayer.setImageResource(R.drawable.trianglered)
                }

            }

        }
    }
    private fun dpToPx(dp: Float, context: Context): Float {
        return dp * context.resources.displayMetrics.density
    }
}