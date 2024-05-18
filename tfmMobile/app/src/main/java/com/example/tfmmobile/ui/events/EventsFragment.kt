package com.example.tfmmobile.ui.events

import android.app.Dialog
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import android.widget.Button
import android.widget.EditText
import android.widget.RadioButton
import android.widget.RadioGroup
import androidx.annotation.RequiresApi
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
import com.example.tfmmobile.databinding.FragmentEventsBinding
import com.example.tfmmobile.domain.model.GameModel
import com.example.tfmmobile.domain.model.SeasonModel
import com.example.tfmmobile.domain.model.TeamModel
import com.example.tfmmobile.domain.model.TrainingModel
import com.example.tfmmobile.ui.club.ClubCategory
import com.example.tfmmobile.ui.club.ClubFragmentDirections
import com.example.tfmmobile.ui.club.ClubViewModel
import com.example.tfmmobile.ui.club.adapter.TeamAdapter
import com.example.tfmmobile.ui.events.adapter.GameAdapter
import com.example.tfmmobile.ui.events.adapter.TrainingAdapter
import com.example.tfmmobile.ui.events.adapter.categories.CategoriesAdapter
import com.example.tfmmobile.ui.home.DatePickerFragment
import com.example.tfmmobile.ui.home.TimePickerFragment
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.google.android.material.textfield.TextInputLayout
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.time.LocalDate
import java.time.LocalTime
import java.time.ZoneId
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter
import java.util.Locale
import java.util.TimeZone

@AndroidEntryPoint
class EventsFragment : Fragment() {

    private var _binding: FragmentEventsBinding? = null
    private val binding get() = _binding!!

    private val eventsViewModel by viewModels<EventsViewModel>()
    private val clubViewModel by viewModels<ClubViewModel>()

    private lateinit var gameAdapter: GameAdapter
    private lateinit var trainingAdapter: TrainingAdapter

    lateinit var gameList: List<GameModel>
    lateinit var trainingList: List<TrainingModel>
    lateinit var teamsList: List<TeamModel>
    lateinit var seasonsList: List<SeasonModel>

    private lateinit var rvCategories: RecyclerView
    private lateinit var rvTeams: RecyclerView

    private lateinit var categoriesAdapter: CategoriesAdapter

    private val categories = listOf(
        EventsCategory.Games,
        EventsCategory.Trainings
    )
    private lateinit var addTeamButton: FloatingActionButton



    @RequiresApi(Build.VERSION_CODES.O)
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        gameList = eventsViewModel.getGames()
        trainingList = eventsViewModel.getTrainings()
        teamsList = clubViewModel.getTeams()
        seasonsList = clubViewModel.getSeasons()
        initUi()
        initListeners()
        configSwipe()
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun initListeners() {
        addTeamButton.setOnClickListener() {


            val dialog = Dialog(requireActivity())
            dialog.setContentView(R.layout.dialog_add_events)
            dialog.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))
            checkCategorySelected(dialog)
            val etDate = dialog.findViewById<EditText>(R.id.etDate)
            etDate.setOnClickListener {
                showPickerDialog(etDate)
            }
            val etDurationMinutes = dialog.findViewById<EditText>(R.id.etDurationMinutes)
            etDurationMinutes.setOnClickListener {
                showTimePickerDialog2(etDurationMinutes)
            }

            initTeamsOptions(dialog)
            initSeasonsOptions(dialog)
            val rgOption: RadioGroup = dialog.findViewById(R.id.rgOption)
            rgOption.setOnCheckedChangeListener { _, checkedId ->
                when (checkedId) {
                    R.id.rbGame -> {
                        val rbTraining: RadioButton = dialog.findViewById(R.id.rbTraining)
                        rbTraining.visibility = View.GONE
                        showEditTextInputsToAddGame(dialog)

                    }

                    R.id.rbTraining -> {
                        val rbGame: RadioButton = dialog.findViewById(R.id.rbGame)
                        rbGame.visibility = View.GONE
                        showEditTextInputsToAddTraining(dialog)
                    }
                }
            }

            val addTeamButtonDialog: Button = dialog.findViewById(R.id.addTeamButtonDialogEvents)

