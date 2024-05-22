package com.example.tfmmobile.ui.health.adapter.categories

import android.view.View
import android.widget.TextView
import androidx.appcompat.widget.AppCompatImageView
import androidx.cardview.widget.CardView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.ui.club.adapter.PlayerCategory
import com.example.tfmmobile.ui.health.adapter.ExerciseCategory
import com.example.tfmmobile.ui.health.adapter.LesionCategory

class ExerciseCategoriesViewHolder(view: View) : RecyclerView.ViewHolder(view) {

    private val tvLesionCategoryName: TextView = view.findViewById(R.id.tvLesionCategoryName)
    private val tvLesionCategoryLayout: View = view.findViewById(R.id.tvLesionCategory)

    fun render(tvLesionCategory: ExerciseCategory, onItemSelected: (Int) -> Unit) {

        itemView.setOnClickListener { onItemSelected(layoutPosition) }

        when (tvLesionCategory) {
            ExerciseCategory.Tactic -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.exercisesTypeTactic)
                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                    tvLesionCategoryLayout.context,
                    R.drawable.gradient_background_exercise_category_exercise1
                )
                if (tvLesionCategory.isSelected) {
                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                        tvLesionCategoryLayout.context,
                        R.drawable.gradient_background_exercise_category_exercise1_selected
                    )
                }
            }

            ExerciseCategory.Technique -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.exercisesTypeTechnique)
                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                    tvLesionCategoryLayout.context,
                    R.drawable.gradient_background_exercise_category_exercise2
                )
                if (tvLesionCategory.isSelected) {
                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                        tvLesionCategoryLayout.context,
                        R.drawable.gradient_background_exercise_category_exercise2_selected
                    )
                }
            }

            ExerciseCategory.Physical -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.exercisesTypePhysical)
                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                    tvLesionCategoryLayout.context,
                    R.drawable.gradient_background_exercise_category_exercise3
                )
                if (tvLesionCategory.isSelected) {
                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                        tvLesionCategoryLayout.context,
                        R.drawable.gradient_background_exercise_category_exercise3_selected
                    )
                }
            }

            ExerciseCategory.Globalized -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.exercisesTypeGlobalized)
                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                    tvLesionCategoryLayout.context,
                    R.drawable.gradient_background_exercise_category_exercise4
                )
                if (tvLesionCategory.isSelected) {
                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                        tvLesionCategoryLayout.context,
                        R.drawable.gradient_background_exercise_category_exercise4_selected
                    )
                }
            }

            ExerciseCategory.Specific -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.exercisesTypeSpecific)
                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                    tvLesionCategoryLayout.context,
                    R.drawable.gradient_background_exercise_category_exercise5
                )
                if (tvLesionCategory.isSelected) {
                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                        tvLesionCategoryLayout.context,
                        R.drawable.gradient_background_exercise_category_exercise5_selected
                    )
                }
            }

            ExerciseCategory.Psychological -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.exercisesTypePsychological)
                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                    tvLesionCategoryLayout.context,
                    R.drawable.gradient_background_exercise_category_exercise6
                )
                if (tvLesionCategory.isSelected) {
                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                        tvLesionCategoryLayout.context,
                        R.drawable.gradient_background_exercise_category_exercise6_selected
                    )
                }
            }

            ExerciseCategory.Strategy -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.exercisesTypeStrategy)
                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                    tvLesionCategoryLayout.context,
                    R.drawable.gradient_background_exercise_category_exercise7
                )
                if (tvLesionCategory.isSelected) {
                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                        tvLesionCategoryLayout.context,
                        R.drawable.gradient_background_exercise_category_exercise7_selected
                    )
                }
            }

            ExerciseCategory.PreMatch -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.exercisesTypePreMatch)
                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                    tvLesionCategoryLayout.context,
                    R.drawable.gradient_background_exercise_category_exercise8
                )
                if (tvLesionCategory.isSelected) {
                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
                        tvLesionCategoryLayout.context,
                        R.drawable.gradient_background_exercise_category_exercise8_selected
                    )
                }
            }

        }
    }

}