package com.example.tfmmobile.ui.detail.exercise

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
import com.example.tfmmobile.R
import com.example.tfmmobile.databinding.ActivityExerciseDetailBinding
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch

@AndroidEntryPoint
class ExerciseDetailActivity : AppCompatActivity() {

    private lateinit var binding: ActivityExerciseDetailBinding
    private val exerciseDetailViewModel: ExerciseDetailViewModel by viewModels()

    private val args:ExerciseDetailActivityArgs by navArgs()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        binding = ActivityExerciseDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)
        exerciseDetailViewModel.getExerciseById(args.id)
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
                exerciseDetailViewModel.state.collect{
                    when(it){
                        ExerciseDetailState.Loading -> loadingState()
                        is ExerciseDetailState.Error -> errorState()
                        is ExerciseDetailState.Success -> successState(it)
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
    private fun successState(state: ExerciseDetailState.Success) {
        binding.pb.isVisible = false

        binding.autoCompleteExerciseType.setText(state.exerciseType, false)
        binding.autoCompleteExerciseType.isClickable = false
        binding.autoCompleteExerciseType.isActivated = false
        binding.autoCompleteExerciseType.isFocusable = false

        binding.tvBodyExerciseName.setText(state.exerciseName)
        binding.tvBodyExerciseName.isClickable = false
        binding.tvBodyExerciseName.isActivated = false
        binding.tvBodyExerciseName.isFocusable = false

        binding.etExerciseObjective.setText(state.objective)
        binding.etExerciseObjective.isClickable = false
        binding.etExerciseObjective.isActivated = false
        binding.etExerciseObjective.isFocusable = false

        binding.etDescription.setText(state.description)
        binding.etDescription.isClickable = false
        binding.etDescription.isActivated = false
        binding.etDescription.isFocusable = false

        if(state.exerciseType.equals("Táctico") || state.exerciseType.equals("Tactico")) {
            binding.autoCompleteExerciseType.setText(
                ContextCompat.getString(
                    binding.autoCompleteExerciseType.context,
                    R.string.exercisesTypeTactic
                )
            )
            binding.autoCompleteExerciseType.setTextColor(
                ContextCompat.getColor(
                    binding.autoCompleteExerciseType.context,
                    R.color.exercise1
                )
            )
        }
        if(state.exerciseType.equals("Técnica") || state.exerciseType.equals("Tecnica")) {
            binding.autoCompleteExerciseType.setText(
                ContextCompat.getString(
                    binding.autoCompleteExerciseType.context,
                    R.string.exercisesTypeTechnique
                )
            )
            binding.autoCompleteExerciseType.setTextColor(
                ContextCompat.getColor(
                    binding.autoCompleteExerciseType.context,
                    R.color.exercise2
                )
            )
        }
        if(state.exerciseType.equals("Físico") || state.exerciseType.equals("Fisico")) {
            binding.autoCompleteExerciseType.setText(
                ContextCompat.getString(
                    binding.autoCompleteExerciseType.context,
                    R.string.exercisesTypePhysical
                )
            )
            binding.autoCompleteExerciseType.setTextColor(
                ContextCompat.getColor(
                    binding.autoCompleteExerciseType.context,
                    R.color.exercise3
                )
            )
        }
        if(state.exerciseType.equals("Global")) {
            binding.autoCompleteExerciseType.setText(
                ContextCompat.getString(
                    binding.autoCompleteExerciseType.context,
                    R.string.exercisesTypeGlobalized
                )
            )
            binding.autoCompleteExerciseType.setTextColor(
                ContextCompat.getColor(
                    binding.autoCompleteExerciseType.context,
                    R.color.exercise4
                )
            )
        }
        if(state.exerciseType.equals("Específico") || state.exerciseType.equals("Especifico")) {
            binding.autoCompleteExerciseType.setText(
                ContextCompat.getString(
                    binding.autoCompleteExerciseType.context,
                    R.string.exercisesTypeSpecific
                )
            )
            binding.autoCompleteExerciseType.setTextColor(
                ContextCompat.getColor(
                    binding.autoCompleteExerciseType.context,
                    R.color.exercise5
                )
            )
        }
        if(state.exerciseType.equals("Psicológico") || state.exerciseType.equals("Psicologico")) {
            binding.autoCompleteExerciseType.setText(
                ContextCompat.getString(
                    binding.autoCompleteExerciseType.context,
                    R.string.exercisesTypePsychological
                )
            )
            binding.autoCompleteExerciseType.setTextColor(
                ContextCompat.getColor(
                    binding.autoCompleteExerciseType.context,
                    R.color.exercise6
                )
            )
        }
        if(state.exerciseType.equals("Estrategia")) {
            binding.autoCompleteExerciseType.setText(
                ContextCompat.getString(
                    binding.autoCompleteExerciseType.context,
                    R.string.exercisesTypeStrategy
                )
            )
            binding.autoCompleteExerciseType.setTextColor(
                ContextCompat.getColor(
                    binding.autoCompleteExerciseType.context,
                    R.color.exercise7
                )
            )
        }
        if(state.exerciseType.equals("PrePartido")) {
            binding.autoCompleteExerciseType.setText(
                ContextCompat.getString(
                    binding.autoCompleteExerciseType.context,
                    R.string.exercisesTypePreMatch
                )
            )
            binding.autoCompleteExerciseType.setTextColor(
                ContextCompat.getColor(
                    binding.autoCompleteExerciseType.context,
                    R.color.exercise8
                )
            )
        }
    }

}