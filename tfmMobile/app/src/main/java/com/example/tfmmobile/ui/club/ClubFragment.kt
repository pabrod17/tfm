package com.example.tfmmobile.ui.club

import android.app.Dialog
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import android.widget.Button
import android.widget.EditText
import android.widget.RadioButton
import android.widget.RadioGroup
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
import com.example.tfmmobile.databinding.FragmentClubBinding
import com.example.tfmmobile.domain.model.TeamModel
import com.example.tfmmobile.ui.club.adapter.TeamAdapter
import com.example.tfmmobile.ui.club.adapter.categories.CategoriesAdapter
import com.example.tfmmobile.ui.home.DatePickerFragment
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.google.android.material.textfield.TextInputLayout
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.Locale
import java.util.TimeZone

@AndroidEntryPoint
class ClubFragment : Fragment() {

    private val clubViewModel by viewModels<ClubViewModel>()

    private lateinit var teamAdapter: TeamAdapter
    private var _binding: FragmentClubBinding? = null
    lateinit var teamsList: List<TeamModel>
    private val binding get() = _binding!!

    private lateinit var rvCategories: RecyclerView
    private lateinit var rvTeams: RecyclerView

    private lateinit var categoriesAdapter: CategoriesAdapter

    private val categories = listOf(
        ClubCategory.Seasons,
        ClubCategory.Teams,
        ClubCategory.Players
    )

    val positionMap = mapOf(
        "PointGuard" to "Base",
        "ShootingGuard" to "Escolta",
        "SmallForward" to "Alero",
        "PowerForward" to "Ala-Pívot",
        "Center" to "Pívot"
    )

