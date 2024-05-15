package com.example.tfmmobile.ui.detail.player

import android.app.Dialog
import android.os.Build
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.isVisible
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import androidx.navigation.navArgs
import com.aristidevs.nuwelogin.core.ex.dismissKeyboard
import com.example.tfmmobile.R
import com.example.tfmmobile.databinding.ActivityPlayerDetailBinding
import com.example.tfmmobile.databinding.ActivitySeasonDetailBinding
import com.example.tfmmobile.ui.detail.season.SeasonDetailActivityArgs
import com.example.tfmmobile.ui.detail.season.SeasonDetailState
import com.example.tfmmobile.ui.detail.season.SeasonDetailViewModel
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch

@AndroidEntryPoint
class PlayerDetailActivity : AppCompatActivity() {

    private lateinit var binding: ActivityPlayerDetailBinding
    private val playerDetailViewModel: PlayerDetailViewModel by viewModels()
    private val args: PlayerDetailActivityArgs by navArgs()

    val positionMapEsToEn = mapOf(
        "Base" to "PointGuard",
        "Escolta" to "ShootingGuard",
        "Alero" to "SmallForward",
        "AlaPivot" to "PowerForward",
        "Pivot" to "Center"
    )

    val positionMap = mapOf(
        "PointGuard" to "Base",
        "ShootingGuard" to "Escolta",
        "SmallForward" to "Alero",
        "PowerForward" to "AlaPivot",
        "Center" to "Pivot"
    )
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        binding = ActivityPlayerDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)
        playerDetailViewModel.getPlayerById(args.id)
        initUi()


        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
    }

    private fun initUi(){
        initPositions()
        initListeners()
        initUiState()
    }
    private fun initPositions() {
        val positions = listOf(
            getString(R.string.position1),
            getString(R.string.position2),
            getString(R.string.position3),
            getString(R.string.position4),
            getString(R.string.position5)
        )
        val autoCompletePosition: AutoCompleteTextView = binding.autoCompletePosition
        val adapter = ArrayAdapter(this, R.layout.position_item, positions)
        autoCompletePosition.setAdapter(adapter)

    }

    private fun initListeners() {
        binding.ivBack.setOnClickListener {
            onBackPressed()
        }

        binding.btnUpdate.setOnClickListener {
            it.dismissKeyboard()
            playerDetailViewModel.updatePlayer(
                args.id,
                args.teamId,
                binding.tvBodyPlayerName.text.toString(),
                binding.etPrimaryLastName.text.toString(),
                binding.etSecondLastName.text.toString(),
                getPlayerPosition(binding.autoCompletePosition),
                binding.etTrends.text.toString(),
                binding.etPhoneNumber.text.toString(),
                binding.etEmail.text.toString(),
                binding.etDni.text.toString(),
                false,
                this
            )
        }
    }

    private fun initUiState() {
        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                playerDetailViewModel.state.collect{
                    when(it){
                        PlayerDetailState.Loading -> loadingState()
                        is PlayerDetailState.Error -> errorState()
                        is PlayerDetailState.Success -> successState(it)
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

    private fun successState(state: PlayerDetailState.Success) {
        binding.pb.isVisible = false

        binding.tvBodyPlayerName.setText(state.playerName)
        binding.etPrimaryLastName.setText(state.primaryLastName)
        binding.etSecondLastName.setText(state.secondLastName)

        binding.autoCompletePosition.setText(state.position, false)

        binding.etTrends.setText(state.trends)
        binding.etPhoneNumber.setText(state.phoneNumber)
        binding.etEmail.setText(state.email)
        binding.etDni.setText(state.dni)
    }

    private fun getPlayerPosition(positionSelected: AutoCompleteTextView): String {
        val positionNormal = positionSelected.text.toString()
        val positionSelectedSpanish = positionMap[positionNormal]
        return positionSelectedSpanish ?: positionNormal
    }

    private fun getPlayerPositionEnToEs(positionSelected: String): String {
        val positionSelectedSpanish = positionMapEsToEn[positionSelected]
        return positionSelectedSpanish ?: positionSelected
    }
}