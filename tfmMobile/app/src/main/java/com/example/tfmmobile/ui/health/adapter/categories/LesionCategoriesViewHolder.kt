package com.example.tfmmobile.ui.health.adapter.categories

import android.view.View
import android.widget.TextView
import androidx.appcompat.widget.AppCompatImageView
import androidx.cardview.widget.CardView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.ui.club.adapter.PlayerCategory
import com.example.tfmmobile.ui.health.adapter.LesionCategory

class LesionCategoriesViewHolder(view: View) : RecyclerView.ViewHolder(view) {

    private val tvLesionCategoryName: TextView = view.findViewById(R.id.tvLesionCategoryName)
    private val tvLesionCategoryLayout: View = view.findViewById(R.id.tvLesionCategory)

    fun render(tvLesionCategory: LesionCategory, onItemSelected: (Int) -> Unit) {

        itemView.setOnClickListener { onItemSelected(layoutPosition) }

        when (tvLesionCategory) {
            LesionCategory.Muscle -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.lesionTypeMuscle)
                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                    tvLesionCategoryLayout.context,
                    R.drawable.gradient_background_lesion_category_lesion1
                )
                if (tvLesionCategory.isSelected) {
                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                        tvLesionCategoryLayout.context,
                        R.drawable.gradient_background_lesion_category_lesion1_selected
                    )
                }
            }

            LesionCategory.Tendon -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.lesionTypeTendon)
                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                    tvLesionCategoryLayout.context,
                    R.drawable.gradient_background_lesion_category_lesion2
                )
                if (tvLesionCategory.isSelected) {
                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                        tvLesionCategoryLayout.context,
                        R.drawable.gradient_background_lesion_category_lesion2_selected
                    )
                }
            }

            LesionCategory.Joint -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.lesionTypeJoint)
                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                    tvLesionCategoryLayout.context,
                    R.drawable.gradient_background_lesion_category_lesion3
                )
                if (tvLesionCategory.isSelected) {
                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                        tvLesionCategoryLayout.context,
                        R.drawable.gradient_background_lesion_category_lesion3_selected
                    )
                }
            }

            LesionCategory.Spine -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.lesionTypeSpine)
                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                    tvLesionCategoryLayout.context,
                    R.drawable.gradient_background_lesion_category_lesion4
                )
                if (tvLesionCategory.isSelected) {
                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                        tvLesionCategoryLayout.context,
                        R.drawable.gradient_background_lesion_category_lesion4_selected
                    )
                }
            }

            LesionCategory.Psychological -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.lesionTypePhychological)
                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                    tvLesionCategoryLayout.context,
                    R.drawable.gradient_background_lesion_category_lesion5
                )
                if (tvLesionCategory.isSelected) {
                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                        tvLesionCategoryLayout.context,
                        R.drawable.gradient_background_lesion_category_lesion5_selected
                    )
                }
            }

        }
    }

}