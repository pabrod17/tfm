package com.example.tfmmobile.data.core.interceptors

import okhttp3.Interceptor
import okhttp3.Response
import javax.inject.Inject

class AuthInterceptor @Inject constructor(private val tokenManager: TokenManager):Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request()
            .newBuilder()
            .header("Authorization", tokenManager.getToken())
            .build()
        return chain.proceed(request)
    }

}

//Esta clase seria la que obtiene el token despues de logearse.
// Y lo guarde y recupero cada vez que haga una llamada
class TokenManager @Inject constructor() {
    fun getToken():String = "token de prueba: jajajajhahahahah"
}