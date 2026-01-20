import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import "./LoginPage.css";

interface FormData {
  email: string;
  password: string;
}

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/auth/login", formData);

      if (response.data.success) {
        // Stocker le token
        localStorage.setItem("token", response.data.token);
        // Rediriger vers la page d'accueil
        navigate("/");
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(
        error.response?.data?.message ||
          "Une erreur est survenue lors de la connexion",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Éléments décoratifs */}
      <div className="login-decoration">
        <div className="deco-circle deco-1"></div>
        <div className="deco-circle deco-2"></div>
      </div>

      {/* Bouton retour */}
      <Link to="/" className="back-button">
        <span>←</span> Retour à l'accueil
      </Link>

      <div className="login-container">
        <div className="login-content">
          {/* Section gauche - Branding */}
          <div className="login-branding">
            <div className="branding-content">
              <div className="brand-logo">
                <span className="logo-icon">◈</span>
                <span className="logo-text">NEXUS</span>
              </div>
              <h2 className="branding-title">Bon retour parmi nous !</h2>
              <p className="branding-description">
                Connectez-vous pour accéder à votre espace personnel et
                continuer votre expérience.
              </p>
              <div className="branding-features">
                <div className="brand-feature">
                  <span className="feature-icon">✓</span>
                  <span>Accès sécurisé à vos données</span>
                </div>
                <div className="brand-feature">
                  <span className="feature-icon">✓</span>
                  <span>Synchronisation multi-appareils</span>
                </div>
                <div className="brand-feature">
                  <span className="feature-icon">✓</span>
                  <span>Support prioritaire 24/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section droite - Formulaire */}
          <div className="login-form-section">
            <div className="form-wrapper">
              <div className="form-header">
                <h1 className="form-title">Connexion</h1>
                <p className="form-subtitle">
                  Pas encore de compte ?
                  <Link to="/subscribe" className="signup-link">
                    {" "}
                    Créer un compte
                  </Link>
                </p>
              </div>

              {error && (
                <div className="error-message">
                  <span className="error-icon">⚠</span>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="login-form">
                <div className="input-group">
                  <label htmlFor="email" className="input-label">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input-field"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <div className="label-row">
                    <label htmlFor="password" className="input-label">
                      Mot de passe
                    </label>
                    <a href="#" className="forgot-link">
                      Mot de passe oublié ?
                    </a>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="input-field"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" className="checkbox-input" />
                    <span className="checkbox-text">Se souvenir de moi</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Connexion en cours..." : "Se connecter"}
                </button>

                <div className="divider">
                  <span>ou continuer avec</span>
                </div>

                <div className="social-login">
                  <button type="button" className="social-btn">
                    <svg className="social-icon" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </button>
                  <button type="button" className="social-btn">
                    <svg className="social-icon" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      />
                    </svg>
                    GitHub
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
