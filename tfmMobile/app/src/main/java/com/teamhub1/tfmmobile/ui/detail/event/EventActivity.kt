package com.teamhub1.tfmmobile.ui.detail.event

import android.app.Dialog
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.os.Build
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import androidx.navigation.navArgs
import com.aristidevs.nuwelogin.core.ex.dismissKeyboard
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.databinding.ActivityEventBinding
import com.teamhub1.tfmmobile.ui.home.DatePickerFragment
import com.teamhub1.tfmmobile.ui.home.TimePickerFragment
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.Locale
import java.util.TimeZone

@AndroidEntryPoint
class EventActivity : AppCompatActivity() {

    private lateinit var binding:ActivityEventBinding
    private val eventDetailViewModel: EventDetailViewModel by viewModels()
    private val args:EventActivityArgs by navArgs()

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        binding = ActivityEventBinding.inflate(layoutInflater)
        setContentView(binding.root)
        eventDetailViewModel.getEventById(args.id)
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
        binding.ivRemove.setOnClickListener {
            showDeleteDialog()
        }

        val etStartDate = binding.etStartDate
        etStartDate.setOnClickListener {
            showPickerDialog(etStartDate)
        }

        val etFinishDate = binding.etFinishDate
        etFinishDate.setOnClickListener {
            showPickerDialog(etFinishDate)
        }

        binding.btnUpdate.setOnClickListener {
            it.dismissKeyboard()
            eventDetailViewModel.updateEvent(
                args.id,
                binding.tvBodyEventTitle.text.toString(),
                returnDateConverter(binding.etStartDate.text.toString()),
                returnDateConverter(binding.etFinishDate.text.toString()),
                this
            )
        }
    }

        @RequiresApi(Build.VERSION_CODES.O)
    private fun showDeleteDialog() {

        val dialog = Dialog(this)
        dialog.setContentView(R.layout.dialog_delete_event_general)
        dialog.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))

        val deleteEventButton: Button = dialog.findViewById(R.id.deleteEventButton)

        deleteEventButton.setOnClickListener() {
            eventDetailViewModel.deleteEvent(args.id, this)
//                Toast.makeText(requireContext(), "Event deleted: ${event.title}", Toast.LENGTH_SHORT).show()
            dialog.dismiss()
        }
        dialog.show()
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
                eventDetailViewModel.state.collect{
                    when(it){
                        EventDetailState.Loading -> loadingState()
                        is EventDetailState.Error -> errorState()
                        is EventDetailState.Success -> successState(it)
                    }
                }

            }
        }
    }

    private fun loadingState() {
//        binding.pb.isVisible = true

    }
    private fun errorState() {
//        binding.pb.isVisible = false
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun successState(state: EventDetailState.Success) {
//        binding.pb.isVisible = false

        binding.etStartDate.setText(formatDate(state.startDate))
        binding.etFinishDate.setText(formatDate(state.finishDate))
        binding.tvBodyEventTitle.setText(state.title)
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun formatDate(dateToFormat: String) : String {
        val formatterBD = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSZ")
        val formatterDeseado = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")
        val fecha = LocalDateTime.parse(dateToFormat, formatterBD)
        return formatterDeseado.format(fecha)
    }
}