import { useState } from "react";
import { Calendar, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  CalendarEvent,
  CalendarModal,
  FabAddDelete,
  FabAddNew,
  Navbar,
} from "../";
import { getMessgesES, localizer } from "../../helpers";
import { useCalendarStore, useUiStore } from "../../hooks";

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();
  const [currentView, setCurrentView] = useState(
    localStorage.getItem("lastView") || Views.MONTH,
  );
  const [currentDate, setCurrentDate] = useState(new Date());

  const eventStyleGetter = (event, start, end, isSelected) => {
    return {
      style: {
        backgroundColor: "#347cf7",
        borderRadius: "0",
        opacity: 0.8,
        color: "white",
      },
    };
  };

  const onDoubleClick = () => {
    openDateModal();
  };

  const onSelect = (event) => {
    setActiveEvent(event);
  };

  const onViewChange = (event) => {
    localStorage.setItem("lastView", event);
    setCurrentView(event);
  };

  return (
    <>
      <Navbar />
      <Calendar
        culture="es-ES"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={getMessgesES()}
        date={currentDate}
        view={currentView}
        onNavigate={setCurrentDate}
        style={{ height: "calc(100vh - 80px)" }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />
      <CalendarModal />
      <FabAddNew />
      <FabAddDelete />
    </>
  );
};
