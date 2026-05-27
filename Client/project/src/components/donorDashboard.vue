<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Request {
  id: number
  requester: string
  type: string
  description: string
  status: 'pending' | 'accepted' | 'completed'
  date: string
  avatar: string
  urgency: 'low' | 'medium' | 'high'
}

interface Product {
  id: number
  name: string
  description: string
  category: string
  quantity: number
  image: string
}

const activeTab = ref('requests')
const showAddProduct = ref(false)
const sidebarOpen = ref(false)

const donorStats = {
  totalDonations: 47,
  peopleHelped: 156,
  rating: 4.9,
  joinDate: 'Mars 2023'
}

const requests = ref<Request[]>([
  {
    id: 1,
    requester: "Sophie Martin",
    type: "Aide alimentaire",
    description: "Besoin de produits alimentaires de base pour une famille de 4 personnes pendant ce mois difficile.",
    status: "pending",
    date: "2024-03-15",
    avatar: "S",
    urgency: "high"
  },
  {
    id: 2,
    requester: "Lucas Bernard",
    type: "Matériel scolaire",
    description: "Recherche des fournitures scolaires pour la rentrée de mes deux enfants.",
    status: "accepted",
    date: "2024-03-14",
    avatar: "L",
    urgency: "medium"
  },
  {
    id: 3,
    requester: "Amina Khelil",
    type: "Vêtements",
    description: "Cherche des vêtements d'hiver pour enfants tailles 8-10 ans.",
    status: "completed",
    date: "2024-03-10",
    avatar: "A",
    urgency: "low"
  }
])

const products = ref<Product[]>([
  {
    id: 1,
    name: "Panier alimentaire",
    description: "Panier contenant des produits alimentaires de base non périssables",
    category: "Alimentation",
    quantity: 5,
    image: "https://images.pexels.com/photos/2611810/pexels-photo-2611810.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 2,
    name: "Livres scolaires",
    description: "Ensemble de manuels scolaires primaire en bon état",
    category: "Éducation",
    quantity: 12,
    image: "https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=300"
  }
])

const newProduct = ref({
  name: '', description: '', category: '', quantity: 1, image: ''
})

const pendingCount = computed(() => requests.value.filter(r => r.status === 'pending').length)

const handleRequest = (requestId: number, action: 'accept' | 'complete') => {
  const request = requests.value.find(r => r.id === requestId)
  if (request) {
    request.status = action === 'accept' ? 'accepted' : 'completed'
  }
}

const addProduct = () => {
  products.value.push({ id: products.value.length + 1, ...newProduct.value })
  showAddProduct.value = false
  newProduct.value = { name: '', description: '', category: '', quantity: 1, image: '' }
}

const urgencyColors: Record<string, string> = {
  high: '#f43f5e',
  medium: '#fb923c',
  low: '#34d399'
}
const urgencyLabels: Record<string, string> = {
  high: 'Urgent',
  medium: 'Modéré',
  low: 'Faible'
}
const statusLabels: Record<string, string> = {
  pending: 'En attente',
  accepted: 'Accepté',
  completed: 'Terminé'
}
const statusColors: Record<string, string> = {
  pending: 'rgba(251,146,60,0.15)',
  accepted: 'rgba(52,211,153,0.15)',
  completed: 'rgba(96,165,250,0.15)'
}
const statusTextColors: Record<string, string> = {
  pending: '#fb923c',
  accepted: '#34d399',
  completed: '#60a5fa'
}
const avatarColors = ['#7c3aed', '#ec4899', '#0d9488', '#d97706', '#dc2626']
</script>

