package com.example.tfmmobile.ui.calendar

import android.app.AlertDialog
import android.app.Dialog
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.graphics.drawable.Drawable
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.text.Editable
import android.text.SpannableString
import android.text.TextUtils
import android.text.TextWatcher
import android.text.style.ForegroundColorSpan
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AutoCompleteTextView
import android.widget.Button
import android.widget.CalendarView
import android.widget.EditText
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.Observer
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.databinding.FragmentCalendarBinding
import com.example.tfmmobile.domain.model.EventModel
import com.example.tfmmobile.ui.calendar.adapter.EventAdapter
import com.example.tfmmobile.ui.events.EventsFragmentDirections
import com.example.tfmmobile.ui.events.adapter.GameAdapter
import com.example.tfmmobile.ui.health.adapter.LesionCategory
import com.example.tfmmobile.ui.home.DatePickerFragment
import com.example.tfmmobile.ui.home.TimePickerFragment
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.prolificinteractive.materialcalendarview.CalendarDay
import com.prolificinteractive.materialcalendarview.DayViewDecorator
import com.prolificinteractive.materialcalendarview.DayViewFacade
import com.prolificinteractive.materialcalendarview.MaterialCalendarView
import com.prolificinteractive.materialcalendarview.format.WeekDayFormatter
import com.prolificinteractive.materialcalendarview.spans.DotSpan
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch
import java.text.DateFormatSymbols
import java.text.SimpleDateFormat
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.Calendar
import java.util.Locale
import java.util.TimeZone

@AndroidEntryPoint
class CalendarFragment : Fragment() {

    private var _binding: FragmentCalendarBinding? = null
    private val binding get() = _binding!!

    private val calendarViewModel by viewModels<CalendarViewModel>()

    private lateinit var eventAdapter: EventAdapter
    private lateinit var calendarView: CalendarView

    private lateinit var calendar2: MaterialCalendarView

    private lateinit var rvEvents: RecyclerView


    lateinit var eventList: List<EventModel>

    private lateinit var addEventssButton: FloatingActionButton


    @RequiresApi(Build.VERSION_CODES.O)
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        calendar2 = binding.calendar2
        rvEvents = binding.rvEvents
        addEventssButton = binding.addEventssButton

        calendarViewModel.getEvents()
        lifecycleScope.launchWhenStarted {
            calendarViewModel.events.collect { events ->
                if(events.isNotEmpty()) {
                    eventList = events
                    initEventList()
                    updateEventsList()
                    initUiStateEvent()
                    showEvents()
                }
            }
        }
        initListeners()
        hideOrShowToolbar()
        configSwipe()
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun configSwipe() {
        binding.swipe.setColorSchemeColors(
            ContextCompat.getColor(
                requireContext(),
                R.color.cardLesion3
            ), ContextCompat.getColor(
                requireContext(),
                R.color.cardStretching3
            )
        )
        binding.swipe.setProgressBackgroundColorSchemeColor(
            ContextCompat.getColor(
                requireContext(),
                R.color.primaryDark
            )
        )
        binding.swipe.setOnRefreshListener {
            Handler(Looper.getMainLooper()).postDelayed({
                binding.swipe.isRefreshing = false
                initEventList()
                initUiStateEvent()
                val activity = requireActivity()
                activity.findViewById<View>(R.id.toolbar).visibility = View.VISIBLE
                activity.findViewById<View>(R.id.bottomNavView).visibility = View.VISIBLE
//                calendar2.topbarVisible = true
            }, 1000)

        }
    }


    private fun hideOrShowToolbar() {

        //Con esto si arrastro el dedo en la pantalla. No se oculta la toolbar (dragging)
        //Solo se ocultara si me desplazo! (scrolling)
        val state = intArrayOf(0)


        rvEvents.addOnScrollListener(object : RecyclerView.OnScrollListener() {
            override fun onScrollStateChanged(recyclerView: RecyclerView, newState: Int) {
                // Mnajeo el cambio de estado del scroll
                super.onScrollStateChanged(recyclerView, newState)
                state[0] = newState
            }

            override fun onScrolled(recyclerView: RecyclerView, dx: Int, dy: Int) {
                // Manejo el desplazamiento del RecyclerView
                super.onScrolled(recyclerView, dx, dy)
                if (dy > 0 && (state[0] == 0 || state[0] == 2)) {
                    hideToolbar()
                } else if (dy < -10) {
                    showToolbar()
                }
            }
        })
    }

