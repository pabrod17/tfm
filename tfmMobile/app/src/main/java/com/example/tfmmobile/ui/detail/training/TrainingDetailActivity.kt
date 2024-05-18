package com.example.tfmmobile.ui.detail.training

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
import com.example.tfmmobile.databinding.ActivityTeamDetailBinding
import com.example.tfmmobile.databinding.ActivityTrainingDetailBinding
import com.example.tfmmobile.ui.detail.game.GameDetailState
import com.example.tfmmobile.ui.home.DatePickerFragment
import com.example.tfmmobile.ui.home.TimePickerFragment
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime
import java.time.ZoneId
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter
import java.util.Locale
import java.util.TimeZone

@AndroidEntryPoint
class TrainingDetailActivity : AppCompatActivity() {

    private lateinit var binding: ActivityTrainingDetailBinding
    private val trainingDetailViewModel : TrainingDetailViewModel by viewModels()
    private val args: TrainingDetailActivityArgs by navArgs()

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        binding = ActivityTrainingDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)
        trainingDetailViewModel.getTrainingById(args.id)
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
        val etTrainingDate = binding.etTrainingDate
        etTrainingDate.setOnClickListener {
            showPickerDialog(etTrainingDate)
        }
        val etDurationMinutes =  binding.etTrainingDuration
        etDurationMinutes.setOnClickListener {
            showTimePickerDialog(etDurationMinutes)
        }

        binding.btnUpdate.setOnClickListener {
            it.dismissKeyboard()
            trainingDetailViewModel.updateTraining(
                args.id,
                returnDateConverter(binding.etTrainingDate.text.toString()),
                returnTimeConverter(binding.etTrainingDuration.text.toString()),
                binding.tvDescription.text.toString(),
                binding.tvBodyTrainingObjective.text.toString(),
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

        showTimePickerDialog2(dateClicked)
    }

    private fun showTimePickerDialog(dateClicked: EditText) {
        val timePicker =
            TimePickerFragment {onTimeSelected2(dateClicked, it) }
        timePicker.show(supportFragmentManager, "time")
    }
    fun onTimeSelected2(dateClicked: EditText, time: String){
        dateClicked.setText(time)
    }


    private fun showTimePickerDialog2(dateClicked: EditText) {
        val timePicker =
            TimePickerFragment {onTimeSelected(dateClicked, it) }
        timePicker.show(supportFragmentManager, "time")
    }
    fun onTimeSelected(dateClicked: EditText, time: String){
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
    fun returnTimeConverter(timeToFormat: String): String {

        val timeParts = timeToFormat.split(":")
        val hourOfDay = timeParts[0].toInt()
        val minute = timeParts[1].toInt()

        val time = LocalTime.of(hourOfDay, minute)

        // Fecha fija proporcionada
        val date = LocalDate.now()

        // Crear un objeto ZonedDateTime con la fecha y la hora deseada en la zona horaria GMT
        val zonedDateTime = ZonedDateTime.of(date, time, ZoneId.of("GMT"))

        // Formatear el ZonedDateTime al formato RFC_1123_DATE_TIME
        val formatter = DateTimeFormatter.RFC_1123_DATE_TIME
        val formattedDateTime = zonedDateTime.format(formatter)
        return formattedDateTime
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun initUiState() {
        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                trainingDetailViewModel.state.collect{
                    when(it){
                        TrainingDetailState.Loading -> loadingState()
                        is TrainingDetailState.Error -> errorState()
                        is TrainingDetailState.Success -> successState(it)
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
    private fun successState(state: TrainingDetailState.Success) {
        binding.pb.isVisible = false

        binding.etTrainingDate.setText(formatDate(state.trainingDate))
        binding.etTrainingDuration.setText(formateDuration(state.durationMinutes))
        binding.tvDescription.setText(state.description)
        binding.tvBodyTrainingObjective.setText(state.objective)
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun formatDate(dateToFormat: String) : String {
        val formatterBD = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSZ")
        val formatterDeseado = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")
        val fecha = LocalDateTime.parse(dateToFormat, formatterBD)
        val fechaMasUnDia = fecha.plusHours(2)
        return formatterDeseado.format(fechaMasUnDia)
    }
    @RequiresApi(Build.VERSION_CODES.O)
    private fun formateDuration(durationToFormat: String) : String {
        val formatter = DateTimeFormatter.RFC_1123_DATE_TIME
        val zonedDateTime = ZonedDateTime.parse(durationToFormat, formatter)
        val hour = zonedDateTime.hour
        val minute = zonedDateTime.minute
        val formattedHour = String.format("%02d", hour)
        val formattedMinute = String.format("%02d", minute)

        return "$formattedHour:$formattedMinute"
    }


}