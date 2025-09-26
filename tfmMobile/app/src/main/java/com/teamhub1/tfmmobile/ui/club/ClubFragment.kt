package com.teamhub1.tfmmobile.ui.club

import android.app.Dialog
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.text.Editable
import android.text.TextUtils
import android.text.TextWatcher
import android.util.Patterns
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import android.widget.Button
import android.widget.EditText
import android.widget.RadioButton
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
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.databinding.FragmentClubBinding
import com.teamhub1.tfmmobile.domain.model.PlayerModel
import com.teamhub1.tfmmobile.domain.model.SeasonModel
import com.teamhub1.tfmmobile.domain.model.TeamModel
import com.teamhub1.tfmmobile.ui.club.adapter.PlayerAdapter
import com.teamhub1.tfmmobile.ui.club.adapter.PlayerCategory
import com.teamhub1.tfmmobile.ui.club.adapter.SeasonAdapter
import com.teamhub1.tfmmobile.ui.club.adapter.TeamAdapter
import com.teamhub1.tfmmobile.ui.club.adapter.categories.CategoriesAdapter
import com.teamhub1.tfmmobile.ui.club.adapter.categories.PlayerCategoriesAdapter
import com.teamhub1.tfmmobile.ui.home.DatePickerFragment
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.google.android.material.textfield.TextInputLayout
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.Locale
import java.util.TimeZone
import java.util.regex.Pattern

@AndroidEntryPoint
class ClubFragment : Fragment() {

    private val clubViewModel by viewModels<ClubViewModel>()

    private lateinit var teamAdapter: TeamAdapter
    private lateinit var seasonAdapter: SeasonAdapter
    private lateinit var playerAdapter: PlayerAdapter

    private var _binding: FragmentClubBinding? = null
    lateinit var teamsList: List<TeamModel>
    lateinit var seasonsList: List<SeasonModel>
    lateinit var playersList: List<PlayerModel>

    private val binding get() = _binding!!

    private lateinit var rvCategories: RecyclerView
    private lateinit var rvTeams: RecyclerView
    private lateinit var rvPlayerCategories: RecyclerView


    private lateinit var categoriesAdapter: CategoriesAdapter
    private lateinit var playerCategoriesAdapter: PlayerCategoriesAdapter

    private val categories = listOf(
        ClubCategory.Seasons,
        ClubCategory.Teams,
        ClubCategory.Players
    )

    private val playerCategories = listOf(
        PlayerCategory.Injured,
        PlayerCategory.PointGuard,
        PlayerCategory.ShootingGuard,
        PlayerCategory.SmallForward,
        PlayerCategory.PowerForward,
        PlayerCategory.Center
    )

    val positionMap = mapOf(
        "PointGuard" to "Base",
        "ShootingGuard" to "Escolta",
        "SmallForward" to "Alero",
        "PowerForward" to "AlaPivot",
        "Center" to "Pivot"
    )

    val positionMapEsToEn = mapOf(
        "Base" to "PointGuard",
        "Escolta" to "ShootingGuard",
        "Alero" to "SmallForward",
        "AlaPivot" to "PowerForward",
        "Pivot" to "Center"
    )

    private lateinit var addTeamButton: FloatingActionButton

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        println("CREATEDDDDD")
        println("CREATEDDDDD")
        println("CREATEDDDDD")
        println("CREATEDDDDD")
        println("CREATEDDDDD")
        println("CREATEDDDDD")
        println("CREATEDDDDD")
        println("CREATEDDDDD")
        println("CREATEDDDDD")
        initComponent()

//        teamsList = clubViewModel.getTeams()
//        seasonsList = clubViewModel.getSeasons()
//        playersList = clubViewModel.getPlayers()


