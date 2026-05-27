<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const showPassword = ref(false)
const errorMsg = ref('')
const focused = ref('')

const handleSubmit = async () => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    const response = await axios.post('/api/login', {
      email: email.value,
      password: password.value,
    })
    console.log(response.data)
    router.push('/donorDashboard')
  } catch (error) {
    errorMsg.value = 'Email ou mot de passe incorrect. Réessayez.'
    console.error('Erreur lors de la connexion:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="page">
    <!-- Left decorative panel -->
    <div class="left-panel">
      <div class="panel-blobs">
        <div class="panel-blob blob-a"></div>
        <div class="panel-blob blob-b"></div>
      </div>
      <div class="panel-content">
        <div class="panel-logo">
          <span class="logo-emoji">🤝</span>
        </div>
        <h1>Solidarité<br><span class="gold">Connect</span></h1>
        <p class="panel-tagline">Rejoignez des milliers de personnes qui changent le monde, un geste à la fois.</p>

        <div class="panel-stats">
          <div class="p-stat">
            <span class="p-num">2,458+</span>
            <span class="p-label">Membres actifs</span>
          </div>
          <div class="p-stat">
            <span class="p-num">1,927</span>
            <span class="p-label">Vies touchées</span>
          </div>
        </div>

        <div class="panel-quote">
          <span class="q-mark">"</span>
          <p>Donner, c'est recevoir infiniment plus en retour.</p>
          <span class="q-author">— La communauté</span>
        </div>

        <div class="panel-hearts">
          <span v-for="i in 5" :key="i" class="heart" :style="{ '--d': `${i * 0.8}s` }">❤️</span>
        </div>
      </div>
    </div>

    <!-- Right form panel -->
    <div class="right-panel">
      <div class="form-wrapper">
        <!-- Back to home -->
        <button class="back-btn" @click="router.push('/')">← Accueil</button>

        <div class="form-header">
          <h2>Bon retour ! 👋</h2>
          <p>Connectez-vous pour continuer votre mission</p>
        </div>

        <!-- Error message -->
        <div v-if="errorMsg" class="error-alert">
          <span>⚠️</span> {{ errorMsg }}
        </div>

        <form @submit.prevent="handleSubmit" class="signin-form">
          <!-- Email -->
          <div class="field-group" :class="{ active: focused === 'email' }">
            <label for="email">Adresse email</label>
            <div class="field-input-wrap">
              <span class="field-icon">✉️</span>
              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="votre@email.com"
                required
                @focus="focused = 'email'"
                @blur="focused = ''"
              >
            </div>
          </div>

          <!-- Password -->
          <div class="field-group" :class="{ active: focused === 'password' }">
            <label for="password">Mot de passe</label>
            <div class="field-input-wrap">
              <span class="field-icon">🔒</span>
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                required
                @focus="focused = 'password'"
                @blur="focused = ''"
              >
              <button type="button" class="eye-btn" @click="showPassword = !showPassword">
                {{ showPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
          </div>

          <!-- Options -->
          <div class="form-options">
            <label class="checkbox-label">
              <input type="checkbox" class="custom-check">
              <span class="check-mark"></span>
              <span>Se souvenir de moi</span>
            </label>
            <a href="#" class="forgot-link">Mot de passe oublié ?</a>
          </div>

          <!-- Submit -->
          <button type="submit" class="submit-btn" :class="{ loading: isLoading }" :disabled="isLoading">
            <span v-if="!isLoading" class="btn-content">
              <span>Se connecter</span>
              <span class="btn-arrow">→</span>
            </span>
            <span v-else class="loader"></span>
          </button>
        </form>

        <!-- Divider -->
        <div class="divider">
          <span></span>
          <p>ou continuez avec</p>
          <span></span>
        </div>

        <!-- Social buttons -->
        <div class="social-btns">
          <button class="social-btn">🌐 Google</button>
          <button class="social-btn">🍎 Apple</button>
        </div>

        <!-- Register link -->
        <div class="form-footer">
          <p>Pas encore membre ? <a @click="router.push('/signup')" class="register-link">Créer un compte →</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.page {
  font-family: 'Outfit', sans-serif;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 45% 55%;
  background: #080812;
}

/* ---- LEFT PANEL ---- */
.left-panel {
  position: relative;
  background: linear-gradient(145deg, #1a0533, #2d1b69, #0f172a);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}
.panel-blobs { position: absolute; inset: 0; pointer-events: none; }
.panel-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
}
.blob-a {
  width: 400px; height: 400px;
  background: radial-gradient(circle, #7c3aed, transparent);
  top: -100px; left: -100px;
  opacity: 0.4;
  animation: blobPulse 8s ease-in-out infinite;
}
.blob-b {
  width: 300px; height: 300px;
  background: radial-gradient(circle, #ec4899, transparent);
  bottom: -80px; right: -80px;
  opacity: 0.3;
  animation: blobPulse 10s ease-in-out infinite reverse;
}
@keyframes blobPulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.2); opacity: 0.5; }
}

.panel-content { position: relative; z-index: 1; text-align: center; color: white; }
.logo-emoji { font-size: 3rem; display: block; margin-bottom: 0.75rem; }

.panel-content h1 {
  font-size: 2.8rem;
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1.1;
  margin-bottom: 1.25rem;
  color: #f1f5f9;
}
.gold { color: #fbbf24; }

.panel-tagline {
  color: rgba(255,255,255,0.65);
  font-size: 1rem;
  line-height: 1.6;
  max-width: 320px;
  margin: 0 auto 2rem;
}

.panel-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}
.p-stat { text-align: center; }
.p-num { display: block; font-size: 1.5rem; font-weight: 700; color: #a78bfa; }
.p-label { font-size: 0.78rem; color: rgba(255,255,255,0.5); }

.panel-quote {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 1.25rem;
  margin-bottom: 2rem;
  position: relative;
}
.q-mark {
  font-size: 2.5rem;
  color: rgba(167,139,250,0.3);
  line-height: 1;
  font-family: serif;
  position: absolute;
  top: 0.5rem; left: 0.75rem;
}
.panel-quote p { color: rgba(255,255,255,0.8); font-size: 0.92rem; font-style: italic; line-height: 1.6; }
.q-author { font-size: 0.78rem; color: #a78bfa; display: block; margin-top: 0.5rem; }

.panel-hearts { display: flex; justify-content: center; gap: 0.5rem; }
.heart {
  font-size: 0.9rem;
  animation: heartBeat 2s ease-in-out infinite;
  animation-delay: var(--d);
}
@keyframes heartBeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
}

/* ---- RIGHT PANEL ---- */
.right-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  background: #0a0a18;
}
.form-wrapper {
  width: 100%;
  max-width: 420px;
}

.back-btn {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  color: #64748b;
  font-family: 'Outfit', sans-serif;
  font-size: 0.88rem;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  cursor: pointer;
  margin-bottom: 2.5rem;
  transition: all 0.3s;
}
.back-btn:hover { color: #a78bfa; border-color: rgba(167,139,250,0.4); }

.form-header { margin-bottom: 2rem; }
.form-header h2 { font-size: 2rem; font-weight: 700; color: #f1f5f9; margin-bottom: 0.4rem; }
.form-header p { color: #64748b; font-size: 0.95rem; }

.error-alert {
  background: rgba(239,68,68,0.1);
  border: 1px solid rgba(239,68,68,0.3);
  color: #f87171;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  font-size: 0.88rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.signin-form { display: flex; flex-direction: column; gap: 1.25rem; }

.field-group { display: flex; flex-direction: column; gap: 0.5rem; }
.field-group label { font-size: 0.88rem; color: #94a3b8; font-weight: 500; }

.field-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  transition: all 0.3s;
}
.field-group.active .field-input-wrap {
  border-color: #7c3aed;
  background: rgba(124,58,237,0.07);
  box-shadow: 0 0 0 3px rgba(124,58,237,0.15);
}
.field-icon {
  padding: 0 0.75rem 0 1rem;
  font-size: 1rem;
  opacity: 0.6;
}
.field-input-wrap input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #e2e8f0;
  font-family: 'Outfit', sans-serif;
  font-size: 0.97rem;
  padding: 1rem 1rem 1rem 0;
}
.field-input-wrap input::placeholder { color: #475569; }
.eye-btn {
  background: none; border: none;
  padding: 0 1rem;
  font-size: 1.1rem;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s;
}
.eye-btn:hover { opacity: 1; }

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.88rem;
  color: #64748b;
}
.checkbox-label input { display: none; }
.check-mark {
  width: 18px; height: 18px;
  border: 1.5px solid rgba(255,255,255,0.15);
  border-radius: 5px;
  background: rgba(255,255,255,0.04);
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.checkbox-label input:checked + .check-mark {
  background: #7c3aed;
  border-color: #7c3aed;
}
.checkbox-label input:checked + .check-mark::after {
  content: '✓';
  font-size: 0.7rem;
  color: white;
}
.forgot-link {
  font-size: 0.88rem;
  color: #a78bfa;
  text-decoration: none;
  transition: color 0.3s;
}
.forgot-link:hover { color: #c4b5fd; }

.submit-btn {
  width: 100%;
  padding: 1.05rem;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  border: none;
  border-radius: 14px;
  color: white;
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 54px;
  box-shadow: 0 4px 20px rgba(124,58,237,0.4);
}
.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(124,58,237,0.55);
}
.submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

.btn-content { display: flex; align-items: center; gap: 0.5rem; }
.btn-arrow { transition: transform 0.3s; }
.submit-btn:hover .btn-arrow { transform: translateX(4px); }

.loader {
  width: 22px; height: 22px;
  border: 2.5px solid rgba(255,255,255,0.25);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.75rem 0;
}
.divider span { flex: 1; height: 1px; background: rgba(255,255,255,0.06); }
.divider p { color: #475569; font-size: 0.83rem; white-space: nowrap; }

.social-btns { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.social-btn {
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.08);
  color: #94a3b8;
  font-family: 'Outfit', sans-serif;
  font-size: 0.9rem;
  padding: 0.75rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
}
.social-btn:hover { background: rgba(255,255,255,0.08); color: #e2e8f0; border-color: rgba(255,255,255,0.15); }

.form-footer {
  text-align: center;
  margin-top: 1.75rem;
  color: #64748b;
  font-size: 0.9rem;
}
.register-link {
  color: #a78bfa;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s;
}
.register-link:hover { color: #c4b5fd; }

@media (max-width: 768px) {
  .page { grid-template-columns: 1fr; }
  .left-panel { display: none; }
}
</style>