import { useState } from 'react';
import AppShell from '../../components/layout/AppShell.jsx';
import Card from '../../components/ui/Card.jsx';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Profile() {
  const { user } = useAuth();

  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    bio: 'Digital architect focusing on minimalist productivity workflows and deep work strategies.',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <AppShell title="Profile & Settings" subtitle="Manage your personal sanctuary settings and notification rhythm.">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <h3 className="text-xl font-bold text-taskiq-ink">Personal Information</h3>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input name="firstName" label="First Name" value={profileForm.firstName} onChange={handleChange} />
            <Input name="lastName" label="Last Name" value={profileForm.lastName} onChange={handleChange} />
          </div>

          <div className="mt-4">
            <Input name="email" type="email" label="Email" value={profileForm.email} onChange={handleChange} />
          </div>

          <div className="mt-4 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.08em] text-taskiq-soft">Biography</label>
            <textarea
              name="bio"
              value={profileForm.bio}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg border border-taskiq-border bg-white px-4 py-3 text-sm text-taskiq-ink focus:border-taskiq-primary focus:outline-none"
            />
          </div>

          <div className="mt-6 flex justify-end">
            <Button>Save Preferences</Button>
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-bold text-taskiq-ink">Notification Harmony</h3>
          <div className="mt-4 space-y-4 text-sm text-taskiq-soft">
            <label className="flex items-center justify-between rounded-lg border border-taskiq-border bg-taskiq-bg px-3 py-2">
              Daily briefing
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-taskiq-primary" />
            </label>
            <label className="flex items-center justify-between rounded-lg border border-taskiq-border bg-taskiq-bg px-3 py-2">
              Deep work interruption
              <input type="checkbox" className="h-4 w-4 accent-taskiq-primary" />
            </label>
            <label className="flex items-center justify-between rounded-lg border border-taskiq-border bg-taskiq-bg px-3 py-2">
              Weekly insights
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-taskiq-primary" />
            </label>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
