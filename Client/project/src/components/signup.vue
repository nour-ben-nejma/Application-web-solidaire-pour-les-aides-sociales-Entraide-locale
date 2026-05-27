<template>
  <div class="page">
    <!-- Left panel -->
    <div class="left-panel">
      <div class="panel-blobs">
        <div class="panel-blob blob-a"></div>
        <div class="panel-blob blob-b"></div>
      </div>
      <div class="panel-content">
        <div class="brand">
          <span class="brand-emoji">🤝</span>
          <h1>Solidarité<br><span class="gold">Connect</span></h1>
        </div>
        <p class="tagline">Votre partenaire solidaire pour un monde meilleur</p>

        <div class="features-list">
          <div class="feature-item">
            <span class="feature-icon">🌍</span>
            <div>
              <strong>Facilité d'accès</strong>
              <span>Disponible partout, pour tous</span>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🤝</span>
            <div>
              <strong>Solidarité locale</strong>
              <span>Connectez votre communauté</span>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">♻️</span>
            <div>
              <strong>Anti-gaspillage</strong>
              <span>Donnez une seconde vie</span>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🆓</span>
            <div>
              <strong>100% Gratuit</strong>
              <span>Toujours et pour toujours</span>
            </div>
          </div>
        </div>

        <div class="trust-badges">
          <span class="trust-badge">✓ Sécurisé</span>
          <span class="trust-badge">✓ Confidentiel</span>
          <span class="trust-badge">✓ Bienveillant</span>
        </div>
      </div>
    </div>

    <!-- Right form panel -->
    <div class="right-panel">
      <div class="form-wrapper">
        <button class="back-btn" @click="router.push('/')">← Retour</button>

        <div class="form-header">
          <h2>Créer votre compte 🌟</h2>
          <p>Rejoignez la communauté solidaire dès aujourd'hui</p>
        </div>

        <!-- Progress bar -->
        <div class="progress-steps">
          <div class="progress-fill"></div>
        </div>

        <form @submit.prevent="handleSubmit" class="reg-form">
          <!-- Avatar upload -->
          <div class="avatar-section">
            <input type="file" ref="logoInput" @change="handleFileUpload" accept="image/*" class="hidden" id="logo-upload">
            <label for="logo-upload" class="avatar-upload">
              <template v-if="logoPreview">
                <img :src="logoPreview" alt="Preview" class="avatar-preview">
                <div class="avatar-overlay">📷</div>
              </template>
              <template v-else>
                <div class="avatar-placeholder">
                  <span class="upload-emoji">📷</span>
                  <span class="upload-text">Photo</span>
                </div>
              </template>
            </label>
            <button v-if="logoPreview" type="button" @click="removeImage" class="remove-avatar">✕</button>
            <p class="avatar-hint">Photo de profil (optionnel)</p>
          </div>

          <!-- Fields grid -->
          <div class="fields-grid">
            <div class="field-group" :class="{ active: focused === 'firstName' }">
              <label>Prénom</label>
              <div class="input-wrap">
                <span class="input-icon">👤</span>
                <input
                  v-model="formData.FirstName"
                  type="text"
                  placeholder="Votre prénom"
                  required
                  @focus="focused = 'firstName'"
                  @blur="focused = ''"
                >
              </div>
            </div>

            <div class="field-group" :class="{ active: focused === 'lastName' }">
              <label>Nom de famille</label>
              <div class="input-wrap">
                <span class="input-icon">👤</span>
                <input
                  v-model="formData.LastName"
                  type="text"
                  placeholder="Votre nom"
                  required
                  @focus="focused = 'lastName'"
                  @blur="focused = ''"
                >
              </div>
            </div>

            <div class="field-group full-width" :class="{ active: focused === 'phone' }">
              <label>Téléphone</label>
              <div class="input-wrap">
                <span class="input-icon">📱</span>
                <input
                  v-model="formData.phoneNumber"
                  type="tel"
                  placeholder="+33 6 XX XX XX XX"
                  required
                  @focus="focused = 'phone'"
                  @blur="focused = ''"
                >
              </div>
            </div>

            <div class="field-group full-width" :class="{ active: focused === 'email' }">
              <label>Adresse email</label>
              <div class="input-wrap">
                <span class="input-icon">✉️</span>
                <input
                  v-model="formData.email"
                  type="email"
                  placeholder="votre@email.com"
                  required
                  @focus="focused = 'email'"
                  @blur="focused = ''"
                >
              </div>
            </div>

            <div class="field-group" :class="{ active: focused === 'pass' }">
              <label>Mot de passe</label>
              <div class="input-wrap">
                <span class="input-icon">🔒</span>
                <input
                  v-model="formData.password"
                  type="password"
                  placeholder="Min. 8 caractères"
                  required
                  @focus="focused = 'pass'"
                  @blur="focused = ''"
                >
              </div>
            </div>

            <div class="field-group" :class="{ active: focused === 'confirm', 'has-error': passwordMismatch }">
              <label>Confirmer le mot de passe</label>
              <div class="input-wrap">
                <span class="input-icon">🔒</span>
                <input
                  v-model="formData.confirmPassword"
                  type="password"
                  placeholder="Répétez votre mot de passe"
                  required
                  @focus="focused = 'confirm'"
                  @blur="focused = ''"
                >
                <span v-if="passwordMismatch" class="error-icon">⚠️</span>
              </div>
              <span v-if="passwordMismatch" class="error-text">Les mots de passe ne correspondent pas</span>
            </div>
          </div>

          <!-- Terms -->
          <label class="terms-check">
            <input type="checkbox" required>
            <span class="check-box"></span>
            <span>J'accepte les <a href="#">conditions d'utilisation</a> et la <a href="#">politique de confidentialité</a></span>
          </label>

          <!-- Messages -->
          <div v-if="errorMessage" class="alert alert-error">
            ⚠️ {{ errorMessage }}
            <button type="button" @click="errorMessage = ''" class="close-alert">✕</button>
          </div>
          <div v-if="successMessage" class="alert alert-success">
            ✅ {{ successMessage }}
          </div>

          <!-- Actions -->
          <div class="form-actions">
            <button type="submit" :disabled="isSubmitting || passwordMismatch" class="submit-btn">
              <span v-if="!isSubmitting">Créer mon compte ✨</span>
              <span v-else class="loader"></span>
            </button>
            <button type="button" @click="resetForm" class="reset-btn">Réinitialiser</button>
          </div>
        </form>

        <div class="form-footer">
          <p>Déjà membre ? <a @click="router.push('/signin')" class="login-link">Se connecter →</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const focused = ref('')
