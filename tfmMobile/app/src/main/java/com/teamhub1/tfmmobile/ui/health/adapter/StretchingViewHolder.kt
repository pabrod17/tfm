package com.teamhub1.tfmmobile.ui.health.adapter

import android.view.View
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.databinding.ItemStretchingBinding
import com.teamhub1.tfmmobile.domain.model.StretchingModel

class StretchingViewHolder(view: View): RecyclerView.ViewHolder(view) {

    private val binding = ItemStretchingBinding.bind(view)
    private val tvTypeStretchingValue: TextView = view.findViewById(R.id.tvTypeStretchingValue)


    fun render(stretching: StretchingModel, onItemSelected: (StretchingModel) -> Unit) {

        binding.parent.setOnClickListener {
            onItemSelected(stretching)
        }


        binding.tvNameStretchingValue.text = stretching.stretchingName

        if (stretching.stretchingType.equals("Isquiotibiales")) {
            binding.tvTypeStretchingValue.text =
                ContextCompat.getString(binding.tvTypeStretchingValue.context,
                    R.string.stretchingsTypeHamstrings)
            binding.tvTypeStretchingValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeStretchingValue.context,
                    R.color.stretching1
                )
            )
        }
        if (stretching.stretchingType.equals("Gluteos")) {
            binding.tvTypeStretchingValue.text =
                ContextCompat.getString(binding.tvTypeStretchingValue.context,
                    R.string.stretchingsTypeButtocks)
            binding.tvTypeStretchingValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeStretchingValue.context,
                    R.color.stretching2
                )
            )
        }
        if (stretching.stretchingType.equals("Gemelos")) {
            binding.tvTypeStretchingValue.text =
                ContextCompat.getString(binding.tvTypeStretchingValue.context,
                    R.string.stretchingsTypeCalf)
            binding.tvTypeStretchingValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeStretchingValue.context,
                    R.color.stretching3
                )
            )
        }
        if (stretching.stretchingType.equals("Adductores")) {
            binding.tvTypeStretchingValue.text =
                ContextCompat.getString(binding.tvTypeStretchingValue.context,
                    R.string.stretchingsTypeAbductors)
            binding.tvTypeStretchingValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeStretchingValue.context,
                    R.color.stretching4
                )
            )
        }
        if (stretching.stretchingType.equals("Hombro")) {
            binding.tvTypeStretchingValue.text =
                ContextCompat.getString(binding.tvTypeStretchingValue.context,
                    R.string.stretchingsTypeShoulder)
            binding.tvTypeStretchingValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeStretchingValue.context,
                    R.color.stretching5
                )
            )
        }
        if (stretching.stretchingType.equals("Cuadriceps")) {
            binding.tvTypeStretchingValue.text =
                ContextCompat.getString(binding.tvTypeStretchingValue.context,
                    R.string.stretchingsTypeQuadriceps)
            binding.tvTypeStretchingValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeStretchingValue.context,
                    R.color.stretching6
                )
            )
        }
        if (stretching.stretchingType.equals("Espalda")) {
            binding.tvTypeStretchingValue.text =
                ContextCompat.getString(binding.tvTypeStretchingValue.context,
                    R.string.stretchingsTypeBack)
            binding.tvTypeStretchingValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeStretchingValue.context,
                    R.color.stretching7
                )
            )
        }
        if (stretching.stretchingType.equals("Pectoral")) {
            binding.tvTypeStretchingValue.text =
                ContextCompat.getString(binding.tvTypeStretchingValue.context,
                    R.string.stretchingsTypePectoral)
            binding.tvTypeStretchingValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeStretchingValue.context,
                    R.color.stretching8
                )
            )
        }
        if (stretching.stretchingType.equals("Ingle")) {
            binding.tvTypeStretchingValue.text =
                ContextCompat.getString(binding.tvTypeStretchingValue.context,
                    R.string.stretchingsTypeCrotch)
            binding.tvTypeStretchingValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeStretchingValue.context,
                    R.color.stretching9
                )
            )
        }
        if (stretching.stretchingType.equals("Triceps")) {
            binding.tvTypeStretchingValue.text =
                ContextCompat.getString(binding.tvTypeStretchingValue.context,
                    R.string.stretchingsTypeTriceps)
            binding.tvTypeStretchingValue.setTextColor(
                ContextCompat.getColor(
                    tvTypeStretchingValue.context,
                    R.color.stretching10
                )
            )
        }
    }


}