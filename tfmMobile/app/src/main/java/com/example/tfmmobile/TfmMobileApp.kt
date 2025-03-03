package com.example.tfmmobile

import TokenManager
import android.app.Application
import com.example.tfmmobile.data.core.interceptors.TokenManage3
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class TfmMobileApp:Application() {

    companion object {
        lateinit var prefs: TokenManager
    }
    override fun onCreate() {
        super.onCreate()
//        TokenManage3.init(this)
        prefs = TokenManager(applicationContext)
    }
}