package com.example.tfmmobile.data.core.interceptors

import android.util.Log
import okhttp3.Interceptor
import okhttp3.Request
import okhttp3.Response
import javax.inject.Inject

class AuthInterceptor @Inject constructor(private val tokenManager: TokenManager):Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val userId = 1L // Tu lógica para obtener el userId aquí
        val request = chain.request()
            .newBuilder()
//            .header("Authorization", tokenManager.getToken())
            .header("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJDT0FDSCIsImV4cCI6MTcxNDg1ODEzMX0.1b3M3dHevtIDx3i4KuJHAnlNoEW0eiVH0DduSslcje1JQxM6jy7OIIGMxHMB1nhkfGJ2bxduoH-frdCh-OhYzQ")

            .build()

        println("METHOD Y URL ADIOSSSS: ${request.method} ${request.url}")
        // Imprimir la solicitud completa
        println("HOLAAAAAAA 222222: $request")

        return chain.proceed(request)
    }

}

//Esta clase seria la que obtiene el token despues de logearse.
// Y lo guarde y recupero cada vez que haga una llamada
class TokenManager @Inject constructor() {
    fun getToken():String = "token de prueba: jajajajhahahahah"
}

