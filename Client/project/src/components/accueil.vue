<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoaded = ref(false)
const hoveredRole = ref<string | null>(null)
const showDonorDetails = ref(false)
const activeTestimonial = ref(0)

const donorOfMonth = {
  name: 'Marie-Claire Dubois',
  avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150',
  contributions: 47,
  impact: '156 personnes aidées',
  speciality: 'Aide alimentaire',
  testimonial: 'Donner me permet de créer un impact positif dans ma communauté. Chaque sourire que je reçois est une récompense inestimable.',
  badges: ['Super Donneur', 'Impact Social', 'Communauté Active']
}

const testimonials = [
  {
    text: "Cette plateforme a changé ma vie. J'ai pu trouver l'aide dont j'avais besoin rapidement et avec dignité.",
    author: "Sophie M.",
    role: "Membre depuis 2023",
    avatar: "S",
    color: "#ff6b9d"
  },
  {
    text: "Grâce à SolidaritéConnect, j'ai pu donner une seconde vie à mes affaires et aider des familles dans le besoin.",
    author: "Thomas R.",
    role: "Donneur actif",
    avatar: "T",
    color: "#a78bfa"
  },
  {
    text: "Une expérience humaine profonde. Je me sens utile et connecté à ma communauté comme jamais avant.",
    author: "Amina K.",
    role: "Bénévole depuis 2022",
    avatar: "A",
    color: "#34d399"
  }
]

const stats = [
  { number: '2,458+', label: 'Membres actifs', icon: '👥', color: '#a78bfa' },
  { number: '1,927', label: 'Aides réalisées', icon: '🤝', color: '#f472b6' },
  { number: '98%', label: 'Satisfaction', icon: '💖', color: '#fb923c' },
  { number: '12', label: 'Villes couvertes', icon: '🏙️', color: '#34d399' }
]

const selectRole = (role: 'donneur' | 'demandeur') => {
  router.push(`/${role}`)
}

onMounted(() => {
  setTimeout(() => { isLoaded.value = true }, 100)
  setInterval(() => {
    activeTestimonial.value = (activeTestimonial.value + 1) % testimonials.length
  }, 4000)
})
</script>

