package com.teamhub1.tfmmobile.ui.login

import android.content.Context
import android.content.Intent
import android.util.Patterns
import android.widget.Toast
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.TfmMobileApp.Companion.prefs
import com.teamhub1.tfmmobile.domain.model.usecase.LoginUseCase
import com.teamhub1.tfmmobile.ui.home.MainActivity
import com.teamhub1.tfmmobile.ui.login.model.UserLogin
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

    val viewState: StateFlow<LoginViewState>
        get() = _viewState

    private var _showErrorDialog = MutableLiveData(UserLogin())

    val showErrorDialog: LiveData<UserLogin>
        get() = _showErrorDialog

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
                _showErrorDialog.value =
                    UserLogin(password = password, showErrorDialog = true)
                Toast.makeText(context, R.string.errorLogin, Toast.LENGTH_LONG).show()

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