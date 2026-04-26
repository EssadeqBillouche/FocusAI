import { useEffect, useState } from 'react';
import AppShell from '../../components/layout/AppShell.jsx';
import Card from '../../components/ui/Card.jsx';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { authApi, dashboardApi } from '../../services/api.js';
import { toast } from 'react-toastify';

export default function Profile() {
  const { user, logout } = useAuth();

  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });
  const [insights, setInsights] = useState({ total: 0, completed: 0, pending: 0, completionRate: 0 });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const [meResponse, insightsResponse] = await Promise.all([authApi.me(), dashboardApi.getInsights()]);

        const dbUser = meResponse.data?.data?.user;
        if (dbUser) {
          setProfileForm({
            firstName: dbUser.firstName || '',
            lastName: dbUser.lastName || '',
            email: dbUser.email || '',
          });
        }

        setInsights(insightsResponse.data?.data?.insights || { total: 0, completed: 0, pending: 0, completionRate: 0 });
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to load profile');
      }
    };

    loadProfile();
  }, []);

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

          <div className="mt-6 flex justify-end">
            <Button variant="secondary" onClick={logout}>Logout</Button>
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-bold text-taskiq-ink">Productivity Overview</h3>
          <div className="mt-4 space-y-4 text-sm text-taskiq-soft">
            <div className="rounded-lg border border-taskiq-border bg-taskiq-bg px-3 py-2">Total tasks: {insights.total}</div>
            <div className="rounded-lg border border-taskiq-border bg-taskiq-bg px-3 py-2">Completed tasks: {insights.completed}</div>
            <div className="rounded-lg border border-taskiq-border bg-taskiq-bg px-3 py-2">Pending tasks: {insights.pending}</div>
            <div className="rounded-lg border border-taskiq-border bg-taskiq-bg px-3 py-2">Completion rate: {insights.completionRate}%</div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
