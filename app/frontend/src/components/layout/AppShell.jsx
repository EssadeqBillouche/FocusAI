import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';

export default function AppShell({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen bg-taskiq-bg text-taskiq-ink">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar title={title} subtitle={subtitle} />
        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
