import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './providers/UserProvider';
import { AppRoutes } from './routes/routes';
import { ScheduleProvider } from './providers/ScheduleProvider';

const App = () => {
  return (
    <ScheduleProvider>
      <UserProvider>
        <Router>
          <AppRoutes />
        </Router>
      </UserProvider>
    </ScheduleProvider>
  );
};

export default App;
