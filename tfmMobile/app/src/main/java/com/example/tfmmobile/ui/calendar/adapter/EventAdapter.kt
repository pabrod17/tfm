package com.example.tfmmobile.ui.calendar.adapter

import android.os.Build
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.annotation.RequiresApi
import androidx.recyclerview.widget.RecyclerView
import com.example.tfmmobile.R
import com.example.tfmmobile.domain.model.EventModel
import com.example.tfmmobile.domain.model.GameModel

class EventAdapter (private var eventList: List<EventModel> = emptyList(),
                    private val onItemSelected:(EventModel) -> Unit) : RecyclerView.Adapter<EventViewHolder>(){

    fun updateList(list:List<EventModel>) {
        eventList = list.sortedBy { it.id }
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): EventViewHolder {
        return EventViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_event, parent, false)
        )
    }

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onBindViewHolder(holder: EventViewHolder, position: Int) {
        holder.render(eventList[position], onItemSelected )
    }

    override fun getItemCount() = eventList.size

}