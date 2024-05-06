package com.example.tfmmobile.ui.signup

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.inputmethod.EditorInfo
import android.widget.EditText
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.aristidevs.nuwelogin.core.ex.dismissKeyboard
import com.aristidevs.nuwelogin.core.ex.loseFocusAfterAction
import com.example.tfmmobile.R
import com.example.tfmmobile.databinding.ActivityLoginBinding
import com.example.tfmmobile.databinding.ActivitySignUpBinding
import com.example.tfmmobile.ui.login.LoginActivity
import com.example.tfmmobile.ui.login.LoginViewModel
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class SignUpActivity : AppCompatActivity() {

    companion object {
        fun create(context: Context): Intent =
            Intent(context, SignUpActivity::class.java)

    }

    private lateinit var binding: ActivitySignUpBinding
    private val signUpViewModel : SignUpViewModel  by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_sign_up)

        binding = ActivitySignUpBinding.inflate(layoutInflater)
        setContentView(binding.root)
//        loginViewModel.login("", "")
        initUI()






        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
    }

    private fun initUI() {
        initListeners()
    }

    private fun initListeners() {
        binding.etEmail.loseFocusAfterAction(EditorInfo.IME_ACTION_NEXT)
        binding.etEmail.onTextChanged { onFieldChanged() }

        binding.etPassword.loseFocusAfterAction(EditorInfo.IME_ACTION_DONE)
        binding.etPassword.setOnFocusChangeListener { _, hasFocus -> onFieldChanged(hasFocus) }
        binding.etPassword.onTextChanged { onFieldChanged() }

//        binding.tvForgotPassword.setOnClickListener { loginViewModel.onForgotPasswordSelected() }
//
//        binding.viewBottom.tvFooter.setOnClickListener { loginViewModel.onSignInSelected() }

        binding.btnCreateAccount.setOnClickListener {
            it.dismissKeyboard()
            signUpViewModel.onSignUpSelected(
                binding.etNickname.text.toString(),
                binding.etRealName.text.toString(),
                binding.etRealName2.text.toString(),
                binding.etEmail.text.toString(),
                binding.etPassword.text.toString(),
                this
            )
        }

        binding.tvLoginBack.setOnClickListener {
            it.dismissKeyboard()
            val intent = Intent(this, LoginActivity::class.java)
            this.startActivity(intent)
        }

    }

    private fun onFieldChanged(hasFocus: Boolean = false) {
        if (!hasFocus) {
            signUpViewModel.onFieldsChanged(
                email = binding.etEmail.text.toString(),
                password = binding.etPassword.text.toString()
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