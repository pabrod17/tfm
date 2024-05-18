package com.example.tfmmobile.ui.detail.game

import android.os.Build
import android.os.Bundle
import android.widget.EditText
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
import com.example.tfmmobile.databinding.ActivityGameDetailBinding
import com.example.tfmmobile.ui.detail.season.SeasonDetailState
import com.example.tfmmobile.ui.home.DatePickerFragment
import com.example.tfmmobile.ui.home.TimePickerFragment
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.Locale
import java.util.TimeZone

@AndroidEntryPoint
class GameDetailActivity : AppCompatActivity() {

    private lateinit var binding : ActivityGameDetailBinding
    private val gameDetailViewModel: GameDetailViewModel by viewModels()
    private val args:GameDetailActivityArgs by navArgs()

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        binding = ActivityGameDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)
        gameDetailViewModel.getGameById(args.id)
        initUi()

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun initUi() {
        initListeners()
        initUiState()
    }

    private fun initListeners() {
        binding.ivBack.setOnClickListener {
            onBackPressed()
        }
        val etStartDate = binding.etGameDate
        etStartDate.setOnClickListener {
            showPickerDialog(etStartDate)
        }

        binding.btnUpdate.setOnClickListener {
            it.dismissKeyboard()
            gameDetailViewModel.updateGame(
                args.id,
                returnDateConverter(binding.etGameDate.text.toString()),
                binding.tvBodyGameRival.text.toString(),
                binding.tvDescription.text.toString(),
                this
            )
        }
    }

    private fun showPickerDialog(dateClicked: EditText) {
        val datePicker =
            DatePickerFragment { day, month, year -> onDateSelected(dateClicked, day, month, year) }
        datePicker.show(supportFragmentManager, "datePicker")
    }

    fun onDateSelected(dateClicked: EditText, day: Int, month: Int, year: Int) {
        val userFormattedDate = String.format("%04d-%02d-%02d", year, month, day)

        val formattedDate = String.format("%04d-%02d-%02dT22:00:00.000Z", year, month, day)
        val dateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault())
        dateFormat.timeZone = TimeZone.getTimeZone("UTC")
        val datestring = dateFormat.format(dateFormat.parse(formattedDate))
        dateClicked.setText(userFormattedDate)

        showTimePickerDialog(dateClicked)
    }

    private fun showTimePickerDialog(dateClicked: EditText) {
        val timePicker =
            TimePickerFragment {onTimeSelected(dateClicked, it) }
        timePicker.show(supportFragmentManager, "time")
    }

    fun onTimeSelected(dateClicked:EditText, time: String){
        dateClicked.setText(dateClicked.text.toString() + " " + time)
    }

    fun returnDateConverter(dateToFormat: String): String {
        val parts = dateToFormat.split("-")

        val year = parts[0].toInt()
        val month = parts[1].toInt()
        val dayAndTime = parts[2].split(" ")
        val day = dayAndTime[0].toInt()
        val time = dayAndTime[1].split(":")
        val hour = time[0].toInt()
        val minute = time[1].toInt()

        val formattedDateTime = String.format("%04d-%02d-%02d %02d:%02d", year, month, day, hour, minute)
        val dateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault())
        dateFormat.timeZone = TimeZone.getTimeZone("UTC")
        return formattedDateTime
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun initUiState() {
        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                gameDetailViewModel.state.collect{
                    when(it){
                        GameDetailState.Loading -> loadingState()
                        is GameDetailState.Error -> errorState()
                        is GameDetailState.Success -> successState(it)
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

    @RequiresApi(Build.VERSION_CODES.O)
    private fun successState(state: GameDetailState.Success) {
        binding.pb.isVisible = false

        binding.etGameDate.setText(formatDate(state.gameDate))
        binding.tvBodyGameRival.setText(state.rival)
        binding.tvDescription.setText(state.description)
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun formatDate(dateToFormat: String) : String {
        val formatterBD = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSZ")
        val formatterDeseado = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")
        val fecha = LocalDateTime.parse(dateToFormat, formatterBD)
        val fechaMasUnDia = fecha.plusHours(2)
        return formatterDeseado.format(fechaMasUnDia)
    }

}