package com.teamhub1.tfmmobile.ui.home

import android.app.Dialog
import android.app.TimePickerDialog
import android.content.Context
import android.os.Bundle
import android.widget.TimePicker
import androidx.fragment.app.DialogFragment
import java.util.Calendar

class TimePickerFragment (val listener: (String) -> Unit):DialogFragment(), TimePickerDialog.OnTimeSetListener {
    override fun onTimeSet(view: TimePicker?, hourOfDay: Int, minute: Int) {
        val formattedHour = String.format("%02d", hourOfDay)
        val formattedMinute = String.format("%02d", minute)
        listener("$formattedHour:$formattedMinute")
    }

    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        val calendar = Calendar.getInstance()
        val hour = calendar.get(Calendar.HOUR_OF_DAY)
        val minute = calendar.get(Calendar.MINUTE)
        val dialog = TimePickerDialog(activity as Context, this, hour, minute, true)
        return dialog
    }
}