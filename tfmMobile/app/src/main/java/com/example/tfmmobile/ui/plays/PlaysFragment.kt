package com.example.tfmmobile.ui.plays

import android.app.Dialog
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.text.Editable
import android.text.TextUtils
import android.text.TextWatcher
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import android.widget.Button
import android.widget.EditText
import android.widget.RadioButton
import android.widget.RadioGroup
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
import com.example.tfmmobile.databinding.FragmentPlaysBinding
import com.example.tfmmobile.domain.model.PlayModel
import com.example.tfmmobile.domain.model.TeamModel
import com.example.tfmmobile.ui.club.ClubCategory
import com.example.tfmmobile.ui.club.ClubViewModel
import com.example.tfmmobile.ui.events.EventsCategory
import com.example.tfmmobile.ui.plays.adapter.PlayAdapter
import com.example.tfmmobile.ui.plays.adapter.PlayCategory
import com.example.tfmmobile.ui.plays.adapter.categories.CategoriesAdapter
import com.example.tfmmobile.ui.plays.adapter.categories.PlayCategoriesAdapter
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.google.android.material.textfield.TextInputLayout
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch

@AndroidEntryPoint
class PlaysFragment : Fragment() {

    private var _binding: FragmentPlaysBinding? = null
    private val binding get() = _binding!!

    private val playsViewModel by viewModels<PlaysViewModel>()
    private val clubViewModel by viewModels<ClubViewModel>()

    private lateinit var playAdapter: PlayAdapter

    lateinit var playList: List<PlayModel>
    lateinit var teamsList: List<TeamModel>

    private lateinit var rvCategories: RecyclerView
    private lateinit var rvTeams: RecyclerView
    private lateinit var rvPlaysCategories: RecyclerView


    private lateinit var categoriesAdapter: CategoriesAdapter
    private lateinit var playCategoriesAdapter: PlayCategoriesAdapter

    private val categories = listOf(
        PlaysCategory.Plays,
    )
    private val playCategories = listOf(
        PlayCategory.Defense,
        PlayCategory.Attack
    )
    val playTypeMap = mapOf(
        "Defense" to "Defensa",
        "Attack" to "Ataque"
    )
    val playTypeMapEsToEn = mapOf(
        "Defensa" to "Defense",
        "Ataque" to "Attack"
    )


