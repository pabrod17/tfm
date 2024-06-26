package com.example.tfmmobile.ui.health.adapter

import android.os.Build
import android.view.View
import android.widget.TextView
import androidx.annotation.RequiresApi
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.databinding.ItemLesionBinding
import com.example.tfmmobile.databinding.ItemTrainingBinding
import com.example.tfmmobile.domain.model.LesionModel
import com.example.tfmmobile.domain.model.TrainingModel
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class LesionViewHolder(view: View): RecyclerView.ViewHolder(view) {

    private val binding = ItemLesionBinding.bind(view)
    private val tvTypeLesionValue: TextView = view.findViewById(R.id.tvTypeLesionValue)


    fun render(lesion: LesionModel, onItemSelected: (LesionModel) -> Unit) {

        binding.parent.setOnClickListener {
            onItemSelected(lesion)
        }


        binding.tvNameLesionValue.text = lesion.lesionName

        if (lesion.lesionType.equals("Muscular")) {
            binding.tvTypeLesionValue.text =
                ContextCompat.getString(binding.tvTypeLesionValue.context,
                    R.string.lesionTypeMuscle)
            binding.tvTypeLesionValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeLesionValue.context,
                    R.color.lesion1
                )
            )
        }
        if (lesion.lesionType.equals("Tendinosa")) {
            binding.tvTypeLesionValue.text =
                ContextCompat.getString(binding.tvTypeLesionValue.context,
                    R.string.lesionTypeTendon)
            binding.tvTypeLesionValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeLesionValue.context,
                    R.color.lesion2
                )
            )
        }
        if (lesion.lesionType.equals("Articular")) {
            binding.tvTypeLesionValue.text =
                ContextCompat.getString(binding.tvTypeLesionValue.context,
                    R.string.lesionTypeJoint)
            binding.tvTypeLesionValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeLesionValue.context,
                    R.color.lesion3
                )
            )
        }
        if (lesion.lesionType.equals("ColumnaVertebral")) {
            binding.tvTypeLesionValue.text =
                ContextCompat.getString(binding.tvTypeLesionValue.context,
                    R.string.lesionTypeSpine)
            binding.tvTypeLesionValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeLesionValue.context,
                    R.color.lesion4
                )
            )
        }
        if (lesion.lesionType.equals("Psicologica")) {
            binding.tvTypeLesionValue.text =
                ContextCompat.getString(binding.tvTypeLesionValue.context,
                    R.string.lesionTypePhychological)
            binding.tvTypeLesionValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeLesionValue.context,
                    R.color.lesion5
                )
            )
        }
    }


}