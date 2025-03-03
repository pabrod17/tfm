package com.example.tfmmobile.ui.plays.adapter.categories

import android.view.View
import android.widget.TextView
import androidx.appcompat.widget.AppCompatImageView
import androidx.cardview.widget.CardView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.ui.club.adapter.PlayerCategory
import com.example.tfmmobile.ui.health.adapter.LesionCategory
import com.example.tfmmobile.ui.plays.adapter.PlayCategory

class PlayCategoriesViewHolder(view: View) : RecyclerView.ViewHolder(view) {

    private val tvPlayCategoryName: TextView = view.findViewById(R.id.tvPlayCategoryName)
    private val tvLesionCategoryLayout: View = view.findViewById(R.id.tvPlayCategory)

    fun render(tvPlayCategory: PlayCategory, onItemSelected: (Int) -> Unit) {

        itemView.setOnClickListener { onItemSelected(layoutPosition) }

        when (tvPlayCategory) {
            PlayCategory.Defense -> {
                tvPlayCategoryName.text =
                    ContextCompat.getString(tvPlayCategoryName.context, R.string.playsDefense)
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_lesion_category_lesion1
//                )
                tvPlayCategoryName.setTextColor(ContextCompat.getColor(tvPlayCategoryName.context, R.color.cardPlayDefense))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryLayout.context, R.color.primaryDark))
                if (tvPlayCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_lesion_category_lesion1_selected
//                    )
                    tvPlayCategoryName.setTextColor(ContextCompat.getColor(tvPlayCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryLayout.context, R.color.cardPlayDefense))
                }
            }

            PlayCategory.Attack -> {
                tvPlayCategoryName.text =
                    ContextCompat.getString(tvPlayCategoryName.context, R.string.playsAttack)
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_lesion_category_lesion2
//                )
                tvPlayCategoryName.setTextColor(ContextCompat.getColor(tvPlayCategoryName.context, R.color.cardPlayAttack2))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryLayout.context, R.color.primaryDark))
                if (tvPlayCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_lesion_category_lesion2_selected
//                    )
                    tvPlayCategoryName.setTextColor(ContextCompat.getColor(tvPlayCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryLayout.context, R.color.cardPlayAttack2))
                }
            }

        }
    }

}