<template>
  <div class="dashboard-page">
    <!-- Background -->
    <div class="bg-layer">
      <div class="bg-blob b1"></div>
      <div class="bg-blob b2"></div>
    </div>

    <!-- Sidebar -->
    <aside class="sidebar" :class="{ open: sidebarOpen }">
      <div class="sidebar-brand">
        <span class="brand-emoji">🤝</span>
        <span class="brand-name">SolidaritéConnect</span>
      </div>

      <div class="donor-card">
        <div class="donor-avatar-big">M</div>
        <p class="donor-name">Marie-Claire D.</p>
        <p class="donor-role">Donneur actif ⭐</p>
        <div class="donor-mini-stats">
          <div class="mini-stat">
            <span class="mini-num">{{ donorStats.totalDonations }}</span>
            <span class="mini-lbl">Dons</span>
          </div>
          <div class="mini-stat">
            <span class="mini-num">{{ donorStats.peopleHelped }}</span>
            <span class="mini-lbl">Aidés</span>
          </div>
          <div class="mini-stat">
            <span class="mini-num">{{ donorStats.rating }}</span>
            <span class="mini-lbl">Note</span>
          </div>
        </div>
      </div>

      <nav class="sidebar-nav">
        <button
          class="nav-item"
          :class="{ active: activeTab === 'requests' }"
          @click="activeTab = 'requests'; sidebarOpen = false"
        >
          <span class="nav-icon">📋</span>
          <span>Demandes</span>
          <span v-if="pendingCount > 0" class="nav-badge">{{ pendingCount }}</span>
        </button>
        <button
          class="nav-item"
          :class="{ active: activeTab === 'products' }"
          @click="activeTab = 'products'; sidebarOpen = false"
        >
          <span class="nav-icon">🎁</span>
          <span>Mes Dons</span>
        </button>
        <button class="nav-item" @click="router.push('/')">
          <span class="nav-icon">🏠</span>
          <span>Accueil</span>
        </button>
      </nav>

      <div class="sidebar-footer">
        <div class="impact-badge">
          <span>💖</span>
          <span>Merci pour votre générosité !</span>
        </div>
      </div>
    </aside>

    <!-- Overlay for mobile -->
    <div class="sidebar-overlay" v-if="sidebarOpen" @click="sidebarOpen = false"></div>

    <!-- Main content -->
    <main class="main-area">
      <!-- Top bar -->
      <header class="topbar">
        <button class="hamburger" @click="sidebarOpen = !sidebarOpen">☰</button>
        <div class="topbar-title">
          <h1 v-if="activeTab === 'requests'">Demandes d'aide <span class="page-sub">gérez les requêtes</span></h1>
          <h1 v-else>Mes Dons <span class="page-sub">gérez vos offres</span></h1>
        </div>
        <button v-if="activeTab === 'products'" class="add-btn" @click="showAddProduct = true">
          + Ajouter un don
        </button>
      </header>

      <!-- Stats row -->
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-card-icon" style="background: rgba(124,58,237,0.15); color: #a78bfa;">📋</div>
          <div>
            <p class="sc-num">{{ requests.length }}</p>
            <p class="sc-lbl">Total demandes</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card-icon" style="background: rgba(251,146,60,0.15); color: #fb923c;">⏳</div>
          <div>
            <p class="sc-num">{{ requests.filter(r => r.status === 'pending').length }}</p>
            <p class="sc-lbl">En attente</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card-icon" style="background: rgba(52,211,153,0.15); color: #34d399;">✅</div>
          <div>
            <p class="sc-num">{{ requests.filter(r => r.status === 'completed').length }}</p>
            <p class="sc-lbl">Complétées</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card-icon" style="background: rgba(244,63,94,0.15); color: #f43f5e;">💖</div>
          <div>
            <p class="sc-num">{{ donorStats.peopleHelped }}</p>
            <p class="sc-lbl">Personnes aidées</p>
          </div>
        </div>
      </div>

      <!-- REQUESTS TAB -->
      <div v-if="activeTab === 'requests'" class="content-section">
        <div class="requests-grid">
          <div v-for="request in requests" :key="request.id" class="request-card">
            <!-- Header -->
            <div class="rc-header">
              <div class="requester-info">
                <div
                  class="req-avatar"
                  :style="{ background: avatarColors[request.id % avatarColors.length] }"
                >{{ request.avatar }}</div>
                <div>
                  <p class="req-name">{{ request.requester }}</p>
                  <p class="req-date">{{ request.date }}</p>
                </div>
              </div>
              <span
                class="status-pill"
                :style="{ background: statusColors[request.status], color: statusTextColors[request.status] }"
              >{{ statusLabels[request.status] }}</span>
            </div>

            <!-- Type & urgency -->
            <div class="rc-meta">
              <span class="type-chip">{{ request.type }}</span>
              <span
                class="urgency-chip"
                :style="{ background: urgencyColors[request.urgency] + '22', color: urgencyColors[request.urgency] }"
              >
                {{ urgencyLabels[request.urgency] }}
              </span>
            </div>

            <!-- Description -->
            <p class="req-desc">{{ request.description }}</p>

            <!-- Actions -->
            <div class="rc-actions">
              <button
                v-if="request.status === 'pending'"
                class="action-btn accept-btn"
                @click="handleRequest(request.id, 'accept')"
              >
                <span>✓</span> Accepter
              </button>
              <button
                v-if="request.status === 'accepted'"
                class="action-btn complete-btn"
                @click="handleRequest(request.id, 'complete')"
              >
                <span>🎉</span> Marquer terminé
              </button>
              <button v-if="request.status === 'completed'" class="action-btn done-btn" disabled>
                ✓ Complété
              </button>
              <button class="action-btn msg-btn">💬 Message</button>
            </div>
          </div>
        </div>
      </div>

      <!-- PRODUCTS TAB -->
      <div v-if="activeTab === 'products'" class="content-section">
        <div class="products-grid">
          <div v-for="product in products" :key="product.id" class="product-card">
            <div class="product-img-wrap">
              <img :src="product.image" :alt="product.name" class="product-img">
              <span class="product-category-badge">{{ product.category }}</span>
            </div>
            <div class="product-body">
              <h3>{{ product.name }}</h3>
              <p>{{ product.description }}</p>
              <div class="product-footer">
                <span class="qty-badge">📦 {{ product.quantity }} disponibles</span>
                <button class="product-edit-btn">✏️</button>
              </div>
            </div>
          </div>

          <!-- Add placeholder -->
          <div class="product-card add-card" @click="showAddProduct = true">
            <div class="add-icon">+</div>
            <p>Ajouter un don</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Add Product Modal -->
    <div v-if="showAddProduct" class="modal-overlay" @click.self="showAddProduct = false">
      <div class="modal">
        <div class="modal-header">
          <h2>🎁 Ajouter un don</h2>
          <button class="modal-close" @click="showAddProduct = false">✕</button>
        </div>
        <form @submit.prevent="addProduct" class="modal-form">
          <div class="modal-field">
            <label>Nom du produit</label>
            <input v-model="newProduct.name" placeholder="Ex: Panier alimentaire" required>
          </div>
          <div class="modal-field">
            <label>Description</label>
            <textarea v-model="newProduct.description" placeholder="Décrivez votre don..." required></textarea>
          </div>
          <div class="modal-row">
            <div class="modal-field">
              <label>Catégorie</label>
              <input v-model="newProduct.category" placeholder="Ex: Alimentation" required>
            </div>
            <div class="modal-field">
              <label>Quantité</label>
              <input type="number" v-model="newProduct.quantity" min="1" required>
            </div>
          </div>
          <div class="modal-field">
            <label>URL de l'image</label>
            <input type="url" v-model="newProduct.image" placeholder="https://...">
          </div>
          <div class="modal-actions">
            <button type="button" @click="showAddProduct = false" class="cancel-btn">Annuler</button>
            <button type="submit" class="confirm-btn">Ajouter le don ✨</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.dashboard-page {
  font-family: 'Outfit', sans-serif;
  min-height: 100vh;
  background: #080812;
  color: #e2e8f0;
  display: flex;
  position: relative;
}

