import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <SignedIn>
        <Dashboard />
      </SignedIn>

      <SignedOut>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh', 
          width: '100vw',
          background: 'var(--bg-gradient)', /* Keep your app background for the outer page */
          padding: '20px'
        }}>
          <SignIn 
            appearance={{
              variables: {
                colorPrimary: "#818cf8",   /* Keeps your brand purple for buttons */
                colorBackground: "#b9c1cfff", /* Changes the box to white */
                colorText: "#1e293b",       /* Dark grey/blue text for readability */
                colorInputBackground: "#f8fafc", /* Light grey for the input boxes */
                colorInputText: "#1e293b"
              },
              elements: {
                card: {
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  borderRadius: "12px"
                }
              }
            }}
          />
        </div>
      </SignedOut>
    </>
  );
}

export default App;