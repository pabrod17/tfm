package com.example.tfmmobile.ui.health.adapter

import android.os.Build
import android.view.View
import android.widget.TextView
import androidx.annotation.RequiresApi
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.databinding.ItemStretchingBinding
import com.example.tfmmobile.domain.model.StretchingModel

class StretchingViewHolder(view: View): RecyclerView.ViewHolder(view) {

    private val binding = ItemStretchingBinding.bind(view)
    private val tvTypeStretchingValue: TextView = view.findViewById(R.id.tvTypeStretchingValue)


    fun render(stretching: StretchingModel, onItemSelected: (StretchingModel) -> Unit) {

        binding.parent.setOnClickListener {
            onItemSelected(stretching)
        }


        binding.tvNameStretchingValue.text = stretching.stretchingName
        binding.tvTypeStretchingValue.text = stretching.stretchingType

        if (stretching.stretchingType.equals("Isquiotibiales")) {
            binding.tvTypeStretchingValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeStretchingValue.context,
                    R.color.stretching1
                )
            )
        }
        if (stretching.stretchingType.equals("Gluteos")) {
            binding.tvTypeStretchingValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeStretchingValue.context,
                    R.color.stretching2
                )
            )
        }
        if (stretching.stretchingType.equals("Gemelos")) {
            binding.tvTypeStretchingValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeStretchingValue.context,
                    R.color.stretching3
                )
            )
        }
        if (stretching.stretchingType.equals("Adductores")) {
            binding.tvTypeStretchingValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeStretchingValue.context,
                    R.color.stretching4
                )
            )
        }
        if (stretching.stretchingType.equals("Hombro")) {
            binding.tvTypeStretchingValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeStretchingValue.context,
                    R.color.stretching5
                )
            )
        }
        if (stretching.stretchingType.equals("Cuadriceps")) {
            binding.tvTypeStretchingValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeStretchingValue.context,
                    R.color.stretching6
                )
            )
        }
        if (stretching.stretchingType.equals("Espalda")) {
            binding.tvTypeStretchingValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeStretchingValue.context,
                    R.color.stretching7
                )
            )
        }
        if (stretching.stretchingType.equals("Pectoral")) {
            binding.tvTypeStretchingValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeStretchingValue.context,
                    R.color.stretching8
                )
            )
        }
        if (stretching.stretchingType.equals("Ingle")) {
            binding.tvTypeStretchingValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeStretchingValue.context,
                    R.color.stretching9
                )
            )
        }
        if (stretching.stretchingType.equals("Triceps")) {
            binding.tvTypeStretchingValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeStretchingValue.context,
                    R.color.stretching10
                )
            )
        }
    }


}