package com.example.tfmmobile.ui.login

import android.content.Context
import android.content.Intent
import android.util.Log
import android.util.Patterns
import androidx.core.content.ContextCompat.startActivity
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.tfmmobile.TfmMobileApp.Companion.prefs
import com.example.tfmmobile.domain.model.usecase.LoginUseCase
import com.example.tfmmobile.ui.home.MainActivity
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import javax.inject.Inject

@HiltViewModel
class LoginViewModel @Inject constructor(private val loginUseCase: LoginUseCase): ViewModel() {

    private companion object {
        const val MIN_PASSWORD_LENGTH = 3
    }

    private var _state = MutableStateFlow<LoginState>(LoginState.Loading)
    val state: StateFlow<LoginState> = _state
    private val _viewState = MutableStateFlow(LoginViewState())

    fun login(userName:String, password:String, context: Context){
        viewModelScope.launch {
//            hilo principal
            _state.value=LoginState.Loading
            val result = withContext(Dispatchers.IO) { loginUseCase(userName, password) } //hilo secundario
            if (result!=null){
                _state.value = LoginState.Success(result.id, result.userName, result.firstName,
                    result.lastName, result.email, result.role)
                println("mostrando token guardado" + prefs.getAuthToken())
                val intent = Intent(context, MainActivity::class.java)
                context.startActivity(intent)
            } else {
                _state.value = LoginState.Error("Ha ocurrido un error. LOGIN.")
            }
//            hilo principal
        }

    }

    fun onLoginSelected(userName: String, password: String, context: Context) {
        if (userName.isNotEmpty() && isValidPassword(password)) {
            login(userName, password, context)
        } else {
            onPasswordChanged(password)
        }
    }

    fun onPasswordChanged(password: String) {
        _viewState.value = LoginViewState(
            isValidPassword = isValidPassword(password)
        )
    }

    fun onFieldsChanged(userName: String, password: String) {
        _viewState.value = LoginViewState(
            isValidPassword = isValidPassword(password)
        )
    }



    private fun isValidEmail(email: String) =
        Patterns.EMAIL_ADDRESS.matcher(email).matches() || email.isEmpty()

    private fun isValidPassword(password: String): Boolean =
        password.length >= MIN_PASSWORD_LENGTH || password.isEmpty()

}