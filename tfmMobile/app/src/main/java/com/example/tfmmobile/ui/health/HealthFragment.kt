package com.example.tfmmobile.ui.health

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
import com.example.tfmmobile.databinding.FragmentHealthBinding
import com.example.tfmmobile.domain.model.ExerciseModel
import com.example.tfmmobile.domain.model.GameModel
import com.example.tfmmobile.domain.model.LesionModel
import com.example.tfmmobile.domain.model.StretchingModel
import com.example.tfmmobile.domain.model.TeamModel
import com.example.tfmmobile.domain.model.TrainingModel
import com.example.tfmmobile.ui.club.adapter.PlayerCategory
import com.example.tfmmobile.ui.club.adapter.categories.PlayerCategoriesAdapter
import com.example.tfmmobile.ui.events.EventsCategory
import com.example.tfmmobile.ui.events.EventsFragmentDirections
import com.example.tfmmobile.ui.events.adapter.GameAdapter
import com.example.tfmmobile.ui.health.adapter.ExerciseAdapter
import com.example.tfmmobile.ui.health.adapter.ExerciseCategory
import com.example.tfmmobile.ui.health.adapter.LesionAdapter
import com.example.tfmmobile.ui.health.adapter.LesionCategory
import com.example.tfmmobile.ui.health.adapter.StretchingAdapter
import com.example.tfmmobile.ui.health.adapter.StretchingCategory
import com.example.tfmmobile.ui.health.adapter.categories.CategoriesAdapter
import com.example.tfmmobile.ui.health.adapter.categories.ExerciseCategoriesAdapter
import com.example.tfmmobile.ui.health.adapter.categories.LesionCategoriesAdapter
import com.example.tfmmobile.ui.health.adapter.categories.StretchingCategoriesAdapter
import com.google.android.material.floatingactionbutton.FloatingActionButton
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch

@AndroidEntryPoint
class HealthFragment : Fragment() {

    private var _binding: FragmentHealthBinding? = null
    private val binding get() = _binding!!

    private val healthViewModel by viewModels<HealthViewModel>()

    private lateinit var lesionAdapter: LesionAdapter
    private lateinit var exerciseAdapter: ExerciseAdapter
    private lateinit var stretchingAdapter: StretchingAdapter

    lateinit var lesionList: List<LesionModel>
    lateinit var exerciseList: List<ExerciseModel>
    lateinit var stretchingList: List<StretchingModel>

    private lateinit var rvCategories: RecyclerView
    private lateinit var rvTeams: RecyclerView
    private lateinit var rvLesionCategories: RecyclerView


    private lateinit var categoriesAdapter: CategoriesAdapter
    private lateinit var lesionCategoriesAdapter: LesionCategoriesAdapter
    private lateinit var exerciseCategoriesAdapter: ExerciseCategoriesAdapter
    private lateinit var stretchingCategoriesAdapter: StretchingCategoriesAdapter

    private val categories = listOf(
        HealthCategory.Lesion,
        HealthCategory.Exercises,
        HealthCategory.Stretchings
    )

    private val lesionCategories = listOf(
        LesionCategory.Muscle,
        LesionCategory.Tendon,
        LesionCategory.Joint,
        LesionCategory.Spine,
        LesionCategory.Psychological
    )

    val lesionTypeMapEsToEn = mapOf(
        "Muscular" to "Muscle",
        "Tendinosa" to "Tendon",
        "Articular" to "Joint",
        "Columna Vertebral" to "Spine",
        "Psicológica" to "Psychological"
    )

    private val exerciseCategories = listOf(
        ExerciseCategory.Tactic,
        ExerciseCategory.Technique,
        ExerciseCategory.Physical,
        ExerciseCategory.Globalized,
        ExerciseCategory.Specific,
        ExerciseCategory.Psychological,
        ExerciseCategory.Strategy,
        ExerciseCategory.PreMatch
    )

    val exerciseTypeMapEsToEn = mapOf(
        "Táctico" to "Tactic",
        "Técnico" to "Technique",
        "Físico" to "Physical",
        "Globalizado" to "Globalized",
        "Específico" to "Specific",
        "Psicológico" to "Psychological",
        "Estrategia" to "Strategy",
        "PrePartido" to "PreMatch"
    )