            addTeamButtonDialog.setOnClickListener() {
                val selectedId = rgOption.checkedRadioButtonId
                val selectedRadioButton = rgOption.findViewById<RadioButton>(selectedId)



                when (selectedRadioButton.text) {
                    //Add new item: team, season or player

                    getString(R.string.game) -> {
                        val teamSelected =
                            dialog.findViewById<AutoCompleteTextView>(R.id.autoCompleteTeam)
                        val seasonSelected =
                            dialog.findViewById<AutoCompleteTextView>(R.id.autoCompleteSeason)
                        val etDate = dialog.findViewById<EditText>(R.id.etDate)
                        val etRival = dialog.findViewById<EditText>(R.id.etRival)
                        val etDescription = dialog.findViewById<EditText>(R.id.etDescription)
                        println("dentro de viewMODEL::: " + teamSelected)
                        println("dentro de viewMODEL::: " + teamSelected)
                        println("dentro de viewMODEL::: " + teamSelected)
                        println("dentro de viewMODEL::: " + teamSelected)
                        println("dentro de viewMODEL::: " + teamSelected)


                        println("dentro de viewMODEL season::: " + seasonSelected)
                        println("dentro de viewMODEL season::: " + seasonSelected)
                        println("dentro de viewMODEL season::: " + seasonSelected)
                        println("dentro de viewMODEL season::: " + seasonSelected)
                        eventsViewModel.addGame(
                            getTeamSelected(teamSelected),
                            getSeasonSelected(seasonSelected),
                            returnDateConverter(etDate.text.toString()),
                            etRival.text.toString(), etDescription.text.toString(), requireActivity()
                        )

                        println("gameeee")
                        println("gameeee")
                        println("gameeee")
                        updateGamesList()


                    }

                    else -> {
                        val teamSelected =
                            dialog.findViewById<AutoCompleteTextView>(R.id.autoCompleteTeam)
                        val seasonSelected =
                            dialog.findViewById<AutoCompleteTextView>(R.id.autoCompleteSeason)
                        val etDate = dialog.findViewById<EditText>(R.id.etDate)
                        val etDurationMinutes = dialog.findViewById<EditText>(R.id.etDurationMinutes)
                        val etDescription = dialog.findViewById<EditText>(R.id.etDescription)
                        val etObjective = dialog.findViewById<EditText>(R.id.etObjective)

                        println("training")
                        println("training")
                        println("training")
                        println("training")
                        println("training")
                        eventsViewModel.addTraining(
                            getTeamSelected(teamSelected),
                            getSeasonSelected(seasonSelected),
                            returnDateConverter(etDate.text.toString()),
                            returnTimeConverter(etDurationMinutes.text.toString()),
                            etDescription.text.toString(),
                            etObjective.text.toString(), requireActivity()
                        )

                        updateTrainingsList()

                    }
                }

                dialog.hide()

            }
            dialog.show()
        }

    }

    private fun getTeamSelected(teamSelectd: AutoCompleteTextView): Long {
        val teamIdsAndNames: List<Pair<String, Long>> = teamsList.map { it.teamName to it.id }
        return teamIdsAndNames.firstOrNull { it.first == teamSelectd.text.toString() }?.second ?: 0

    }

    private fun getSeasonSelected(seasonSelected: AutoCompleteTextView): Long {
        val seasonIdsAndNames: List<Pair<String, Long>> = seasonsList.map { it.seasonName to it.id }
        return seasonIdsAndNames.firstOrNull { it.first == seasonSelected.text.toString() }?.second ?: 0

    }

    fun showEditTextInputsToAddGame(dialog: Dialog) {
        val etDate = dialog.findViewById<EditText>(R.id.etDate)
        val etRival = dialog.findViewById<EditText>(R.id.etRival)
        val etDescription = dialog.findViewById<EditText>(R.id.etDescription)
        val teamsLayout: TextInputLayout = dialog.findViewById(R.id.teamsOptionLayout)
        val seasonsOptionLayout: TextInputLayout = dialog.findViewById(R.id.seasonsOptionLayout)

        etDate.visibility = View.VISIBLE
        etRival.visibility = View.VISIBLE
        etDescription.visibility = View.VISIBLE
        teamsLayout.visibility = View.VISIBLE
        seasonsOptionLayout.visibility = View.VISIBLE
    }

    fun showEditTextInputsToAddTraining(dialog: Dialog) {
        val etDate = dialog.findViewById<EditText>(R.id.etDate)
        val etDurationMinutes = dialog.findViewById<EditText>(R.id.etDurationMinutes)
        val etObjective = dialog.findViewById<EditText>(R.id.etObjective)
        val etDescription = dialog.findViewById<EditText>(R.id.etDescription)
        val teamsLayout: TextInputLayout = dialog.findViewById(R.id.teamsOptionLayout)
        val seasonsOptionLayout: TextInputLayout = dialog.findViewById(R.id.seasonsOptionLayout)


        etDate.visibility = View.VISIBLE
        etDurationMinutes.visibility = View.VISIBLE
        etObjective.visibility = View.VISIBLE
        etDescription.visibility = View.VISIBLE
        teamsLayout.visibility = View.VISIBLE
        seasonsOptionLayout.visibility = View.VISIBLE
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

    private fun showTimePickerDialog2(dateClicked: EditText) {
        val timePicker =
            TimePickerFragment {onTimeSelected2(dateClicked, it) }
        timePicker.show(requireFragmentManager(), "time")
    }

    fun onTimeSelected2(dateClicked: EditText, time: String){
        dateClicked.setText(time)
    }

    @RequiresApi(Build.VERSION_CODES.O)
    fun returnTimeConverter(timeToFormat: String): String {

        val timeParts = timeToFormat.split(":")
        val hourOfDay = timeParts[0].toInt()
        val minute = timeParts[1].toInt()

        val time = LocalTime.of(hourOfDay, minute)
        val timeUpdated = time.minusHours(2)
        // Fecha fija proporcionada
        val date = LocalDate.now()

        // Crear un objeto ZonedDateTime con la fecha y la hora deseada en la zona horaria GMT
        val zonedDateTime = ZonedDateTime.of(date, timeUpdated, ZoneId.of("GMT"))

        // Formatear el ZonedDateTime al formato RFC_1123_DATE_TIME
        val formatter = DateTimeFormatter.RFC_1123_DATE_TIME
        val formattedDateTime = zonedDateTime.format(formatter)
        return formattedDateTime
    }



    private fun initTeamsOptions(dialog: Dialog) {
        teamsList = clubViewModel.getTeams()
        val teamsNames: List<String> = teamsList.map { it.teamName }
        val autoCompleteTeam: AutoCompleteTextView = dialog.findViewById(R.id.autoCompleteTeam)
        val adapter = ArrayAdapter(requireActivity(), R.layout.position_item, teamsNames)
        autoCompleteTeam.setAdapter(adapter)
    }

    private fun initSeasonsOptions(dialog: Dialog) {
        seasonsList = clubViewModel.getSeasons()
        val teamsNames: List<String> = seasonsList.map { it.seasonName }
        val autoCompleteSeason: AutoCompleteTextView = dialog.findViewById(R.id.autoCompleteSeason)
        val adapter = ArrayAdapter(requireActivity(), R.layout.position_item, teamsNames)
        autoCompleteSeason.setAdapter(adapter)
    }


    private fun configSwipe() {
        binding.swipe.setColorSchemeColors(
            ContextCompat.getColor(
                requireContext(),
                R.color.cardGame2
            ), ContextCompat.getColor(
                requireContext(),
                R.color.cardTraining2
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
//                teamsList = clubViewModel.getTeams()
                initGameList()
                initTrainingList()
                initUiStateGame()
                initUi()
                initUiStateTraining()
                gameList = eventsViewModel.getGames()
                trainingList = eventsViewModel.getTrainings()
//                seasonsList = clubViewModel.getSeasons()
//                playersList = clubViewModel.getPlayers()
            }, 1000)
        }
    }

    private fun initUi() {
        initComponent()
//        initPlayerList()
//        initTeamList()
//        initSeasonList()
        initCategories()
        for (category in categories) {
            // Verificar si la categoría está seleccionada
            if (category.isSelected) {
                // Realizar acciones específicas para la categoría seleccionada
                when (category) {
                    is EventsCategory.Games -> {
                        initGameList()
                        initUiStateGame()
                    }

                    is EventsCategory.Trainings -> {
                        initTrainingList()
                        initUiStateTraining()

                    }
                }
            }
        }
//        initUiStatePlayer()
//        initUiState()
//        initUiStateSeason()
        hideOrShowToolbar()
    }

    private fun checkCategorySelected(dialog: Dialog) {
        for (category in categories) {
            // Verificar si la categoría está seleccionada
            if (category.isSelected) {
                // Realizar acciones específicas para la categoría seleccionada
                when (category) {
                    is EventsCategory.Games -> {
                        val rbGame = dialog.findViewById<View>(R.id.rbGame)
                        rbGame.visibility = View.VISIBLE

                        val rbTraining = dialog.findViewById<View>(R.id.rbTraining)
                        rbTraining.visibility = View.GONE

                    }

                    is EventsCategory.Trainings -> {
                        val rbTraining = dialog.findViewById<View>(R.id.rbTraining)
                        rbTraining.visibility = View.VISIBLE

                        val rbGame = dialog.findViewById<View>(R.id.rbGame)
                        rbGame.visibility = View.GONE
                    }
                }
            }
        }
    }

    private fun initComponent() {
        rvCategories = binding.rvCategories
        rvTeams = binding.rvTeams
        addTeamButton = binding.addTeamButton
    }

    private fun initCategories() {
        categoriesAdapter = CategoriesAdapter(categories) { position ->
            updateCategories(position)
        }
        rvCategories.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        rvCategories.adapter = categoriesAdapter
    }

    private fun updateCategories(position: Int) {
        for (i in categories.indices) {
            categories[i].isSelected = (i == position)
            categoriesAdapter.notifyItemChanged(i)
        }
        when (categories[position]) {
            EventsCategory.Games -> {
                gameList = eventsViewModel.getGames()
                initGameList()
                updateGamesList()
                initUiStateGame()
            }

            EventsCategory.Trainings -> {
                trainingList = eventsViewModel.getTrainings()
                initTrainingList()
                updateTrainingsList()
                initUiStateTraining()
            }
        }
    }

    private fun updateGamesList() {
        gameAdapter.notifyDataSetChanged()
    }

    private fun updateTrainingsList() {
        trainingAdapter.notifyDataSetChanged()
    }

    private fun hideOrShowToolbar() {

        //Con esto si arrastro el dedo en la pantalla. No se oculta la toolbar (dragging)
        //Solo se ocultara si me desplazo! (scrolling)
        val state = intArrayOf(0)


        rvTeams.addOnScrollListener(object : RecyclerView.OnScrollListener() {
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
        activity.findViewById<View>(R.id.addTeamButton).visibility = View.GONE
    }

    private fun showToolbar() {
        val activity = requireActivity()
        activity.findViewById<View>(R.id.toolbar).visibility = View.VISIBLE
        activity.findViewById<View>(R.id.bottomNavView).visibility = View.VISIBLE
        activity.findViewById<View>(R.id.addTeamButton).visibility = View.VISIBLE
    }

    private fun initGameList() {
//        No le paso la lista porque el adaptar ya tiene la lista inicializada
        gameAdapter = GameAdapter(onItemSelected = {
//            Toast.makeText(context, it.teamName, Toast.LENGTH_LONG).show()

            findNavController().navigate(
                EventsFragmentDirections.actionEventsFragmentToGameDetailActivity2(
                    it.id,
                    it.gameDate,
                    it.rival,
                    it.description
                )
            )
        })

        rvTeams.apply {
            rvTeams.layoutManager = GridLayoutManager(context, 1)
            rvTeams.adapter = gameAdapter
        }
    }
    private fun initTrainingList() {
//        No le paso la lista porque el adaptar ya tiene la lista inicializada
        trainingAdapter = TrainingAdapter(onItemSelected = {
//            Toast.makeText(context, it.teamName, Toast.LENGTH_LONG).show()

            findNavController().navigate(
//                Siempre va a haber esta clase. La del maingraph
                EventsFragmentDirections.actionEventsFragmentToTrainingDetailActivity(
                    it.id,
                    it.trainingDate,
                    it.durationMinutes,
                    it.description,
                    it.objective
                )
            )
        })

        rvTeams.apply {
            rvTeams.layoutManager = GridLayoutManager(context, 1)
            rvTeams.adapter = trainingAdapter
        }
    }

    private fun initUiStateGame() {
        //Uso esta corrutina porque se combina con el ciclo de vida de la activity o fragment en este caso
        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                eventsViewModel.games.collect {
//                    CAMBIOS EN TEAMS list
                    gameAdapter.updateList(it)

//                    Log.i("Mostrando la lista de Teams. En el fragment de Club: ", it.get(1).teamName)
                }
            }
        }
    }

    private fun initUiStateTraining() {
        //Uso esta corrutina porque se combina con el ciclo de vida de la activity o fragment en este caso
        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                eventsViewModel.trainings.collect {
//                    CAMBIOS EN TEAMS list
                    trainingAdapter.updateList(it)

//                    Log.i("Mostrando la lista de Teams. En el fragment de Club: ", it.get(1).teamName)
                }
            }
        }
    }




    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentEventsBinding.inflate(layoutInflater, container, false)
        return binding.root
    }

    override fun onResume() {
        super.onResume()
        gameList = eventsViewModel.getGames()
        trainingList = eventsViewModel.getTrainings()
    }


}