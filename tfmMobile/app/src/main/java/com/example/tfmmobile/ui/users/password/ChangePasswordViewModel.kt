package com.example.tfmmobile.ui.users.password

import android.app.Activity
import android.content.Context
import android.util.Patterns
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.tfmmobile.TfmMobileApp.Companion.prefs
import com.example.tfmmobile.domain.model.usecase.UserUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import javax.inject.Inject

@HiltViewModel
class ChangePasswordViewModel @Inject constructor(private val userUseCase: UserUseCase): ViewModel() {

    private companion object {
        const val MIN_PASSWORD_LENGTH = 3
    }

    private var _state = MutableStateFlow<UserPasswordState>(UserPasswordState.Loading)
    val state: StateFlow<UserPasswordState> = _state
    private val _viewState = MutableStateFlow(UserPasswordViewState())

    fun changePassword(id:Long, oldPassword:String, newPassword: String, context: Context){
        viewModelScope.launch {
//            hilo principal
            _state.value= UserPasswordState.Loading
            val result = withContext(Dispatchers.IO) { userUseCase(id, oldPassword, newPassword) } //hilo secundario
                _state.value = prefs.getUserId()?.let { UserPasswordState.Success(it) }!!
                (context as? Activity)?.finish() // Cerrar la actividad actual
            }
//            hilo principal
    }



    fun onPasswordChanged(password: String) {
        _viewState.value = UserPasswordViewState(
            isValidPassword = isValidPassword(password)
        )
    }

    fun onFieldsChanged(password: String) {
        _viewState.value = UserPasswordViewState(
            isValidPassword = isValidPassword(password)
        )
    }



    private fun isValidEmail(email: String) =
        Patterns.EMAIL_ADDRESS.matcher(email).matches() || email.isEmpty()

    private fun isValidPassword(password: String): Boolean =
        password.length >= MIN_PASSWORD_LENGTH || password.isEmpty()


}