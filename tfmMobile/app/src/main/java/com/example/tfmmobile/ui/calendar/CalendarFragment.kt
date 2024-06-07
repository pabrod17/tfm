package com.example.tfmmobile.ui.calendar


//The MIT License (MIT)
//
//Copyright (c) [2018] [Sundeepk]
//
//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in all
//copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//SOFTWARE.



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
import android.widget.Button
import android.widget.CalendarView
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.core.app.ActivityCompat.recreate
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.databinding.FragmentCalendarBinding
import com.example.tfmmobile.domain.model.EventModel
import com.example.tfmmobile.ui.calendar.adapter.EventAdapter
import com.example.tfmmobile.ui.events.EventsFragmentDirections
import com.example.tfmmobile.ui.events.adapter.TrainingAdapter
import com.example.tfmmobile.ui.home.DatePickerFragment
import com.example.tfmmobile.ui.home.TimePickerFragment
import com.github.sundeepk.compactcalendarview.CompactCalendarView
import com.github.sundeepk.compactcalendarview.CompactCalendarView.CompactCalendarViewListener
import com.github.sundeepk.compactcalendarview.domain.Event
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.prolificinteractive.materialcalendarview.CalendarDay
import com.prolificinteractive.materialcalendarview.DayViewDecorator
import com.prolificinteractive.materialcalendarview.DayViewFacade
import com.prolificinteractive.materialcalendarview.format.WeekDayFormatter
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch
import java.text.DateFormatSymbols
import java.text.SimpleDateFormat
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.Calendar
import java.util.Date
import java.util.Locale
import java.util.TimeZone


@AndroidEntryPoint
class CalendarFragment : Fragment() {

    private var _binding: FragmentCalendarBinding? = null
    private val binding get() = _binding!!

    private val calendarViewModel by viewModels<CalendarViewModel>()

    private lateinit var eventAdapter: EventAdapter
    private lateinit var calendarView: CalendarView

//    private lateinit var calendar2: MaterialCalendarView
        private lateinit var calendar2: CompactCalendarView


    private lateinit var rvEvents: RecyclerView


    lateinit var eventList: List<EventModel>

    lateinit var monthTitleCalendar : TextView

    private lateinit var addEventssButton: FloatingActionButton

    private val dateFormatForMonth = SimpleDateFormat("MMMM yyyy", Locale.getDefault())


    @RequiresApi(Build.VERSION_CODES.O)
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        println("CREATEDDDDDDDD")
        println("CREATEDDDDDDDD")
        println("CREATEDDDDDDDD")
        println("CREATEDDDDDDDD")
        println("CREATEDDDDDDDD")
        println("CREATEDDDDDDDD")
        println("CREATEDDDDDDDD")
        println("CREATEDDDDDDDD")
        println("CREATEDDDDDDDD")

//        calendarViewModel.clearEvents()
        calendar2 = binding.compactcalendarView

//        calendar2.setEventIndicatorStyle(CompactCalendarView.FILL_LARGE_INDICATOR)
        calendar2.setEventIndicatorStyle(CompactCalendarView.SMALL_INDICATOR)

//        calendar2.removeAllEvents()
        addEventssButton = binding.addEventssButton
        monthTitleCalendar = binding.monthTitleCalendar
        monthTitleCalendar.text = dateFormatForMonth.format(calendar2.firstDayOfCurrentMonth)
        rvEvents = binding.rvEvents
//        val ev1 = Event(Color.GREEN, 1717618140000, EventModel(1,"titulo", "", "", "General"))
//        calendar2.addEvent(ev1);
        calendar2.setUseThreeLetterAbbreviation(true);
//        calendar2.setOnClickListener {
//            Toast.makeText(requireContext(), "Event deleted: ${it.id}", Toast.LENGTH_SHORT).show()
//        }
//        eventList = calendarViewModel.getEvents()
        lifecycleScope.launchWhenStarted {
            calendarViewModel.events.collect { events ->
                if(events.isNotEmpty()) {
                    eventList = events
                    initEventList()
//                    updateEventsList()
                    initUiStateEvent()
                    showEvents(eventList)
                }
            }
        }
        println("2222222 11111111")
//                            initEventList()
//                    initUiStateEvent()
//                    showEvents(eventList)