<template>
  <div class="app-wrapper" :class="{ 'is-loaded': isLoaded }">
    <!-- Animated background -->
    <div class="bg-canvas">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
      <div class="particles">
        <span v-for="i in 20" :key="i" class="particle" :style="{ '--i': i }">✦</span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="navbar">
      <div class="nav-brand">
        <div class="brand-icon">🤝</div>
        <span class="brand-name">Solidarité<strong>Connect</strong></span>
      </div>
      <div class="nav-actions">
        <button class="btn-ghost" @click="router.push('/signin')">Se connecter</button>
        <button class="btn-primary" @click="router.push('/signup')">Rejoindre</button>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          <span>Plateforme solidaire #1 en France</span>
        </div>
        <h1 class="hero-title">
          L'entraide, <br>
          <span class="gradient-text">réinventée avec ❤️</span>
        </h1>
        <p class="hero-subtitle">
          Connectez des cœurs généreux à ceux qui ont besoin de soutien. 
          Ensemble, bâtissons une communauté où personne n'est laissé de côté.
        </p>
        <div class="hero-cta">
          <button class="cta-primary" @click="router.push('/signup')">
            <span>Commencer maintenant</span>
            <span class="cta-arrow">→</span>
          </button>
          <button class="cta-secondary" @click="router.push('/signin')">
            Déjà membre ? Connexion
          </button>
        </div>

        <!-- Stats inline -->
        <div class="hero-stats">
          <div v-for="stat in stats" :key="stat.label" class="stat-pill">
            <span class="stat-icon">{{ stat.icon }}</span>
            <div>
              <div class="stat-num" :style="{ color: stat.color }">{{ stat.number }}</div>
              <div class="stat-lbl">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Donor of month card floating -->
      <div class="floating-card donor-float">
        <div class="float-header">
          <span class="crown">👑</span>
          <span class="float-title">Donneur du Mois</span>
        </div>
        <div class="float-body" @click="showDonorDetails = !showDonorDetails">
          <img :src="donorOfMonth.avatar" alt="Donor" class="donor-avatar">
          <div>
            <p class="donor-name-text">{{ donorOfMonth.name }}</p>
            <p class="donor-meta">{{ donorOfMonth.contributions }} dons · {{ donorOfMonth.impact }}</p>
          </div>
        </div>
        <div class="float-badges" v-if="showDonorDetails">
          <span v-for="badge in donorOfMonth.badges" :key="badge" class="mini-badge">{{ badge }}</span>
          <p class="donor-quote">"{{ donorOfMonth.testimonial }}"</p>
        </div>
      </div>

      <!-- Live notification -->
      <div class="floating-card notif-float">
        <div class="notif-icon">💚</div>
        <div>
          <p class="notif-text">Thomas vient d'aider une famille</p>
          <p class="notif-time">Il y a 2 minutes</p>
        </div>
      </div>
    </section>

    <!-- Role selection -->
    <section class="roles-section">
      <div class="section-header">
        <h2>Comment souhaitez-vous <span class="gradient-text">participer</span> ?</h2>
        <p>Choisissez votre rôle dans cette belle aventure humaine</p>
      </div>

      <div class="role-cards">
        <!-- Donneur card -->
        <div
          class="role-card role-giver"
          :class="{ hovered: hoveredRole === 'donneur' }"
          @mouseenter="hoveredRole = 'donneur'"
          @mouseleave="hoveredRole = null"
          @click="selectRole('donneur')"
        >
          <div class="card-glow glow-giver"></div>
          <div class="role-emoji">🎁</div>
          <h3>Je souhaite donner</h3>
          <p>Partagez vos ressources, votre temps, vos compétences. Chaque don transforme une vie.</p>
          <ul class="role-features">
            <li>✦ Dons matériels & alimentaires</li>
            <li>✦ Partage de compétences</li>
            <li>✦ Bénévolat flexible</li>
            <li>✦ Impact mesurable</li>
          </ul>
          <div class="role-cta">
            <span>Devenir donneur</span>
            <span class="arrow-icon">→</span>
          </div>
        </div>

        <!-- Demandeur card -->
        <div
          class="role-card role-seeker"
          :class="{ hovered: hoveredRole === 'demandeur' }"
          @mouseenter="hoveredRole = 'demandeur'"
          @mouseleave="hoveredRole = null"
          @click="selectRole('demandeur')"
        >
          <div class="card-glow glow-seeker"></div>
          <div class="role-emoji">🤲</div>
          <h3>Je cherche de l'aide</h3>
          <p>Trouvez le soutien dont vous avez besoin, en toute dignité et bienveillance.</p>
          <ul class="role-features">
            <li>✦ Aide alimentaire</li>
            <li>✦ Support matériel</li>
            <li>✦ Accompagnement personnalisé</li>
            <li>✦ Réseau de confiance</li>
          </ul>
          <div class="role-cta">
            <span>Trouver de l'aide</span>
            <span class="arrow-icon">→</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials-section">
      <div class="section-header">
        <h2>Ils ont vécu l'<span class="gradient-text">expérience</span></h2>
        <p>Des histoires vraies de personnes transformées par la solidarité</p>
      </div>

      <div class="testimonial-carousel">
        <div
          v-for="(t, i) in testimonials"
          :key="i"
          class="testimonial-item"
          :class="{ active: activeTestimonial === i }"
        >
          <div class="testimonial-card">
            <div class="quote-mark">"</div>
            <p class="testimonial-text">{{ t.text }}</p>
            <div class="testimonial-author">
              <div class="author-avatar-circle" :style="{ background: t.color }">{{ t.avatar }}</div>
              <div>
                <strong>{{ t.author }}</strong>
                <span>{{ t.role }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="carousel-dots">
        <button
          v-for="(_, i) in testimonials"
          :key="i"
          class="dot"
          :class="{ active: activeTestimonial === i }"
          @click="activeTestimonial = i"
        ></button>
      </div>
    </section>

    <!-- How it works -->
    <section class="how-section">
      <div class="section-header">
        <h2>Comment ça <span class="gradient-text">fonctionne</span> ?</h2>
      </div>
      <div class="steps-grid">
        <div class="step">
          <div class="step-num">01</div>
          <div class="step-icon">📝</div>
          <h4>Créez votre compte</h4>
          <p>Inscription gratuite et rapide en 2 minutes</p>
        </div>
        <div class="step-connector">→</div>
        <div class="step">
          <div class="step-num">02</div>
          <div class="step-icon">🔍</div>
          <h4>Explorez les offres</h4>
          <p>Parcourez les dons disponibles ou publiez votre besoin</p>
        </div>
        <div class="step-connector">→</div>
        <div class="step">
          <div class="step-num">03</div>
          <div class="step-icon">💖</div>
          <h4>Connectez-vous</h4>
          <p>Échangez avec la communauté et créez des liens durables</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand-block">
          <div class="footer-logo">🤝</div>
          <h3>SolidaritéConnect</h3>
          <p>Ensemble pour un monde plus humain</p>
          <div class="footer-socials">
            <span>💙</span><span>💚</span><span>🧡</span>
          </div>
        </div>
        <div class="footer-links-grid">
          <div>
            <h4>Explorer</h4>
            <a href="#">Comment ça marche</a>
            <a href="#">Témoignages</a>
            <a href="#">Impact social</a>
          </div>
          <div>
            <h4>Légal</h4>
            <a href="#">Confidentialité</a>
            <a href="#">Conditions</a>
            <a href="#">Cookies</a>
          </div>
          <div>
            <h4>Contact</h4>
            <a href="#">Support</a>
            <a href="#">Partenaires</a>
            <a href="#">Presse</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2024 SolidaritéConnect · Fait avec ❤️ pour la communauté</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.app-wrapper {
  font-family: 'Outfit', sans-serif;
  min-height: 100vh;
  background: #080812;
  color: #e2e8f0;
  opacity: 0;
  transition: opacity 0.6s ease;
  overflow-x: hidden;
}
.app-wrapper.is-loaded { opacity: 1; }

/* --- BACKGROUND --- */
.bg-canvas {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
}
.blob-1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, #7c3aed, #4f46e5);
  top: -200px; left: -150px;
  animation: blobMove 20s ease-in-out infinite;
}
.blob-2 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, #ec4899, #f43f5e);
  top: 40%; right: -150px;
  animation: blobMove 25s ease-in-out infinite reverse;
}
.blob-3 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, #059669, #0d9488);
  bottom: -100px; left: 30%;
  animation: blobMove 30s ease-in-out infinite;
}
@keyframes blobMove {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}

