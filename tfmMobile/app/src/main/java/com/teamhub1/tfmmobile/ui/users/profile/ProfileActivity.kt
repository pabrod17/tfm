package com.teamhub1.tfmmobile.ui.users.profile

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextUtils
import android.text.TextWatcher
import android.util.Patterns
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.aristidevs.nuwelogin.core.ex.dismissKeyboard
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.TfmMobileApp.Companion.prefs
import com.teamhub1.tfmmobile.databinding.ActivityProfileBinding
import dagger.hilt.android.AndroidEntryPoint
import java.util.regex.Pattern

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

        binding.etEmail.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                validarFormEmail()
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })

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

    private fun validarFormEmail(): Boolean {
        var esValido = true
        if (TextUtils.isEmpty(binding.etEmail.text.toString())) {
            binding.etEmail.error = ContextCompat.getString(binding.etEmail.context, R.string.required)
//            binding.tilEmail.error = ContextCompat.getString(binding.etEmail.context, R.string.required)
            esValido = false
        } else {
            binding.etEmail.error = null

            if(!validateEmail(binding.etEmail.text.toString())) {
                binding.tilEmail.error = ContextCompat.getString(binding.etEmail.context, R.string.invalidEmail)
            } else {
                binding.tilEmail.error = null
            }
        }
        return esValido
    }

    private fun validateEmail(email: String): Boolean {
        val pattern: Pattern = Patterns.EMAIL_ADDRESS
        return pattern.matcher(email).matches()
    }



}