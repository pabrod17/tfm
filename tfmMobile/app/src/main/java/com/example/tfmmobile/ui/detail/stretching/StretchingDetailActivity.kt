package com.example.tfmmobile.ui.detail.stretching

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.isVisible
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import androidx.navigation.navArgs
import com.aristidevs.nuwelogin.core.ex.dismissKeyboard
import com.example.tfmmobile.R
import com.example.tfmmobile.databinding.ActivityStretchingDetailBinding
import com.example.tfmmobile.ui.detail.exercise.ExerciseDetailState
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch


@AndroidEntryPoint
class StretchingDetailActivity : AppCompatActivity() {

    private lateinit var binding: ActivityStretchingDetailBinding
    private val stretchingDetailViewModel: StretchingDetailViewModel by viewModels()

    private val args:StretchingDetailActivityArgs by navArgs()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        binding = ActivityStretchingDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)
        stretchingDetailViewModel.getStretchingById(args.id)
        initUi()

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
    }

    private fun initUi(){
        initListeners()
        initUiState()
    }

    private fun initListeners() {
        binding.ivBack.setOnClickListener {
            onBackPressed()
        }

    }

    private fun initUiState() {
        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                stretchingDetailViewModel.state.collect{
                    when(it){
                        StretchingDetailState.Loading -> loadingState()
                        is StretchingDetailState.Error -> errorState()
                        is StretchingDetailState.Success -> successState(it)
                    }
                }
            }
        }
    }

    private fun loadingState() {
        binding.pb.isVisible = true

    }
    private fun errorState() {
        binding.pb.isVisible = false
    }
    private fun successState(state: StretchingDetailState.Success) {
        binding.pb.isVisible = false

        binding.autoCompleteStretchingType.setText(state.stretchingType, false)
        binding.autoCompleteStretchingType.isClickable = false
        binding.autoCompleteStretchingType.isActivated = false
        binding.autoCompleteStretchingType.isFocusable = false

        binding.tvBodyStretchingName.setText(state.stretchingName)
        binding.etDescription.setText(state.description)


        if(state.stretchingType.equals("Isquiotibiales")) {
            binding.autoCompleteStretchingType.setText(
                ContextCompat.getString(
                    binding.autoCompleteStretchingType.context,
                    R.string.stretchingsTypeHamstrings
                )
            )
            binding.autoCompleteStretchingType.setTextColor(
                ContextCompat.getColor(
                    binding.autoCompleteStretchingType.context,
                    R.color.stretching1
                )
            )
        }
        if(state.stretchingType.equals("Glúteos") || state.stretchingType.equals("Gluteos")) {
            binding.autoCompleteStretchingType.setText(
                ContextCompat.getString(
                    binding.autoCompleteStretchingType.context,
                    R.string.stretchingsTypeButtocks
                )
            )
            binding.autoCompleteStretchingType.setTextColor(
                ContextCompat.getColor(
                    binding.autoCompleteStretchingType.context,
                    R.color.stretching2
                )
            )
        }
        if(state.stretchingType.equals("Gemelos")) {
            binding.autoCompleteStretchingType.setText(
                ContextCompat.getString(
                    binding.autoCompleteStretchingType.context,
                    R.string.stretchingsTypeCalf
                )
            )
            binding.autoCompleteStretchingType.setTextColor(
                ContextCompat.getColor(
                    binding.autoCompleteStretchingType.context,
                    R.color.stretching3
                )
            )
        }
        if(state.stretchingType.equals("Adductores")) {
            binding.autoCompleteStretchingType.setText(
                ContextCompat.getString(
                    binding.autoCompleteStretchingType.context,
                    R.string.stretchingsTypeAbductors
                )
            )
            binding.autoCompleteStretchingType.setTextColor(
                ContextCompat.getColor(
                    binding.autoCompleteStretchingType.context,
                    R.color.stretching4
                )
            )
        }
        if(state.stretchingType.equals("Hombro")) {
            binding.autoCompleteStretchingType.setText(
                ContextCompat.getString(
                    binding.autoCompleteStretchingType.context,
                    R.string.stretchingsTypeShoulder
                )
            )
            binding.autoCompleteStretchingType.setTextColor(
                ContextCompat.getColor(
                    binding.autoCompleteStretchingType.context,
                    R.color.stretching5
                )
            )
        }
        if(state.stretchingType.equals("Cuádriceps") || state.stretchingType.equals("Cuadriceps")) {
            binding.autoCompleteStretchingType.setText(
                ContextCompat.getString(
                    binding.autoCompleteStretchingType.context,
                    R.string.stretchingsTypeQuadriceps
                )
            )
            binding.autoCompleteStretchingType.setTextColor(
                ContextCompat.getColor(
                    binding.autoCompleteStretchingType.context,
                    R.color.stretching6
                )
            )
        }
        if(state.stretchingType.equals("Espalda")) {
            binding.autoCompleteStretchingType.setText(
                ContextCompat.getString(
                    binding.autoCompleteStretchingType.context,
                    R.string.stretchingsTypeBack
                )
            )
            binding.autoCompleteStretchingType.setTextColor(
                ContextCompat.getColor(
                    binding.autoCompleteStretchingType.context,
                    R.color.stretching7
                )
            )
        }
        if(state.stretchingType.equals("Pectoral")) {
            binding.autoCompleteStretchingType.setText(
                ContextCompat.getString(
                    binding.autoCompleteStretchingType.context,
                    R.string.stretchingsTypePectoral
                )
            )
            binding.autoCompleteStretchingType.setTextColor(
                ContextCompat.getColor(
                    binding.autoCompleteStretchingType.context,
                    R.color.stretching8
                )
            )
        }
        if(state.stretchingType.equals("Ingle")) {
            binding.autoCompleteStretchingType.setText(
                ContextCompat.getString(
                    binding.autoCompleteStretchingType.context,
                    R.string.stretchingsTypeCrotch
                )
            )
            binding.autoCompleteStretchingType.setTextColor(
                ContextCompat.getColor(
                    binding.autoCompleteStretchingType.context,
                    R.color.stretching9
                )
            )
        }
        if(state.stretchingType.equals("Tríceps") || state.stretchingType.equals("Triceps")) {
            binding.autoCompleteStretchingType.setText(
                ContextCompat.getString(
                    binding.autoCompleteStretchingType.context,
                    R.string.stretchingsTypeTriceps
                )
            )
            binding.autoCompleteStretchingType.setTextColor(
                ContextCompat.getColor(
                    binding.autoCompleteStretchingType.context,
                    R.color.stretching10
                )
            )
        }
    }

}