.bg-layer { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
.bg-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.08;
}
.b1 { width: 600px; height: 600px; background: #7c3aed; top: -200px; left: -100px; }
.b2 { width: 500px; height: 500px; background: #ec4899; bottom: -150px; right: -100px; }

/* SIDEBAR */
.sidebar {
  width: 260px;
  min-height: 100vh;
  background: rgba(10,10,25,0.95);
  border-right: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  position: relative;
  z-index: 10;
  flex-shrink: 0;
  backdrop-filter: blur(12px);
}

.sidebar-brand { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 2rem; }
.brand-emoji { font-size: 1.5rem; }
.brand-name { font-size: 1rem; font-weight: 700; color: #f1f5f9; }

.donor-card {
  background: linear-gradient(135deg, rgba(124,58,237,0.2), rgba(236,72,153,0.1));
  border: 1px solid rgba(167,139,250,0.2);
  border-radius: 18px;
  padding: 1.25rem;
  text-align: center;
  margin-bottom: 1.5rem;
}
.donor-avatar-big {
  width: 56px; height: 56px;
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.3rem; font-weight: 700; color: white;
  margin: 0 auto 0.75rem;
  box-shadow: 0 4px 15px rgba(124,58,237,0.4);
}
.donor-name { font-weight: 600; color: #f1f5f9; font-size: 0.92rem; }
.donor-role { font-size: 0.78rem; color: #a78bfa; margin: 0.2rem 0 1rem; }
.donor-mini-stats { display: flex; justify-content: space-around; }
.mini-stat { text-align: center; }
.mini-num { display: block; font-weight: 700; color: #f1f5f9; font-size: 1rem; }
.mini-lbl { font-size: 0.7rem; color: #64748b; }

.sidebar-nav { flex: 1; display: flex; flex-direction: column; gap: 0.4rem; }
.nav-item {
  display: flex; align-items: center; gap: 0.75rem;
  padding: 0.85rem 1rem;
  background: transparent;
  border: none; border-radius: 12px;
  color: #64748b;
  font-family: 'Outfit', sans-serif;
  font-size: 0.92rem;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
  width: 100%;
}
.nav-item:hover { background: rgba(255,255,255,0.05); color: #e2e8f0; }
.nav-item.active { background: rgba(124,58,237,0.2); color: #a78bfa; }
.nav-icon { font-size: 1.1rem; }
.nav-badge {
  margin-left: auto;
  background: #f43f5e;
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.1rem 0.45rem;
  border-radius: 50px;
  min-width: 20px;
  text-align: center;
}

.sidebar-footer { margin-top: 1rem; }
.impact-badge {
  background: rgba(52,211,153,0.1);
  border: 1px solid rgba(52,211,153,0.2);
  border-radius: 12px;
  padding: 0.75rem;
  display: flex; align-items: center; gap: 0.5rem;
  font-size: 0.8rem; color: #34d399;
}

/* TOPBAR */
.hamburger {
  display: none;
  background: none; border: none;
  color: #94a3b8; font-size: 1.3rem;
  cursor: pointer;
}

/* MAIN */
.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 5;
  overflow: hidden;
}

.topbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  background: rgba(8,8,18,0.7);
  backdrop-filter: blur(12px);
}
.topbar-title { flex: 1; }
.topbar h1 { font-size: 1.4rem; font-weight: 700; color: #f1f5f9; }
.page-sub { font-size: 0.8rem; font-weight: 400; color: #64748b; margin-left: 0.5rem; }

.add-btn {
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  border: none; border-radius: 10px;
  color: white; font-family: 'Outfit', sans-serif;
  font-size: 0.9rem; font-weight: 600;
  padding: 0.65rem 1.25rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(124,58,237,0.35);
}
.add-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(124,58,237,0.5); }

/* STATS */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 1.5rem 2rem;
}
.stat-card {
  background: rgba(15,15,30,0.7);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  backdrop-filter: blur(8px);
  transition: transform 0.3s;
}
.stat-card:hover { transform: translateY(-3px); }
.stat-card-icon {
  width: 46px; height: 46px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}
.sc-num { font-size: 1.4rem; font-weight: 700; color: #f1f5f9; }
.sc-lbl { font-size: 0.75rem; color: #64748b; }

/* CONTENT */
.content-section { padding: 1.5rem 2rem; overflow-y: auto; flex: 1; }

/* REQUESTS */
.requests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 1.25rem;
}
.request-card {
  background: rgba(15,15,30,0.7);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 20px;
  padding: 1.5rem;
  backdrop-filter: blur(8px);
  transition: all 0.3s;
}
.request-card:hover { border-color: rgba(167,139,250,0.2); transform: translateY(-3px); }

.rc-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.requester-info { display: flex; align-items: center; gap: 0.75rem; }
.req-avatar {
  width: 42px; height: 42px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 1rem; color: white;
}
.req-name { font-weight: 600; color: #e2e8f0; font-size: 0.92rem; }
.req-date { font-size: 0.75rem; color: #475569; }

.status-pill {
  font-size: 0.75rem; font-weight: 600;
  padding: 0.3rem 0.75rem;
  border-radius: 50px;
}

.rc-meta { display: flex; gap: 0.5rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
.type-chip {
  background: rgba(167,139,250,0.12);
  color: #a78bfa;
  font-size: 0.78rem;
  padding: 0.25rem 0.7rem;
  border-radius: 50px;
}
.urgency-chip {
  font-size: 0.78rem;
  padding: 0.25rem 0.7rem;
  border-radius: 50px;
  font-weight: 600;
}

.req-desc {
  color: #94a3b8;
  font-size: 0.88rem;
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.rc-actions { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.action-btn {
  display: flex; align-items: center; gap: 0.4rem;
  padding: 0.55rem 1rem;
  border: none; border-radius: 10px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.83rem; font-weight: 600;
  cursor: pointer; transition: all 0.3s;
}
.accept-btn { background: rgba(52,211,153,0.15); color: #34d399; }
.accept-btn:hover { background: rgba(52,211,153,0.25); }
.complete-btn { background: rgba(96,165,250,0.15); color: #60a5fa; }
.complete-btn:hover { background: rgba(96,165,250,0.25); }
.done-btn { background: rgba(100,116,139,0.1); color: #475569; cursor: default; }
.msg-btn { background: rgba(255,255,255,0.05); color: #94a3b8; }
.msg-btn:hover { background: rgba(255,255,255,0.09); }

/* PRODUCTS */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
}
.product-card {
  background: rgba(15,15,30,0.7);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s;
  backdrop-filter: blur(8px);
}
.product-card:hover { transform: translateY(-4px); border-color: rgba(167,139,250,0.2); }
.product-img-wrap { position: relative; }
.product-img { width: 100%; height: 180px; object-fit: cover; }
.product-category-badge {
  position: absolute; top: 0.75rem; left: 0.75rem;
  background: rgba(0,0,0,0.7);
  color: #a78bfa;
  font-size: 0.72rem; font-weight: 600;
  padding: 0.3rem 0.65rem;
  border-radius: 50px;
  backdrop-filter: blur(4px);
}
.product-body { padding: 1.25rem; }
.product-body h3 { font-size: 1rem; font-weight: 600; color: #f1f5f9; margin-bottom: 0.4rem; }
.product-body p { font-size: 0.83rem; color: #64748b; line-height: 1.5; margin-bottom: 1rem; }
.product-footer { display: flex; justify-content: space-between; align-items: center; }
.qty-badge { font-size: 0.8rem; color: #34d399; background: rgba(52,211,153,0.1); padding: 0.3rem 0.65rem; border-radius: 8px; }
.product-edit-btn { background: rgba(255,255,255,0.05); border: none; padding: 0.4rem 0.6rem; border-radius: 8px; cursor: pointer; transition: background 0.3s; }
.product-edit-btn:hover { background: rgba(255,255,255,0.1); }

.add-card {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  min-height: 240px;
  cursor: pointer;
  border-style: dashed !important;
  border-color: rgba(167,139,250,0.25) !important;
  color: #64748b; gap: 0.75rem;
  transition: all 0.3s;
}
.add-card:hover { border-color: rgba(167,139,250,0.5) !important; color: #a78bfa; }
.add-icon { font-size: 2rem; font-weight: 300; }
.add-card p { font-size: 0.9rem; }

/* MODAL */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
}
.modal {
  background: #0f0f22;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 24px;
  padding: 2rem;
  width: 90%; max-width: 520px;
  max-height: 90vh; overflow-y: auto;
  box-shadow: 0 30px 60px rgba(0,0,0,0.6);
}
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.modal-header h2 { font-size: 1.3rem; font-weight: 700; color: #f1f5f9; }
.modal-close {
  background: rgba(255,255,255,0.07); border: none;
  color: #94a3b8; width: 32px; height: 32px;
  border-radius: 8px; cursor: pointer; font-size: 0.85rem;
  transition: all 0.3s;
}
.modal-close:hover { background: rgba(255,255,255,0.12); }

.modal-form { display: flex; flex-direction: column; gap: 1rem; }
.modal-field { display: flex; flex-direction: column; gap: 0.4rem; }
.modal-field label { font-size: 0.85rem; color: #94a3b8; font-weight: 500; }
.modal-field input, .modal-field textarea {
  background: rgba(255,255,255,0.05);
  border: 1.5px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  color: #e2e8f0;
  font-family: 'Outfit', sans-serif;
  font-size: 0.93rem;
  padding: 0.85rem 1rem;
  outline: none; transition: all 0.3s;
}
.modal-field input:focus, .modal-field textarea:focus {
  border-color: #7c3aed;
  background: rgba(124,58,237,0.06);
}
.modal-field textarea { min-height: 90px; resize: vertical; }
.modal-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.modal-actions { display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem; }
.cancel-btn {
  padding: 0.75rem 1.5rem;
  background: rgba(255,255,255,0.06);
  border: 1.5px solid rgba(255,255,255,0.08);
  border-radius: 10px; color: #64748b;
  font-family: 'Outfit', sans-serif;
  cursor: pointer; transition: all 0.3s;
}
.cancel-btn:hover { background: rgba(255,255,255,0.09); }
.confirm-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  border: none; border-radius: 10px;
  color: white; font-family: 'Outfit', sans-serif;
  font-weight: 600; cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(124,58,237,0.35);
}
.confirm-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(124,58,237,0.5); }

.sidebar-overlay { display: none; }

@media (max-width: 1024px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed; left: -280px; top: 0; bottom: 0;
    width: 260px; z-index: 200;
    transition: left 0.3s ease;
  }
  .sidebar.open { left: 0; }
  .sidebar-overlay {
    display: block;
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 199;
  }
  .hamburger { display: block; }
  .main-area { margin-left: 0; }
  .stats-row { grid-template-columns: 1fr 1fr; padding: 1rem; }
  .content-section { padding: 1rem; }
  .topbar { padding: 1rem; }
}

@media (max-width: 480px) {
  .stats-row { grid-template-columns: 1fr; }
  .requests-grid { grid-template-columns: 1fr; }
  .modal-row { grid-template-columns: 1fr; }
}
</style>