    private fun hideToolbar() {
        val activity = requireActivity()
        activity.findViewById<View>(R.id.toolbar).visibility = View.GONE
        activity.findViewById<View>(R.id.bottomNavView).visibility = View.GONE
//        calendar2.topbarVisible = false
    }

    private fun showToolbar() {
        val activity = requireActivity()
        activity.findViewById<View>(R.id.toolbar).visibility = View.VISIBLE
        activity.findViewById<View>(R.id.bottomNavView).visibility = View.VISIBLE
//        calendar2.topbarVisible = true
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun initEventList() {
        eventAdapter = EventAdapter(
            onItemSelected = { event -> /* Lógica para cuando se selecciona un elemento */ },
            onDeleteIconClicked = { event -> showDeleteDialog(event) } // Mostrar el diálogo cuando se hace clic en el ícono de eliminación
        )
    }
    @RequiresApi(Build.VERSION_CODES.O)
    private fun showDeleteDialog(event: EventModel) {
//        AlertDialog.Builder(requireContext()).apply {
//            setTitle("Delete Event")
//            setMessage("Are you sure you want to delete this event?")
//            setPositiveButton("Yes") { dialog, _ ->
////                calendarViewModel.deleteEvent(event)
//                Toast.makeText(requireContext(), "Event deleted: ${event.title}", Toast.LENGTH_SHORT).show()
//                dialog.dismiss()
//            }
//            setNegativeButton("No") { dialog, _ ->
//                dialog.dismiss()
//            }
//        }.create().show()
        val dialog = Dialog(requireActivity())
        dialog.setContentView(R.layout.dialog_delete_event_general)
        dialog.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))

        val deleteEventButton: Button = dialog.findViewById(R.id.deleteEventButton)