    private lateinit var addTeamButton : FloatingActionButton

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        teamsList = clubViewModel.getTeams()
        initUi()
        initListeners()
    }

    private fun initListeners(){
        addTeamButton.setOnClickListener() {


        val dialog = Dialog(requireActivity())
                dialog.setContentView(R.layout.dialog_add_team)
            dialog.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))

            val etStartDate = dialog.findViewById<EditText>(R.id.etStartDate)
            etStartDate.setOnClickListener{
                showPickerDialog(etStartDate)
            }
            val etFinishDate = dialog.findViewById<EditText>(R.id.etFinishDate)
            etFinishDate.setOnClickListener{
                showPickerDialog(etFinishDate)
            }

            initPositions(dialog)
            initTeamsOptions(dialog)
            val rgOption: RadioGroup = dialog.findViewById(R.id.rgOption)
            rgOption.setOnCheckedChangeListener { _, checkedId ->
                when (checkedId) {
                    R.id.rbSeason -> {
                        val rbTeam: RadioButton = dialog.findViewById(R.id.rbTeam)
                        val rbPlayer: RadioButton = dialog.findViewById(R.id.rbPlayer)
                        rbTeam.visibility = View.GONE
                        rbPlayer.visibility = View.GONE
                        showEditTextInputsToAddSeason(dialog)

                    }
                    R.id.rbTeam -> {
                        val rbSeason: RadioButton = dialog.findViewById(R.id.rbSeason)
                        val rbPlayer: RadioButton = dialog.findViewById(R.id.rbPlayer)
                        rbSeason.visibility = View.GONE
                        rbPlayer.visibility = View.GONE
                        showEditTextInputsToAddTeam(dialog)
                    }
                    R.id.rbPlayer -> {
                        val rbTeam: RadioButton = dialog.findViewById(R.id.rbTeam)
                        val rbSeason: RadioButton = dialog.findViewById(R.id.rbSeason)
                        rbTeam.visibility = View.GONE
                        rbSeason.visibility = View.GONE
                        showEditTextInputsToAddPlayer(dialog)
                    }
                }
            }

        val addTeamButtonDialog: Button = dialog.findViewById(R.id.addTeamButtonDialog)

        addTeamButtonDialog.setOnClickListener() {
            val selectedId = rgOption.checkedRadioButtonId
            val selectedRadioButton = rgOption.findViewById<RadioButton>(selectedId)
            println("PULSO BOTON ADDDDDDDDDD DIALOGGGG")
            println("PULSO BOTON ADDDDDDDDDD DIALOGGGG")
            println("PULSO BOTON ADDDDDDDDDD DIALOGGGG")
            println("PULSO BOTON ADDDDDDDDDD DIALOGGGG: " + selectedRadioButton)


            when(selectedRadioButton.text) {
                //Add new item: team, season or player

                getString(R.string.season) -> {
                    val etStartDate = dialog.findViewById<EditText>(R.id.etStartDate)
                    val etFinishDate = dialog.findViewById<EditText>(R.id.etFinishDate)
                    val etName = dialog.findViewById<EditText>(R.id.etName)
                    val etDescription = dialog.findViewById<EditText>(R.id.etDescription)
                    clubViewModel.addSeason(
                        returnDateConverter(etStartDate.text.toString()),
                        returnDateConverter(etFinishDate.text.toString()),
                        etName.text.toString(), etDescription.text.toString(), requireActivity())

                    println("seasonnnnnnn")
                    println("seasonnnnnnn")
                    println("seasonnnnnnn")


                }
                getString(R.string.team) -> {
                    val etName = dialog.findViewById<EditText>(R.id.etName)
                    val etArena = dialog.findViewById<EditText>(R.id.etArena)
                    val etOwner = dialog.findViewById<EditText>(R.id.etOwner)
                    val etDescription = dialog.findViewById<EditText>(R.id.etDescription)
                    clubViewModel.addTeam(etName.text.toString(), etArena.text.toString(), etOwner.text.toString(), etDescription.text.toString(), requireActivity())
                    println("teammmm")
                    println("teammmm")
                    println("teammmm")
                    println("teammmm")
                    println("teammmm")
                    println(etName)
                    println(etArena)
                    println(etOwner)
                    println(etDescription)

                }
                else -> {
                    val teamSelected = dialog.findViewById<AutoCompleteTextView>(R.id.autoCompleteTeam)
                    val positionSelected = dialog.findViewById<AutoCompleteTextView>(R.id.autoCompletePosition)
                    val etPlayerName = dialog.findViewById<EditText>(R.id.etPlayerName)
                    val etPrimaryLastName = dialog.findViewById<EditText>(R.id.etPrimaryLastName)
                    val etSecondLastName = dialog.findViewById<EditText>(R.id.etSecondLastName)
                    val etTrends = dialog.findViewById<EditText>(R.id.etTrends)
                    val etPhoneNumber = dialog.findViewById<EditText>(R.id.etPhoneNumber)
                    val etEmail = dialog.findViewById<EditText>(R.id.etEmail)
                    val etDni = dialog.findViewById<EditText>(R.id.etDni)
                    println("player")
                    println("player")
                    println("player")
                    println("player")
                    println("player")
                    clubViewModel.addPlayer(
                        getTeamSelected(teamSelected),
                        etPlayerName.text.toString(),
                        etPrimaryLastName.text.toString(),
                        etSecondLastName.text.toString(),
                        getPlayerPosition(positionSelected),
                        etTrends.text.toString(),
                        etPhoneNumber.text.toString(),
                        etEmail.text.toString(),
                        etDni.text.toString(),
                        requireActivity())


                }
            }

            updateTeamsList()
            dialog.hide()

        }
            dialog.show()
        }
    }

    private fun showPickerDialog(dateClicked: EditText) {
        val datePicker = DatePickerFragment{day, month, year -> onDateSelected(dateClicked, day, month, year)}
        datePicker.show(requireFragmentManager(), "datePicker")
    }

    fun onDateSelected(dateClicked:EditText , day:Int, month:Int, year:Int) {
        val userFormattedDate = String.format("%04d-%02d-%02d", year, month, day)

        val formattedDate = String.format("%04d-%02d-%02dT22:00:00.000Z", year, month, day)
        val dateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault())
        dateFormat.timeZone = TimeZone.getTimeZone("UTC")
        val datestring = dateFormat.format(dateFormat.parse(formattedDate))

        dateClicked.setText(userFormattedDate)
    }

    fun returnDateConverter(dateToFormat:String): String {
        val parts = dateToFormat.split("-")

        val year = parts[0].toInt()
        val month = parts[1].toInt()
        val day = parts[2].toInt()

        val formattedDate = String.format("%04d-%02d-%02dT22:00:00.000Z", year, month, day)
        val dateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault())
        dateFormat.timeZone = TimeZone.getTimeZone("UTC")
        return dateFormat.format(dateFormat.parse(formattedDate))
    }

    private fun getPlayerPosition(positionSelected: AutoCompleteTextView):String {
        val positionNormal = positionSelected.text.toString()
        val positionSelectedSpanish = positionMap[positionNormal]
        return positionSelectedSpanish ?: positionNormal
    }
    private fun getTeamSelected(teamSelectd: AutoCompleteTextView): Long {
        val teamIdsAndNames: List<Pair<String, Long>> = teamsList.map { it.teamName to it.id }
        return teamIdsAndNames.firstOrNull { it.first == teamSelectd.text.toString() }?.second ?: 0

    }



    fun showEditTextInputsToAddSeason(dialog: Dialog) {
        val etName = dialog.findViewById<EditText>(R.id.etName)
        val etDescription = dialog.findViewById<EditText>(R.id.etDescription)
        val etStartDate = dialog.findViewById<EditText>(R.id.etStartDate)
        val etFinishDate = dialog.findViewById<EditText>(R.id.etFinishDate)

        etName.visibility = View.VISIBLE
        etDescription.visibility = View.VISIBLE
        etStartDate.visibility = View.VISIBLE
        etFinishDate.visibility = View.VISIBLE
    }

    fun showEditTextInputsToAddTeam(dialog: Dialog) {
        val etName = dialog.findViewById<EditText>(R.id.etName)
        val etArena = dialog.findViewById<EditText>(R.id.etArena)
        val etOwner = dialog.findViewById<EditText>(R.id.etOwner)
        val etDescription = dialog.findViewById<EditText>(R.id.etDescription)

        etName.visibility = View.VISIBLE
        etArena.visibility = View.VISIBLE
        etOwner.visibility = View.VISIBLE
        etDescription.visibility = View.VISIBLE
    }

    fun showEditTextInputsToAddPlayer(dialog: Dialog) {
        val teamsLayout: TextInputLayout = dialog.findViewById(R.id.teamsOptionLayout)
        val positionsLayout: TextInputLayout = dialog.findViewById(R.id.positionLayout)
        val etPlayerName = dialog.findViewById<EditText>(R.id.etPlayerName)
        val etPrimaryLastName = dialog.findViewById<EditText>(R.id.etPrimaryLastName)
        val etSecondLastName = dialog.findViewById<EditText>(R.id.etSecondLastName)
        val etTrends = dialog.findViewById<EditText>(R.id.etTrends)
        val etPhoneNumber = dialog.findViewById<EditText>(R.id.etPhoneNumber)
        val etEmail = dialog.findViewById<EditText>(R.id.etEmail)
        val etDni = dialog.findViewById<EditText>(R.id.etDni)

        teamsLayout.visibility = View.VISIBLE
        positionsLayout.visibility = View.VISIBLE
        etPlayerName.visibility = View.VISIBLE
        etPrimaryLastName.visibility = View.VISIBLE
        etSecondLastName.visibility = View.VISIBLE
        etTrends.visibility = View.VISIBLE
        etPhoneNumber.visibility = View.VISIBLE
        etEmail.visibility = View.VISIBLE
        etDni.visibility = View.VISIBLE





    }




    private fun initUi(){
        initComponent()
        initCategories()
        initTeamList()
        initUiState()
    }

    private fun initComponent(){
        rvCategories = binding.rvCategories
        rvTeams = binding.rvTeams
        addTeamButton = binding.addTeamButton
    }

    private fun initCategories(){
        categoriesAdapter= CategoriesAdapter(categories)
        rvCategories.layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        rvCategories.adapter = categoriesAdapter
    }

    private fun initPositions(dialog: Dialog){
        val positions = listOf(
            getString(R.string.position1),
            getString(R.string.position2),
            getString(R.string.position3),
            getString(R.string.position4),
            getString(R.string.position5)
        )
        val autoCompletePosition: AutoCompleteTextView = dialog.findViewById(R.id.autoCompletePosition)
        val adapter = ArrayAdapter(requireActivity(), R.layout.position_item, positions)
        autoCompletePosition.setAdapter(adapter)

    }

    private fun initTeamsOptions(dialog: Dialog) {
        teamsList = clubViewModel.getTeams()
        val teamsNames: List<String> = teamsList.map { it.teamName }
        val autoCompleteTeam: AutoCompleteTextView = dialog.findViewById(R.id.autoCompleteTeam)
        val adapter = ArrayAdapter(requireActivity(), R.layout.position_item, teamsNames)
        autoCompleteTeam.setAdapter(adapter)
    }

    private fun initTeamList() {



//        No le paso la lista porque el adaptar ya tiene la lista inicializada
        teamAdapter = TeamAdapter(onItemSelected = {
//            Toast.makeText(context, it.teamName, Toast.LENGTH_LONG).show()

            findNavController().navigate(
//                Siempre va a haber esta clase. La del maingraph
                ClubFragmentDirections.actionClubFragmentToTeamDetailActivity(it.id, it.teamName, it.arenaName, it.ownerName, it.description)
            )
        })

        rvTeams.apply {
            rvTeams.layoutManager = GridLayoutManager(context, 1)
            rvTeams.adapter = teamAdapter
        }
    }

    private fun initUiState() {
        //Uso esta corrutina porque se combina con el ciclo de vida de la activity o fragment en este caso
        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                clubViewModel.team.collect{
//                    CAMBIOS EN TEAMS list
                    teamAdapter.updateList(it)

//                    Log.i("Mostrando la lista de Teams. En el fragment de Club: ", it.get(1).teamName)
                }
            }
        }
    }

    private fun updateTeamsList(){
        teamAdapter.notifyDataSetChanged()
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentClubBinding.inflate(layoutInflater, container, false)
        return binding.root
    }


}