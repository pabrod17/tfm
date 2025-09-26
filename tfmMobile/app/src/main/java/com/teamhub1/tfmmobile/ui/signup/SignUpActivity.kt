package com.teamhub1.tfmmobile.ui.signup

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextUtils
import android.text.TextWatcher
import android.util.Patterns
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
import com.teamhub1.tfmmobile.databinding.ActivitySignUpBinding
import com.teamhub1.tfmmobile.ui.login.LoginActivity
import dagger.hilt.android.AndroidEntryPoint
import java.util.regex.Pattern


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

        binding.etEmail.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                validarFormEmail()
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })

        binding.etPassword.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                validarFormPassword()
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })

        binding.etRepeatPassword.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                validarFormPassword()
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })


            binding.btnCreateAccount.setOnClickListener {
                it.dismissKeyboard()
                if(validarForm() && validarFormEmail() && validarFormPassword()) {
                    signUpViewModel.onSignUpSelected2(
                        binding.etNickname.text.toString(),
                        binding.etRealName.text.toString(),
                        binding.etRealName2.text.toString(),
                        binding.etEmail.text.toString(),
                        binding.etPassword.text.toString(),
                        this
                    )
                } else {
                    fieldListeners()
                }

            }


        binding.tvLoginBack.setOnClickListener {
            it.dismissKeyboard()
            val intent = Intent(this, LoginActivity::class.java)
            this.startActivity(intent)
        }

    }

    private fun validateEmail(email: String): Boolean {
        val pattern: Pattern = Patterns.EMAIL_ADDRESS
        return pattern.matcher(email).matches()
    }



    private fun validarForm(): Boolean {
        var esValido = true


        if (TextUtils.isEmpty(binding.etNickname.text.toString())) {
            binding.etNickname.error = ContextCompat.getString(binding.etEmail.context, R.string.required)
            esValido = false

        } else {
            binding.etNickname.error = null

        }
        if (TextUtils.isEmpty(binding.etRealName.text.toString())) {
            binding.etRealName.error = ContextCompat.getString(binding.etEmail.context, R.string.required)
            esValido = false

        } else {
            binding.etRealName.error = null

        }
        if (TextUtils.isEmpty(binding.etRealName2.text.toString())) {
            binding.etRealName2.error = ContextCompat.getString(binding.etEmail.context, R.string.required)
            esValido = false

        } else {
            binding.etRealName2.error = null

        }
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

//            binding.tilEmail.error = null
        }
        if (TextUtils.isEmpty(binding.etPassword.text.toString())) {
            binding.etPassword.error = ContextCompat.getString(binding.etEmail.context, R.string.required)
            esValido = false
        } else {
            binding.etPassword.error = null

        }
        if(binding.tilRepeatPassword.error!=null) {
            if (TextUtils.isEmpty(binding.etRepeatPassword.text.toString())) {
                binding.etRepeatPassword.error = ContextCompat.getString(binding.etEmail.context, R.string.required)
                esValido = false
            } else {
                binding.etRepeatPassword.error = null

            }
        }



//
//
//        if (!TextUtils.isEmpty(binding.etRepeatPassword.text.toString()) && !TextUtils.isEmpty(binding.etPassword.text.toString()) &&
//            binding.etRepeatPassword.text.toString().equals(binding.etPassword.text.toString())
//            ) {
//
//            binding.etRepeatPassword.error = null
//
//        } else {
//            binding.etRepeatPassword.error = ContextCompat.getString(binding.etEmail.context, R.string.confirmPasswordCheck)
//            esValido = false
//
//        }

        return esValido
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

    private fun validarFormPassword(): Boolean {
        var esValido = true
//        if (TextUtils.isEmpty(binding.etPassword.text.toString())) {
//            binding.etPassword.error = ContextCompat.getString(binding.etEmail.context, R.string.required)
//            esValido = false
//        } else {
//            binding.etPassword.error = null
//
//        }
//        if (TextUtils.isEmpty(binding.etRepeatPassword.text.toString())) {
//            binding.etRepeatPassword.error = ContextCompat.getString(binding.etEmail.context, R.string.required)
//            esValido = false
//        } else {
//            binding.etRepeatPassword.error = null
//
//        }


        if (!TextUtils.isEmpty(binding.etRepeatPassword.text.toString()) && !TextUtils.isEmpty(binding.etPassword.text.toString()) &&
            binding.etRepeatPassword.text.toString().equals(binding.etPassword.text.toString())) {

            binding.tilRepeatPassword.error = null
            binding.etRepeatPassword.error = null
        } else {
//            binding.etRepeatPassword.error = ContextCompat.getString(binding.etEmail.context, R.string.confirmPasswordCheck)
            binding.tilRepeatPassword.error = ContextCompat.getString(binding.tilRepeatPassword.context, R.string.confirmPasswordCheck)

            esValido = false

        }
        return esValido
    }

    private fun fieldListeners() {
        binding.etNickname.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                validarForm()
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })
        binding.etRealName.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                validarForm()
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })
        binding.etRealName2.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                validarForm()
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })
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