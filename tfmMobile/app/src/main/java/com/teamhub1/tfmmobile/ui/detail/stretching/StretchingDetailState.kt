package com.teamhub1.tfmmobile.ui.detail.stretching

sealed class StretchingDetailState {
    data object Loading: StretchingDetailState()
    data class Error(var error:String): StretchingDetailState()
    data class Success(val id: Long,
                       val stretchingName: String,
                       val description: String,
                       val stretchingType: String): StretchingDetailState()

}