package com.example.tfmmobile.ui.detail

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.isVisible
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import androidx.navigation.navArgs
import com.example.tfmmobile.R
import com.example.tfmmobile.databinding.ActivityTeamDetailBinding
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch

@AndroidEntryPoint
class TeamDetailActivity : AppCompatActivity() {

    private lateinit var binding: ActivityTeamDetailBinding
    private val teamDetailViewModel:TeamDetailViewModel by viewModels()

    private val args:TeamDetailActivityArgs by navArgs()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        binding = ActivityTeamDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)
        teamDetailViewModel.getTeams(1)
        initUi()


        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
    }

    private fun initUi(){
        initListeners()
        initUiState()
    }

    private fun initListeners() {
        binding.ivBack.setOnClickListener {
            onBackPressed()
        }
    }

    private fun initUiState() {
        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                teamDetailViewModel.state.collect{
                    when(it){
                        TeamDetailState.Loading -> loadingState()
                        is TeamDetailState.Error -> errorState()
                        is TeamDetailState.Success -> successState(it)
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
    private fun successState(state: TeamDetailState.Success) {
        binding.pb.isVisible = false
        binding.tvBodyTeamDetail.setText(state.description)
//        binding.cardViewText.setText(state.description)

        println("saco COSASSSSS: " + binding.tvBodyTeamDetail.text)

    }

}