    private val stretchingCategories = listOf(
        StretchingCategory.Hamstrings,
        StretchingCategory.Buttocks,
        StretchingCategory.Calf,
        StretchingCategory.Adductors,
        StretchingCategory.Shoulder,
        StretchingCategory.Quadriceps,
        StretchingCategory.Back,
        StretchingCategory.Pectoral,
        StretchingCategory.Crotch,
        StretchingCategory.Triceps
    )

    val stretchingTypeMapEsToEn = mapOf(
        "Isquiotibiales" to "Hamstrings",
        "Glúteos" to "Buttocks",
        "Gemelos" to "Calf",
        "Adductores" to "Adductors",
        "Hombro" to "Shoulder",
        "Cuádriceps" to "Quadriceps",
        "Espalda" to "Back",
        "Pectoral" to "Pectoral",
        "Ingle" to "Crotch",
        "TrÍceps" to "Triceps"
    )

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        println("ARRIBA DE TOODOOOODOOOOO")
        println("ARRIBA DE TOODOOOODOOOOO")
        println("ARRIBA DE TOODOOOODOOOOO")
        println("ARRIBA DE TOODOOOODOOOOO")
        println("ARRIBA DE TOODOOOODOOOOO")
        println("ARRIBA DE TOODOOOODOOOOO")
        println("ARRIBA DE TOODOOOODOOOOO")
        rvLesionCategories = binding.rvLesionCategories

        lesionList = healthViewModel.getLesions()
        exerciseList = healthViewModel.getExercises()
        stretchingList = healthViewModel.getStretchings()
        initUi()
//        initListeners()
        configSwipe()
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
                    is HealthCategory.Lesion -> {
                        initLesionList()
                        initUiStateLesion()
                    }
                    is HealthCategory.Exercises -> {
                        initExerciseList()
                        initUiStateExercise()
                    }
                    is HealthCategory.Stretchings -> {
                        initStretchingList()
                        initUiStateStretching()
                    }
                }
            }
        }