.particles { position: absolute; inset: 0; }
.particle {
  position: absolute;
  font-size: 0.6rem;
  color: rgba(167, 139, 250, 0.3);
  top: calc(var(--i) * 5%);
  left: calc(var(--i) * 5%);
  animation: twinkle calc(3s + var(--i) * 0.5s) ease-in-out infinite;
}
@keyframes twinkle {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.5); }
}

/* --- NAVBAR --- */
.navbar {
  position: relative; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.5rem 3rem;
  backdrop-filter: blur(12px);
  background: rgba(8, 8, 18, 0.6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.nav-brand { display: flex; align-items: center; gap: 0.75rem; }
.brand-icon { font-size: 1.8rem; }
.brand-name { font-size: 1.3rem; color: #e2e8f0; letter-spacing: -0.5px; }
.brand-name strong { color: #a78bfa; }

.nav-actions { display: flex; gap: 1rem; }
.btn-ghost {
  background: transparent;
  border: 1px solid rgba(167, 139, 250, 0.4);
  color: #a78bfa;
  padding: 0.6rem 1.5rem;
  border-radius: 50px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-ghost:hover { background: rgba(167, 139, 250, 0.1); border-color: #a78bfa; }

.btn-primary {
  background: linear-gradient(135deg, #7c3aed, #a78bfa);
  border: none;
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 50px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(124, 58, 237, 0.4); }

/* --- HERO --- */
.hero {
  position: relative; z-index: 10;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 3rem;
  padding: 5rem 3rem 4rem;
  max-width: 1300px;
  margin: 0 auto;
  align-items: center;
}
.hero-content { flex: 1; }

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(167, 139, 250, 0.1);
  border: 1px solid rgba(167, 139, 250, 0.3);
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.85rem;
  color: #a78bfa;
  margin-bottom: 2rem;
}
.badge-dot {
  width: 8px; height: 8px;
  background: #a78bfa;
  border-radius: 50%;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  color: #f1f5f9;
  margin-bottom: 1.5rem;
  letter-spacing: -1px;
}
.gradient-text {
  background: linear-gradient(135deg, #a78bfa, #f472b6, #fb923c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.15rem;
  color: #94a3b8;
  line-height: 1.7;
  max-width: 520px;
  margin-bottom: 2.5rem;
}

.hero-cta { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-bottom: 3rem; }

.cta-primary {
  display: flex; align-items: center; gap: 0.75rem;
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  color: white; border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-family: 'Outfit', sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(124, 58, 237, 0.35);
}
.cta-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(124, 58, 237, 0.5); }
.cta-arrow { transition: transform 0.3s; }
.cta-primary:hover .cta-arrow { transform: translateX(4px); }

.cta-secondary {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.3s;
}
.cta-secondary:hover { color: #e2e8f0; }

/* Stats */
.hero-stats {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.stat-pill {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  padding: 0.75rem 1.2rem;
  border-radius: 16px;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}
.stat-pill:hover { transform: translateY(-3px); background: rgba(255,255,255,0.07); }
.stat-icon { font-size: 1.3rem; }
.stat-num { font-size: 1.1rem; font-weight: 700; }
.stat-lbl { font-size: 0.75rem; color: #64748b; }

/* Floating cards */
.floating-card {
  background: rgba(15, 15, 30, 0.85);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 1.2rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  width: 280px;
  animation: floatCard 6s ease-in-out infinite;
}
@keyframes floatCard {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.donor-float {
  grid-column: 2;
  cursor: pointer;
}
.float-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; }
.crown { font-size: 1.2rem; }
.float-title { font-size: 0.8rem; color: #a78bfa; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
.float-body { display: flex; align-items: center; gap: 0.75rem; }
.donor-avatar { width: 55px; height: 55px; border-radius: 50%; border: 2px solid #a78bfa; object-fit: cover; }
.donor-name-text { font-weight: 600; color: #e2e8f0; font-size: 0.95rem; }
.donor-meta { font-size: 0.78rem; color: #64748b; margin-top: 0.2rem; }
.float-badges { margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.07); }
.mini-badge {
  display: inline-block;
  background: rgba(167,139,250,0.15);
  color: #a78bfa;
  font-size: 0.72rem;
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  margin: 0.2rem;
}
.donor-quote { font-size: 0.8rem; color: #64748b; font-style: italic; margin-top: 0.75rem; line-height: 1.5; }

.notif-float {
  position: fixed;
  bottom: 2rem; left: 2rem;
  display: flex; align-items: center; gap: 0.75rem;
  width: auto;
  padding: 0.9rem 1.2rem;
  animation: slideInNotif 0.5s ease 2s both, floatCard 6s ease-in-out 2.5s infinite;
  z-index: 999;
}
@keyframes slideInNotif {
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
}
.notif-icon { font-size: 1.4rem; }
.notif-text { font-size: 0.85rem; color: #e2e8f0; font-weight: 500; }
.notif-time { font-size: 0.75rem; color: #64748b; }

/* --- ROLES SECTION --- */
.roles-section {
  position: relative; z-index: 10;
  padding: 5rem 3rem;
  max-width: 1300px;
  margin: 0 auto;
}
.section-header {
  text-align: center;
  margin-bottom: 3.5rem;
}
.section-header h2 {
  font-size: clamp(1.8rem, 3vw, 2.8rem);
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 0.75rem;
  letter-spacing: -0.5px;
}
.section-header p { color: #64748b; font-size: 1.05rem; }

.role-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}
.role-card {
  position: relative;
  background: rgba(15, 15, 30, 0.6);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 28px;
  padding: 2.5rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  backdrop-filter: blur(12px);
}
.role-card.hovered { transform: translateY(-8px); border-color: rgba(255,255,255,0.2); }
.card-glow {
  position: absolute;
  width: 200px; height: 200px;
  border-radius: 50%;
  filter: blur(60px);
  top: -50px; right: -50px;
  opacity: 0;
  transition: opacity 0.4s;
}
.role-card.hovered .card-glow { opacity: 0.5; }
.glow-giver { background: #7c3aed; }
.glow-seeker { background: #ec4899; }
.role-giver.hovered { box-shadow: 0 20px 60px rgba(124, 58, 237, 0.25); }
.role-seeker.hovered { box-shadow: 0 20px 60px rgba(236, 72, 153, 0.25); }

.role-emoji { font-size: 3rem; margin-bottom: 1.25rem; display: block; }
.role-card h3 { font-size: 1.5rem; font-weight: 700; color: #f1f5f9; margin-bottom: 0.75rem; }
.role-card p { color: #94a3b8; line-height: 1.6; margin-bottom: 1.5rem; }
.role-features { list-style: none; margin-bottom: 2rem; }
.role-features li { color: #94a3b8; font-size: 0.9rem; padding: 0.4rem 0; }
.role-cta {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1rem 1.25rem;
  background: rgba(255,255,255,0.05);
  border-radius: 14px;
  font-weight: 600;
  color: #e2e8f0;
  transition: all 0.3s;
}
.role-giver.hovered .role-cta { background: rgba(124,58,237,0.2); color: #a78bfa; }
.role-seeker.hovered .role-cta { background: rgba(236,72,153,0.2); color: #f472b6; }
.arrow-icon { font-size: 1.1rem; transition: transform 0.3s; }
.role-card.hovered .arrow-icon { transform: translateX(6px); }

/* --- TESTIMONIALS --- */
.testimonials-section {
  position: relative; z-index: 10;
  padding: 5rem 3rem;
  max-width: 900px;
  margin: 0 auto;
}
.testimonial-carousel { position: relative; min-height: 220px; }
.testimonial-item {
  position: absolute;
  top: 0; left: 0; width: 100%;
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.5s ease;
  pointer-events: none;
}
.testimonial-item.active {
  opacity: 1;
  transform: translateX(0);
  pointer-events: all;
}
.testimonial-card {
  background: rgba(15, 15, 30, 0.7);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 24px;
  padding: 2.5rem;
  backdrop-filter: blur(12px);
  position: relative;
}
.quote-mark {
  font-size: 5rem;
  line-height: 1;
  color: rgba(167,139,250,0.2);
  position: absolute;
  top: 1rem; left: 1.5rem;
  font-family: serif;
}
.testimonial-text {
  font-size: 1.1rem;
  color: #cbd5e1;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  padding-top: 1rem;
}
.testimonial-author { display: flex; align-items: center; gap: 1rem; }
.author-avatar-circle {
  width: 46px; height: 46px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 1.1rem; color: white;
}
.testimonial-author strong { display: block; color: #f1f5f9; font-size: 0.95rem; }
.testimonial-author span { color: #64748b; font-size: 0.83rem; }

.carousel-dots { display: flex; justify-content: center; gap: 0.5rem; margin-top: 2rem; }
.dot {
  width: 8px; height: 8px;
  border-radius: 50%; border: none;
  background: rgba(255,255,255,0.15);
  cursor: pointer;
  transition: all 0.3s;
  padding: 0;
}
.dot.active { background: #a78bfa; width: 24px; border-radius: 4px; }

/* --- HOW IT WORKS --- */
.how-section {
  position: relative; z-index: 10;
  padding: 5rem 3rem;
  max-width: 1000px;
  margin: 0 auto;
}
.steps-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.step {
  text-align: center;
  flex: 1; min-width: 180px;
  background: rgba(15,15,30,0.6);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 24px;
  padding: 2rem 1.5rem;
  backdrop-filter: blur(8px);
  transition: transform 0.3s;
}
.step:hover { transform: translateY(-5px); }
.step-num { font-size: 0.75rem; font-weight: 700; color: #a78bfa; letter-spacing: 2px; margin-bottom: 0.75rem; }
.step-icon { font-size: 2rem; margin-bottom: 1rem; }
.step h4 { font-size: 1rem; font-weight: 600; color: #f1f5f9; margin-bottom: 0.5rem; }
.step p { font-size: 0.85rem; color: #64748b; line-height: 1.5; }
.step-connector { font-size: 1.5rem; color: rgba(167,139,250,0.3); flex-shrink: 0; }

/* --- FOOTER --- */
.footer {
  position: relative; z-index: 10;
  border-top: 1px solid rgba(255,255,255,0.05);
  padding: 4rem 3rem 2rem;
  background: rgba(8,8,18,0.8);
  backdrop-filter: blur(12px);
}
.footer-inner {
  display: flex;
  gap: 4rem;
  max-width: 1300px;
  margin: 0 auto 3rem;
  flex-wrap: wrap;
}
.footer-brand-block { min-width: 200px; }
.footer-logo { font-size: 2.5rem; margin-bottom: 0.5rem; }
.footer-brand-block h3 { color: #f1f5f9; font-size: 1.1rem; margin-bottom: 0.4rem; }
.footer-brand-block p { color: #64748b; font-size: 0.88rem; margin-bottom: 1rem; }
.footer-socials { display: flex; gap: 0.5rem; font-size: 1.2rem; }
.footer-links-grid { display: flex; gap: 3rem; flex: 1; flex-wrap: wrap; }
.footer-links-grid div { display: flex; flex-direction: column; gap: 0.5rem; }
.footer-links-grid h4 { color: #e2e8f0; font-size: 0.9rem; margin-bottom: 0.5rem; }
.footer-links-grid a { color: #64748b; text-decoration: none; font-size: 0.88rem; transition: color 0.3s; }
.footer-links-grid a:hover { color: #a78bfa; }
.footer-bottom {
  text-align: center;
  border-top: 1px solid rgba(255,255,255,0.05);
  padding-top: 2rem;
  color: #475569;
  font-size: 0.85rem;
}

@media (max-width: 1024px) {
  .hero { grid-template-columns: 1fr; }
  .donor-float { display: none; }
  .navbar { padding: 1rem 1.5rem; }
  .hero { padding: 3rem 1.5rem; }
  .roles-section, .testimonials-section, .how-section, .footer { padding-left: 1.5rem; padding-right: 1.5rem; }
}
@media (max-width: 600px) {
  .hero-stats { gap: 0.75rem; }
  .stat-pill { padding: 0.5rem 0.75rem; }
  .steps-grid { flex-direction: column; }
  .step-connector { transform: rotate(90deg); }
}
</style>