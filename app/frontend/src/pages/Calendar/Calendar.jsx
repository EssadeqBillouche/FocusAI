import { useMemo } from 'react';
import AppShell from '../../components/layout/AppShell.jsx';
import Card from '../../components/ui/Card.jsx';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar() {
  const monthDays = useMemo(() => {
    const days = [];
    for (let i = 1; i <= 30; i += 1) {
      days.push({
        day: i,
        event: i === 8 ? 'Finalize Q1 OKRs' : i === 7 ? 'Sprint Planning' : i === 3 ? 'Client Delivery' : '',
      });
    }
    return days;
  }, []);

  return (
    <AppShell title="November 2023" subtitle="Cultivating focus, one phase at a time.">
      <Card>
        <div className="mb-5 grid grid-cols-7 gap-2">
          {weekDays.map((name) => (
            <p key={name} className="text-center text-xs font-bold uppercase tracking-[0.08em] text-taskiq-soft">
              {name}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {monthDays.map(({ day, event }) => (
            <article key={day} className={`min-h-28 rounded-xl border p-3 ${day === 8 ? 'border-taskiq-primary bg-taskiq-muted' : 'border-taskiq-border bg-taskiq-bg'}`}>
              <p className={`text-sm font-semibold ${day === 8 ? 'text-taskiq-primary' : 'text-taskiq-ink'}`}>{day}</p>
              {event ? <p className="mt-2 text-xs font-medium text-taskiq-soft">{event}</p> : null}
            </article>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
