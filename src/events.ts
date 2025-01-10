type Event = {
  id: string;
  label: string;
  date: string;
  time: string;
}

type SelectedEvent = Pick<Event, "id" | "label">;

const EVENTS: Event[] = [
  {
    id: crypto.randomUUID(),
    label: 'Summer Party',
    date: '07-07-2023',
    time: '15:00',  
  },
  {
    id: crypto.randomUUID(),
    label: 'Christmas Party',
    date: '18-12-2023',
    time: '19:00',
  },
  {
    id: crypto.randomUUID(),
    label: 'Half Marathon',
    date: '15-09-2024',
    time: '13:00',
  },
]

export default EVENTS;  
export type { Event, SelectedEvent };