(function () {
  'use strict';

  // ---- PLAYLIST DATA ----
  var lessons = [
    { title: 'Boas-vindas e Visão Geral', duration: '08:30', completed: true },
    { title: 'Mentalidade de Alta Performance', duration: '22:15', completed: true },
    { title: 'Fundamentos da Estratégia Digital', duration: '45:20', completed: false },
    { title: 'Análise de Mercado Avançada', duration: '38:45', completed: false },
    { title: 'Construindo sua Autoridade Online', duration: '31:10', completed: false },
    { title: 'Funis de Conversão de Elite', duration: '42:00', completed: false },
    { title: 'Copywriting Persuasivo', duration: '35:55', completed: false },
    { title: 'Escalando com Tráfego Pago', duration: '40:30', completed: false },
  ];

  // ---- RENDER PLAYLIST ----
  var playlistEl = document.getElementById('playlist');
  lessons.forEach(function (lesson, i) {
    var active = i === 2;
    var div = document.createElement('div');
    div.className =
      'playlist-item flex items-center gap-3 px-5 py-3.5 border-l-2 cursor-pointer ' +
      (active ? 'active border-l-gold-500' : 'border-l-transparent');
    div.innerHTML =
      '<span class="pl-index w-7 h-7 rounded-full ' +
      (active
        ? 'bg-gold-500 text-deep-900'
        : lesson.completed
          ? 'bg-green-500/20 text-green-400'
          : 'bg-white/5 text-gray-500') +
      ' flex items-center justify-center text-xs font-bold shrink-0">' +
      (lesson.completed
        ? '<svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"/></svg>'
        : i + 1) +
      '</span>' +
      '<div class="min-w-0 flex-1">' +
      '<p class="text-sm ' +
      (active ? 'text-white font-medium' : 'text-gray-400') +
      ' truncate">' +
      lesson.title +
      '</p>' +
      '<p class="text-xs text-gray-600 mt-0.5">' +
      lesson.duration +
      '</p></div>' +
      (active
        ? '<span class="w-2 h-2 rounded-full bg-gold-400 shrink-0 animate-pulse"></span>'
        : '');

    div.addEventListener('click', function () {
      document.querySelectorAll('.playlist-item').forEach(function (el) {
        el.classList.remove('active', 'border-l-gold-500');
        el.classList.add('border-l-transparent');
        var idx = el.querySelector('.pl-index');
        if (idx && !el.querySelector('svg')) {
          idx.classList.remove('bg-gold-500', 'text-deep-900');
          idx.classList.add('bg-white/5', 'text-gray-500');
        }
      });
      div.classList.add('active', 'border-l-gold-500');
      div.classList.remove('border-l-transparent');
      var idx = div.querySelector('.pl-index');
      if (idx && !lesson.completed) {
        idx.classList.add('bg-gold-500', 'text-deep-900');
        idx.classList.remove('bg-white/5', 'text-gray-500');
      }
      document.getElementById('playerTitle').textContent =
        'Aula ' + (i + 1) + ': ' + lesson.title;
      document.getElementById('playerSubtitle').textContent =
        lesson.duration + ' de duração';
    });
    playlistEl.appendChild(div);
  });

  // ---- CURRICULUM DATA ----
  var modules = [
    { icon: '\u2605', title: 'Módulo 01: Fundamentos da Excelência', lessons: 8, duration: '3h 24min', items: ['Boas-vindas e Visão Geral', 'Mentalidade de Alta Performance', 'Fundamentos da Estratégia Digital', 'Análise de Mercado Avançada'] },
    { icon: '\u2696', title: 'Módulo 02: Construção de Autoridade', lessons: 7, duration: '2h 50min', items: ['Personal Branding Premium', 'Posicionamento de Mercado', 'Storytelling Corporativo', 'Networking Estratégico'] },
    { icon: '\u2699', title: 'Módulo 03: Estratégias de Conversão', lessons: 9, duration: '4h 10min', items: ['Funis de Alta Conversão', 'Landing Pages que Vendem', 'Copywriting Persuasivo', 'Gatilhos Mentais Avançados'] },
    { icon: '\u2666', title: 'Módulo 04: Tráfego e Aquisição', lessons: 7, duration: '3h 05min', items: ['Google Ads Masterclass', 'Meta Ads Avançado', 'YouTube Ads Strategy', 'Remarketing Inteligente'] },
    { icon: '\u2663', title: 'Módulo 05: Vendas de Alto Ticket', lessons: 6, duration: '2h 40min', items: ['Psicologia da Venda Premium', 'Scripts de Fechamento', 'Objeções e Negociação', 'Upsell e Cross-sell'] },
    { icon: '\u2665', title: 'Módulo 06: Automação e Escala', lessons: 8, duration: '3h 30min', items: ['Automação de Marketing', 'CRM e Pipeline', 'Métricas e KPIs', 'Dashboard de Performance'] },
    { icon: '\u2660', title: 'Módulo 07: Liderança Digital', lessons: 6, duration: '2h 45min', items: ['Gestão de Equipes Remotas', 'Cultura de Alta Performance', 'Delegação Estratégica', 'Comunicação Executiva'] },
    { icon: '\u2756', title: 'Módulo 08: Finanças do Negócio', lessons: 7, duration: '3h 00min', items: ['Planejamento Financeiro', 'Precificação Estratégica', 'Gestão de Fluxo de Caixa', 'Investimento e Reinvestimento'] },
    { icon: '\u2726', title: 'Módulo 09: Inteligência Artificial', lessons: 8, duration: '4h 15min', items: ['IA para Produtividade', 'Automação com ChatGPT', 'Análise de Dados com IA', 'Futuro da IA nos Negócios'] },
    { icon: '\u2736', title: 'Módulo 10: Branding Avançado', lessons: 6, duration: '2h 35min', items: ['Identidade Visual Premium', 'Experiência do Cliente', 'Brand Equity', 'Rebranding Estratégico'] },
    { icon: '\u273F', title: 'Módulo 11: Expansão Internacional', lessons: 6, duration: '2h 50min', items: ['Análise de Mercados Globais', 'Localização de Produtos', 'Logística Internacional', 'Compliance e Regulamentação'] },
    { icon: '\u272A', title: 'Módulo 12: Masterplan Final', lessons: 6, duration: '3h 00min', items: ['Plano de Ação 90 Dias', 'Revisão e Otimização', 'Mentoria ao Vivo', 'Certificação e Próximos Passos'] },
  ];

  // ---- RENDER ACCORDION ----
  var accordionEl = document.getElementById('accordion');
  modules.forEach(function (mod) {
    var div = document.createElement('div');
    div.className = 'accordion-item bg-deep-800 rounded-xl border border-white/5 overflow-hidden';
    div.innerHTML =
      '<button class="accordion-trigger w-full flex items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left hover:bg-white/[0.02] transition" aria-expanded="false">' +
      '<span class="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/20 text-gold-400 flex items-center justify-center text-lg shrink-0">' + mod.icon + '</span>' +
      '<div class="flex-1 min-w-0">' +
      '<p class="font-semibold text-sm sm:text-base truncate">' + mod.title + '</p>' +
      '<p class="text-xs text-gray-500 mt-0.5">' + mod.lessons + ' aulas &middot; ' + mod.duration + '</p>' +
      '</div>' +
      '<svg class="accordion-icon w-5 h-5 text-gray-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>' +
      '</button>' +
      '<div class="accordion-content"><div class="px-5 sm:px-6 pb-5 pt-1"><ul class="space-y-2.5">' +
      mod.items.map(function (item) {
        return '<li class="flex items-center gap-3 text-sm text-gray-400">' +
          '<svg class="w-4 h-4 text-gold-500/60 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/></svg>' +
          '<span>' + item + '</span></li>';
      }).join('') +
      '</ul></div></div>';

    var trigger = div.querySelector('.accordion-trigger');
    trigger.addEventListener('click', function () {
      var content = div.querySelector('.accordion-content');
      var isOpen = content.classList.contains('open');

      document.querySelectorAll('.accordion-item').forEach(function (el) {
        el.classList.remove('active');
        el.querySelector('.accordion-content').classList.remove('open');
        el.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        div.classList.add('active');
        content.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
    accordionEl.appendChild(div);
  });

  // ---- VIDEO MODAL ----
  var modal = document.getElementById('videoModal');
  var closeModalBtn = document.getElementById('closeModal');

  window.openTrailer = function () {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  document.getElementById('trailerBtn').addEventListener('click', window.openTrailer);
  closeModalBtn.addEventListener('click', closeModalFn);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModalFn();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModalFn();
  });

  function closeModalFn() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  // ---- MOBILE MENU ----
  document.getElementById('mobileMenuBtn').addEventListener('click', function () {
    document.getElementById('mobileMenu').classList.toggle('hidden');
  });

  // ---- CHECKOUT FORM VALIDATION ----
  var form = document.getElementById('checkoutForm');
  var fields = {
    name: {
      el: document.getElementById('f_name'),
      validate: function (v) { return v.trim().length >= 3 ? '' : 'Digite seu nome completo (mín. 3 caracteres)'; },
    },
    email: {
      el: document.getElementById('f_email'),
      validate: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Digite um e-mail válido'; },
    },
    cpf: {
      el: document.getElementById('f_cpf'),
      validate: function (v) { return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v) ? '' : 'Digite um CPF válido (000.000.000-00)'; },
    },
    card: {
      el: document.getElementById('f_card'),
      validate: function (v) { return v.replace(/\s/g, '').length >= 13 ? '' : 'Número do cartão inválido'; },
    },
    expiry: {
      el: document.getElementById('f_expiry'),
      validate: function (v) { return /^(0[1-9]|1[0-2])\/\d{2}$/.test(v) ? '' : 'Formato inválido (MM/AA)'; },
    },
    cvv: {
      el: document.getElementById('f_cvv'),
      validate: function (v) { return /^\d{3,4}$/.test(v) ? '' : 'CVV inválido'; },
    },
  };

  // Real-time validation on blur + input
  Object.entries(fields).forEach(function (entry) {
    var key = entry[0];
    var field = entry[1];
    field.el.addEventListener('blur', function () { validateField(key); });
    field.el.addEventListener('input', function () {
      if (field.el.classList.contains('error')) validateField(key);
    });
  });

  // CPF mask
  fields.cpf.el.addEventListener('input', function () {
    var v = this.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    this.value = v;
  });

  // Card mask
  fields.card.el.addEventListener('input', function () {
    var v = this.value.replace(/\D/g, '').slice(0, 16);
    this.value = v.replace(/(\d{4})(?=\d)/g, '$1 ');
  });

  // Expiry mask
  fields.expiry.el.addEventListener('input', function () {
    var v = this.value.replace(/\D/g, '').slice(0, 4);
    if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
    this.value = v;
  });

  // CVV mask
  fields.cvv.el.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').slice(0, 4);
  });

  function validateField(key) {
    var field = fields[key];
    var errMsg = field.validate(field.el.value);
    var errorEl = field.el.closest('div').querySelector('.error-msg');
    if (errMsg) {
      field.el.classList.add('error');
      field.el.classList.remove('valid');
      errorEl.textContent = errMsg;
      errorEl.classList.remove('hidden');
      return false;
    } else {
      field.el.classList.remove('error');
      field.el.classList.add('valid');
      errorEl.classList.add('hidden');
      return true;
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;
    Object.keys(fields).forEach(function (key) {
      if (!validateField(key)) valid = false;
    });
    if (valid) {
      form.classList.add('hidden');
      document.getElementById('successMsg').classList.remove('hidden');
    }
  });

  // ---- SCROLL ANIMATIONS ----
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.fade-up').forEach(function (el) {
    observer.observe(el);
  });

  // Close mobile menu on link click
  document.querySelectorAll('#mobileMenu a').forEach(function (link) {
    link.addEventListener('click', function () {
      document.getElementById('mobileMenu').classList.add('hidden');
    });
  });
})();
