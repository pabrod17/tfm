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
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_exercise_category_exercise1
//                )
                tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.exercise1))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                if (tvLesionCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_exercise_category_exercise1_selected
//                    )
                    tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.exercise1))
                }
            }

            ExerciseCategory.Technique -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.exercisesTypeTechnique)
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_exercise_category_exercise2
//                )
                tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.exercise2))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                if (tvLesionCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_exercise_category_exercise2_selected
//                    )
                    tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.exercise2))
                }
            }

            ExerciseCategory.Physical -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.exercisesTypePhysical)
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_exercise_category_exercise3
//                )
                tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.exercise3))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                if (tvLesionCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_exercise_category_exercise3_selected
//                    )
                    tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.exercise3))
                }
            }

            ExerciseCategory.Globalized -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.exercisesTypeGlobalized)
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_exercise_category_exercise4
//                )
                tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.exercise4))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                if (tvLesionCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_exercise_category_exercise4_selected
//                    )
                    tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.exercise4))
                }
            }

            ExerciseCategory.Specific -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.exercisesTypeSpecific)
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_exercise_category_exercise5
//                )
                tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.exercise5))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                if (tvLesionCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_exercise_category_exercise5_selected
//                    )
                    tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.exercise5))
                }
            }

            ExerciseCategory.Psychological -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.exercisesTypePsychological)
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_exercise_category_exercise6
//                )
                tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.exercise6))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                if (tvLesionCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_exercise_category_exercise6_selected
//                    )
                    tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.exercise6))
                }
            }

            ExerciseCategory.Strategy -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.exercisesTypeStrategy)
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_exercise_category_exercise7
//                )
                tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.exercise7))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                if (tvLesionCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_exercise_category_exercise7_selected
//                    )
                    tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.exercise7))
                }
            }

            ExerciseCategory.PreMatch -> {
                tvLesionCategoryName.text =
                    ContextCompat.getString(tvLesionCategoryName.context, R.string.exercisesTypePreMatch)
//                tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                    tvLesionCategoryLayout.context,
//                    R.drawable.gradient_background_exercise_category_exercise8
//                )
                tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.exercise8))
                tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                if (tvLesionCategory.isSelected) {
//                    tvLesionCategoryLayout.background = ContextCompat.getDrawable(
//                        tvLesionCategoryLayout.context,
//                        R.drawable.gradient_background_exercise_category_exercise8_selected
//                    )
                    tvLesionCategoryName.setTextColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.primaryDark))
                    tvLesionCategoryLayout.setBackgroundColor(ContextCompat.getColor(tvLesionCategoryName.context, R.color.exercise8))
                }
            }

        }
    }

}