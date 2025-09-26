package com.teamhub1.tfmmobile.ui.calendar.adapter

import android.os.Build
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.annotation.RequiresApi
import androidx.recyclerview.widget.RecyclerView
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.domain.model.EventModel

class EventAdapter (
    var eventList: List<EventModel> = emptyList(),
    private val onItemSelected:(EventModel) -> Unit,
    private val onDeleteIconClicked:(EventModel) -> Unit) : RecyclerView.Adapter<EventViewHolder>(){

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
        holder.render(eventList[position], onItemSelected, onDeleteIconClicked )
    }

    override fun getItemCount() = eventList.size

}