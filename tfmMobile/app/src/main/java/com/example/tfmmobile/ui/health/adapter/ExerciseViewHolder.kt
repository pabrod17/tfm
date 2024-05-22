package com.example.tfmmobile.ui.health.adapter

import android.os.Build
import android.view.View
import android.widget.TextView
import androidx.annotation.RequiresApi
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.databinding.ItemExerciseBinding
import com.example.tfmmobile.domain.model.ExerciseModel

class ExerciseViewHolder(view: View): RecyclerView.ViewHolder(view) {

    private val binding = ItemExerciseBinding.bind(view)
    private val tvTypeExerciseValue: TextView = view.findViewById(R.id.tvTypeExerciseValue)


    fun render(exercise: ExerciseModel, onItemSelected: (ExerciseModel) -> Unit) {

        binding.parent.setOnClickListener {
            onItemSelected(exercise)
        }


        binding.tvNameExerciseValue.text = exercise.exerciseName

        if (exercise.exerciseType.equals("Tactico")) {
            binding.tvTypeExerciseValue.text =
                ContextCompat.getString(binding.tvTypeExerciseValue.context,
                    R.string.exercisesTypeTactic)
            binding.tvTypeExerciseValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeExerciseValue.context,
                    R.color.exercise1
                )
            )
        }
        if (exercise.exerciseType.equals("Tecnica")) {
            binding.tvTypeExerciseValue.text =
                ContextCompat.getString(binding.tvTypeExerciseValue.context,
                    R.string.exercisesTypeTechnique)
            binding.tvTypeExerciseValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeExerciseValue.context,
                    R.color.exercise2
                )
            )
        }
        if (exercise.exerciseType.equals("Fisico")) {
            binding.tvTypeExerciseValue.text =
                ContextCompat.getString(binding.tvTypeExerciseValue.context,
                    R.string.exercisesTypePhysical)
            binding.tvTypeExerciseValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeExerciseValue.context,
                    R.color.exercise3
                )
            )
        }
        if (exercise.exerciseType.equals("Global")) {
            binding.tvTypeExerciseValue.text =
                ContextCompat.getString(binding.tvTypeExerciseValue.context,
                    R.string.exercisesTypeGlobalized)
            binding.tvTypeExerciseValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeExerciseValue.context,
                    R.color.exercise4
                )
            )
        }
        if (exercise.exerciseType.equals("Especifico")) {
            binding.tvTypeExerciseValue.text =
                ContextCompat.getString(binding.tvTypeExerciseValue.context,
                    R.string.exercisesTypeSpecific)
            binding.tvTypeExerciseValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeExerciseValue.context,
                    R.color.exercise5
                )
            )
        }
        if (exercise.exerciseType.equals("Psicologico")) {
            binding.tvTypeExerciseValue.text =
                ContextCompat.getString(binding.tvTypeExerciseValue.context,
                    R.string.exercisesTypePsychological)
            binding.tvTypeExerciseValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeExerciseValue.context,
                    R.color.exercise6
                )
            )
        }
        if (exercise.exerciseType.equals("Estrategia")) {
            binding.tvTypeExerciseValue.text =
                ContextCompat.getString(binding.tvTypeExerciseValue.context,
                    R.string.exercisesTypeStrategy)
            binding.tvTypeExerciseValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeExerciseValue.context,
                    R.color.exercise7
                )
            )
        }
        if (exercise.exerciseType.equals("PrePartido")) {
            binding.tvTypeExerciseValue.text =
                ContextCompat.getString(binding.tvTypeExerciseValue.context,
                    R.string.exercisesTypePreMatch)
            binding.tvTypeExerciseValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeExerciseValue.context,
                    R.color.exercise8
                )
            )
        }
    }


}