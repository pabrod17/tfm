package com.example.tfmmobile.ui.plays

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.example.tfmmobile.databinding.FragmentPlaysBinding

class PlaysFragment : Fragment() {

    private var _binding: FragmentPlaysBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentPlaysBinding.inflate(layoutInflater, container, false)
        return binding.root
    }


}