const logoPreview = ref('')
const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const logoInput = ref<HTMLInputElement | null>(null)

interface FormData {
  FirstName: string
  phoneNumber: string
  LastName: string
  email: string
  password: string
  confirmPassword: string
  logo?: File
}

const formData = ref<FormData>({
  FirstName: '',
  phoneNumber: '',
  LastName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const passwordMismatch = computed(() => {
  return formData.value.password !== formData.value.confirmPassword &&
    formData.value.confirmPassword.length > 0
})

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    formData.value.logo = file
    logoPreview.value = URL.createObjectURL(file)
  }
}

const removeImage = () => {
  formData.value.logo = undefined
  logoPreview.value = ''
  if (logoInput.value) logoInput.value.value = ''
}

const handleSubmit = async () => {
  if (passwordMismatch.value) return
  isSubmitting.value = true
  errorMessage.value = ''
  try {
    const response = await axios.post('http://localhost:3001/api/signup', {
      email: formData.value.email,
      password: formData.value.password,
      firstName: formData.value.FirstName,
      lastName: formData.value.LastName,
      phoneNumber: formData.value.phoneNumber,
    })
    successMessage.value = 'Compte créé avec succès ! Bienvenue 🎉'
    setTimeout(() => router.push('/signin'), 2000)
    console.log(response.data)
  } catch (error) {
    errorMessage.value = 'Une erreur est survenue. Veuillez réessayer.'
    console.error('Erreur lors de l\'inscription:', error)
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  formData.value = { FirstName: '', LastName: '', phoneNumber: '', email: '', password: '', confirmPassword: '' }
  removeImage()
  errorMessage.value = ''
  successMessage.value = ''
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.page {
  font-family: 'Outfit', sans-serif;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 38% 62%;
  background: #080812;
}

/* ---- LEFT PANEL ---- */
.left-panel {
  position: relative;
  background: linear-gradient(160deg, #0f0230, #1e0b4a, #080812);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2.5rem;
}
.panel-blobs { position: absolute; inset: 0; pointer-events: none; }
.panel-blob { position: absolute; border-radius: 50%; filter: blur(80px); }
.blob-a {
  width: 350px; height: 350px;
  background: radial-gradient(circle, #7c3aed, transparent);
  top: -80px; right: -80px; opacity: 0.35;
  animation: pulse 8s ease-in-out infinite;
}
.blob-b {
  width: 300px; height: 300px;
  background: radial-gradient(circle, #06b6d4, transparent);
  bottom: -60px; left: -60px; opacity: 0.25;
  animation: pulse 12s ease-in-out infinite reverse;
}
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }

.panel-content { position: relative; z-index: 1; color: white; }
.brand { display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 1.5rem; }
.brand-emoji { font-size: 2.5rem; margin-bottom: 0.5rem; }
.panel-content h1 { font-size: 2.4rem; font-weight: 800; line-height: 1.1; letter-spacing: -1px; color: #f1f5f9; }
.gold { color: #fbbf24; }
.tagline { color: rgba(255,255,255,0.55); font-size: 0.95rem; line-height: 1.6; margin-bottom: 2.5rem; }

.features-list { display: flex; flex-direction: column; gap: 1.2rem; margin-bottom: 2.5rem; }
.feature-item { display: flex; align-items: center; gap: 1rem; }
.feature-icon { font-size: 1.5rem; width: 42px; height: 42px; background: rgba(255,255,255,0.07); border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.feature-item strong { display: block; color: #e2e8f0; font-size: 0.92rem; }
.feature-item span { color: rgba(255,255,255,0.45); font-size: 0.8rem; }

.trust-badges { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.trust-badge {
  background: rgba(167,139,250,0.12);
  border: 1px solid rgba(167,139,250,0.25);
  color: #a78bfa;
  font-size: 0.78rem;
  padding: 0.35rem 0.75rem;
  border-radius: 50px;
}

/* ---- RIGHT PANEL ---- */
.right-panel {
  overflow-y: auto;
  display: flex;
  justify-content: center;
  padding: 3rem 2.5rem;
  background: #09091a;
}
.form-wrapper { width: 100%; max-width: 580px; }

.back-btn {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  color: #64748b;
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.3s;
}
.back-btn:hover { color: #a78bfa; border-color: rgba(167,139,250,0.4); }

.form-header { margin-bottom: 1.5rem; }
.form-header h2 { font-size: 1.8rem; font-weight: 700; color: #f1f5f9; margin-bottom: 0.3rem; }
.form-header p { color: #64748b; font-size: 0.92rem; }

.progress-steps {
  height: 3px;
  background: rgba(255,255,255,0.06);
  border-radius: 3px;
  margin-bottom: 2rem;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  width: 40%;
  background: linear-gradient(90deg, #7c3aed, #ec4899);
  border-radius: 3px;
  animation: progressGrow 2s ease forwards;
}
@keyframes progressGrow { from { width: 0; } to { width: 40%; } }

/* Avatar */
.avatar-section { display: flex; flex-direction: column; align-items: center; margin-bottom: 1.5rem; position: relative; }
.avatar-upload {
  width: 90px; height: 90px;
  border-radius: 50%;
  border: 2px dashed rgba(167,139,250,0.4);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s;
  background: rgba(167,139,250,0.05);
  position: relative;
}
.avatar-upload:hover { border-color: #a78bfa; background: rgba(167,139,250,0.1); }
.avatar-preview { width: 100%; height: 100%; object-fit: cover; }
.avatar-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.2rem; opacity: 0; transition: opacity 0.3s;
}
.avatar-upload:hover .avatar-overlay { opacity: 1; }
.avatar-placeholder { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; }
.upload-emoji { font-size: 1.5rem; }
.upload-text { font-size: 0.72rem; color: #64748b; }
.remove-avatar {
  position: absolute; top: -5px; right: calc(50% - 55px);
  width: 22px; height: 22px;
  background: #ef4444; color: white;
  border: none; border-radius: 50%;
  font-size: 0.65rem; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.3s;
}
.remove-avatar:hover { background: #dc2626; }
.avatar-hint { font-size: 0.78rem; color: #475569; margin-top: 0.5rem; }
.hidden { display: none; }

/* Fields */
.fields-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem; }
.field-group { display: flex; flex-direction: column; gap: 0.4rem; }
.field-group.full-width { grid-column: span 2; }
.field-group label { font-size: 0.83rem; color: #94a3b8; font-weight: 500; }

.input-wrap {
  display: flex; align-items: center;
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  transition: all 0.3s;
}
.field-group.active .input-wrap {
  border-color: #7c3aed;
  background: rgba(124,58,237,0.06);
  box-shadow: 0 0 0 3px rgba(124,58,237,0.12);
}
.field-group.has-error .input-wrap { border-color: #ef4444; }
.input-icon { padding: 0 0.6rem 0 0.85rem; font-size: 0.95rem; opacity: 0.6; }
.input-wrap input {
  flex: 1; background: transparent; border: none; outline: none;
  color: #e2e8f0; font-family: 'Outfit', sans-serif;
  font-size: 0.92rem; padding: 0.85rem 0.75rem 0.85rem 0;
}
.input-wrap input::placeholder { color: #334155; }
.error-icon { padding-right: 0.75rem; }
.error-text { font-size: 0.78rem; color: #f87171; }

/* Terms */
.terms-check {
  display: flex; align-items: flex-start; gap: 0.6rem;
  cursor: pointer; margin-bottom: 1.25rem;
  font-size: 0.84rem; color: #64748b; line-height: 1.5;
}
.terms-check input { display: none; }
.check-box {
  width: 18px; height: 18px; flex-shrink: 0;
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 5px; background: rgba(255,255,255,0.04);
  margin-top: 2px; transition: all 0.2s;
  display: flex; align-items: center; justify-content: center;
}
.terms-check input:checked ~ .check-box { background: #7c3aed; border-color: #7c3aed; }
.terms-check input:checked ~ .check-box::after { content: '✓'; font-size: 0.7rem; color: white; }
.terms-check a { color: #a78bfa; text-decoration: none; }

/* Alerts */
.alert {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.85rem 1rem; border-radius: 12px;
  font-size: 0.88rem; margin-bottom: 1rem;
}
.alert-error { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25); color: #f87171; }
.alert-success { background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.25); color: #34d399; }
.close-alert { background: none; border: none; color: inherit; cursor: pointer; font-size: 0.85rem; }

/* Actions */
.form-actions { display: flex; gap: 0.75rem; }
.submit-btn {
  flex: 1; padding: 1rem;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  border: none; border-radius: 12px;
  color: white; font-family: 'Outfit', sans-serif;
  font-size: 0.97rem; font-weight: 600;
  cursor: pointer; transition: all 0.3s;
  min-height: 52px; display: flex;
  align-items: center; justify-content: center;
  box-shadow: 0 4px 20px rgba(124,58,237,0.35);
}
.submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(124,58,237,0.5); }
.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.loader {
  width: 20px; height: 20px;
  border: 2.5px solid rgba(255,255,255,0.25);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.reset-btn {
  padding: 1rem 1.5rem;
  background: rgba(255,255,255,0.05);
  border: 1.5px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  color: #64748b;
  font-family: 'Outfit', sans-serif;
  font-size: 0.92rem;
  cursor: pointer;
  transition: all 0.3s;
}
.reset-btn:hover { background: rgba(255,255,255,0.08); color: #94a3b8; }

.form-footer { text-align: center; margin-top: 1.5rem; color: #64748b; font-size: 0.88rem; }
.login-link { color: #a78bfa; cursor: pointer; font-weight: 600; text-decoration: none; transition: color 0.3s; }
.login-link:hover { color: #c4b5fd; }

@media (max-width: 900px) {
  .page { grid-template-columns: 1fr; }
  .left-panel { display: none; }
  .right-panel { padding: 2rem 1.5rem; }
}
@media (max-width: 500px) {
  .fields-grid { grid-template-columns: 1fr; }
  .field-group.full-width { grid-column: auto; }
  .form-actions { flex-direction: column; }
}
</style>