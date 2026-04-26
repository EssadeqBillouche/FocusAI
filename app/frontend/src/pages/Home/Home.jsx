import AppShell from '../../components/layout/AppShell.jsx';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';

export default function Home() {
  return (
    <AppShell title="Sanctuary" subtitle="A clear mind is the foundation of profound work.">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <Card className="xl:col-span-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.08em] text-taskiq-soft">Current status</p>
              <h3 className="mt-2 text-3xl font-bold text-taskiq-ink">Deep Work Initiated</h3>
              <p className="mt-1 text-sm text-taskiq-soft">Project: Editorial Redesign</p>
            </div>
            <span className="rounded-full bg-taskiq-muted px-3 py-1 text-xs font-semibold text-taskiq-primary">Flow mode</span>
          </div>

          <p className="text-5xl font-extrabold tracking-tight text-taskiq-primary">01:45:00</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="secondary">Pause</Button>
            <Button>Conclude Session</Button>
          </div>
        </Card>

        <Card className="xl:col-span-4">
          <p className="text-xs uppercase tracking-[0.08em] text-taskiq-soft">Clarity score</p>
          <p className="mt-3 text-5xl font-extrabold text-taskiq-primary">84</p>
          <p className="mt-2 text-sm text-taskiq-soft">Consistent focus periods observed over the last 48 hours.</p>
        </Card>

        <Card className="xl:col-span-6">
          <h3 className="text-xl font-bold text-taskiq-ink">Recent Collections</h3>
          <div className="mt-4 space-y-4">
            {['Design System Thoughts', 'Q3 Strategy Archive', 'Deep Work Rituals'].map((item) => (
              <div key={item} className="rounded-xl border border-taskiq-border bg-taskiq-bg p-4">
                <p className="font-semibold text-taskiq-ink">{item}</p>
                <p className="mt-1 text-xs text-taskiq-soft">Updated recently</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="xl:col-span-6 overflow-hidden rounded-2xl border border-taskiq-border bg-gradient-to-br from-taskiq-primary to-taskiq-primary-dark p-8 text-white shadow-taskiq">
          <p className="text-xs uppercase tracking-[0.08em] text-white/80">Daily inspiration</p>
          <h3 className="mt-2 text-2xl font-bold">Cultivating Space</h3>
          <p className="mt-3 max-w-sm text-sm text-white/85">
            Your environment shapes your attention. Choose depth over noise.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
