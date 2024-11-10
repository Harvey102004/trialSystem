import { useState } from "react";
import CreateAccount from "./Components/Login/CreateAccount";
import LoginForm from "./Components/Login/LoginForm";
import Navigation from "./Components/Dashboard/Navigation";

function App() {
  const [showCreateAcc, setshowCreateAcc] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleSwitchToCreateAcc = () => {
    setshowCreateAcc(false);
  };

  const handleSwitchToLoginForm = () => {
    setshowCreateAcc(true);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };
  return (
    <>
      {!isAuthenticated ? (
        showCreateAcc ? (
          <LoginForm
            switchToCreateAcc={handleSwitchToCreateAcc}
            onLoginSuccess={handleLoginSuccess}
          />
        ) : (
          <CreateAccount
            switchToLoginForm={handleSwitchToLoginForm}
            onSubmitSuccess={handleLoginSuccess}
          />
        )
      ) : (
        <Navigation
          onSignOut={() => {
            setIsAuthenticated(false);
            setshowCreateAcc(true);
          }}
        />
      )}
    </>
  );
}

export default App;