        initListeners()
        println("2222222")
        hideOrShowToolbar()
        println("2222222 3333333")
        configSwipe()
        println("2222222 444444")
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
                calendar2.removeAllEvents()
                eventList = emptyList()
                calendarViewModel.clearEvents()
                calendarViewModel.getEvents()
                lifecycleScope.launchWhenStarted {
                    calendarViewModel.events.collect { events ->
                        if(events.isNotEmpty()) {
                            eventList = events
                            initEventList()
                            updateEventsList()
//                    initUiStateEvent()
                            showEvents(eventList)
                        }
                    }
                }


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
            onItemSelected = {
                when (it.eventType) {
                    "Game" -> {
                        findNavController().navigate(
//                Siempre va a haber esta clase. La del maingraph
                            CalendarFragmentDirections.actionCalendarFragmentToGameDetailActivity(
                                it.gameId,
                                it.startDate,
                                it.title,
                                ""
                            )
                        )
                    }
                    "Training" -> {
                        findNavController().navigate(
//                Siempre va a haber esta clase. La del maingraph
                            CalendarFragmentDirections.actionCalendarFragmentToTrainingDetailActivity(
                                it.trainingId,
                                it.startDate,
                                "",
                                "",
                                it.title
                            )
                        )

                    }
                    else -> {
                        findNavController().navigate(
//                Siempre va a haber esta clase. La del maingraph
                            CalendarFragmentDirections.actionCalendarFragmentToEventActivity(
                                it.id,
                                it.title,
                                it.startDate,
                                it.finishDate,
                                it.eventType
                            )
                        )

                    }
                }


            }
            ,
//            onDeleteIconClicked = { event -> showDeleteDialog(event) }
            onDeleteIconClicked = { event -> }
        )
        rvEvents.layoutManager = GridLayoutManager(context, 1)
        rvEvents.adapter = eventAdapter

    }
