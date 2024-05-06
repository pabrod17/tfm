package com.example.tfmmobile.ui.signup

import android.content.Context
import android.content.Intent
import android.util.Patterns
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.tfmmobile.domain.model.usecase.SignUpUseCase
import com.example.tfmmobile.ui.home.MainActivity
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import javax.inject.Inject

@HiltViewModel
class SignUpViewModel @Inject constructor(private val signUpUseCase: SignUpUseCase): ViewModel() {

    private companion object {
        const val MIN_PASSWORD_LENGTH = 3
    }

    private var _state = MutableStateFlow<SignUpState>(SignUpState.Loading)
    val state: StateFlow<SignUpState> = _state
    private val _viewState = MutableStateFlow(SignUpViewState())

    fun signUp(userName:String, firtName: String, lastName: String, email: String, password:String, context: Context){
        viewModelScope.launch {
//            hilo principal
            _state.value=SignUpState.Loading
            val result = withContext(Dispatchers.IO) { signUpUseCase(userName, firtName, lastName, email, password) } //hilo secundario
            if (result!=null){
                _state.value = SignUpState.Success(result.id, result.userName, result.firstName,
                    result.lastName, result.email, result.role)
                val intent = Intent(context, MainActivity::class.java)
                context.startActivity(intent)
            } else {
                _state.value = SignUpState.Error("Ha ocurrido un error. SignUp.")
            }
//            hilo principal
        }

    }

    fun onSignUpSelected(userName: String, firtName: String, lastName: String, email: String,  password: String, context: Context) {
        if (userName.isNotEmpty() && isValidPassword(password) && isValidEmail(email)) {
            signUp(userName, firtName, lastName, email, password, context)
        } else {
            onPasswordChanged(password)
        }
    }

    fun onPasswordChanged(password: String) {
        _viewState.value = SignUpViewState(
            isValidPassword = isValidPassword(password)
        )
    }

    fun onFieldsChanged(email: String, password: String) {
        _viewState.value = SignUpViewState(
            isValidPassword = isValidPassword(password)
        )
    }



    private fun isValidEmail(email: String) =
        Patterns.EMAIL_ADDRESS.matcher(email).matches() || email.isEmpty()

    private fun isValidPassword(password: String): Boolean =
        password.length >= MIN_PASSWORD_LENGTH || password.isEmpty()
}