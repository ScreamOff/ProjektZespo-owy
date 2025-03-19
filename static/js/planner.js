document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        dateClick: function(info) {
            const eventTitle = prompt('Wprowadź nazwę wydarzenia:');
            if (eventTitle) {
                calendar.addEvent({
                    title: eventTitle,
                    start: info.dateStr,
                    allDay: true
                });

                // Wyślij żądanie AJAX do serwera w celu zapisania wydarzenia
                fetch('/planner/add_event', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: eventTitle,
                        date: info.dateStr
                    })
                });
            }
        },
        events: '/planner/events' // Pobieranie wydarzeń z serwera
    });

    calendar.render();
});