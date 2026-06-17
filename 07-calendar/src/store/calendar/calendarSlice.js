import { createSlice } from "@reduxjs/toolkit";

// const tempEvent = {
//   _id: new Date().getTime(),
//   title: "Evento de prueba",
//   notes: "Hay que estudiar",
//   start: new Date(),
//   end: addHours(new Date(), 2),
//   user: {
//     _id: "Nano",
//     name: "Mix",
//   },
// };

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingEvents: true,
    events: [
      // tempEvent
    ],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }
        return event;
      });
      state.activeEvent = null;
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent.id,
        );
      }
      state.activeEvent = null;
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      payload.forEach((event) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id);

        if (!exists) {
          state.events.push(event);
        }
      });
    },
    onLogoutClearCalendar: (state) => {
      state.events = [];
      state.activeEvent = null;
      state.isLoadingEvents = true;
    },
  },
});

export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutClearCalendar,
} = calendarSlice.actions;
