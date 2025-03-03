package com.example.tfmmobile.ui.login

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
import androidx.lifecycle.lifecycleScope
import com.aristidevs.nuwelogin.core.ex.dismissKeyboard
import com.aristidevs.nuwelogin.core.ex.loseFocusAfterAction
import com.example.tfmmobile.R
import com.example.tfmmobile.TfmMobileApp.Companion.prefs
import com.example.tfmmobile.databinding.ActivityLoginBinding
import com.example.tfmmobile.ui.home.MainActivity
import com.example.tfmmobile.ui.login.model.UserLogin
import com.example.tfmmobile.ui.signup.SignUpActivity
import dagger.hilt.android.AndroidEntryPoint
import javax.inject.Inject

@AndroidEntryPoint
class LoginActivity : AppCompatActivity() {

    companion object {
        fun create(context: Context): Intent =
            Intent(context, LoginActivity::class.java)

    }

    private lateinit var binding: ActivityLoginBinding
    private val loginViewModel: LoginViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        if(prefs.getLoginState()?.isNotEmpty() == true) {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
            finish()
        }


        setContentView(R.layout.activity_login)
        binding = ActivityLoginBinding.inflate(layoutInflater)
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
        initObservers()
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

        binding.btnLogin.setOnClickListener {

            if(validarForm()) {
                it.dismissKeyboard()
                loginViewModel.onLoginSelected(
                    binding.etEmail.text.toString(),
                    binding.etPassword.text.toString(),
                    this
                )
            } else {
                fieldListeners()
            }

        }


        binding.tvForgotPassword.setOnClickListener {
            it.dismissKeyboard()
            val intent = Intent(this, SignUpActivity::class.java)
            this.startActivity(intent)
        }
    }

    private fun fieldListeners() {
        binding.etEmail.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                validarForm()
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })
        binding.etPassword.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                validarForm()
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })
    }

    private fun validarForm(): Boolean {
        var esValido = true


        if (TextUtils.isEmpty(binding.etEmail.text.toString())) {
            binding.etEmail.error = ContextCompat.getString(binding.etEmail.context, R.string.required)
            esValido = false

        } else {
            binding.etEmail.error = null

        }
        if (TextUtils.isEmpty(binding.etPassword.text.toString())) {
            binding.etPassword.error = ContextCompat.getString(binding.etEmail.context, R.string.required)
            esValido = false

        } else {
            binding.etPassword.error = null

        }
        return esValido
    }

    private fun initObservers() {
//        loginViewModel.showErrorDialog.observe(this) { userLogin ->
//            if (userLogin.showErrorDialog) showErrorDialog(userLogin)
//        }
//
//        lifecycleScope.launchWhenStarted {
//            loginViewModel.viewState.collect { viewState ->
//                updateUI(viewState)
//            }
//        }
    }

//    private fun showErrorDialog(userLogin: UserLogin) {
//        ErrorDialog.create(
//            title = getString(R.string.login_error_dialog_title),
//            description = getString(R.string.login_error_dialog_body),
//            negativeAction = ErrorDialog.Action(getString(R.string.login_error_dialog_negative_action)) {
//                it.dismiss()
//            },
//            positiveAction = ErrorDialog.Action(getString(R.string.login_error_dialog_positive_action)) {
//                loginViewModel.onLoginSelected(
//                    userLogin.userName,
//                    userLogin.password
//                )
//                it.dismiss()
//            }
//        ).show(dialogLauncher, this)
//    }

    private fun updateUI(viewState: LoginViewState) {
        with(binding) {
            tilPassword.error =
                if (viewState.isValidPassword) null else getString(R.string.login_error_password)
        }
    }

    private fun onFieldChanged(hasFocus: Boolean = false) {
        if (!hasFocus) {
            loginViewModel.onFieldsChanged(
                userName = binding.etEmail.text.toString(),
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