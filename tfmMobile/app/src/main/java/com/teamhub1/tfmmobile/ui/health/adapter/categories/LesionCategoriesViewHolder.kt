package com.teamhub1.tfmmobile.ui.health.adapter.categories

import android.view.View
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.ui.health.adapter.LesionCategory

class LesionCategoriesViewHolder(view: View) : RecyclerView.ViewHolder(view) {

    private val tvLesionCategoryName: TextView = view.findViewById(R.id.tvLesionCategoryName)
    private val tvLesionCategoryLayout: View = view.findViewById(R.id.tvLesionCategory)

    fun render(tvLesionCategory: LesionCategory, onItemSelected: (Int) -> Unit) {

        itemView.setOnClickListener { onItemSelected(layoutPosition) }

        when (tvLesionCategory) {
            LesionCategory.Muscle -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.lesionTypeMuscle)
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_lesion_category_lesion1
//                )
                tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.lesion1))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                if (tvLesionCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_lesion_category_lesion1_selected
//                    )
                    tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.lesion1))
                }
            }

            LesionCategory.Tendon -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.lesionTypeTendon)
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_lesion_category_lesion2
//                )
                tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.lesion2))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                if (tvLesionCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_lesion_category_lesion2_selected
//                    )
                    tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.lesion2))
                }
            }

            LesionCategory.Joint -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.lesionTypeJoint)
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_lesion_category_lesion3
//                )
                tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.lesion3))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                if (tvLesionCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_lesion_category_lesion3_selected
//                    )
                    tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.lesion3))
                }
            }

            LesionCategory.Spine -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.lesionTypeSpine)
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_lesion_category_lesion4
//                )
                tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.lesion4))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                if (tvLesionCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_lesion_category_lesion4_selected
//                    )
                    tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.lesion4))
                }
            }

            LesionCategory.Psychological -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.lesionTypePhychological)
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_lesion_category_lesion5
//                )
                tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.lesion5))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                if (tvLesionCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_lesion_category_lesion5_selected
//                    )
                    tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.lesion5))
                }
            }

        }
    }

}