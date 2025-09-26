package com.teamhub1.tfmmobile.ui.detail.lesion

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
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.databinding.ActivityLesionDetailBinding
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch


@AndroidEntryPoint
class LesionDetailActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLesionDetailBinding
    private val lesionDetailViewModel: LesionDetailViewModel by viewModels()

    private val args:LesionDetailActivityArgs by navArgs()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        binding = ActivityLesionDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)
        lesionDetailViewModel.getLesionById(args.id)
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
                lesionDetailViewModel.state.collect{
                    when(it){
                        LesionDetailState.Loading -> loadingState()
                        is LesionDetailState.Error -> errorState()
                        is LesionDetailState.Success -> successState(it)
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
    private fun successState(state: LesionDetailState.Success) {
        binding.pb.isVisible = false

        binding.autoCompleteLesionType.setText(state.lesionType, false)
        binding.autoCompleteLesionType.isClickable = false
        binding.autoCompleteLesionType.isActivated = false
        binding.autoCompleteLesionType.isFocusable = false

        binding.tvBodyLesionName.setText(state.lesionName)
        binding.tvBodyLesionName.isClickable = false
        binding.tvBodyLesionName.isActivated = false
        binding.tvBodyLesionName.isFocusable = false

        binding.etLesionMedication.setText(state.medication)
        binding.etLesionMedication.isClickable = false
        binding.etLesionMedication.isActivated = false
        binding.etLesionMedication.isFocusable = false

        binding.etDescription.setText(state.description)
        binding.etDescription.isClickable = false
        binding.etDescription.isActivated = false
        binding.etDescription.isFocusable = false

        if(state.lesionType.equals("Muscular")) {
            binding.autoCompleteLesionType.setText(
                ContextCompat.getString(
                    binding.autoCompleteLesionType.context,
                    R.string.lesionTypeMuscle
                )
            )
            binding.autoCompleteLesionType.setTextColor(
                ContextCompat.getColor(
                    binding.autoCompleteLesionType.context,
                    R.color.lesion1
                )
            )
        }
        if(state.lesionType.equals("Tendinosa")) {
            binding.autoCompleteLesionType.setText(
                ContextCompat.getString(
                    binding.autoCompleteLesionType.context,
                    R.string.lesionTypeTendon
                )
            )
            binding.autoCompleteLesionType.setTextColor(
                ContextCompat.getColor(
                    binding.autoCompleteLesionType.context,
                    R.color.lesion2
                )
            )
        }
        if(state.lesionType.equals("Articular")) {
            binding.autoCompleteLesionType.setText(
                ContextCompat.getString(
                    binding.autoCompleteLesionType.context,
                    R.string.lesionTypeJoint
                )
            )
            binding.autoCompleteLesionType.setTextColor(
                ContextCompat.getColor(
                    binding.autoCompleteLesionType.context,
                    R.color.lesion3
                )
            )
        }
        if(state.lesionType.equals("Columna Vertebral") || state.lesionType.equals("ColumnaVertebral")) {
            binding.autoCompleteLesionType.setText(
                ContextCompat.getString(
                    binding.autoCompleteLesionType.context,
                    R.string.lesionTypeSpine
                )
            )
            binding.autoCompleteLesionType.setTextColor(
                ContextCompat.getColor(
                    binding.autoCompleteLesionType.context,
                    R.color.lesion4
                )
            )
        }
        if(state.lesionType.equals("Psicológica") || state.lesionType.equals("Psicologica")) {
            binding.autoCompleteLesionType.setText(
                ContextCompat.getString(
                    binding.autoCompleteLesionType.context,
                    R.string.lesionTypePhychological
                )
            )
            binding.autoCompleteLesionType.setTextColor(
                ContextCompat.getColor(
                    binding.autoCompleteLesionType.context,
                    R.color.lesion5
                )
            )
        }
    }

}