        initUi()
        initListeners()
        configSwipe()
    }

    private fun configSwipe() {
        binding.swipe.setColorSchemeColors(
            ContextCompat.getColor(
                requireContext(),
                R.color.cardTeam1
            ), ContextCompat.getColor(
                requireContext(),
                R.color.cardSeason1
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
                initSeasonList()
                initTeamList()
                initPlayerList()
                initUiStateSeason()
                initUi()
                initUiStatePlayer()
//                seasonsList = clubViewModel.getSeasons()
//                playersList = clubViewModel.getPlayers()
            }, 1000)
        }
    }

    private fun initListeners() {
        addTeamButton.setOnClickListener() {


            val dialog = Dialog(requireActivity())
            dialog.setContentView(R.layout.dialog_add_team)
            dialog.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))
            checkCategorySelected(dialog)

            val etStartDate = dialog.findViewById<EditText>(R.id.etStartDate)
            etStartDate.setOnClickListener {
                showPickerDialog(etStartDate)
            }
            val etFinishDate = dialog.findViewById<EditText>(R.id.etFinishDate)
            etFinishDate.setOnClickListener {
                showPickerDialog(etFinishDate)
            }

            initPositions(dialog)
            initTeamsOptions(dialog)

            val addTeamButtonDialog: Button = dialog.findViewById(R.id.addTeamButtonDialog)
            dialog.findViewById<EditText>(R.id.etEmail).addTextChangedListener(object : TextWatcher {
                override fun afterTextChanged(s: Editable?) {
                    validarFormEmail(dialog)
                }

                override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

                override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
            })
            addTeamButtonDialog.setOnClickListener() {
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

    private fun validarFormEmail(dialog: Dialog): Boolean {
        var esValido = true
        if (TextUtils.isEmpty(dialog.findViewById<EditText>(R.id.etEmail).text.toString())) {
            dialog.findViewById<EditText>(R.id.etEmail).error = ContextCompat.getString(dialog.findViewById<EditText>(R.id.etEmail).context, R.string.required)
//            binding.tilEmail.error = ContextCompat.getString(binding.etEmail.context, R.string.required)
            esValido = false
        } else {
            dialog.findViewById<EditText>(R.id.etEmail).error = null

            if(!validateEmail(dialog.findViewById<EditText>(R.id.etEmail).text.toString())) {
                dialog.findViewById<EditText>(R.id.etEmail).error = ContextCompat.getString(dialog.findViewById<EditText>(R.id.etEmail).context, R.string.invalidEmail)
            } else {
                dialog.findViewById<EditText>(R.id.etEmail).error = null
            }
        }
        return esValido
    }

    private fun validarForm(dialog: Dialog): Boolean {
        var esValido = true

        for (category in categories) {
            // Verificar si la categoría está seleccionada
            if (category.isSelected) {
                // Realizar acciones específicas para la categoría seleccionada
                when (category) {
                    is ClubCategory.Seasons -> {
                        if (TextUtils.isEmpty(dialog.findViewById<EditText>(R.id.etStartDate).text.toString())) {
                            dialog.findViewById<EditText>(R.id.etStartDate).error = ContextCompat.getString(dialog.findViewById<EditText>(R.id.etStartDate).context, R.string.required)
                            esValido = false

                        } else {
                            dialog.findViewById<EditText>(R.id.etStartDate).error = null
                        }

                        if (TextUtils.isEmpty(dialog.findViewById<EditText>(R.id.etFinishDate).text.toString())) {
                            dialog.findViewById<EditText>(R.id.etFinishDate).error = ContextCompat.getString(dialog.findViewById<EditText>(R.id.etFinishDate).context, R.string.required)
                            esValido = false

                        } else {
                            dialog.findViewById<EditText>(R.id.etFinishDate).error = null
                        }
                    }

                    ClubCategory.Teams -> {
                        if (TextUtils.isEmpty(dialog.findViewById<EditText>(R.id.etName).text.toString())) {
                            dialog.findViewById<EditText>(R.id.etName).error = ContextCompat.getString(dialog.findViewById<EditText>(R.id.etName).context, R.string.required)
                            esValido = false

                        } else {
                            dialog.findViewById<EditText>(R.id.etName).error = null
                        }
                        if (TextUtils.isEmpty(dialog.findViewById<EditText>(R.id.etArena).text.toString())) {
                            dialog.findViewById<EditText>(R.id.etArena).error = ContextCompat.getString(dialog.findViewById<EditText>(R.id.etArena).context, R.string.required)
                            esValido = false

                        } else {
                            dialog.findViewById<EditText>(R.id.etArena).error = null
                        }
                        if (TextUtils.isEmpty(dialog.findViewById<EditText>(R.id.etOwner).text.toString())) {
                            dialog.findViewById<EditText>(R.id.etOwner).error = ContextCompat.getString(dialog.findViewById<EditText>(R.id.etOwner).context, R.string.required)
                            esValido = false

                        } else {
                            dialog.findViewById<EditText>(R.id.etOwner).error = null
                        }
                    }

                    ClubCategory.Players -> {
                        if (TextUtils.isEmpty(dialog.findViewById<AutoCompleteTextView>(R.id.autoCompleteTeam).text.toString())) {
                            dialog.findViewById<AutoCompleteTextView>(R.id.autoCompleteTeam).error = ContextCompat.getString(dialog.findViewById<AutoCompleteTextView>(R.id.autoCompleteTeam).context, R.string.required)
                            esValido = false

                        } else {
                            dialog.findViewById<AutoCompleteTextView>(R.id.autoCompleteTeam).error = null
                        }
                        if (TextUtils.isEmpty(dialog.findViewById<AutoCompleteTextView>(R.id.autoCompletePosition).text.toString())) {
                            dialog.findViewById<AutoCompleteTextView>(R.id.autoCompletePosition).error = ContextCompat.getString(dialog.findViewById<AutoCompleteTextView>(R.id.autoCompletePosition).context, R.string.required)
                            esValido = false

                        } else {
                            dialog.findViewById<AutoCompleteTextView>(R.id.autoCompletePosition).error = null
                        }

                        if (TextUtils.isEmpty(dialog.findViewById<EditText>(R.id.etPlayerName).text.toString())) {
                            dialog.findViewById<EditText>(R.id.etPlayerName).error = ContextCompat.getString(dialog.findViewById<EditText>(R.id.etPlayerName).context, R.string.required)
                            esValido = false

                        } else {
                            dialog.findViewById<EditText>(R.id.etPlayerName).error = null
                        }
                        if (TextUtils.isEmpty(dialog.findViewById<EditText>(R.id.etPrimaryLastName).text.toString())) {
                            dialog.findViewById<EditText>(R.id.etPrimaryLastName).error = ContextCompat.getString(dialog.findViewById<EditText>(R.id.etPrimaryLastName).context, R.string.required)
                            esValido = false

                        } else {
                            dialog.findViewById<EditText>(R.id.etPrimaryLastName).error = null
                        }
                        if (TextUtils.isEmpty(dialog.findViewById<EditText>(R.id.etSecondLastName).text.toString())) {
                            dialog.findViewById<EditText>(R.id.etSecondLastName).error = ContextCompat.getString(dialog.findViewById<EditText>(R.id.etSecondLastName).context, R.string.required)
                            esValido = false

                        } else {
                            dialog.findViewById<EditText>(R.id.etSecondLastName).error = null
                        }

                        if (TextUtils.isEmpty(dialog.findViewById<EditText>(R.id.etPhoneNumber).text.toString())) {
                            dialog.findViewById<EditText>(R.id.etPhoneNumber).error = ContextCompat.getString(dialog.findViewById<EditText>(R.id.etPhoneNumber).context, R.string.required)
                            esValido = false

                        } else {
                            dialog.findViewById<EditText>(R.id.etPhoneNumber).error = null
                        }
                        if (TextUtils.isEmpty(dialog.findViewById<EditText>(R.id.etEmail).text.toString())) {
                            dialog.findViewById<EditText>(R.id.etEmail).error = ContextCompat.getString(dialog.findViewById<EditText>(R.id.etEmail).context, R.string.required)
                            esValido = false

                        } else {
//                            dialog.findViewById<EditText>(R.id.etEmail).error = null
                            if(!validateEmail(dialog.findViewById<EditText>(R.id.etEmail).text.toString())) {
                                dialog.findViewById<EditText>(R.id.etEmail).error = ContextCompat.getString(dialog.findViewById<EditText>(R.id.etEmail).context, R.string.invalidEmail)
                            } else {
                                dialog.findViewById<EditText>(R.id.etEmail).error = null
                            }

                        }
                        if (TextUtils.isEmpty(dialog.findViewById<EditText>(R.id.etDni).text.toString())) {
                            dialog.findViewById<EditText>(R.id.etDni).error = ContextCompat.getString(dialog.findViewById<EditText>(R.id.etDni).context, R.string.required)
                            esValido = false

                        } else {
                            dialog.findViewById<EditText>(R.id.etDni).error = null
                        }

                    }

                }
            }
        }
        return esValido
    }

    private fun validateEmail(email: String): Boolean {
        val pattern: Pattern = Patterns.EMAIL_ADDRESS
        return pattern.matcher(email).matches()
    }


    private fun fieldListeners(dialog: Dialog) {
        for (category in categories) {
            // Verificar si la categoría está seleccionada
            if (category.isSelected) {
                // Realizar acciones específicas para la categoría seleccionada
                when (category) {
                    ClubCategory.Seasons -> {
                        dialog.findViewById<EditText>(R.id.etStartDate).addTextChangedListener(object :
                            TextWatcher {
                            override fun afterTextChanged(s: Editable?) {
                                validarForm(dialog)
                            }
                            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

                            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
                        })
                        dialog.findViewById<EditText>(R.id.etFinishDate).addTextChangedListener(object :
                            TextWatcher {
                            override fun afterTextChanged(s: Editable?) {
                                validarForm(dialog)
                            }
                            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

                            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
                        })

                    }

                    is ClubCategory.Teams -> {
                        dialog.findViewById<EditText>(R.id.etName).addTextChangedListener(object :
                            TextWatcher {
                            override fun afterTextChanged(s: Editable?) {
                                validarForm(dialog)
                            }
                            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

                            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
                        })
                        dialog.findViewById<EditText>(R.id.etArena).addTextChangedListener(object :
                            TextWatcher {
                            override fun afterTextChanged(s: Editable?) {
                                validarForm(dialog)
                            }
                            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

                            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
                        })
                        dialog.findViewById<EditText>(R.id.etOwner).addTextChangedListener(object :
                            TextWatcher {
                            override fun afterTextChanged(s: Editable?) {
                                validarForm(dialog)
                            }
                            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

                            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
                        })
                    }

                    ClubCategory.Players -> {
                        dialog.findViewById<AutoCompleteTextView>(R.id.autoCompleteTeam).addTextChangedListener(object :
                            TextWatcher {
                            override fun afterTextChanged(s: Editable?) {
                                validarForm(dialog)
                            }
                            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

                            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
                        })
                        dialog.findViewById<AutoCompleteTextView>(R.id.autoCompletePosition).addTextChangedListener(object :
                            TextWatcher {
                            override fun afterTextChanged(s: Editable?) {
                                validarForm(dialog)
                            }
                            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

                            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
                        })

                        dialog.findViewById<EditText>(R.id.etPlayerName).addTextChangedListener(object :
                            TextWatcher {
                            override fun afterTextChanged(s: Editable?) {
                                validarForm(dialog)
                            }
                            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

                            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
                        })
                        dialog.findViewById<EditText>(R.id.etPrimaryLastName).addTextChangedListener(object :
                            TextWatcher {
                            override fun afterTextChanged(s: Editable?) {
                                validarForm(dialog)
                            }
                            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

                            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
                        })
                        dialog.findViewById<EditText>(R.id.etSecondLastName).addTextChangedListener(object :
                            TextWatcher {
                            override fun afterTextChanged(s: Editable?) {
                                validarForm(dialog)
                            }
                            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

                            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
                        })

                        dialog.findViewById<EditText>(R.id.etPhoneNumber).addTextChangedListener(object :
                            TextWatcher {
                            override fun afterTextChanged(s: Editable?) {
                                validarForm(dialog)
                            }
                            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

                            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
                        })
                        dialog.findViewById<EditText>(R.id.etEmail).addTextChangedListener(object :
                            TextWatcher {
                            override fun afterTextChanged(s: Editable?) {
                                validarForm(dialog)
                            }
                            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

                            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
                        })
                        dialog.findViewById<EditText>(R.id.etDni).addTextChangedListener(object :
                            TextWatcher {
                            override fun afterTextChanged(s: Editable?) {
                                validarForm(dialog)
                            }
                            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

                            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
                        })

                    }
                }
            }
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

    private fun getPlayerPosition(positionSelected: AutoCompleteTextView): String {
        val positionNormal = positionSelected.text.toString()
        val positionSelectedSpanish = positionMap[positionNormal]
        return positionSelectedSpanish ?: positionNormal
    }

    private fun getPlayerPositionEnToEs(positionSelected: String): String {
        val positionSelectedSpanish = positionMapEsToEn[positionSelected]
        return positionSelectedSpanish ?: positionSelected
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


    private fun initUi() {
//        initPlayerList()
//        initTeamList()
//        initSeasonList()
        initCategories()
        for (category in categories) {
            // Verificar si la categoría está seleccionada
            if (category.isSelected) {
                // Realizar acciones específicas para la categoría seleccionada
                when (category) {
                    is ClubCategory.Teams -> {
                        initTeamList()
                        initUiState()
                    }

                    is ClubCategory.Seasons -> {
                        initSeasonList()
                        initUiStateSeason()

                    }

                    is ClubCategory.Players -> {
                        initPlayerList()
                        initUiStatePlayer()

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
                    is ClubCategory.Teams -> {
                        val rbTeam = dialog.findViewById<RadioButton>(R.id.rbTeam)
                        rbTeam.visibility = View.VISIBLE
                        rbTeam.isChecked = true
//
//
//                        val rbSeason = dialog.findViewById<View>(R.id.rbSeason)
//                        rbSeason.visibility = View.GONE
//                        val rbPlayer = dialog.findViewById<View>(R.id.rbPlayer)
//                        rbPlayer.visibility = View.GONE
                          showEditTextInputsToAddTeam(dialog)
                    }

                    is ClubCategory.Seasons -> {
                        val rbSeason = dialog.findViewById<RadioButton>(R.id.rbSeason)
                        rbSeason.visibility = View.VISIBLE
                        rbSeason.isChecked = true

//
//                        val rbTeam = dialog.findViewById<View>(R.id.rbTeam)
//                        rbTeam.visibility = View.GONE
//                        val rbPlayer = dialog.findViewById<View>(R.id.rbPlayer)
//                        rbPlayer.visibility = View.GONE
                        showEditTextInputsToAddSeason(dialog)
                    }

                    is ClubCategory.Players -> {
                        val rbPlayer = dialog.findViewById<RadioButton>(R.id.rbPlayer)
                        rbPlayer.visibility = View.VISIBLE
                        rbPlayer.isChecked = true

//
//                        val rbSeason = dialog.findViewById<View>(R.id.rbSeason)
//                        rbSeason.visibility = View.GONE
//                        val rbTeam = dialog.findViewById<View>(R.id.rbTeam)
//                        rbTeam.visibility = View.GONE
                        showEditTextInputsToAddPlayer(dialog)
                    }
                }
            }
        }
    }

    private fun checkCategorySelectedToAddItem(dialog: Dialog) {
        for (category in categories) {
            // Verificar si la categoría está seleccionada
            if (category.isSelected) {
                // Realizar acciones específicas para la categoría seleccionada
                when (category) {
                    is ClubCategory.Teams -> {
                        val etName = dialog.findViewById<EditText>(R.id.etName)
                        val etArena = dialog.findViewById<EditText>(R.id.etArena)
                        val etOwner = dialog.findViewById<EditText>(R.id.etOwner)
                        val etDescription = dialog.findViewById<EditText>(R.id.etDescription)
                        clubViewModel.addTeam(
                            etName.text.toString(),
                            etArena.text.toString(),
                            etOwner.text.toString(),
                            etDescription.text.toString(),
                            requireActivity()
                        )
                        println("teammmm")
                        println("teammmm")
                        println("teammmm")
                        println("teammmm")
                        println("teammmm")
                        println(etName)
                        println(etArena)
                        println(etOwner)
                        println(etDescription)
                        updateTeamsList()
                    }

                    is ClubCategory.Seasons -> {
                        val etStartDate = dialog.findViewById<EditText>(R.id.etStartDate)
                        val etFinishDate = dialog.findViewById<EditText>(R.id.etFinishDate)
                        val etName = dialog.findViewById<EditText>(R.id.etName)
                        val etDescription = dialog.findViewById<EditText>(R.id.etDescription)
                        clubViewModel.addSeason(
                            returnDateConverter(etStartDate.text.toString()),
                            returnDateConverter(etFinishDate.text.toString()),
                            etName.text.toString(), etDescription.text.toString(), requireActivity()
                        )

                        println("seasonnnnnnn")
                        println("seasonnnnnnn")
                        println("seasonnnnnnn")
                        updateSeasonsList()
                    }

                    is ClubCategory.Players -> {
                        val teamSelected =
                            dialog.findViewById<AutoCompleteTextView>(R.id.autoCompleteTeam)
                        val positionSelected =
                            dialog.findViewById<AutoCompleteTextView>(R.id.autoCompletePosition)
                        val etPlayerName = dialog.findViewById<EditText>(R.id.etPlayerName)
                        val etPrimaryLastName =
                            dialog.findViewById<EditText>(R.id.etPrimaryLastName)
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
                            false,
                            requireActivity()
                        )

                        updatePlayersList()
                    }
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
        activity.findViewById<View>(R.id.addTeamButton).visibility = View.GONE
    }

    private fun showToolbar() {
        val activity = requireActivity()
        activity.findViewById<View>(R.id.toolbar).visibility = View.VISIBLE
        activity.findViewById<View>(R.id.bottomNavView).visibility = View.VISIBLE
        activity.findViewById<View>(R.id.addTeamButton).visibility = View.VISIBLE
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
        val selectedPosition = categoriesAdapter.getSelectedPosition()
        updateCategories(selectedPosition)
    }

    private fun iniPlayerCategories() {
        playerCategoriesAdapter = PlayerCategoriesAdapter(playerCategories) { position ->
            updatePlayerCategories(position)
        }
        rvPlayerCategories.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        rvPlayerCategories.adapter = playerCategoriesAdapter
    }

    private fun updateCategories(position: Int) {
        for (i in categories.indices) {
            categories[i].isSelected = (i == position)
            categoriesAdapter.notifyItemChanged(i)
        }
        when (categories[position]) {
            ClubCategory.Seasons -> {

                lifecycleScope.launchWhenStarted {
                    clubViewModel.seasons.collect { events ->
                        if(events.isEmpty()) {
                            seasonsList = clubViewModel.getSeasons()

                        } else {
                            seasonsList = events
                        }
                    }
                }
                initSeasonList()
                updateSeasonsList()
                initUiStateSeason()

                rvPlayerCategories = binding.rvPlayerCategories
                rvPlayerCategories.visibility = View.GONE
            }

            ClubCategory.Teams -> {
                lifecycleScope.launchWhenStarted {
                    clubViewModel.team.collect { events ->
                        if(events.isEmpty()) {
                            teamsList = clubViewModel.getTeams()

                        } else {
                            teamsList = events
                        }
                    }
                }
                initTeamList()
                updateTeamsList()
                initUiState()




                rvPlayerCategories = binding.rvPlayerCategories
                rvPlayerCategories.visibility = View.GONE
            }

            ClubCategory.Players -> {
                lifecycleScope.launchWhenStarted {
                    clubViewModel.players.collect { events ->
                        if(events.isEmpty()) {
                            playersList = clubViewModel.getPlayers()

                        } else {
                            playersList = events
                        }
                    }
                }

                initPlayerList()
                updatePlayersList()
                initUiStatePlayer()

                rvPlayerCategories = binding.rvPlayerCategories
                rvPlayerCategories.visibility = View.VISIBLE
                iniPlayerCategories()
            }
        }
    }

    private fun updatePlayersListByCategories() {
        val selectedPlayerCategory: List<PlayerCategory> = playerCategories.filter { it.isSelected }
        val newPlayers = playersList.filter { player ->
            selectedPlayerCategory.any { it.toString().contains(getPlayerPositionEnToEs(player.position)) } ||
                    (selectedPlayerCategory.contains(PlayerCategory.Injured) && player.injured)
        }
        playerAdapter.playerList = newPlayers
        playerAdapter.notifyDataSetChanged()
    }

    private fun updatePlayerCategories(position: Int) {
        playerCategories[position].isSelected = !playerCategories[position].isSelected
        playerCategoriesAdapter.notifyItemChanged(position)
        updatePlayersListByCategories()
        when (playerCategories[position]) {
            PlayerCategory.PointGuard -> {
            }

            PlayerCategory.ShootingGuard -> {

            }

            PlayerCategory.SmallForward -> {

            }

            PlayerCategory.PowerForward -> {

            }

            PlayerCategory.Center -> {

            }

            PlayerCategory.Injured -> {

            }

        }
    }

    private fun initPositions(dialog: Dialog) {
        val positions = listOf(
            getString(R.string.position1),
            getString(R.string.position2),
            getString(R.string.position3),
            getString(R.string.position4),
            getString(R.string.position5)
        )
        val autoCompletePosition: AutoCompleteTextView =
            dialog.findViewById(R.id.autoCompletePosition)
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
                ClubFragmentDirections.actionClubFragmentToTeamDetailActivity(
                    it.id,
                    it.teamName,
                    it.arenaName,
                    it.ownerName,
                    it.description
                )
            )
        })

        rvTeams.apply {
            rvTeams.layoutManager = GridLayoutManager(context, 1)
            rvTeams.adapter = teamAdapter
        }
    }

    private fun initSeasonList() {


//        No le paso la lista porque el adaptar ya tiene la lista inicializada
        seasonAdapter = SeasonAdapter(onItemSelected = {
//            Toast.makeText(context, it.teamName, Toast.LENGTH_LONG).show()

            findNavController().navigate(
//                Siempre va a haber esta clase. La del maingraph
                ClubFragmentDirections.actionClubFragmentToSeasonDetailActivity2(
                    it.id,
                    it.startDate,
                    it.endDate,
                    it.seasonName,
                    it.description
                )
            )
        })

        rvTeams.apply {
            rvTeams.layoutManager = GridLayoutManager(context, 1)
            rvTeams.adapter = seasonAdapter
        }
    }

    private fun initPlayerList() {


//        No le paso la lista porque el adaptar ya tiene la lista inicializada
        playerAdapter = PlayerAdapter(onItemSelected = {
//            Toast.makeText(context, it.teamName, Toast.LENGTH_LONG).show()

            findNavController().navigate(
//                Siempre va a haber esta clase. La del maingraph
                ClubFragmentDirections.actionClubFragmentToPlayerDetailActivity(it.id, it.playerName, it.primaryLastName, it.secondLastName,
                    it.position, it.trends, it.phoneNumber, it.email, it.dni, it.injured, it.teamId)
            )
        })

        rvTeams.apply {
            rvTeams.layoutManager = GridLayoutManager(context, 1)
            rvTeams.adapter = playerAdapter
        }
    }

    private fun initUiState() {
        //Uso esta corrutina porque se combina con el ciclo de vida de la activity o fragment en este caso
        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                clubViewModel.team.collect {
//                    CAMBIOS EN TEAMS list
                    teamAdapter.updateList(it)

//                    Log.i("Mostrando la lista de Teams. En el fragment de Club: ", it.get(1).teamName)
                }
            }
        }
    }

    private fun initUiStateSeason() {
        //Uso esta corrutina porque se combina con el ciclo de vida de la activity o fragment en este caso
        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                clubViewModel.seasons.collect {
//                    CAMBIOS EN TEAMS list
                    seasonAdapter.updateList(it)

//                    Log.i("Mostrando la lista de Teams. En el fragment de Club: ", it.get(1).teamName)
                }
            }
        }
    }

    private fun initUiStatePlayer() {
        //Uso esta corrutina porque se combina con el ciclo de vida de la activity o fragment en este caso
        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                clubViewModel.players.collect {
//                    CAMBIOS EN TEAMS list
                    playerAdapter.updateList(it)

//                    Log.i("Mostrando la lista de Teams. En el fragment de Club: ", it.get(1).teamName)
                }
            }
        }
    }

    private fun updateTeamsList() {
        teamAdapter.notifyDataSetChanged()
    }

    private fun updateSeasonsList() {
        seasonAdapter.notifyDataSetChanged()
    }

    private fun updatePlayersList() {
        playerAdapter.notifyDataSetChanged()
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentClubBinding.inflate(layoutInflater, container, false)
        return binding.root
    }


}