//    @RequiresApi(Build.VERSION_CODES.O)
//    private fun showDeleteDialog(event: EventModel) {
//
//        val dialog = Dialog(requireActivity())
//        dialog.setContentView(R.layout.dialog_delete_event_general)
//        dialog.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))
//
//        val deleteEventButton: Button = dialog.findViewById(R.id.deleteEventButton)
//
//        deleteEventButton.setOnClickListener() {
//                calendarViewModel.deleteEvent(event.id, requireActivity())
////                Toast.makeText(requireContext(), "Event deleted: ${event.title}", Toast.LENGTH_SHORT).show()
//                updateEventsList()
//            calendarViewModel.getEvents()
//            initEventList()
//            initUiStateEvent()
//            showEvents()
//            dialog.hide()
//        }
//        dialog.show()
//    }
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

        calendar2.setListener(object : CompactCalendarViewListener {
            override fun onDayClick(dateClicked: Date) {
                val events: List<Event> = calendar2.getEvents(dateClicked)
//                Toast.makeText(requireContext(), "Day was clicked: $dateClicked with events $events\"", Toast.LENGTH_SHORT).show()
//                updateLesionsListByCategories(dateClicked)
                val newEvents: List<EventModel> = events.map { it.data as EventModel }

                eventAdapter.eventList = newEvents

                rvEvents.apply {
                    rvEvents.layoutManager = GridLayoutManager(context, 1)
                    rvEvents.adapter = eventAdapter
                }
                eventAdapter.notifyDataSetChanged()
            }

            override fun onMonthScroll(firstDayOfNewMonth: Date) {
                monthTitleCalendar.text = dateFormatForMonth.format(firstDayOfNewMonth)
//                Toast.makeText(requireContext(), "Month was scrolled to: $firstDayOfNewMonth", Toast.LENGTH_SHORT).show()
            }
        })

        addEventssButton.setOnClickListener {
            val dialog = Dialog(requireActivity())
            dialog.setContentView(R.layout.dialog_add_general_event)
            dialog.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))


            val etStartDateGeneralEvent = dialog.findViewById<EditText>(R.id.etStartDateGeneralEvent)
            etStartDateGeneralEvent.setOnClickListener {
                showPickerDialog(etStartDateGeneralEvent)
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


    @RequiresApi(Build.VERSION_CODES.O)
    private fun checkCategorySelectedToAddItem(dialog: Dialog) {
        val etGeneralEventTitle = dialog.findViewById<EditText>(R.id.etGeneralEventTitle)

        val etStartDateGeneralEvent = dialog.findViewById<EditText>(R.id.etStartDateGeneralEvent)

        calendarViewModel.addEvent(
            etGeneralEventTitle.text.toString(),
            returnDateConverter(etStartDateGeneralEvent.text.toString()),
            returnDateConverter(etStartDateGeneralEvent.text.toString()),
            requireActivity()
        )
        calendar2.removeAllEvents()
        eventList = emptyList()
        calendarViewModel.clearEvents()
        lifecycleScope.launchWhenStarted {
            calendarViewModel.events.collect { events ->
                if(events.isNotEmpty()) {
                    eventList = events
                    initEventList()
                    updateEventsList()
//                    initUiStateEvent()
                    showEvents(eventList)
                }
            }
        }


//        calendar2.removeAllEvents()
//        calendarViewModel.getEvents()
//        lifecycleScope.launchWhenStarted {
//            calendarViewModel.events.collect { events ->
//                if(events.isNotEmpty()) {
//                    eventList = events
////                    initEventList()
////                    updateEventsList()
////                    initUiStateEvent()
//                    showEvents(eventList)
//                }
//            }
//        }
    }

    private fun validarForm(dialog: Dialog): Boolean {
        var esValido = true

        if (TextUtils.isEmpty(dialog.findViewById<EditText>(R.id.etGeneralEventTitle).text.toString())) {
            dialog.findViewById<EditText>(R.id.etGeneralEventTitle).error = ContextCompat.getString(dialog.findViewById<EditText>(R.id.etGeneralEventTitle).context, R.string.required)
            esValido = false

        } else {
            dialog.findViewById<EditText>(R.id.etGeneralEventTitle).error = null
        }

        if (TextUtils.isEmpty(dialog.findViewById<EditText>(R.id.etStartDateGeneralEvent).text.toString())) {
            dialog.findViewById<EditText>(R.id.etStartDateGeneralEvent).error = ContextCompat.getString(dialog.findViewById<EditText>(R.id.etStartDateGeneralEvent).context, R.string.required)
            esValido = false

        } else {
            dialog.findViewById<EditText>(R.id.etStartDateGeneralEvent).error = null
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
    }


    @RequiresApi(Build.VERSION_CODES.O)
    private fun showEvents(eventList:List<EventModel>) {
        println("dentro de los SHOW EVENTS: " + eventList.size)
        println("dentro de los SHOW EVENTS: " + eventList.size)
        println("dentro de los SHOW EVENTS: " + eventList.size)
        calendar2.removeAllEvents()

        eventList.forEach { event ->
            when (event.eventType) {
                "Game" -> {
//                    ContextCompat.getDrawable(
//                        calendar2.context,
//                        R.drawable.gradient_background_calendar_event_game
//                    )

                    val ev1 = Event(Color.RED, dateFormatForMillis(event.startDate), event)
                    calendar2.addEvent(ev1);
                }
                "Training" -> {
//                    ContextCompat.getDrawable(
//                        calendar2.context,
//                        R.drawable.gradient_background_calendar_event_training
//                    )
                    //                divider.setBackgroundColor(ContextCompat.getColor(divider.context, R.color.cardPlayer2))


                    val ev1 = Event(Color.parseColor("#FF7800"), dateFormatForMillis(event.startDate), event)
                    calendar2.addEvent(ev1);

                }
                else -> {
//                    ContextCompat.getDrawable(
//                        calendar2.context,
//                        R.drawable.gradient_background_calendar_event_general
//                    )
                    val ev1 = Event(Color.GREEN, dateFormatForMillis(event.startDate), event)
                    calendar2.addEvent(ev1);

                }
            }

        }
    }

    fun dateFormatForMillis(dateString: String): Long {
        val dateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ", Locale.getDefault())
        val date = dateFormat.parse(dateString)
        return date?.time ?: 0L
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentCalendarBinding.inflate(layoutInflater, container, false)
        return binding.root
    }

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onResume() {
        super.onResume()
        println("RESUMIENDOOOOO")
        println("RESUMIENDOOOOO")
        println("RESUMIENDOOOOO")
        println("RESUMIENDOOOOO")
        println("RESUMIENDOOOOO")
        println("RESUMIENDOOOOO")
        println("RESUMIENDOOOOO")
        println("RESUMIENDOOOOO")
        calendar2.removeAllEvents()
        eventList = emptyList()
        calendarViewModel.clearEvents()
        calendarViewModel.getEvents()
        lifecycleScope.launchWhenStarted {
            calendarViewModel.events.collect { events ->
                if(events.isNotEmpty()) {
                    eventList = events
                    initEventList()
                    updateEventsList()
//                    initUiStateEvent()
                    showEvents(eventList)
                }
            }
        }
    }

}
