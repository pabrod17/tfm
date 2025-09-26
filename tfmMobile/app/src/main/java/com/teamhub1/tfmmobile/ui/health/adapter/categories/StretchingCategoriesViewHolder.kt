package com.teamhub1.tfmmobile.ui.health.adapter.categories

import android.view.View
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.ui.health.adapter.StretchingCategory

class StretchingCategoriesViewHolder(view: View) : RecyclerView.ViewHolder(view) {

    private val tvLesionCategoryName: TextView = view.findViewById(R.id.tvLesionCategoryName)
    private val tvLesionCategoryLayout: View = view.findViewById(R.id.tvLesionCategory)

    fun render(tvLesionCategory: StretchingCategory, onItemSelected: (Int) -> Unit) {

        itemView.setOnClickListener { onItemSelected(layoutPosition) }

        when (tvLesionCategory) {
            StretchingCategory.Hamstrings -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.stretchingsTypeHamstrings)
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_stretching_category_stretching1
//                )
                tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.stretching1))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                if (tvLesionCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_stretching_category_stretching1_selected
//                    )
                    tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.stretching1))
                }
            }

            StretchingCategory.Buttocks -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.stretchingsTypeButtocks)
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_stretching_category_stretching2
//                )
                tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.stretching2))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                if (tvLesionCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_stretching_category_stretching2_selected
//                    )
                    tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.stretching2))
                }
            }

            StretchingCategory.Calf -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.stretchingsTypeCalf)
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_stretching_category_stretching3
//                )
                tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.stretching3))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                if (tvLesionCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_stretching_category_stretching3_selected
//                    )
                    tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.stretching3))
                }
            }

            StretchingCategory.Adductors -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.stretchingsTypeAbductors)
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_stretching_category_stretching4
//                )
                tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.stretching4))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                if (tvLesionCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_stretching_category_stretching4_selected
//                    )
                    tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.stretching4))
                }
            }

            StretchingCategory.Shoulder -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.stretchingsTypeShoulder)
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_stretching_category_stretching5
//                )
                tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.stretching5))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                if (tvLesionCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_stretching_category_stretching5_selected
//                    )
                    tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.stretching5))
                }
            }
            StretchingCategory.Quadriceps -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.stretchingsTypeQuadriceps)
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_stretching_category_stretching6
//                )
                tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.stretching6))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                if (tvLesionCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_stretching_category_stretching6_selected
//                    )
                    tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.stretching6))
                }
            }
            StretchingCategory.Back -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.stretchingsTypeBack)
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_stretching_category_stretching7
//                )
                tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.stretching7))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                if (tvLesionCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_stretching_category_stretching7_selected
//                    )
                    tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.stretching7))
                }
            }
            StretchingCategory.Pectoral -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.stretchingsTypePectoral)
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_stretching_category_stretching8
//                )
                tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.stretching8))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                if (tvLesionCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_stretching_category_stretching8_selected
//                    )
                    tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.stretching8))
                }
            }
            StretchingCategory.Crotch -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.stretchingsTypeCrotch)
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_stretching_category_stretching9
//                )
                tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.stretching9))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                if (tvLesionCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_stretching_category_stretching9_selected
//                    )
                    tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.stretching9))
                }
            }
            StretchingCategory.Triceps -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.stretchingsTypeTriceps)
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_stretching_category_stretching10
//                )
                tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.stretching10))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                if (tvLesionCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_stretching_category_stretching10_selected
//                    )
                    tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.stretching10))
                }
            }

        }
    }

}