/**
 * common.js — 공통 기능 모듈
 * 헤더/푸터 include 로드, 스크롤 감지, 테마 전환, 모바일 메뉴
 */

// ─────────────────────────────────────────────
// 실제 뷰포트 높이 CSS 변수 등록 (--vh)
// ─────────────────────────────────────────────
const setVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

window.addEventListener('resize', setVh);
setVh();

// ─────────────────────────────────────────────
// main 높이 = 뷰포트 - 푸터 / padding-top = 헤더 높이
// ─────────────────────────────────────────────
function setMainLayout() {
  const main = document.getElementById('container');
  const header = document.getElementById('header');
  const footer = document.querySelector('.footer');
  const subTop = document.querySelector('.page-hero');
  if (!main) return;

  const headerH = header ? header.offsetHeight : 0;
  const footerH = footer ? footer.offsetHeight : 0;

  main.style.minHeight = `${window.innerHeight - footerH}px`;
  //subTop.style.paddingTop = `${headerH}px`;
}

window.addEventListener('resize', setMainLayout);

// ─────────────────────────────────────────────
// HTML Include 로더 (data-include 속성 기반 fetch)
// ─────────────────────────────────────────────
async function loadIncludes() {
  const includes = document.querySelectorAll('[data-include]');
  const tasks = Array.from(includes).map(async (el) => {
    const file = el.dataset.include;
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      el.outerHTML = html;
    } catch (e) {
      console.warn(`[include] 로드 실패: ${file}`, e.message);
    }
  });
  await Promise.all(tasks);
}

// ─────────────────────────────────────────────
// 헤더 스크롤 Hide/Show (다운 시 숨김, 업 시 표시)
// ─────────────────────────────────────────────
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScrollY = window.scrollY;
  const THRESHOLD = 8; // 미세 진동 무시용 임계값

  const onScroll = () => {
    const currentScrollY = window.scrollY;
    const diff = currentScrollY - lastScrollY;

    // is-scrolled: 최상단 여부 (배경/그림자 처리)
    header.classList.toggle('is-scrolled', currentScrollY > 60);

    // 모바일 메뉴 열린 상태에서는 헤더 숨기지 않음
    const isMenuOpen = document.body.classList.contains('is-menu-open');
    if (!isMenuOpen) {
      if (diff > THRESHOLD) {
        // 스크롤 다운 → 헤더 숨김
        header.classList.add('is-hidden');
      } else if (diff < -THRESHOLD) {
        // 스크롤 업 → 헤더 표시
        header.classList.remove('is-hidden');
      }
    }

    // 최상단 도달 시 항상 표시
    if (currentScrollY <= 0) {
      header.classList.remove('is-hidden');
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // 초기 상태 반영
}




// ─────────────────────────────────────────────
// 헤더 네비게이션 호버 시 is-show 토글 (서브메뉴 펼침)
// ─────────────────────────────────────────────
function initNavHover() {
  const header = document.getElementById('header');
  const nav = document.querySelector('.header__nav-lists');
  if (!header || !nav) return;

  // 마우스 호버
  nav.addEventListener('mouseenter', () => {
    header.classList.add('is-show');
  });

  nav.addEventListener('mouseleave', () => {
    header.classList.remove('is-show');
  });

  // 키보드 포커스 (Tab 이동 시 동일하게 동작)
  nav.addEventListener('focusin', () => {
    header.classList.add('is-show');
  });

  nav.addEventListener('focusout', (e) => {
    // nav 내부로 포커스가 이동하는 경우는 닫지 않음
    if (!nav.contains(e.relatedTarget)) {
      header.classList.remove('is-show');
    }
  });
}

// ─────────────────────────────────────────────
// 다크/라이트 테마 토글 (localStorage 유지)
// ─────────────────────────────────────────────
function initThemeToggle() {
  // 저장된 테마 또는 시스템 환경설정 기준 초기값 적용
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', initialTheme);

  // 테마 버튼 클릭 이벤트 (동적 로드 이후를 위해 document에 위임)
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header__utils--theme')) return;

    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

// ─────────────────────────────────────────────
// 모바일 햄버거 메뉴
// ─────────────────────────────────────────────
function initMobileMenu() {
  // include 로드 이후 DOM을 다시 조회
  const btn = document.querySelector('.header__utils--mobile');
  const menu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('mobileMenuBackdrop');
  if (!btn || !menu) return;

  function openMenu() {
    btn.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    menu.classList.add('is-open');
    backdrop?.classList.add('is-open');
    document.body.classList.add('is-menu-open');
  }

  function closeMenu() {
    btn.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    menu.classList.remove('is-open');
    backdrop?.classList.remove('is-open');
    document.body.classList.remove('is-menu-open');
  }

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  // 백드롭 클릭 시 메뉴 닫기
  backdrop?.addEventListener('click', closeMenu);

  // ESC 키로 메뉴 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      btn.focus();
    }
  });
}

// ─────────────────────────────────────────────
// 언어 선택 토글 메뉴
// ─────────────────────────────────────────────
function initGlobalMenu() {
  const btn = document.querySelector('.global-link');
  const menu = document.querySelector('.toggle-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.contains('is-open');
    isOpen ? closeGlobal() : openGlobal();
  });

  function openGlobal() {
    menu.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
  }

  function closeGlobal() {
    menu.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  }

  // 외부 클릭 시 닫기
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.global')) closeGlobal();
  });

  // ESC 키로 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeGlobal();
  });
}

// ─────────────────────────────────────────────
// 현재 페이지 활성 메뉴 표시 (aria-current + is-active)
// ─────────────────────────────────────────────
function initActiveMenu() {
  const currentPath = window.location.pathname;
  const currentFile = currentPath.split('/').pop() || 'index.html';

  document.querySelectorAll('.header__nav a, .mobile-menu a').forEach((link) => {
    const href = link.getAttribute('href') || '';
    const linkFile = href.split('/').pop();

    if (linkFile && linkFile === currentFile) {
      link.setAttribute('aria-current', 'page');
      link.closest('li')?.classList.add('is-active');
    }
  });
}

// ─────────────────────────────────────────────
// 진입점: include 로드 후 전체 기능 초기화
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  // 테마는 include 이전에 적용해 FOUC(스타일 깜박임) 방지
  initThemeToggle();

  await loadIncludes();

  setMainLayout();
  initHeaderScroll();
  initNavHover();
  initMobileMenu();
  initGlobalMenu();
  //initActiveMenu();
});
