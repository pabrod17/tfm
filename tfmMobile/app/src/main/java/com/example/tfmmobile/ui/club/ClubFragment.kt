package com.example.tfmmobile.ui.club

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.databinding.FragmentClubBinding
import com.example.tfmmobile.domain.model.TeamModel
import com.example.tfmmobile.ui.club.adapter.TeamAdapter
import com.example.tfmmobile.ui.club.adapter.categories.CategoriesAdapter
import com.example.tfmmobile.ui.detail.TeamDetailState
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch

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

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        teamsList = clubViewModel.getTeams()
        initUi()
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
    }

    private fun initCategories(){
        categoriesAdapter= CategoriesAdapter(categories)
        rvCategories.layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        rvCategories.adapter = categoriesAdapter
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

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentClubBinding.inflate(layoutInflater, container, false)
        return binding.root
    }


}