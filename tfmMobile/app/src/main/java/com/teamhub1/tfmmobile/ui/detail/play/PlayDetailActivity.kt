package com.teamhub1.tfmmobile.ui.detail.play

import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.isVisible
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import androidx.navigation.navArgs
import com.aristidevs.nuwelogin.core.ex.dismissKeyboard
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.databinding.ActivityPlayDetailBinding
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch

@AndroidEntryPoint
class PlayDetailActivity : AppCompatActivity() {

    private lateinit var binding: ActivityPlayDetailBinding
    private val playDetailViewModel: PlayDetailViewModel by viewModels()
    private val args: PlayDetailActivityArgs by navArgs()

    val typeMapEsToEn = mapOf(
        "Defensa" to "Defense",
        "Ataque" to "Attack"
    )

    val typeMap = mapOf(
        "Defense" to "Defensa",
        "Attack" to "Ataque"
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        binding = ActivityPlayDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)
        playDetailViewModel.getPlayById(args.id)
        initUi()

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
    }

    private fun initUi(){
        initTypes()
        initListeners()
        initUiState()
    }

    private fun initTypes() {
        val positions = listOf(
            getString(R.string.playsDefense),
            getString(R.string.playsAttack)
        )
        val autoCompleteType: AutoCompleteTextView = binding.autoCompleteType
        val adapter = ArrayAdapter(this, R.layout.position_item, positions)
        autoCompleteType.setAdapter(adapter)
    }

    private fun initListeners() {
        binding.ivBack.setOnClickListener {
            onBackPressed()
        }

        binding.btnUpdate.setOnClickListener {
            it.dismissKeyboard()
            playDetailViewModel.updatePlay(
                args.id,
                binding.tvBodyTitle.text.toString(),
                getPlayType(binding.autoCompleteType),
                binding.etGesture.text.toString(),
                binding.etPosition1.text.toString(),
                binding.etPosition2.text.toString(),
                binding.etPosition3.text.toString(),
                binding.etPosition4.text.toString(),
                binding.etPosition5.text.toString(),
                binding.etDescription.text.toString(),
                this
            )
        }
    }

    private fun getPlayType(typeSelected: AutoCompleteTextView): String {
        val typeNormal = typeSelected.text.toString()
        val typeSelectedSpanish = typeMap[typeNormal]
        return typeSelectedSpanish ?: typeNormal
    }

    private fun initUiState() {
        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                playDetailViewModel.state.collect{
                    when(it){
                        PlayDetailState.Loading -> loadingState()
                        is PlayDetailState.Error -> errorState()
                        is PlayDetailState.Success -> successState(it)
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

    private fun successState(state: PlayDetailState.Success) {
        binding.pb.isVisible = false

        binding.tvBodyTitle.setText(state.title)
        binding.autoCompleteType.setText(state.playType, false)

        binding.etGesture.setText(state.gesture)
        binding.etPosition1.setText(state.pointGuardText)
        binding.etPosition2.setText(state.shootingGuardText)
        binding.etPosition3.setText(state.smallForwardText)
        binding.etPosition4.setText(state.powerForwardText)
        binding.etPosition5.setText(state.centerText)

        binding.etDescription.setText(state.description)
    }

}