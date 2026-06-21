import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";

function Settings() {
  const { theme: routeTheme } = useParams();
  const [theme, setTheme] = useState("");

  // updater declared before effects so effects can call it
  const updateTheme = async (newTheme) => {
    try {
      await fetch("http://localhost:5000/preferences", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: newTheme }),
      });
    } catch (err) {
      console.error("Failed to save theme:", err);
    }

    setTheme(newTheme);
    document.body.style.backgroundColor = newTheme === "dark" ? "#111827" : "#ffffff";
    document.body.style.color = newTheme === "dark" ? "#f3f4f6" : "#111827";
  };

  // Load theme from backend on mount
  useEffect(() => {
    let mounted = true;
    fetch("http://localhost:5000/preferences")
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        const initial = data?.theme || "light";
        setTheme(initial);
        document.body.style.backgroundColor = initial === "dark" ? "#111827" : "#ffffff";
        document.body.style.color = initial === "dark" ? "#f3f4f6" : "#111827";
      })
      .catch((err) => console.log(err));

    return () => {
      mounted = false;
    };
  }, []);

  // Apply route theme when route param changes
  useEffect(() => {
    if (routeTheme === "light" || routeTheme === "dark") {
      const id = setTimeout(() => updateTheme(routeTheme), 0);
      return () => clearTimeout(id);
    }
  }, [routeTheme]);

  // Redirect invalid route param after hooks are set up
  if (routeTheme && routeTheme !== "light" && routeTheme !== "dark") {
    return <Navigate to="/settings" replace />;
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    updateTheme(newTheme);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p className="mb-4">Current Theme: <strong>{theme}</strong></p>
      <button onClick={toggleTheme} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Toggle Theme
      </button>
    </div>
  );
}

export default Settings;