        deleteEventButton.setOnClickListener() {
                calendarViewModel.deleteEvent(event.id, requireActivity())
//                Toast.makeText(requireContext(), "Event deleted: ${event.title}", Toast.LENGTH_SHORT).show()
                updateEventsList()
            calendarViewModel.getEvents()
            initEventList()
            initUiStateEvent()
            showEvents()
            dialog.hide()
        }
        dialog.show()
    }
    private fun initUiStateEvent() {
        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                calendarViewModel.events.collect {
                    eventAdapter.updateList(it)
                }
            }
        }
    }
    private fun updateEventsList() {
        eventAdapter.notifyDataSetChanged()
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun initListeners() {

        println("dentrro listenerrsss")
        println("dentrro listenerrsss")
        println("dentrro listenerrsss")
        println("dentrro listenerrsss")
        println("dentrro listenerrsss")
        println("dentrro listenerrsss")
        calendar2.setOnDateChangedListener { widget, date, selected ->
            val dateText = "${date.year}-${date.month + 1}-${date.day}"
//            Toast.makeText(requireContext(), "Fecha seleccionada: $dateText", Toast.LENGTH_SHORT).show()
            println("SELECCIONADO NORMAL: " + date)
            println("SELECCIONADO formateada: " + dateText)
            updateLesionsListByCategories(date)
        }

        addEventssButton.setOnClickListener {
            val dialog = Dialog(requireActivity())
            dialog.setContentView(R.layout.dialog_add_general_event)
            dialog.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))


            val etStartDateGeneralEvent = dialog.findViewById<EditText>(R.id.etStartDateGeneralEvent)
            etStartDateGeneralEvent.setOnClickListener {
                showPickerDialog(etStartDateGeneralEvent)
            }
            val etFinishDateGeneralEvent = dialog.findViewById<EditText>(R.id.etFinishDateGeneralEvent)
            etFinishDateGeneralEvent.setOnClickListener {
                showPickerDialog(etFinishDateGeneralEvent)
            }

            val addTeamButtonDialogGeneralEvent: Button = dialog.findViewById(R.id.addTeamButtonDialogGeneralEvent)
            addTeamButtonDialogGeneralEvent.setOnClickListener() {

                if(validarForm(dialog)) {
                    checkCategorySelectedToAddItem(dialog)
                    dialog.hide()
                } else {
                    fieldListeners(dialog)
                }
            }
            dialog.show()
        }
    }

    private fun showPickerDialog(dateClicked: EditText) {
        val datePicker =
            DatePickerFragment { day, month, year -> onDateSelected(dateClicked, day, month, year) }
        datePicker.show(requireFragmentManager(), "datePicker")
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
        timePicker.show(requireFragmentManager(), "time")
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


    private fun checkCategorySelectedToAddItem(dialog: Dialog) {
        val etGeneralEventTitle = dialog.findViewById<EditText>(R.id.etGeneralEventTitle)

        val etStartDateGeneralEvent = dialog.findViewById<EditText>(R.id.etStartDateGeneralEvent)
        val etFinishDateGeneralEvent = dialog.findViewById<EditText>(R.id.etFinishDateGeneralEvent)

        calendarViewModel.addEvent(
            etGeneralEventTitle.text.toString(),
            returnDateConverter(etStartDateGeneralEvent.text.toString()),
            returnDateConverter(etFinishDateGeneralEvent.text.toString()),
            requireActivity()
        )
        updateEventsList()
    }

    private fun validarForm(dialog: Dialog): Boolean {
        var esValido = true

        if (TextUtils.isEmpty(dialog.findViewById<EditText>(R.id.etGeneralEventTitle).text.toString())) {
            dialog.findViewById<EditText>(R.id.etGeneralEventTitle).error = ContextCompat.getString(dialog.findViewById<EditText>(R.id.etTitlePLay).context, R.string.required)
            esValido = false

        } else {
            dialog.findViewById<EditText>(R.id.etGeneralEventTitle).error = null
        }

        if (TextUtils.isEmpty(dialog.findViewById<EditText>(R.id.etStartDateGeneralEvent).text.toString())) {
            dialog.findViewById<EditText>(R.id.etStartDateGeneralEvent).error = ContextCompat.getString(dialog.findViewById<EditText>(R.id.etStartDate).context, R.string.required)
            esValido = false

        } else {
            dialog.findViewById<EditText>(R.id.etStartDateGeneralEvent).error = null
        }

        if (TextUtils.isEmpty(dialog.findViewById<EditText>(R.id.etFinishDateGeneralEvent).text.toString())) {
            dialog.findViewById<EditText>(R.id.etFinishDateGeneralEvent).error = ContextCompat.getString(dialog.findViewById<EditText>(R.id.etFinishDate).context, R.string.required)
            esValido = false

        } else {
            dialog.findViewById<EditText>(R.id.etFinishDateGeneralEvent).error = null
        }

        return esValido
    }

    private fun fieldListeners(dialog: Dialog) {
        dialog.findViewById<EditText>(R.id.etGeneralEventTitle).addTextChangedListener(object :
            TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                validarForm(dialog)
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })
        dialog.findViewById<EditText>(R.id.etStartDateGeneralEvent).addTextChangedListener(object :
            TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                validarForm(dialog)
            }
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })
        dialog.findViewById<EditText>(R.id.etFinishDateGeneralEvent).addTextChangedListener(object :
            TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                validarForm(dialog)
            }
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun updateLesionsListByCategories(selectedDate: CalendarDay ) {
        val newEvents = eventList.filter { event ->
            selectedDate.equals(parseDate(event.startDate)) }
        eventAdapter.eventList = newEvents

        rvEvents.apply {
            rvEvents.layoutManager = GridLayoutManager(context, 1)
            rvEvents.adapter = eventAdapter
        }

        eventAdapter.notifyDataSetChanged()
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun showEvents() {
//        calendarView = binding.calendarView
        calendar2.setWeekDayFormatter(CustomWeekDayFormatter(Color.MAGENTA))
        calendar2.addDecorator(AllDaysTextColorDecorator(Color.WHITE))
        calendar2.addDecorator(OutOfMonthDecorator(Color.GRAY))

        println("dentro de los listenerssssssss: " + eventList.size)
        println("dentro de los listenerssssssss: " + eventList.size)
        println("dentro de los listenerssssssss: " + eventList.size)

//        val dates = listOf(
//            CalendarDay.from(2024, 5, 10),
//            CalendarDay.from(2024, 5, 15),
//            CalendarDay.from(2024, 5, 20)
//        )
//
//        val dates2 = listOf(
//            CalendarDay.from(2024, 4, 10),
//            CalendarDay.from(2024, 4, 15),
//            CalendarDay.from(2024, 4, 20)
//        )
//
//        calendar2.addDecorator(ContextCompat.getDrawable(
//            calendar2.context,
//            R.drawable.gradient_background_club_category_player_selected
//        )?.let {
//            EventDecorator(
//                it, dates)
//        })
//        calendar2.addDecorator(ContextCompat.getDrawable(
//            calendar2.context,
//            R.drawable.gradient_background_stretching_category_stretching9
//        )?.let {
//            EventDecorator(
//                it, dates2)
//        })


        val dateToDrawableMap = mutableMapOf<CalendarDay, Drawable>()
        eventList.forEach { event ->
            val eventStartDate = parseDate(event.startDate)

            println("evento FECHA: " + eventStartDate)
            println("evento FECHA: " + event.startDate)
            println("------------------------")
            println("------------------------")

            val drawable = when (event.eventType) {
                "Game" -> ContextCompat.getDrawable(calendar2.context, R.drawable.gradient_background_calendar_event_game)
                "Training" -> ContextCompat.getDrawable(calendar2.context, R.drawable.gradient_background_calendar_event_training)
                else -> ContextCompat.getDrawable(calendar2.context, R.drawable.gradient_background_calendar_event_general)
            }
            drawable?.let {
                dateToDrawableMap[eventStartDate] = it
            }
        }
        dateToDrawableMap.forEach { (date, drawable) ->
            calendar2.addDecorator(EventDecorator(drawable, listOf(date)))
        }


//
//        eventList.forEach { event ->
//            // Hacer algo con el evento, por ejemplo, imprimir su información
//            println("Evento: ${event.id}, ${event.startDate}, ${event.startDate}, ${event.finishDate}, ${event.eventType}")
//        }
//
//
//        calendarView.setOnDateChangeListener { _, year, month, dayOfMonth ->
//            val selectedDateInMillis = getDateInMillis(year, month, dayOfMonth)
//
//
////            Toast.makeText(context, "Evento agregador", Toast.LENGTH_LONG).show()
//            calendarView.setDate(selectedDateInMillis)
//            calendarView.setBackgroundColor(ContextCompat.getColor(calendarView.context, R.color.cardSeason1))
//        }
    }
    @RequiresApi(Build.VERSION_CODES.O)
    private fun parseDate(dateString: String): CalendarDay {
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSZ")
        val localDateTime = LocalDateTime.parse(dateString, formatter)
        return CalendarDay.from(localDateTime.year, localDateTime.monthValue, localDateTime.dayOfMonth)
    }

//    private fun getDateInMillis(year: Int, month: Int, dayOfMonth: Int): Long {
//        val calendar = Calendar.getInstance()
//        calendar.set(year, month, dayOfMonth)
//        return calendar.timeInMillis
//    }


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentCalendarBinding.inflate(layoutInflater, container, false)
        return binding.root
    }



}

