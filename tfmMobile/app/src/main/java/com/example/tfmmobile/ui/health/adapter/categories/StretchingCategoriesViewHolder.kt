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
import com.example.tfmmobile.ui.health.adapter.StretchingCategory

class StretchingCategoriesViewHolder(view: View) : RecyclerView.ViewHolder(view) {

    private val tvLesionCategoryName: TextView = view.findViewById(R.id.tvLesionCategoryName)
    private val tvLesionCategoryLayout: View = view.findViewById(R.id.tvLesionCategory)

    fun render(tvLesionCategory: StretchingCategory, onItemSelected: (Int) -> Unit) {

        itemView.setOnClickListener { onItemSelected(layoutPosition) }

        when (tvLesionCategory) {
            StretchingCategory.Hamstrings -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.stretchingsTypeHamstrings)
                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                    tvLesionCategoryLayout.context,
                    R.drawable.gradient_background_stretching_category_stretching1
                )
                if (tvLesionCategory.isSelected) {
                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                        tvLesionCategoryLayout.context,
                        R.drawable.gradient_background_stretching_category_stretching1_selected
                    )
                }
            }

            StretchingCategory.Buttocks -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.stretchingsTypeButtocks)
                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                    tvLesionCategoryLayout.context,
                    R.drawable.gradient_background_stretching_category_stretching2
                )
                if (tvLesionCategory.isSelected) {
                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                        tvLesionCategoryLayout.context,
                        R.drawable.gradient_background_stretching_category_stretching2_selected
                    )
                }
            }

            StretchingCategory.Calf -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.stretchingsTypeCalf)
                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                    tvLesionCategoryLayout.context,
                    R.drawable.gradient_background_stretching_category_stretching3
                )
                if (tvLesionCategory.isSelected) {
                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                        tvLesionCategoryLayout.context,
                        R.drawable.gradient_background_stretching_category_stretching3_selected
                    )
                }
            }

            StretchingCategory.Adductors -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.stretchingsTypeAbductors)
                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                    tvLesionCategoryLayout.context,
                    R.drawable.gradient_background_stretching_category_stretching4
                )
                if (tvLesionCategory.isSelected) {
                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                        tvLesionCategoryLayout.context,
                        R.drawable.gradient_background_stretching_category_stretching4_selected
                    )
                }
            }

            StretchingCategory.Shoulder -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.stretchingsTypeShoulder)
                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                    tvLesionCategoryLayout.context,
                    R.drawable.gradient_background_stretching_category_stretching5
                )
                if (tvLesionCategory.isSelected) {
                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                        tvLesionCategoryLayout.context,
                        R.drawable.gradient_background_stretching_category_stretching5_selected
                    )
                }
            }
            StretchingCategory.Quadriceps -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.stretchingsTypeQuadriceps)
                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                    tvLesionCategoryLayout.context,
                    R.drawable.gradient_background_stretching_category_stretching6
                )
                if (tvLesionCategory.isSelected) {
                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                        tvLesionCategoryLayout.context,
                        R.drawable.gradient_background_stretching_category_stretching6_selected
                    )
                }
            }
            StretchingCategory.Back -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.stretchingsTypeBack)
                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                    tvLesionCategoryLayout.context,
                    R.drawable.gradient_background_stretching_category_stretching7
                )
                if (tvLesionCategory.isSelected) {
                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                        tvLesionCategoryLayout.context,
                        R.drawable.gradient_background_stretching_category_stretching7_selected
                    )
                }
            }
            StretchingCategory.Pectoral -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.stretchingsTypePectoral)
                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                    tvLesionCategoryLayout.context,
                    R.drawable.gradient_background_stretching_category_stretching8
                )
                if (tvLesionCategory.isSelected) {
                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                        tvLesionCategoryLayout.context,
                        R.drawable.gradient_background_stretching_category_stretching8_selected
                    )
                }
            }
            StretchingCategory.Crotch -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.stretchingsTypeCrotch)
                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                    tvLesionCategoryLayout.context,
                    R.drawable.gradient_background_stretching_category_stretching9
                )
                if (tvLesionCategory.isSelected) {
                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                        tvLesionCategoryLayout.context,
                        R.drawable.gradient_background_stretching_category_stretching9_selected
                    )
                }
            }
            StretchingCategory.Triceps -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.stretchingsTypeTriceps)
                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                    tvLesionCategoryLayout.context,
                    R.drawable.gradient_background_stretching_category_stretching10
                )
                if (tvLesionCategory.isSelected) {
                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                        tvLesionCategoryLayout.context,
                        R.drawable.gradient_background_stretching_category_stretching10_selected
                    )
                }
            }

        }
    }

}