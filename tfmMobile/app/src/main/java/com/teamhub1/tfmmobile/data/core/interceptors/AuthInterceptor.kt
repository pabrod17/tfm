package com.teamhub1.tfmmobile.data.core.interceptors

import android.annotation.SuppressLint
import android.content.Context
import android.content.SharedPreferences
import com.teamhub1.tfmmobile.TfmMobileApp.Companion.prefs
import okhttp3.Interceptor
import okhttp3.Response
import javax.inject.Inject

class AuthInterceptor @Inject constructor():Interceptor {
    @SuppressLint("SuspiciousIndentation")
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request()
                    .newBuilder()
                    .header("Authorization", "Bearer " + prefs.getAuthToken()!!)
                    .build()
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

