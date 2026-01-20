import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Éléments décoratifs de fond */}
      <div className="bg-decoration">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <span className="logo-icon">◈</span>
              <span className="logo-text">NEXUS</span>
            </div>
            <div className="nav-links">
              <Link to="/login" className="nav-link">
                Connexion
              </Link>
              <Link to="/subscribe" className="btn btn-primary">
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Transformez votre
                <span className="highlight"> vision</span>
                <br />
                en réalité
              </h1>
              <p className="hero-description">
                Rejoignez des milliers d'utilisateurs qui font confiance à notre
                plateforme pour atteindre leurs objectifs et développer leur
                potentiel.
              </p>
              <div className="hero-actions">
                <Link to="/subscribe" className="btn btn-primary btn-large">
                  Commencer gratuitement
                </Link>
                <button className="btn btn-secondary btn-large">
                  En savoir plus
                </button>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <div className="stat-number">50K+</div>
                  <div className="stat-label">Utilisateurs actifs</div>
                </div>
                <div className="stat">
                  <div className="stat-number">4.9/5</div>
                  <div className="stat-label">Note moyenne</div>
                </div>
                <div className="stat">
                  <div className="stat-number">100+</div>
                  <div className="stat-label">Pays</div>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="visual-card card-1">
                <div className="card-icon">📊</div>
                <div className="card-content">
                  <h3>Analyses avancées</h3>
                  <p>Suivez vos progrès en temps réel</p>
                </div>
              </div>
              <div className="visual-card card-2">
                <div className="card-icon">🚀</div>
                <div className="card-content">
                  <h3>Performance optimale</h3>
                  <p>Des résultats mesurables</p>
                </div>
              </div>
              <div className="visual-card card-3">
                <div className="card-icon">🎯</div>
                <div className="card-content">
                  <h3>Objectifs personnalisés</h3>
                  <p>Adaptés à vos besoins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Pourquoi nous choisir ?</h2>
            <p className="section-description">
              Des fonctionnalités conçues pour votre succès
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Ultra-rapide</h3>
              <p className="feature-description">
                Performance optimisée pour une expérience fluide et réactive
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">Sécurisé</h3>
              <p className="feature-description">
                Vos données protégées avec un chiffrement de niveau entreprise
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3 className="feature-title">Personnalisable</h3>
              <p className="feature-description">
                Interface adaptable à vos préférences et besoins spécifiques
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3 className="feature-title">Multilingue</h3>
              <p className="feature-description">
                Disponible dans plus de 20 langues pour vous servir partout
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Multi-plateforme</h3>
              <p className="feature-description">
                Accédez depuis n'importe quel appareil, n'importe où
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3 className="feature-title">Support 24/7</h3>
              <p className="feature-description">
                Une équipe dédiée disponible à tout moment pour vous aider
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Prêt à commencer ?</h2>
            <p className="cta-description">
              Rejoignez notre communauté aujourd'hui et découvrez toutes les
              possibilités
            </p>
            <Link to="/subscribe" className="btn btn-primary btn-large">
              Créer un compte gratuitement
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo">
                <span className="logo-icon">◈</span>
                <span className="logo-text">NEXUS</span>
              </div>
              <p>Transformez votre vision en réalité</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Produit</h4>
                <a href="#">Fonctionnalités</a>
                <a href="#">Prix</a>
                <a href="#">Témoignages</a>
              </div>
              <div className="footer-column">
                <h4>Entreprise</h4>
                <a href="#">À propos</a>
                <a href="#">Blog</a>
                <a href="#">Carrières</a>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <a href="#">Contact</a>
                <a href="#">FAQ</a>
                <a href="#">Documentation</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 NEXUS. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
