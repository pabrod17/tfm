package com.example.tfmmobile.ui.users.password

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
import com.example.tfmmobile.TfmMobileApp
import com.example.tfmmobile.databinding.ActivityChangePasswordBinding
import com.example.tfmmobile.ui.users.profile.ProfileActivity
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class ChangePasswordActivity : AppCompatActivity() {

    companion object {
        fun create(context: Context): Intent =
            Intent(context, ChangePasswordActivity::class.java)
    }

    private lateinit var binding: ActivityChangePasswordBinding
    private val changePasswordViewModel: ChangePasswordViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_change_password)

        binding = ActivityChangePasswordBinding.inflate(layoutInflater)
        setContentView(binding.root)
        initUi()


        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
    }

    private fun initUi() {
        initListeners()
    }

    private fun initListeners() {
        binding.ivBack.setOnClickListener {
            onBackPressed()
        }
        binding.btnUpdateProfile.setOnClickListener{
            it.dismissKeyboard()
            if(TfmMobileApp.prefs.getUserId() != null) {
                changePasswordViewModel.changePassword(
                    TfmMobileApp.prefs.getUserId()!!.toLong(),
                    binding.etCurrentPassword.text.toString(),
                    binding.etConfirmPassword.text.toString(),
                    this)
            }
        }
    }
}