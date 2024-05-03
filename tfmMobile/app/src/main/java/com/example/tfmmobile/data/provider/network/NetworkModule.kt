package com.example.tfmmobile.data.provider.network

import com.example.tfmmobile.data.provider.RepositoryImpl
import com.example.tfmmobile.domain.model.Repository
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import javax.inject.Singleton


@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {

    val httpClient = OkHttpClient.Builder()
        .addInterceptor(Interceptor { chain ->
            val originalRequest = chain.request()
            val userId = 1 // El userId que deseas pasar como RequestAttribute
            val newRequest = originalRequest.newBuilder()
                .header("userId", userId.toString())
                .build()
            chain.proceed(newRequest)
        })
        .build()
    val httpClient1 = OkHttpClient.Builder()
        .addInterceptor(object : Interceptor {
            override fun intercept(chain: Interceptor.Chain): okhttp3.Response {
                val request = chain.request()
                val url = request.url()
                println("URL: $url")
                return chain.proceed(request)
            }
        })
        .build()
    @Provides
    @Singleton
    fun provideRetrofit():Retrofit{
        return Retrofit
            .Builder()
            .client(httpClient1)
            .baseUrl("http://10.0.2.2:8080/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    @Provides
    fun provideTeamApiService(retrofit: Retrofit): TeamApiService{
        return retrofit.create(TeamApiService::class.java)
    }

    @Provides
    fun provideRepository(apiService: TeamApiService):Repository{
        return RepositoryImpl(apiService)
    }
}