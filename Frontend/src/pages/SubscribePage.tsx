import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import "./SubscribePage.css";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: "client" | "vendeur" | "";
  acceptTerms: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  role?: string;
  acceptTerms?: string;
  submit?: string;
}

function SubscribePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleRoleSelect = (role: "client" | "vendeur") => {
    setFormData({
      ...formData,
      role: role,
    });
    if (errors.role) {
      setErrors({ ...errors, role: "" });
    }
  };

  const validateStep1 = () => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis";
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    if (!formData.role) {
      newErrors.role = "Veuillez choisir un type de compte";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: FormErrors = {};

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 8 caractères";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    if (!formData.acceptTerms) {
      newErrors.acceptTerms =
        "Vous devez accepter les conditions d'utilisation";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setIsLoading(true);

    try {
      const response = await axios.post("/api/auth/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role,
      });

      if (response.data.success) {
        // ✅ Sauvegarder le token et les infos utilisateur
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", response.data.user.role);
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("userEmail", response.data.user.email);
        localStorage.setItem(
          "userName",
          `${response.data.user.firstName} ${response.data.user.lastName}`,
        );

        // ✅ Rediriger selon le rôle
        if (response.data.user.role === "vendeur") {
          navigate("/dashboard"); // Dashboard vendeur
        } else {
          navigate("/products-list"); // ✅ CORRIGÉ: Page produits pour client
        }
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setErrors({
        submit:
          error.response?.data?.message ||
          "Une erreur est survenue lors de l'inscription",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="subscribe-page">
      {/* Éléments décoratifs */}
      <div className="subscribe-decoration">
        <div className="deco-shape shape-1"></div>
        <div className="deco-shape shape-2"></div>
        <div className="deco-shape shape-3"></div>
      </div>

      {/* Bouton retour */}
      <Link to="/" className="back-button">
        <span>←</span> Retour à l'accueil
      </Link>

      <div className="subscribe-container">
        {/* Barre de progression */}
        <div className="progress-bar">
          <div
            className={`progress-step ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}
          >
            <div className="step-number">1</div>
            <div className="step-label">Informations</div>
          </div>
          <div className="progress-line">
            <div className={`progress-fill ${step > 1 ? "filled" : ""}`}></div>
          </div>
          <div className={`progress-step ${step >= 2 ? "active" : ""}`}>
            <div className="step-number">2</div>
            <div className="step-label">Sécurité</div>
          </div>
        </div>

        <div className="subscribe-content">
          <div className="form-header">
            <h1 className="form-title">Créer un compte</h1>
            <p className="form-subtitle">
              Déjà inscrit ?
              <Link to="/login" className="login-link">
                {" "}
                Se connecter
              </Link>
            </p>
          </div>

          {errors.submit && (
            <div className="error-message">
              <span className="error-icon">⚠</span>
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="subscribe-form">
            {step === 1 && (
              <div className="form-step" key="step1">
                {/* Sélecteur de rôle */}
                <div className="role-selector-group">
                  <label className="input-label">Type de compte *</label>
                  <div className="role-cards">
                    <div
                      className={`role-card ${formData.role === "client" ? "selected" : ""}`}
                      onClick={() => handleRoleSelect("client")}
                    >
                      <div className="role-icon">🛍️</div>
                      <h3 className="role-title">Client</h3>
                      <p className="role-description">
                        Je veux acheter des produits
                      </p>
                    </div>
                    <div
                      className={`role-card ${formData.role === "vendeur" ? "selected" : ""}`}
                      onClick={() => handleRoleSelect("vendeur")}
                    >
                      <div className="role-icon">🏪</div>
                      <h3 className="role-title">Vendeur</h3>
                      <p className="role-description">
                        Je veux vendre mes produits
                      </p>
                    </div>
                  </div>
                  {errors.role && (
                    <span className="field-error">{errors.role}</span>
                  )}
                </div>

                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="firstName" className="input-label">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className={`input-field ${errors.firstName ? "error" : ""}`}
                      placeholder="Jean"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && (
                      <span className="field-error">{errors.firstName}</span>
                    )}
                  </div>

                  <div className="input-group">
                    <label htmlFor="lastName" className="input-label">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className={`input-field ${errors.lastName ? "error" : ""}`}
                      placeholder="Dupont"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && (
                      <span className="field-error">{errors.lastName}</span>
                    )}
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="email" className="input-label">
                    Adresse email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`input-field ${errors.email ? "error" : ""}`}
                    placeholder="jean.dupont@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="field-error">{errors.email}</span>
                  )}
                </div>

                <div className="input-group">
                  <label htmlFor="phone" className="input-label">
                    Téléphone (optionnel)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="input-field"
                    placeholder="+33 6 12 34 56 78"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-primary btn-submit"
                >
                  Continuer
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="form-step" key="step2">
                <div className="input-group">
                  <label htmlFor="password" className="input-label">
                    Mot de passe *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`input-field ${errors.password ? "error" : ""}`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <span className="field-error">{errors.password}</span>
                  )}
                  <div className="password-hint">Minimum 8 caractères</div>
                </div>

                <div className="input-group">
                  <label htmlFor="confirmPassword" className="input-label">
                    Confirmer le mot de passe *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`input-field ${errors.confirmPassword ? "error" : ""}`}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <span className="field-error">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>

                <div className="terms-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      className="checkbox-input"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                    />
                    <span className="checkbox-text">
                      J'accepte les{" "}
                      <a href="#" className="link">
                        conditions d'utilisation
                      </a>{" "}
                      et la{" "}
                      <a href="#" className="link">
                        politique de confidentialité
                      </a>
                    </span>
                  </label>
                  {errors.acceptTerms && (
                    <span className="field-error">{errors.acceptTerms}</span>
                  )}
                </div>

                <div className="button-group">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn btn-secondary"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary btn-submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Création en cours..." : "Créer mon compte"}
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="divider">
            <span>ou s'inscrire avec</span>
          </div>

          <div className="social-signup">
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
        </div>
      </div>
    </div>
  );
}

export default SubscribePage;
