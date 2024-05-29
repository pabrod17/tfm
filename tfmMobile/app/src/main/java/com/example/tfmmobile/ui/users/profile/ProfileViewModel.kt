package com.example.tfmmobile.ui.users.profile

import android.app.Activity
import android.content.Context
import android.util.Patterns
import android.widget.Toast
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.tfmmobile.R
import com.example.tfmmobile.domain.model.usecase.UserUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import javax.inject.Inject

@HiltViewModel
class ProfileViewModel @Inject constructor(private val userUseCase: UserUseCase): ViewModel() {

    private companion object {
        const val MIN_PASSWORD_LENGTH = 3
    }

    private var _state = MutableStateFlow<UserState>(UserState.Loading)
    val state: StateFlow<UserState> = _state
    private val _viewState = MutableStateFlow(UserViewState())

    fun updateProfile(id:Long, userName:String, firtName: String, lastName: String, email: String, context: Context){
        viewModelScope.launch {
//            hilo principal
            _state.value= UserState.Loading
            val result = withContext(Dispatchers.IO) { userUseCase(id, userName, firtName, lastName, email) } //hilo secundario
            if (result!=null){
                _state.value = UserState.Success(
                    result.id, result.userName, result.firstName,
                    result.lastName, result.email, result.role
                )
                (context as? Activity)?.finish() // Cerrar la actividad actual
            } else {
                Toast.makeText(context, R.string.errorUpdateUserProfile, Toast.LENGTH_LONG).show()
                _state.value = UserState.Error("Ha ocurrido un error. SignUp.")
            }
//            hilo principal
        }

    }



    fun onPasswordChanged(password: String) {
        _viewState.value = UserViewState(
            isValidPassword = isValidPassword(password)
        )
    }

    fun onFieldsChanged(email: String, password: String) {
        _viewState.value = UserViewState(
            isValidPassword = isValidPassword(password)
        )
    }



    private fun isValidEmail(email: String) =
        Patterns.EMAIL_ADDRESS.matcher(email).matches() || email.isEmpty()

    private fun isValidPassword(password: String): Boolean =
        password.length >= MIN_PASSWORD_LENGTH || password.isEmpty()
}