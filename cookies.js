(function () {

function initCookieBanner() {

const css = `
/* ====== TON CSS COMPLET ====== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --brand: #C1440E;
  --brand-dark: #9B3209;
  --brand-light: #F5E8E1;
  --neutral-900: #1A1A1A;
  --neutral-600: #555;
  --neutral-200: #E8E8E8;
  --white: #FFFFFF;
  --radius: 16px;
  --shadow: 0 -4px 40px rgba(0,0,0,0.12), 0 -1px 8px rgba(0,0,0,0.06);
}

/* (⚠️ j’ai gardé TOUT ton CSS sans modification) */

#cookie-banner {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  background: var(--white);
  box-shadow: var(--shadow);
  border-radius: var(--radius) var(--radius) 0 0;
  padding: 32px 40px 28px;
  z-index: 9999;
  transform: translateY(100%);
  animation: slideUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.4s forwards;
}

@keyframes slideUp { to { transform: translateY(0); } }

.banner-inner {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 32px;
        align-items: center;
    }

    .banner-left {}

    .banner-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
    }

    .cookie-icon {
        width: 40px; height: 40px;
        background: var(--brand-light);
        border-radius: 10px;
        display: grid;
        place-items: center;
        font-size: 20px;
        flex-shrink: 0;
    }

    .banner-title {
        font-family: 'DM Serif Display', serif;
        font-size: 20px;
        color: var(--neutral-900);
        letter-spacing: -0.3px;
    }

    .banner-text {
        font-size: 14px;
        line-height: 1.65;
        color: var(--neutral-600);
        max-width: 680px;
    }

    .banner-links {
        display: flex;
        gap: 16px;
        margin-top: 10px;
    }

    .banner-links a {
        font-size: 13px;
        font-weight: 500;
        color: var(--brand);
        text-decoration: underline;
        text-underline-offset: 2px;
        cursor: pointer;
    }

    .banner-links a:hover { color: var(--brand-dark); }

    /* ── BUTTONS ── */
    .btn-group {
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 200px;
    }

    .btn {
        display: block;
        width: 100%;
        padding: 13px 24px;
        border: none;
        border-radius: 10px;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        text-align: center;
        transition: all 0.2s ease;
        letter-spacing: 0.01em;
    }

    .btn-accept {
        background: var(--brand);
        color: var(--white);
    }
    .btn-accept:hover {
        background: var(--brand-dark);
        transform: translateY(-1px);
        box-shadow: 0 4px 16px rgba(193,68,14,0.35);
    }

    .btn-refuse {
        background: var(--neutral-200);
        color: var(--neutral-900);
    }
    .btn-refuse:hover {
        background: #d8d8d8;
    }

    .btn-settings {
        background: transparent;
        color: var(--brand);
        border: 1.5px solid var(--brand);
    }
    .btn-settings:hover {
        background: var(--brand-light);
    }

    /* ── MODAL ── */
    #cookie-modal {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 10000;
        background: rgba(0,0,0,0.45);
        backdrop-filter: blur(4px);
        align-items: center;
        justify-content: center;
        padding: 20px;
    }
    #cookie-modal.open {
        display: flex;
        animation: fadeIn 0.25s ease;
    }
    @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }

    .modal-box {
        background: var(--white);
        border-radius: var(--radius);
        width: 100%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        padding: 36px;
        animation: popIn 0.3s cubic-bezier(0.22,1,0.36,1);
    }
    @keyframes popIn {
        from { transform: scale(0.95); opacity: 0; }
        to   { transform: scale(1);    opacity: 1; }
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 24px;
    }

    .modal-title {
        font-family: 'DM Serif Display', serif;
        font-size: 22px;
        color: var(--neutral-900);
    }

    .modal-close {
        background: none;
        border: none;
        font-size: 22px;
        cursor: pointer;
        color: var(--neutral-600);
        line-height: 1;
        padding: 4px;
        border-radius: 6px;
        transition: background 0.2s;
    }
    .modal-close:hover { background: var(--neutral-200); }

    .modal-desc {
        font-size: 13px;
        color: var(--neutral-600);
        line-height: 1.6;
        margin-bottom: 24px;
        padding-bottom: 24px;
        border-bottom: 1px solid var(--neutral-200);
    }

    /* Toggle rows */
    .cookie-category {
        padding: 18px 0;
        border-bottom: 1px solid var(--neutral-200);
    }
    .category-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        margin-bottom: 6px;
    }
    .category-name {
        font-weight: 600;
        font-size: 14px;
        color: var(--neutral-900);
    }
    .category-desc {
        font-size: 13px;
        color: var(--neutral-600);
        line-height: 1.55;
    }

    /* Toggle switch */
    .toggle {
        position: relative;
        width: 46px;
        height: 26px;
        flex-shrink: 0;
    }
    .toggle input { opacity: 0; width: 0; height: 0; }
    .toggle-slider {
        position: absolute;
        inset: 0;
        background: var(--neutral-200);
        border-radius: 99px;
        transition: background 0.25s;
        cursor: pointer;
    }
    .toggle-slider::before {
        content: '';
        position: absolute;
        width: 20px; height: 20px;
        left: 3px; bottom: 3px;
        background: white;
        border-radius: 50%;
        transition: transform 0.25s;
        box-shadow: 0 1px 4px rgba(0,0,0,0.2);
    }
    .toggle input:checked + .toggle-slider { background: var(--brand); }
    .toggle input:checked + .toggle-slider::before { transform: translateX(20px); }
    .toggle input:disabled + .toggle-slider { opacity: 0.6; cursor: not-allowed; }

    .badge-required {
        font-size: 11px;
        font-weight: 600;
        background: var(--brand-light);
        color: var(--brand);
        padding: 2px 8px;
        border-radius: 99px;
        text-transform: uppercase;
        letter-spacing: 0.04em;
    }

    /* Modal footer */
    .modal-footer {
        display: flex;
        gap: 12px;
        margin-top: 28px;
    }
    .modal-footer .btn { flex: 1; }

    /* ── POLITIQUE PAGE ── */
    #politique-modal {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 10001;
        background: rgba(0,0,0,0.5);
        backdrop-filter: blur(4px);
        align-items: center;
        justify-content: center;
        padding: 20px;
    }
    #politique-modal.open { display: flex; animation: fadeIn 0.25s ease; }

    .politique-box {
        background: var(--white);
        border-radius: var(--radius);
        width: 100%;
        max-width: 720px;
        max-height: 88vh;
        overflow-y: auto;
        padding: 40px;
    }

    .politique-box h2 {
        font-family: 'DM Serif Display', serif;
        font-size: 26px;
        color: var(--neutral-900);
        margin-bottom: 8px;
    }
    .politique-box .last-update {
        font-size: 12px;
        color: #999;
        margin-bottom: 28px;
    }
    .politique-box h3 {
        font-size: 15px;
        font-weight: 600;
        color: var(--neutral-900);
        margin: 22px 0 8px;
    }
    .politique-box p, .politique-box li {
        font-size: 13.5px;
        color: var(--neutral-600);
        line-height: 1.7;
    }
    .politique-box ul { padding-left: 20px; margin-top: 6px; }
    .politique-box li { margin-bottom: 6px; }
    .pclose-btn {
        display: block;
        margin: 32px auto 0;
        background: var(--brand);
        color: white;
        border: none;
        padding: 13px 40px;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
    }
    .pclose-btn:hover { background: var(--brand-dark); }

    /* ── TOAST ── */
    #toast {
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(80px);
        background: var(--neutral-900);
        color: var(--white);
        padding: 12px 24px;
        border-radius: 99px;
        font-size: 13px;
        font-weight: 500;
        z-index: 11000;
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
        white-space: nowrap;
    }
    #toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }

    /* ── RETIRER CONSENTEMENT (floating) ── */
    #revoke-btn {
        display: none;
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: var(--white);
        border: 1.5px solid var(--neutral-200);
        border-radius: 99px;
        padding: 9px 18px;
        font-size: 12px;
        font-weight: 600;
        color: var(--neutral-600);
        cursor: pointer;
        z-index: 8000;
        box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        transition: all 0.2s;
        gap: 6px;
        align-items: center;
    }
    #revoke-btn.visible { display: flex; }
    #revoke-btn:hover { border-color: var(--brand); color: var(--brand); }

    /* Responsive */
    @media (max-width: 700px) {
        #cookie-banner { padding: 24px 20px 20px; }
        .banner-inner { grid-template-columns: 1fr; gap: 20px; }
        .btn-group { flex-direction: row; flex-wrap: wrap; }
        .btn { flex: 1; min-width: 130px; }
        .modal-box, .politique-box { padding: 24px; }
        .modal-footer { flex-direction: column; }
    }
`;

const html = `
<!-- ====== TON HTML COMPLET ====== -->

<div id="cookie-banner">
  <div class="banner-inner">
    <div class="banner-left">
      <div class="banner-header">
        <div class="cookie-icon">🍪</div>
        <h2 class="banner-title">Ce site utilise des cookies</h2>
      </div>
      <p class="banner-text">
        Nous utilisons des cookies pour assurer le bon fonctionnement du site, mesurer l'audience et personnaliser votre expérience. Les cookies non essentiels ne seront déposés qu'avec votre consentement, conformément aux exigences de l'ARTCI en matière de protection des données à caractère personnel.
      </p>
      <div class="banner-links">
        <a onclick="openPolitique()">Politique de cookies</a>
        <a onclick="openPolitiqueConfidentialite()">Politique de confidentialité</a>
      </div>
    </div>

    <div class="btn-group">
      <button class="btn btn-accept" onclick="acceptAll()">✓ Accepter les cookies</button>
      <button class="btn btn-refuse"  onclick="refuseAll()">✕ Refuser</button>
      <button class="btn btn-settings" onclick="openSettings()">⚙ Paramétrer</button>
    </div>
  </div>
</div>

<!-- PARAMÉTRAGE MODAL -->
<div id="cookie-modal" role="dialog" aria-modal="true" aria-label="Paramètres des cookies">
  <div class="modal-box">
    <div class="modal-header">
      <h3 class="modal-title">Paramètres des cookies</h3>
      <button class="modal-close" onclick="closeSettings()" aria-label="Fermer">✕</button>
    </div>

    <p class="modal-desc">
      Vous pouvez personnaliser vos préférences ci-dessous. Les cookies essentiels sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés. Votre choix sera mémorisé pendant 13 mois maximum.
    </p>

    <!-- Essentiels -->
    <div class="cookie-category">
      <div class="category-row">
        <span class="category-name">Cookies essentiels</span>
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="badge-required">Obligatoires</span>
          <label class="toggle">
            <input type="checkbox" checked disabled>
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>
      <p class="category-desc">Indispensables au fonctionnement du site (session, sécurité, préférences de navigation). Ils ne collectent pas de données personnelles.</p>
    </div>

    <!-- Analytics -->
    <div class="cookie-category">
      <div class="category-row">
        <span class="category-name">Cookies analytiques</span>
        <label class="toggle">
          <input type="checkbox" id="pref-analytics">
          <span class="toggle-slider"></span>
        </label>
      </div>
      <p class="category-desc">Nous permettent de mesurer l'audience du site (pages vues, parcours utilisateurs) afin d'améliorer nos services. Les données sont anonymisées.</p>
    </div>

    <!-- Marketing -->
    <div class="cookie-category">
      <div class="category-row">
        <span class="category-name">Cookies marketing</span>
        <label class="toggle">
          <input type="checkbox" id="pref-marketing">
          <span class="toggle-slider"></span>
        </label>
      </div>
      <p class="category-desc">Permettent d'afficher des contenus personnalisés et de mesurer l'efficacité de nos communications. Ces cookies peuvent partager des données avec des partenaires tiers.</p>
    </div>

    <!-- Fonctionnels -->
    <div class="cookie-category">
      <div class="category-row">
        <span class="category-name">Cookies fonctionnels</span>
        <label class="toggle">
          <input type="checkbox" id="pref-functional">
          <span class="toggle-slider"></span>
        </label>
      </div>
      <p class="category-desc">Mémorisent vos préférences (langue, région, thème) pour personnaliser votre expérience de navigation.</p>
    </div>

    <div class="modal-footer">
      <button class="btn btn-refuse"  onclick="refuseAll()">Tout refuser</button>
      <button class="btn btn-accept"  onclick="saveSettings()">Enregistrer mes choix</button>
    </div>
  </div>
</div>

<!-- POLITIQUE MODAL -->
<div id="politique-modal" role="dialog" aria-modal="true" aria-label="Politique de cookies">
  <div class="politique-box">
    <h2>Politique de cookies</h2>
    <!-- <p class="last-update">Dernière mise à jour : mai 2026</p> -->

    <h3>1. Qu'est-ce qu'un cookie ?</h3>
    <p>Un « cookie » est une chaîne d'informations qui vous attribue un identifiant unique que nous stockons sur votre ordinateur. Votre navigateur fournit ensuite cet identifiant chaque fois que vous accédez au Site. Nous utilisons des cookies pour suivre les services que vous avez utilisés, enregistrer vos préférences, vous garder connecté au Site, faciliter vos transactions et suivre les pages que vous visitez.</p>

    <h3>2. Pourquoi utilisons-nous des cookies ?</h3>
    <p>Nous utilisons des cookies pour :</p>
    <ul>
      <li>Assurer le bon fonctionnement technique du site ;</li>
      <li>Mesurer l'audience et analyser la navigation ;</li>
      <li>Mémoriser vos préférences ;</li>
      <li>Vous proposer des contenus adaptés à vos centres d'intérêt.</li>
    </ul>

    <h3>3. Quels cookies utilisons-nous ?</h3>
    <ul>
      <li><strong>Essentiels</strong> – Ce sont des cookies internes, nécessaires au bon fonctionnement du Site. Leur désactivation peut affecter certaines fonctionnalités.</li>
      <li><strong>Cookies publicitaires</strong> – Placés par des annonceurs pour afficher des publicités pertinentes. Ces cookies collectent des informations sur vos visites sur le Site et d'autres sites web.</li>
      <li><strong>Cookies d'analyse</strong> –  Utilisés pour surveiller comment les utilisateurs accèdent au Site et interagissent avec celui-ci. Ils nous permettent d’améliorer nos services.</li>
      <li><strong>Cookies de personnalisation</strong> – Ils reconnaissent les visiteurs réguliers et enregistrent leurs préférences.</li>
      <li><strong>Cookies de sécurité</strong> – Utilisés pour authentifier les utilisateurs et protéger leurs données.</li>
      <li><strong>Cookies de gestion du site</strong> – Conservent votre session active et vos données saisies d'une page à l'autre</li>
      <li><strong>Cookies tiers</strong> – Placés par des services tiers pour collecter certaines informations. Ils peuvent être désactivés dans votre navigateur.</li>
      <!--<li><strong>Analytiques</strong> – mesure d'audience (ex. : Google Analytics) ;</li>-->
      <!--<li><strong>Marketing</strong> – personnalisation publicitaire ;</li>-->
      <!-- <li><strong>Fonctionnels</strong> – mémorisation de vos préférences.</li> -->
    </ul>

    <!-- 
    <h3>4. Durée de conservation</h3>
    <p>Votre consentement est conservé au maximum 13 mois. Au-delà, votre accord vous sera à nouveau demandé.</p>
    -->
    <h3>5. Vos droits</h3>
    <p>Conformément à la réglementation en vigueur et aux exigences de l'ARTCI, vous pouvez à tout moment :</p>
    <ul>
      <li>Retirer votre consentement via le bouton « Gérer mes cookies » ;</li>
      <li>Accéder, rectifier ou supprimer vos données en nous contactant à <strong>contact@paymetrust.net</strong>.</li>
    </ul>

    <h3>6. Blocage des cookies non essentiels</h3>
    <p>Aucun cookie non essentiel n'est déposé avant le recueil de votre consentement explicite, conformément aux bonnes pratiques de protection des données.</p>

    <button class="pclose-btn" onclick="closePolitique()">Fermer</button>
  </div>
</div>

<!-- POLITIQUE DE CONFIDENTIALITE MODAL -->
<div id="politique-confidentialite-modal" role="dialog" aria-label="Politique de confidentialité">
  <div class="ck-pol-box">
    <h2>Politique de confidentialité de PAYMETRUST</h2>
    <h3>Présentation</h3>
    <p>
      Nous vous remercions d'utiliser notre site web et nos services. Nous sommes PAYMETRUST, une Société par Actions Simplifiées de Droit Ivoirien, au capital d’un million (1.000.000) de Francs CFA, immatriculée au Registre du Commerce et du Crédit Mobilier d’Abidjan sous le numéro CI-ABJ-03-2022-B16-00086. Notre compte contribuable est le N°2242638H, et notre siège social est situé en Côte d’Ivoire, Abidjan, Cocody Angré 8ème tranche. Vous pouvez nous joindre à l'adresse e-mail contact@paymetrust.net ou visiter notre site web http://www.paymetrust.net
    </p>
    <h3>Informations supplémentaires</h3>
    <p>
      La présente politique de confidentialité explique comment vos informations personnelles sont collectées, pourquoi nous les collectons et ce que nous en faisons.
    </p>
    <h3>Principes Directeurs</h3>
    <p>
      Le principe de responsabilité En tant qu’entreprise offrant des prestations financières, nous respectons les réglementations en vigueur et les exigences relatives à la protection des données personnelles.
      Cette politique de confidentialité vous informe sur :
    </p>
    <ul>
      <li>Nos pratiques en matière de respect de la vie privée.</li>
      <li>Vos options concernant l’utilisation de notre site web, de nos plateformes de paiement (« Plateformes »), de nos applications (« Applications »), de nos notifications par e-mail et de nos outils.</li>
    </ul>
    <p>
      Nous décrivons ci-dessous :
    </p>
    <ul>
      <li>Les types d’informations personnelles que nous collectons.</li>
      <li>Les objectifs de leur collecte.</li>
      <li>Les mesures de sécurité prises pour protéger vos données.</li>
    </ul>

    <h3>Principes Appliqués</h3>
    <ul>
      <li><strong>Responsabilité :</strong> Vous êtes responsable de vos informations personnelles et de vos choix.</li>
      <li><strong>Sécurité des données :</strong> Nous prenons toutes les mesures nécessaires pour protéger vos données personnelles.</li>
      <li><strong>Transparence :</strong> Nous expliquons comment nous collectons, utilisons et protégeons vos données.</li>
      <li><strong>Respect des lois locales :</strong> Nos pratiques varient selon les pays, pour respecter les règles locales.</li>
      <li><strong>Consentement :</strong> Nous collectons vos données avec votre accord.</li>
      <li><strong>Finalité et pertinence :</strong> Nous collectons uniquement les données nécessaires pour fournir nos services.</li>
      <li><strong>Exactitude et confidentialité :</strong> Nous veillons à l’exactitude et à la confidentialité de vos données.</li>
    </ul>

    <h3>Informations Collectées</h3>
    <p>Nous pouvons collecter :</p>
    <ul>
      <li>Données d’identité : Nom, numéro d’identité, date de naissance.</li>
      <li>Données de contact : Adresse, e-mail, numéro de téléphone.</li>
      <li>Documents d’identification : Passeport, carte d’identité.</li>

      <li>Données techniques : Adresse IP, identifiant unique de l’appareil.</li>
      <li>Données financières : Numéro de compte, transactions.</li>
      <li>Données marketing : Historique d’abonnements ou préférences de communication.</li>
    </ul>


    <h3>Utilisation des Informations</h3> 
    <p>Nous utilisons vos données pour :</p>
    <ul>
      <li>Créer et gérer votre compte.</li>
      <li>Vérifier votre identité.</li>
      <li>Traiter vos transactions.</li>
      <li>Répondre à vos demandes.</li>
      <li>Proposer des produits et services adaptés.</li>
      <li>Respecter les lois, notamment celles contre le blanchiment d’argent.</li>
    </ul>

    <h3>Contact</h3>
    <p>
      Pour toute question ou préoccupation, veuillez nous contacter :
      E-mail: contact@paymetrust.net
    </p>

    <button class="pclose-btn" onclick="closePolitiqueConfidentialite()">Fermer</button>
  </div>
</div>

<!-- TOAST -->
<div id="toast"></div>

<!-- BOUTON RETRAIT CONSENTEMENT -->
<button id="revoke-btn" onclick="openSettings()" title="Modifier mes préférences cookies">
  🍪 Gérer mes cookies
</button>
`;


// Inject CSS
const style = document.createElement("style");
style.innerHTML = css;
document.head.appendChild(style);

// Inject HTML
document.body.insertAdjacentHTML("beforeend", html);


/* ====== TON JS COMPLET ====== */

/* ── Helpers ── */
  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 86400000);
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/;SameSite=Lax`;
  }
  function getCookie(name) {
    const m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return m ? m.pop() : null;
  }
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }
  function hideBanner() {
    const b = document.getElementById('cookie-banner');
    b.style.transform = 'translateY(100%)';
    b.style.transition = 'transform 0.4s ease';
    setTimeout(() => b.style.display = 'none', 400);
    document.getElementById('revoke-btn').classList.add('visible');
  }

  /* ── Actions ── */
  function acceptAll() {
    setCookie('cookie_consent', 'all', 395); // Consentement global
    // Consentement granulaire (pour analytics, marketing, fonctionnels)
    //setCookie('cookie_analytics', 'true', 395);
    //setCookie('cookie_marketing', 'true', 395);
    //setCookie('cookie_functional', 'true', 395);
    setCookie('cookie_analytics', 'true', 395);
    setCookie('cookie_marketing', 'true', 395);
    setCookie('cookie_functional', 'true', 395);
    setCookie('cookie_essential', 'true', 395);
    setCookie('cookie_security', 'true', 395);
    setCookie('cookie_preferences', 'true', 395);
    hideBanner();
    closeSettings();
    showToast('✓ Tous les cookies ont été acceptés');
    loadNonEssentialScripts({ analytics: true, marketing: true, functional: true });
  }

  function refuseAll() {
    setCookie('cookie_consent', 'essential', 395);
    setCookie('cookie_analytics', 'false', 395);
    setCookie('cookie_marketing', 'false', 395);
    setCookie('cookie_functional', 'false', 395);
    //setCookie('cookie_essential', 'true', 395);
    setCookie('cookie_security', 'false', 395);
    setCookie('cookie_preferences', 'false', 395);
    hideBanner();
    closeSettings();
    showToast('✕ Seuls les cookies essentiels sont actifs');
  }

  function saveSettings() {
    const analytics  = document.getElementById('pref-analytics').checked;
    const marketing  = document.getElementById('pref-marketing').checked;
    const functional = document.getElementById('pref-functional').checked;
    setCookie('cookie_consent', 'custom', 395);
    setCookie('cookie_analytics',  analytics  ? 'true' : 'false', 395);
    setCookie('cookie_marketing',  marketing  ? 'true' : 'false', 395);
    setCookie('cookie_functional', functional ? 'true' : 'false', 395);
    hideBanner();
    closeSettings();
    showToast('✓ Vos préférences ont été enregistrées');
    loadNonEssentialScripts({ analytics, marketing, functional });
  }

  function revokeConsent() {
    // Clear all consent cookies
    ['cookie_consent','cookie_analytics','cookie_marketing','cookie_functional'].forEach(c => {
      document.cookie = `${c}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
    });
    document.getElementById('revoke-btn').classList.remove('visible');
    const b = document.getElementById('cookie-banner');
    b.style.display = '';
    b.style.transform = 'translateY(0)';
    b.style.transition = '';
    showToast('↩ Vos préférences ont été réinitialisées');
  }

  /* ── Modals ── */
  function openSettings() {
    document.getElementById('cookie-modal').classList.add('open');
    // Restore toggle state from cookies
    document.getElementById('pref-analytics').checked  = getCookie('cookie_analytics')  === 'true';
    document.getElementById('pref-marketing').checked  = getCookie('cookie_marketing')  === 'true';
    document.getElementById('pref-functional').checked = getCookie('cookie_functional') === 'true';
  }
  function closeSettings() { document.getElementById('cookie-modal').classList.remove('open'); }
  function openPolitique() { document.getElementById('politique-modal').classList.add('open'); }
  function closePolitique() { document.getElementById('politique-modal').classList.remove('open'); }

  function openPolitiqueConfidentialite() { document.getElementById('politique-confidentialite-modal').classList.add('open'); }
  function closePolitiqueConfidentialite() { document.getElementById('politique-confidentialite-modal').classList.remove('open'); }

  // Expose handlers globally for inline onclick attributes
  window.acceptAll = acceptAll;
  window.refuseAll = refuseAll;
  window.saveSettings = saveSettings;
  window.revokeConsent = revokeConsent;
  window.openSettings = openSettings;
  window.closeSettings = closeSettings;
  window.openPolitique = openPolitique;
  window.closePolitique = closePolitique;

  window.openPolitiqueConfidentialite = openPolitiqueConfidentialite;
  window.closePolitiqueConfidentialite = closePolitiqueConfidentialite;

  // Close modals on backdrop click
  document.getElementById('cookie-modal').addEventListener('click', e => {
    if (e.target === document.getElementById('cookie-modal')) closeSettings();
  });
  document.getElementById('politique-modal').addEventListener('click', e => {
    if (e.target === document.getElementById('politique-modal')) closePolitique();
  });

  document.getElementById('politique-confidentialite-modal').addEventListener('click', e => {
    if (e.target === document.getElementById('politique-confidentialite-modal')) closePolitiqueConfidentialite();
  });

  /* ── Script loader (blocage avant consentement) ── */
  function loadNonEssentialScripts({ analytics, marketing, functional }) {
    if (analytics) {
      console.log('[Cookies] Analytics activés');
    }
    if (marketing) console.log('[Cookies] Marketing activés');
    if (functional) console.log('[Cookies] Fonctionnels activés');
  }

  /* ── Init : vérifier consentement existant ── */
  const consent = getCookie('cookie_consent');
  if (consent) {
    // Consentement déjà donné : cacher banner, montrer bouton retrait
    document.getElementById('cookie-banner').style.display = 'none';
    document.getElementById('revoke-btn').classList.add('visible');
    // Réactiver scripts selon préférences
    loadNonEssentialScripts({
      analytics:  getCookie('cookie_analytics')  === 'true',
      marketing:  getCookie('cookie_marketing')  === 'true',
      functional: getCookie('cookie_functional') === 'true',
    });
  }

}


// Init après chargement Framer
window.addEventListener("load", initCookieBanner);

})();
