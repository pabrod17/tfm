package com.teamhub1.tfmmobile

import TokenManager
import android.app.Application
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