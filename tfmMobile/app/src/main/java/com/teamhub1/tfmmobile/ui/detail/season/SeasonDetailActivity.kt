package com.teamhub1.tfmmobile.ui.detail.season

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
import com.teamhub1.tfmmobile.databinding.ActivitySeasonDetailBinding
import com.teamhub1.tfmmobile.ui.home.DatePickerFragment
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.Locale
import java.util.TimeZone
@AndroidEntryPoint
class SeasonDetailActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySeasonDetailBinding
    private val seasonDetailViewModel: SeasonDetailViewModel by viewModels()
    private val args:SeasonDetailActivityArgs by navArgs()

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()


        binding = ActivitySeasonDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)
        seasonDetailViewModel.getSeasonById(args.id)
        initUi()


        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun initUi(){
        initListeners()
        initUiState()
    }

    private fun initListeners() {
        binding.ivBack.setOnClickListener {
            onBackPressed()
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
            seasonDetailViewModel.updateSeason(
                args.id,
                returnDateConverter(binding.etStartDate.text.toString()),
                returnDateConverter(binding.etFinishDate.text.toString()),
                binding.tvBodySeasonName.text.toString(),
                binding.tvDescription.text.toString(),
                this
            )
        }
    }

    private fun showPickerDialog(dateClicked: EditText) {
        val datePicker =
            DatePickerFragment { day, month, year -> onDateSelected(dateClicked, day, month, year) }
        datePicker.show(supportFragmentManager, "DatePicker")
    }

    fun onDateSelected(dateClicked: EditText, day: Int, month: Int, year: Int) {
        val userFormattedDate = String.format("%04d-%02d-%02d", year, month, day)

        val formattedDate = String.format("%04d-%02d-%02dT22:00:00.000Z", year, month, day)
        val dateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault())
        dateFormat.timeZone = TimeZone.getTimeZone("UTC")
        val datestring = dateFormat.format(dateFormat.parse(formattedDate))

        dateClicked.setText(userFormattedDate)
    }

    fun returnDateConverter(dateToFormat: String): String {
        val parts = dateToFormat.split("-")

        val year = parts[0].toInt()
        val month = parts[1].toInt()
        val day = parts[2].toInt()

        val formattedDate = String.format("%04d-%02d-%02dT22:00:00.000Z", year, month, day)
        val dateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault())
        dateFormat.timeZone = TimeZone.getTimeZone("UTC")
        return dateFormat.format(dateFormat.parse(formattedDate))
    }
    @RequiresApi(Build.VERSION_CODES.O)
    private fun initUiState() {
        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                seasonDetailViewModel.state.collect{
                    when(it){
                        SeasonDetailState.Loading -> loadingState()
                        is SeasonDetailState.Error -> errorState()
                        is SeasonDetailState.Success -> successState(it)
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
    private fun successState(state: SeasonDetailState.Success) {
        binding.pb.isVisible = false

        binding.etStartDate.setText(formatDate(state.startDate))
        binding.etFinishDate.setText(formatDate(state.endDate))
        binding.tvBodySeasonName.setText(state.seasonName)
        binding.tvDescription.setText(state.description)
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun formatDate(dateToFormat: String) : String {


        val formatterBD = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSZ")
        val formatterDeseado = DateTimeFormatter.ofPattern("yyyy-MM-dd")
        val fecha = LocalDateTime.parse(dateToFormat, formatterBD)
        val fechaMasUnDia = fecha.plusDays(1)
        return formatterDeseado.format(fechaMasUnDia)
    }

}