package com.teamhub1.tfmmobile.ui.detail.training

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
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.databinding.ActivityTrainingDetailBinding
import com.teamhub1.tfmmobile.ui.home.DatePickerFragment
import com.teamhub1.tfmmobile.ui.home.TimePickerFragment
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

    @RequiresApi(Build.VERSION_CODES.O)
    private fun initListeners() {
        binding.ivBack.setOnClickListener {
            onBackPressed()
        }
        val etTrainingDate = binding.etTrainingDate
        etTrainingDate.setOnClickListener {
            showPickerDialog(etTrainingDate)
        }
        binding.etTrainingDuration.setOnClickListener {
            showTimePickerDialog(binding.etTrainingDuration)
        }

        binding.btnUpdate.setOnClickListener {
            it.dismissKeyboard()

            val durationMinutes = extractDurationMinutes(binding.etTrainingDuration)
            if (durationMinutes <= 0) {
                binding.etTrainingDuration.error = getString(R.string.required)
                return@setOnClickListener
            }
            trainingDetailViewModel.updateTraining(
                args.id,
                returnDateConverter(binding.etTrainingDate.text.toString()),
                durationMinutes,
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

    private fun showTimePickerDialog(target: EditText) {
        val timePicker = TimePickerFragment { timeStr ->
            onTimeSelected2(target, timeStr)
        }
        timePicker.show(supportFragmentManager, "time")
    }
    fun onTimeSelected2(target: EditText, time: String) {
        // Espera "HH:mm" o "H:mm"
        val parts = time.trim().split(":", limit = 2)
        val hour = parts.getOrNull(0)?.toIntOrNull() ?: 0
        val minute = parts.getOrNull(1)?.toIntOrNull() ?: 0
        val minutesTotal = hour * 60 + minute

        target.setText(String.format("%02d:%02d", hour, minute)) // visible al usuario
        target.tag = minutesTotal                                // <-- guarda minutos (Int)
        target.keyListener = null                                 // opcional: forzar uso del picker
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

    private fun extractDurationMinutes(et: EditText): Int {
        // 1) Preferir lo que guardamos en el tag
        (et.tag as? Int)?.let { return it }

        // 2) Si el usuario escribió "120"
        et.text.toString().trim().toIntOrNull()?.let { return it }

        // 3) Si escribió "HH:mm"
        val parts = et.text.toString().trim().split(":", limit = 2)
        val h = parts.getOrNull(0)?.toIntOrNull()
        val m = parts.getOrNull(1)?.toIntOrNull()
        if (h != null && m != null) return h * 60 + m

        return 0
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
        val mins = state.durationMinutes
        binding.etTrainingDuration.setText(formatDuration(mins))
        binding.etTrainingDuration.tag = mins

        binding.tvDescription.setText(state.description)
        binding.tvBodyTrainingObjective.setText(state.objective)

        binding.tvDescription.setText(state.description)
        binding.tvBodyTrainingObjective.setText(state.objective)
    }

    private fun formatDuration(minutes: Int?): String {
        val m = minutes ?: return ""
        val h = m / 60
        val min = m % 60
        return String.format("%02d:%02d", h, min) // muestra HH:mm
    }
    @RequiresApi(Build.VERSION_CODES.O)
    private fun formatDate(dateToFormat: String) : String {
        val formatterBD = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSZ")
        val formatterDeseado = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")
        val fecha = LocalDateTime.parse(dateToFormat, formatterBD)
        return formatterDeseado.format(fecha)
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