class AllDaysTextColorDecorator(private val color: Int) : DayViewDecorator {
    override fun shouldDecorate(day: CalendarDay): Boolean {
        return true
    }

    override fun decorate(view: DayViewFacade) {
        view.addSpan(ForegroundColorSpan(color))
    }
}

class CustomWeekDayFormatter(private val color: Int) : WeekDayFormatter {
    private val weekdays = DateFormatSymbols().shortWeekdays

    override fun format(dayOfWeek: Int): CharSequence {
        val weekday = weekdays[dayOfWeek]
        val spannable = SpannableString(weekday)
        spannable.setSpan(ForegroundColorSpan(color), 0, weekday.length, 0)
        return spannable
    }
}

class OutOfMonthDecorator(private val color: Int) : DayViewDecorator {
    override fun shouldDecorate(day: CalendarDay): Boolean {
        val today = Calendar.getInstance()
        val month = today.get(Calendar.MONTH)
        val year = today.get(Calendar.YEAR)
        return day.month != month || day.year != year
    }

    override fun decorate(view: DayViewFacade) {
        view.addSpan(ForegroundColorSpan(color))
    }
}

class EventDecorator(private val backgroundColor: Drawable, dates: Collection<CalendarDay>) : DayViewDecorator {

    private val dates: HashSet<CalendarDay> = HashSet(dates)

    override fun shouldDecorate(day: CalendarDay): Boolean {
        return dates.contains(day)
    }

    override fun decorate(view: DayViewFacade) {
        view.setBackgroundDrawable(backgroundColor)
    }
}