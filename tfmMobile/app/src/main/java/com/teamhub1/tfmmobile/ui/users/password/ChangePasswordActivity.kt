package com.teamhub1.tfmmobile.ui.users.password

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextUtils
import android.text.TextWatcher
import android.view.inputmethod.EditorInfo
import android.widget.EditText
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.aristidevs.nuwelogin.core.ex.dismissKeyboard
import com.aristidevs.nuwelogin.core.ex.loseFocusAfterAction
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.TfmMobileApp
import com.teamhub1.tfmmobile.databinding.ActivityChangePasswordBinding
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
        binding.etNewPassword.loseFocusAfterAction(EditorInfo.IME_ACTION_DONE)
        binding.etNewPassword.setOnFocusChangeListener { _, hasFocus -> onFieldChanged(hasFocus) }
        binding.etNewPassword.onTextChanged { onFieldChanged() }

        binding.etNewPassword.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                validarFormPassword()
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })

        binding.etConfirmPassword.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                validarFormPassword()
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })


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

    private fun validarFormPassword(): Boolean {
        var esValido = true


        if (!TextUtils.isEmpty(binding.etConfirmPassword.text.toString()) && !TextUtils.isEmpty(binding.etNewPassword.text.toString()) &&
            binding.etConfirmPassword.text.toString().equals(binding.etNewPassword.text.toString())) {

            binding.tilConfirmPassword.error = null
            binding.etConfirmPassword.error = null
        } else {
//            binding.etRepeatPassword.error = ContextCompat.getString(binding.etEmail.context, R.string.confirmPasswordCheck)
            binding.tilConfirmPassword.error = ContextCompat.getString(binding.tilConfirmPassword.context, R.string.confirmPasswordCheck)

            esValido = false

        }
        return esValido
    }

    private fun onFieldChanged(hasFocus: Boolean = false) {
        if (!hasFocus) {
            changePasswordViewModel.onFieldsChanged(
                password = binding.etCurrentPassword.text.toString()
            )
        }
    }

    fun EditText.onTextChanged(listener: (String) -> Unit) {
        this.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                listener(s.toString())
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })
    }
}