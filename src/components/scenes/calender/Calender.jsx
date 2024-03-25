import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function CalendarWithDialog() {
  const [events, setEvents] = useState([
    {
      title: "Meeting 1",
      start: new Date(2024, 2, 13, 10, 0),
      end: new Date(2024, 2, 13, 12, 0),
    },
    {
      title: "Meeting 2",
      start: new Date(2024, 2, 14, 14, 0),
      end: new Date(2024, 2, 14, 16, 0),
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [eventName, setEventName] = useState("");

  const handleSelect = ({ start, end }) => {
    setSelectedSlot({ start, end });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedSlot(null);
    setEventName("");
  };

  const handleAddEvent = () => {
    if (eventName && selectedSlot) {
      setEvents([
        ...events,
        { title: eventName, start: selectedSlot.start, end: selectedSlot.end },
      ]);
      handleDialogClose();
    }
  };

  const handleDeleteEvent = (eventToDelete) => {
    setEvents(events.filter((event) => event !== eventToDelete));
  };

  return (
    <div>
      <Box marginTop="1rem" padding="2rem" width="80vw" height="100vh">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          selectable
          onSelectSlot={handleSelect}
        />

        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Add Event</DialogTitle>
          <DialogContent>
            <TextField
              label="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleAddEvent}>Add Event</Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Typography variant="h6">Events</Typography>
      <Box>
        {events.map((event, index) => (
          <Box key={index} display="flex" alignItems="center" marginBottom="0.5rem">
            <Typography>{event.title}</Typography>
            <IconButton onClick={() => handleDeleteEvent(event)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default CalendarWithDialog;
