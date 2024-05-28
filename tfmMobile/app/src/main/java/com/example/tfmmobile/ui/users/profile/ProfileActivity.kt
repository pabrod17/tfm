package com.example.tfmmobile.ui.users.profile

import android.content.Context
import android.content.Intent
import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.aristidevs.nuwelogin.core.ex.dismissKeyboard
import com.example.tfmmobile.R
import com.example.tfmmobile.TfmMobileApp.Companion.prefs
import com.example.tfmmobile.databinding.ActivityProfileBinding
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class ProfileActivity : AppCompatActivity() {

    companion object {
        fun create(context: Context): Intent =
            Intent(context, ProfileActivity::class.java)

    }

    private lateinit var binding: ActivityProfileBinding
    private val profileViewModel: ProfileViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_profile)

        binding = ActivityProfileBinding.inflate(layoutInflater)
        setContentView(binding.root)
        initUi()

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
    }

    private fun initUi() {
        initProfileFields()
        initListeners()
    }

    private fun initProfileFields() {
        binding.etNickname.setText(prefs.getUserName().toString())
        binding.etRealName.setText(prefs.getUserFirstName().toString())
        binding.etRealName2.setText(prefs.getUserSurnames().toString())
        binding.etEmail.setText(prefs.getUserEmail().toString())
    }

    private fun initListeners() {
        binding.ivBack.setOnClickListener {
            onBackPressed()
        }
            binding.btnUpdateProfile.setOnClickListener{
                it.dismissKeyboard()
                if(prefs.getUserId() != null) {
                    profileViewModel.updateProfile(
                        prefs.getUserId()!!.toLong(),
                    binding.etNickname.text.toString(),
                    binding.etRealName.text.toString(),
                    binding.etRealName2.text.toString(),
                    binding.etEmail.text.toString(),
                        this)
                }
            }
    }




}