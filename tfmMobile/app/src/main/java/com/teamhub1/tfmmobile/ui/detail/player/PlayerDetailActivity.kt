package com.teamhub1.tfmmobile.ui.detail.player

import android.os.Bundle
import android.text.Editable
import android.text.TextUtils
import android.text.TextWatcher
import android.util.Log
import android.util.Patterns
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
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
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.databinding.ActivityPlayerDetailBinding
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch
import java.util.Locale
import java.util.regex.Pattern

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

        binding.etEmail.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                validarFormEmail()
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })

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

    private fun validarFormEmail(): Boolean {
        var esValido = true
        if (TextUtils.isEmpty(binding.etEmail.text.toString())) {
            binding.etEmail.error = ContextCompat.getString(binding.etEmail.context, R.string.required)
//            binding.tilEmail.error = ContextCompat.getString(binding.etEmail.context, R.string.required)
            esValido = false
        } else {
            binding.etEmail.error = null

            if(!validateEmail(binding.etEmail.text.toString())) {
                binding.tilEmail.error = ContextCompat.getString(binding.etEmail.context, R.string.invalidEmail)
            } else {
                binding.tilEmail.error = null
            }
        }
        return esValido
    }

    private fun validateEmail(email: String): Boolean {
        val pattern: Pattern = Patterns.EMAIL_ADDRESS
        return pattern.matcher(email).matches()
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

        val translatedPosition = translatePosition(state.position)
        binding.autoCompletePosition.setText(translatedPosition, false)
        Log.i("DENTROOOOOOOOOO", translatedPosition)

//        binding.autoCompletePosition.setText(state.position, false)

        binding.etTrends.setText(state.trends)
        binding.etPhoneNumber.setText(state.phoneNumber)
        binding.etEmail.setText(state.email)
        binding.etDni.setText(state.dni)
    }

    private fun translatePosition(position: String): String {
        val locale = Locale.getDefault().language // "es" o "en"

        val translations = mapOf(
            "Base" to mapOf("es" to "Base", "en" to "PointGuard"),
            "Escolta" to mapOf("es" to "Escolta", "en" to "ShootingGuard"),
            "Alero" to mapOf("es" to "Alero", "en" to "SmallForward"),
            "AlaPivot" to mapOf("es" to "AlaPivot", "en" to "PowerForward"),
            "Pivot" to mapOf("es" to "Pivot", "en" to "Center")
        )

        return translations[position]?.get(locale) ?: position
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