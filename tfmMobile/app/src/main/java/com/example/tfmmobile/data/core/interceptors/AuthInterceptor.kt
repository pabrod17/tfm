package com.example.tfmmobile.data.core.interceptors

import TokenManager
import android.annotation.SuppressLint
import android.content.Context
import android.content.SharedPreferences
import android.util.Log
import com.example.tfmmobile.TfmMobileApp.Companion.prefs
import okhttp3.Interceptor
import okhttp3.Request
import okhttp3.Response
import javax.inject.Inject

class AuthInterceptor @Inject constructor():Interceptor {
    @SuppressLint("SuspiciousIndentation")
    override fun intercept(chain: Interceptor.Chain): Response {
        val userId = 1L // Tu lógica para obtener el userId aquí

//            .header("Authorization", tokenManager.getToken())

//            Aqui tendria que meter este token en la llamada:
//        tokenManager.getAuthToken()
//            .header("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJDT0FDSCIsImV4cCI6MTcxNDg1ODEzMX0.1b3M3dHevtIDx3i4KuJHAnlNoEW0eiVH0DduSslcje1JQxM6jy7OIIGMxHMB1nhkfGJ2bxduoH-frdCh-OhYzQ")
        val request = chain.request()
                    .newBuilder()
                    .header("Authorization", "Bearer " + prefs.getAuthToken()!!)
                    .build()


        println("METHOD Y URL ADIOSSSS: ${request.method} ${request.url}")
        // Imprimir la solicitud completa
        println("HOLAAAAAAA 222222: $request")
        println("HOLAAAAAAA 222222 33333: ${request.headers}")
        println("HOLAAAAAAA 222222 44444: ${prefs.getAuthToken()}")

        return chain.proceed(request)
    }

}

//Esta clase seria la que obtiene el token despues de logearse.
// Y lo guarde y recupero cada vez que haga una llamada
//class TokenManager @Inject constructor() {
//    fun getToken():String = "token de prueba: jajajajhahahahah"
//}

object TokenManage3  {

    private const val TOKEN_PREFS_NAME = "TokenPrefs"
    private const val KEY_AUTH_TOKEN = "authToken"

    private lateinit var sharedPreferences: SharedPreferences

    fun init(context: Context) {
        sharedPreferences = context.getSharedPreferences(TOKEN_PREFS_NAME, Context.MODE_PRIVATE)
    }

    fun saveAuthToken(authToken: String) {
        val editor = sharedPreferences.edit()
        editor.putString(KEY_AUTH_TOKEN, authToken)
        editor.apply()
    }

    fun getAuthToken(): String? {
        return sharedPreferences.getString(KEY_AUTH_TOKEN, null)
    }

    fun clearAuthToken() {
        val editor = sharedPreferences.edit()
        editor.remove(KEY_AUTH_TOKEN)
        editor.apply()
    }
}

