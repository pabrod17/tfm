package com.example.tfmmobile.ui.calendar

import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.graphics.drawable.Drawable
import android.os.Build
import android.os.Bundle
import android.text.SpannableString
import android.text.style.ForegroundColorSpan
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.CalendarView
import androidx.annotation.RequiresApi
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.GridLayoutManager
import com.example.tfmmobile.R
import com.example.tfmmobile.databinding.FragmentCalendarBinding
import com.example.tfmmobile.domain.model.EventModel
import com.example.tfmmobile.ui.calendar.adapter.EventAdapter
import com.example.tfmmobile.ui.events.EventsFragmentDirections
import com.example.tfmmobile.ui.events.adapter.GameAdapter
import com.prolificinteractive.materialcalendarview.CalendarDay
import com.prolificinteractive.materialcalendarview.DayViewDecorator
import com.prolificinteractive.materialcalendarview.DayViewFacade
import com.prolificinteractive.materialcalendarview.MaterialCalendarView
import com.prolificinteractive.materialcalendarview.format.WeekDayFormatter
import com.prolificinteractive.materialcalendarview.spans.DotSpan
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch
import java.text.DateFormatSymbols
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.Calendar

@AndroidEntryPoint
class CalendarFragment : Fragment() {

    private var _binding: FragmentCalendarBinding? = null
    private val binding get() = _binding!!

    private val calendarViewModel by viewModels<CalendarViewModel>()

    private lateinit var eventAdapter: EventAdapter
    private lateinit var calendarView: CalendarView

    private lateinit var calendar2: MaterialCalendarView


    lateinit var eventList: List<EventModel>

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        eventList = calendarViewModel.getEvents()
        initEventList()
        updateTrainingsList()
        initUiStateTraining()
        initListeners()
    }

    private fun initEventList() {
//        No le paso la lista porque el adaptar ya tiene la lista inicializada
        eventAdapter = EventAdapter(onItemSelected = {
//            Toast.makeText(context, it.teamName, Toast.LENGTH_LONG).show()


        })

    }

    private fun initUiStateTraining() {
        //Uso esta corrutina porque se combina con el ciclo de vida de la activity o fragment en este caso
        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                calendarViewModel.events.collect {
//                    CAMBIOS EN TEAMS list
                    eventAdapter.updateList(it)

//                    Log.i("Mostrando la lista de Teams. En el fragment de Club: ", it.get(1).teamName)
                }
            }
        }
    }
    private fun updateTrainingsList() {
        eventAdapter.notifyDataSetChanged()
    }
    @RequiresApi(Build.VERSION_CODES.O)
    private fun initListeners() {
//        calendarView = binding.calendarView
        calendar2 = binding.calendar2

        calendar2.setWeekDayFormatter(CustomWeekDayFormatter(Color.BLUE))
        calendar2.addDecorator(AllDaysTextColorDecorator(Color.WHITE))
        calendar2.addDecorator(OutOfMonthDecorator(Color.GRAY))



        val dates = listOf(
            CalendarDay.from(2024, 5, 10),
            CalendarDay.from(2024, 5, 15),
            CalendarDay.from(2024, 5, 20)
        )

        val dates2 = listOf(
            CalendarDay.from(2024, 4, 10),
            CalendarDay.from(2024, 4, 15),
            CalendarDay.from(2024, 4, 20)
        )

        calendar2.addDecorator(ContextCompat.getDrawable(
            calendar2.context,
            R.drawable.gradient_background_club_category_player_selected
        )?.let {
            EventDecorator(
                it, dates)
        })
        calendar2.addDecorator(ContextCompat.getDrawable(
            calendar2.context,
            R.drawable.gradient_background_stretching_category_stretching9
        )?.let {
            EventDecorator(
                it, dates2)
        })
        eventList.forEach { event ->
            // Hacer algo con el evento, por ejemplo, imprimir su información
            println("Evento: ${event.id}, ${event.startDate}, ${event.startDate}, ${event.finishDate}, ${event.eventType}")
        }

        val dateToDrawableMap = mutableMapOf<CalendarDay, Drawable>()

        eventList.forEach { event ->
            val eventStartDate = parseDate(event.startDate)
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
            println("SACANDOOOOOO: " + date)
            println("SACANDOOOOOO: " + date)
            println("SACANDOOOOOO: " + date)
            println("SACANDOOOOOO: " + date)
            println("SACANDOOOOOO: " + date)
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

    private fun getDateInMillis(year: Int, month: Int, dayOfMonth: Int): Long {
        val calendar = Calendar.getInstance()
        calendar.set(year, month, dayOfMonth)
        return calendar.timeInMillis
    }


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