//        initUiStatePlayer()
//        initUiState()
//        initUiStateSeason()
        hideOrShowToolbar()
    }

    private fun initComponent() {
        rvCategories = binding.rvCategories
        rvTeams = binding.rvTeams
    }

    private fun initCategories() {
        println("en initCategories en posicion: ANTES" )
        println("en initCategories en posicion: ANTES" )
        println("en initCategories en posicion: ANTES" )
        println("en initCategories en posicion: ANTES" )
        println("en initCategories en posicion: ANTES" )
        println("en initCategories en posicion: ANTES" )
        println("en initCategories en posicion: ANTES" )
        println("en initCategories en posicion: ANTES" )




        categoriesAdapter = CategoriesAdapter(categories) { position ->
            println("en initCategories en posicion: " + position)
            println("en initCategories en posicion: " + position)
            println("en initCategories en posicion: " + position)
            println("en initCategories en posicion: " + position)
            println("en initCategories en posicion: " + position)
            updateCategories(position)
        }
        rvCategories.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        rvCategories.adapter = categoriesAdapter
        val selectedPosition = categoriesAdapter.getSelectedPosition()
        updateCategories(selectedPosition)
    }

    private fun updateCategories(position: Int) {
        for (i in categories.indices) {
            categories[i].isSelected = (i == position)
            categoriesAdapter.notifyItemChanged(i)
        }
        println("en updateCategories~!!!!!!!")
        println("en updateCategories~!!!!!!!")
        when (categories[position]) {
            HealthCategory.Lesion -> {
                println("en updateCategories~!!!!!!! LESION")
                lesionList = healthViewModel.getLesions()
                initLesionList()
                updateLesionList()
                initUiStateLesion()

                initLesionCategories()
            }

            HealthCategory.Exercises -> {
                println("en updateCategories~!!!!!!! EXERCISES")
                exerciseList = healthViewModel.getExercises()
                initExerciseList()
                updateExercisesList()
                initUiStateExercise()

                initExerciseCategories()
            }

            HealthCategory.Stretchings -> {
                println("en updateCategories~!!!!!!! STRETCHINGS")
                stretchingList = healthViewModel.getStretchings()
                initStretchingList()
                updateStretchingsList()
                initUiStateStretching()

                initStretchingCategories()
            }
        }
    }

    private fun initLesionCategories() {
        lesionCategoriesAdapter = LesionCategoriesAdapter(lesionCategories) { position ->
            updateLesionCategories(position)
        }
        rvLesionCategories.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        rvLesionCategories.adapter = lesionCategoriesAdapter
    }

    private fun updateLesionCategories(position: Int) {
        lesionCategories[position].isSelected = !lesionCategories[position].isSelected
        lesionCategoriesAdapter.notifyItemChanged(position)
        updateLesionsListByCategories()
    }

    private fun updateLesionsListByCategories() {
        val selectedLesionCategory: List<LesionCategory> = lesionCategories.filter { it.isSelected }
        val newLesions = lesionList.filter { lesion ->
            selectedLesionCategory.any { it.toString().contains(getLesionTypeEnToEs(lesion.lesionType)) }
        }
        lesionAdapter.lesionList = newLesions
        lesionAdapter.notifyDataSetChanged()
    }

    private fun getLesionTypeEnToEs(typeSelected: String): String {
        val typeSelectedSpanish = lesionTypeMapEsToEn[typeSelected]
        return typeSelectedSpanish ?: typeSelected
    }

    private fun initExerciseCategories() {
        exerciseCategoriesAdapter = ExerciseCategoriesAdapter(exerciseCategories) { position ->
            updateExerciseCategories(position)
        }
        rvLesionCategories.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        rvLesionCategories.adapter = exerciseCategoriesAdapter
    }

    private fun updateExerciseCategories(position: Int) {
        exerciseCategories[position].isSelected = !exerciseCategories[position].isSelected
        exerciseCategoriesAdapter.notifyItemChanged(position)
        updateExercisesListByCategories()
    }

    private fun updateExercisesListByCategories() {
        val selectedExerciseCategory: List<ExerciseCategory> = exerciseCategories.filter { it.isSelected }
        val newExercises = exerciseList.filter { exercise ->
            selectedExerciseCategory.any { it.toString().contains(getExerciseTypeEnToEs(exercise.exerciseType)) }
        }
        exerciseAdapter.exercisesList = newExercises
        exerciseAdapter.notifyDataSetChanged()
    }

    private fun getExerciseTypeEnToEs(typeSelected: String): String {
        val typeSelectedSpanish = exerciseTypeMapEsToEn[typeSelected]
        return typeSelectedSpanish ?: typeSelected
    }

    private fun initStretchingCategories() {
        stretchingCategoriesAdapter = StretchingCategoriesAdapter(stretchingCategories) { position ->
            updateStretchingCategories(position)
        }
        rvLesionCategories.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        rvLesionCategories.adapter = stretchingCategoriesAdapter
    }

    private fun updateStretchingCategories(position: Int) {
        stretchingCategories[position].isSelected = !stretchingCategories[position].isSelected
        stretchingCategoriesAdapter.notifyItemChanged(position)
        updateStretchingsListByCategories()
    }

    private fun updateStretchingsListByCategories() {
        val selectedStretchingCategory: List<StretchingCategory> = stretchingCategories.filter { it.isSelected }
        val newStretchings = stretchingList.filter { stretching ->
            selectedStretchingCategory.any { it.toString().contains(getStretchingTypeEnToEs(stretching.stretchingType)) }
        }
        stretchingAdapter.stretchingsList = newStretchings
        stretchingAdapter.notifyDataSetChanged()
    }

    private fun getStretchingTypeEnToEs(typeSelected: String): String {
        val typeSelectedSpanish = stretchingTypeMapEsToEn[typeSelected]
        return typeSelectedSpanish ?: typeSelected
    }

    private fun updateLesionList() {
        lesionAdapter.notifyDataSetChanged()
    }

    private fun updateExercisesList() {
        exerciseAdapter.notifyDataSetChanged()
    }

    private fun updateStretchingsList() {
        stretchingAdapter.notifyDataSetChanged()
    }

    private fun initLesionList() {
//        No le paso la lista porque el adaptar ya tiene la lista inicializada
        lesionAdapter = LesionAdapter(onItemSelected = {
//            Toast.makeText(context, it.teamName, Toast.LENGTH_LONG).show()

//            findNavController().navigate(
//                EventsFragmentDirections.actionEventsFragmentToGameDetailActivity2(
//                    it.id,
//                    it.gameDate,
//                    it.rival,
//                    it.description
//                )
//            )
        })

        rvTeams.apply {
            rvTeams.layoutManager = GridLayoutManager(context, 1)
            rvTeams.adapter = lesionAdapter
        }
    }

    private fun initExerciseList() {
//        No le paso la lista porque el adaptar ya tiene la lista inicializada
        exerciseAdapter = ExerciseAdapter(onItemSelected = {
//            Toast.makeText(context, it.teamName, Toast.LENGTH_LONG).show()

//            findNavController().navigate(
//                EventsFragmentDirections.actionEventsFragmentToGameDetailActivity2(
//                    it.id,
//                    it.gameDate,
//                    it.rival,
//                    it.description
//                )
//            )
        })

        rvTeams.apply {
            rvTeams.layoutManager = GridLayoutManager(context, 1)
            rvTeams.adapter = exerciseAdapter
        }
    }

    private fun initStretchingList() {
//        No le paso la lista porque el adaptar ya tiene la lista inicializada
        stretchingAdapter = StretchingAdapter(onItemSelected = {
//            Toast.makeText(context, it.teamName, Toast.LENGTH_LONG).show()

//            findNavController().navigate(
//                EventsFragmentDirections.actionEventsFragmentToGameDetailActivity2(
//                    it.id,
//                    it.gameDate,
//                    it.rival,
//                    it.description
//                )
//            )
        })

        rvTeams.apply {
            rvTeams.layoutManager = GridLayoutManager(context, 1)
            rvTeams.adapter = stretchingAdapter
        }
    }

    private fun initUiStateLesion() {
        //Uso esta corrutina porque se combina con el ciclo de vida de la activity o fragment en este caso
        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                healthViewModel.lesions.collect {
//                    CAMBIOS EN TEAMS list
                    lesionAdapter.updateList(it)

//                    Log.i("Mostrando la lista de Teams. En el fragment de Club: ", it.get(1).teamName)
                }
            }
        }
    }
    private fun initUiStateExercise() {
        //Uso esta corrutina porque se combina con el ciclo de vida de la activity o fragment en este caso
        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                healthViewModel.exercises.collect {
//                    CAMBIOS EN TEAMS list
                    exerciseAdapter.updateList(it)

//                    Log.i("Mostrando la lista de Teams. En el fragment de Club: ", it.get(1).teamName)
                }
            }
        }
    }
    private fun initUiStateStretching() {
        //Uso esta corrutina porque se combina con el ciclo de vida de la activity o fragment en este caso
        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                healthViewModel.stretchings.collect {
//                    CAMBIOS EN TEAMS list
                    stretchingAdapter.updateList(it)

//                    Log.i("Mostrando la lista de Teams. En el fragment de Club: ", it.get(1).teamName)
                }
            }
        }
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
    }

    private fun showToolbar() {
        val activity = requireActivity()
        activity.findViewById<View>(R.id.toolbar).visibility = View.VISIBLE
        activity.findViewById<View>(R.id.bottomNavView).visibility = View.VISIBLE
    }

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
//                teamsList = clubViewModel.getTeams()
                initLesionList()
                initExerciseList()
                initStretchingList()
                initUiStateLesion()
                initUiStateExercise()
                initUiStateStretching()
//                initUi()
                lesionList = healthViewModel.getLesions()
                exerciseList = healthViewModel.getExercises()
                stretchingList = healthViewModel.getStretchings()
//                seasonsList = clubViewModel.getSeasons()
//                playersList = clubViewModel.getPlayers()
            }, 1000)
        }
    }


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentHealthBinding.inflate(layoutInflater, container, false)
        return binding.root
    }

    override fun onResume() {
        super.onResume()
        lesionList = healthViewModel.getLesions()
        exerciseList = healthViewModel.getExercises()
        stretchingList = healthViewModel.getStretchings()
    }


}