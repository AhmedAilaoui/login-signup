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
                Bienvenue sur
                <span className="highlight"> NEXUS</span>
                <br />
                Votre marketplace de confiance
              </h1>
              <p className="hero-description">
                Achetez et vendez en toute sécurité. Rejoignez une communauté
                dynamique de commerçants et d'acheteurs passionnés.
              </p>
              <div className="hero-actions">
                <Link to="/subscribe" className="btn btn-primary btn-large">
                  🛍️ Commencer à acheter
                </Link>
                <Link to="/subscribe" className="btn btn-secondary btn-large">
                  🏪 Devenir vendeur
                </Link>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <div className="stat-number">1000+</div>
                  <div className="stat-label">Produits disponibles</div>
                </div>
                <div className="stat">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Vendeurs actifs</div>
                </div>
                <div className="stat">
                  <div className="stat-number">4.8/5</div>
                  <div className="stat-label">Satisfaction client</div>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="visual-card card-1">
                <div className="card-icon">🛒</div>
                <div className="card-content">
                  <h3>Achetez facilement</h3>
                  <p>Des milliers de produits à portée de clic</p>
                </div>
              </div>
              <div className="visual-card card-2">
                <div className="card-icon">💳</div>
                <div className="card-content">
                  <h3>Paiement sécurisé</h3>
                  <p>Vos transactions sont protégées</p>
                </div>
              </div>
              <div className="visual-card card-3">
                <div className="card-icon">🚚</div>
                <div className="card-content">
                  <h3>Livraison rapide</h3>
                  <p>Recevez vos commandes rapidement</p>
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
            <h2 className="section-title">Pourquoi choisir NEXUS ?</h2>
            <p className="section-description">
              La plateforme e-commerce qui simplifie vos achats et vos ventes
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🛍️</div>
              <h3 className="feature-title">Pour les Acheteurs</h3>
              <p className="feature-description">
                Découvrez des milliers de produits, comparez les prix, ajoutez
                au panier et commandez en quelques clics. Simple et rapide !
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏪</div>
              <h3 className="feature-title">Pour les Vendeurs</h3>
              <p className="feature-description">
                Créez votre boutique, gérez vos produits facilement, suivez vos
                statistiques et développez votre business en ligne.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">100% Sécurisé</h3>
              <p className="feature-description">
                Vos données et transactions sont protégées avec un chiffrement
                de niveau bancaire. Achetez et vendez en toute confiance.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Dashboard Complet</h3>
              <p className="feature-description">
                Vendeurs : suivez vos ventes, gérez vos stocks et analysez vos
                performances avec des statistiques détaillées.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Recherche Avancée</h3>
              <p className="feature-description">
                Trouvez exactement ce que vous cherchez grâce à nos filtres par
                catégorie, prix et recherche par mots-clés.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3 className="feature-title">Support Réactif</h3>
              <p className="feature-description">
                Une équipe dédiée disponible pour vous accompagner et répondre à
                toutes vos questions rapidement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Catégories populaires</h2>
            <p className="section-description">
              Explorez nos différentes catégories de produits
            </p>
          </div>
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-icon">💻</div>
              <h3>Électronique</h3>
            </div>
            <div className="category-card">
              <div className="category-icon">👕</div>
              <h3>Vêtements</h3>
            </div>
            <div className="category-card">
              <div className="category-icon">🍕</div>
              <h3>Alimentation</h3>
            </div>
            <div className="category-card">
              <div className="category-icon">📚</div>
              <h3>Livres</h3>
            </div>
            <div className="category-card">
              <div className="category-icon">🏠</div>
              <h3>Maison</h3>
            </div>
            <div className="category-card">
              <div className="category-icon">⚽</div>
              <h3>Sports</h3>
            </div>
            <div className="category-card">
              <div className="category-icon">💄</div>
              <h3>Beauté</h3>
            </div>
            <div className="category-card">
              <div className="category-icon">🎮</div>
              <h3>Jouets</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Prêt à rejoindre NEXUS ?</h2>
            <p className="cta-description">
              Que vous soyez acheteur ou vendeur, créez votre compte
              gratuitement et commencez dès aujourd'hui !
            </p>
            <div className="cta-buttons">
              <Link to="/subscribe" className="btn btn-primary btn-large">
                🛍️ Créer un compte Client
              </Link>
              <Link to="/subscribe" className="btn btn-secondary btn-large">
                🏪 Créer un compte Vendeur
              </Link>
            </div>
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
              <p>Votre marketplace de confiance</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Acheteurs</h4>
                <a href="#">Comment acheter</a>
                <a href="#">Panier</a>
                <a href="#">Suivi commande</a>
              </div>
              <div className="footer-column">
                <h4>Vendeurs</h4>
                <a href="#">Devenir vendeur</a>
                <a href="#">Dashboard</a>
                <a href="#">Gestion produits</a>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <a href="#">Contact</a>
                <a href="#">FAQ</a>
                <a href="#">Conditions</a>
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
