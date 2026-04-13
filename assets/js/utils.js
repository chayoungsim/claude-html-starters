/**
 * gsap-reveal 공통 스크롤 진입 모션 유틸리티
 *
 * 사용법:
 *   class="gsap-reveal" 만으로 기본 동작 (위에서 페이드인)
 *
 * 데이터 속성:
 *   data-direction="up | down | left | right | fade"  — 진입 방향 (기본: up)
 *   data-delay="0.2"                                  — 지연 시간(초), 기본 0
 *   data-duration="1"                                 — 재생 시간(초), 기본 0.9
 *
 * 예시:
 *   <h2 class="gsap-reveal" data-direction="left" data-delay="0.2">제목</h2>
 *   <p  class="gsap-reveal" data-direction="fade" data-delay="0.4">설명</p>
 *
 * 의존성:
 *   gsap.min.js, ScrollTrigger.min.js 가 먼저 로드되어야 함
 */

(function () {
    // GSAP / ScrollTrigger 미로드 시 조용히 종료
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('[utils.js] GSAP 또는 ScrollTrigger가 로드되지 않았습니다.');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // 방향별 초기 상태 프리셋
    const DIRECTION_PRESET = {
        up:    { y: 50,  x: 0,   opacity: 0 },
        down:  { y: -50, x: 0,   opacity: 0 },
        left:  { y: 0,   x: -60, opacity: 0 },
        right: { y: 0,   x: 60,  opacity: 0 },
        fade:  { y: 0,   x: 0,   opacity: 0 },
    };

    function initRevealAnimation() {
        const elements = gsap.utils.toArray('.gsap-reveal');

        elements.forEach((el) => {
            const direction = el.dataset.direction || 'up';
            const delay     = parseFloat(el.dataset.delay)    || 0;
            const duration  = parseFloat(el.dataset.duration) || 0.9;
            const preset    = DIRECTION_PRESET[direction] || DIRECTION_PRESET.up;

            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none none', // 한 번만 실행
                },
                ...preset,
                duration,
                delay,
                ease: 'power3.out',
            });
        });
    }

    // DOM 준비 후 실행
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRevealAnimation);
    } else {
        initRevealAnimation();
    }
})();