    private lateinit var addPlaysButton: FloatingActionButton

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        rvPlaysCategories = binding.rvPlaysCategories
        lifecycleScope.launchWhenStarted {
            clubViewModel.team.collect { events ->
                if(events.isEmpty()) {
                    teamsList = clubViewModel.getTeams()
                } else {
                    teamsList = events
                }
            }
        }
//        playList = playsViewModel.getPlays()
        initComponent()
        initUi()
        initListeners()
        configSwipe()
    }

    private fun initListeners() {
        addPlaysButton.setOnClickListener() {


            val dialog = Dialog(requireActivity())
            dialog.setContentView(R.layout.dialog_add_plays)
            dialog.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))
            checkCategorySelected(dialog)
            initTypes(dialog)
            initTeamsOptions(dialog)

            val addPlaysButtonDialog: Button = dialog.findViewById(R.id.addPlaysButtonDialog)

            addPlaysButtonDialog.setOnClickListener() {

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



    private fun updatePlaysList() {
        playAdapter.notifyDataSetChanged()
    }

    private fun initTeamsOptions(dialog: Dialog) {
        teamsList = clubViewModel.getTeams()
        val teamsNames: List<String> = teamsList.map { it.teamName }
        val autoCompleteTeam: AutoCompleteTextView = dialog.findViewById(R.id.autoCompleteTeamPlays)
        val adapter = ArrayAdapter(requireActivity(), R.layout.position_item, teamsNames)
        autoCompleteTeam.setAdapter(adapter)
    }

    private fun initTypes(dialog: Dialog) {
        val types = listOf(
            getString(R.string.playsDefense),
            getString(R.string.playsAttack)
        )
        val autoCompletePosition: AutoCompleteTextView =
            dialog.findViewById(R.id.autoCompleteType)
        val adapter = ArrayAdapter(requireActivity(), R.layout.position_item, types)
        autoCompletePosition.setAdapter(adapter)

    }

    private fun getTeamSelected(teamSelectd: AutoCompleteTextView): Long {
        val teamIdsAndNames: List<Pair<String, Long>> = teamsList.map { it.teamName to it.id }
        return teamIdsAndNames.firstOrNull { it.first == teamSelectd.text.toString() }?.second ?: 0

    }

    private fun getPlayType(typeSelected: AutoCompleteTextView): String {
        val typeNormal = typeSelected.text.toString()
        val typeSelectedSpanish = playTypeMap[typeNormal]
        return typeSelectedSpanish ?: typeNormal
    }

    fun showEditTextInputsToAddPlay(dialog: Dialog) {
        val typeLayout: TextInputLayout = dialog.findViewById(R.id.typeLayout)

        val etTitlePLay = dialog.findViewById<EditText>(R.id.etTitlePLay)
        val etGesture = dialog.findViewById<EditText>(R.id.etGesture)

        val etPosition1 = dialog.findViewById<EditText>(R.id.etPosition1)
        val etPosition2 = dialog.findViewById<EditText>(R.id.etPosition2)
        val etPosition3 = dialog.findViewById<EditText>(R.id.etPosition3)
        val etPosition4 = dialog.findViewById<EditText>(R.id.etPosition4)
        val etPosition5 = dialog.findViewById<EditText>(R.id.etPosition5)

        val etDescription = dialog.findViewById<EditText>(R.id.etDescription)
        val teamsLayout: TextInputLayout = dialog.findViewById(R.id.teamsOptionLayoutPlays)

        typeLayout.visibility = View.VISIBLE

        etTitlePLay.visibility = View.VISIBLE
        etGesture.visibility = View.VISIBLE

        etPosition1.visibility = View.VISIBLE
        etPosition2.visibility = View.VISIBLE
        etPosition3.visibility = View.VISIBLE
        etPosition4.visibility = View.VISIBLE
        etPosition5.visibility = View.VISIBLE

        etDescription.visibility = View.VISIBLE
        teamsLayout.visibility = View.VISIBLE
    }

    private fun checkCategorySelected(dialog: Dialog) {
        for (category in categories) {
            if (category.isSelected) {
                when (category) {
                    is PlaysCategory.Plays -> {
                        val rbPlay = dialog.findViewById<RadioButton>(R.id.rbPlay)
                        rbPlay.isChecked = true
//                        rbPlay.visibility = View.VISIBLE
                        showEditTextInputsToAddPlay(dialog)
                    }
                }
            }
        }
    }

    private fun checkCategorySelectedToAddItem(dialog: Dialog) {
                        val etTitlePLay = dialog.findViewById<EditText>(R.id.etTitlePLay)

                        val typeSelected =
                            dialog.findViewById<AutoCompleteTextView>(R.id.autoCompleteType)

                        val etGesture = dialog.findViewById<EditText>(R.id.etGesture)

                        val etPosition1 = dialog.findViewById<EditText>(R.id.etPosition1)
                        val etPosition2 = dialog.findViewById<EditText>(R.id.etPosition2)
                        val etPosition3 = dialog.findViewById<EditText>(R.id.etPosition3)
                        val etPosition4 = dialog.findViewById<EditText>(R.id.etPosition4)
                        val etPosition5 = dialog.findViewById<EditText>(R.id.etPosition5)

                        val etDescription = dialog.findViewById<EditText>(R.id.etDescription)
                        val teamSelected =
                            dialog.findViewById<AutoCompleteTextView>(R.id.autoCompleteTeamPlays)

                        playsViewModel.addPlay(
                            getTeamSelected(teamSelected),
                            etTitlePLay.text.toString(),
                            getPlayType(typeSelected),
                            etGesture.text.toString(),
                            etPosition1.text.toString(),
                            etPosition2.text.toString(),
                            etPosition3.text.toString(),
                            etPosition4.text.toString(),
                            etPosition5.text.toString(),
                            etDescription.text.toString(),
                            requireActivity()
                        )
                        updatePlaysList()
    }

    private fun fieldListeners(dialog: Dialog) {
        dialog.findViewById<EditText>(R.id.etTitlePLay).addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                validarForm(dialog)
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })
        dialog.findViewById<AutoCompleteTextView>(R.id.autoCompleteType).addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                validarForm(dialog)
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })
        dialog.findViewById<AutoCompleteTextView>(R.id.autoCompleteTeamPlays).addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                validarForm(dialog)
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })

    }

    private fun validarForm(dialog: Dialog): Boolean {
        var esValido = true

        if (TextUtils.isEmpty(dialog.findViewById<EditText>(R.id.etTitlePLay).text.toString())) {
            dialog.findViewById<EditText>(R.id.etTitlePLay).error = ContextCompat.getString(dialog.findViewById<EditText>(R.id.etTitlePLay).context, R.string.required)
            esValido = false

        } else {
            dialog.findViewById<EditText>(R.id.etTitlePLay).error = null
        }

        if (TextUtils.isEmpty(dialog.findViewById<AutoCompleteTextView>(R.id.autoCompleteType).text.toString())) {
            dialog.findViewById<AutoCompleteTextView>(R.id.autoCompleteType).error = ContextCompat.getString(dialog.findViewById<AutoCompleteTextView>(R.id.autoCompleteType).context, R.string.required)
            esValido = false

        } else {
            dialog.findViewById<AutoCompleteTextView>(R.id.autoCompleteType).error = null
        }

        if (TextUtils.isEmpty(dialog.findViewById<AutoCompleteTextView>(R.id.autoCompleteTeamPlays).text.toString())) {
            dialog.findViewById<AutoCompleteTextView>(R.id.autoCompleteTeamPlays).error = ContextCompat.getString(dialog.findViewById<AutoCompleteTextView>(R.id.autoCompleteTeamPlays).context, R.string.required)
            esValido = false

        } else {
            dialog.findViewById<AutoCompleteTextView>(R.id.autoCompleteTeamPlays).error = null
        }

        return esValido
    }

    private fun initUi() {
        initCategories()
        for (category in categories) {
            if (category.isSelected) {
                when (category) {
                    is PlaysCategory.Plays -> {
                        initPlayList()
                        initUiStatePlay()
                    }
                }
            }
        }
        hideOrShowToolbar()
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
        activity.findViewById<View>(R.id.rvCategories).visibility = View.GONE
        activity.findViewById<View>(R.id.addPlaysButton).visibility = View.GONE

    }

    private fun showToolbar() {
        val activity = requireActivity()
        activity.findViewById<View>(R.id.toolbar).visibility = View.VISIBLE
        activity.findViewById<View>(R.id.bottomNavView).visibility = View.VISIBLE
        activity.findViewById<View>(R.id.rvCategories).visibility = View.VISIBLE
        activity.findViewById<View>(R.id.addPlaysButton).visibility = View.VISIBLE
    }

    private fun configSwipe() {
        binding.swipe.setColorSchemeColors(
            ContextCompat.getColor(
                requireContext(),
                R.color.cardPlay1
            ), ContextCompat.getColor(
                requireContext(),
                R.color.cardPlay2
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
                playList = playsViewModel.getPlays()
                initPlayList()
                initUi()
            }, 1000)
        }
    }

    private fun initComponent() {
        rvCategories = binding.rvCategories
        rvTeams = binding.rvTeams
        addPlaysButton = binding.addPlaysButton
    }

    private fun initCategories() {

        categoriesAdapter =
            CategoriesAdapter(categories) { position ->
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
        when (categories[position]) {
            PlaysCategory.Plays -> {
                lifecycleScope.launchWhenStarted {
                    playsViewModel.plays.collect { events ->
                        if(events.isEmpty()) {
                            playList = playsViewModel.getPlays()

                        } else {
                            playList = events
                        }
                    }
                }

                initPlayList()
                updatePlayList()
                initUiStatePlay()

                initPlayCategories()
            }
        }
    }

    private fun initPlayCategories() {
        playCategoriesAdapter = PlayCategoriesAdapter(playCategories) { position ->
            updatePlayCategories(position)
        }
        rvPlaysCategories.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        rvPlaysCategories.adapter = playCategoriesAdapter
    }

    private fun updatePlayCategories(position: Int) {
        playCategories[position].isSelected = !playCategories[position].isSelected
        playCategoriesAdapter.notifyItemChanged(position)
        updatePlaysListByCategories()
    }

    private fun updatePlaysListByCategories() {
        val selectedPlayCategory: List<PlayCategory> = playCategories.filter { it.isSelected }
        val newPlays = playList.filter { play ->
            selectedPlayCategory.any { it.toString().contains(getPlayTypeEnToEs(play.playType)) }
        }
        playAdapter.playList = newPlays
        playAdapter.notifyDataSetChanged()
    }

    private fun getPlayTypeEnToEs(typeSelected: String): String {
        val typeSelectedSpanish = playTypeMapEsToEn[typeSelected]
        return typeSelectedSpanish ?: typeSelected
    }

    private fun updatePlayList() {
        playAdapter.notifyDataSetChanged()
    }



    private fun initPlayList() {
//        No le paso la lista porque el adaptar ya tiene la lista inicializada
        playAdapter = PlayAdapter(onItemSelected = {
//            Toast.makeText(context, it.teamName, Toast.LENGTH_LONG).show()

            findNavController().navigate(
                PlaysFragmentDirections.actionPlaysFragmentToPlayDetailActivity(
                    it.id,
                    it.title,
                    it.playType,
                    it.gesture,
                    it.pointGuardText,
                    it.shootingGuardText,
                    it.smallForwardText,
                    it.powerForwardText,
                    it.centerText,
                    it.description
                )
            )
        })

        rvTeams.apply {
            rvTeams.layoutManager = GridLayoutManager(context, 1)
            rvTeams.adapter = playAdapter
        }
    }

    private fun initUiStatePlay() {
        //Uso esta corrutina porque se combina con el ciclo de vida de la activity o fragment en este caso
        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                playsViewModel.plays.collect {
//                    CAMBIOS EN TEAMS list
                    playAdapter.updateList(it)

//                    Log.i("Mostrando la lista de Teams. En el fragment de Club: ", it.get(1).teamName)
                }
            }
        }
    }







    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentPlaysBinding.inflate(layoutInflater, container, false)
        return binding.root
    }

    override fun onResume() {
        super.onResume()
        playList = playsViewModel.getPlays()
    }


}