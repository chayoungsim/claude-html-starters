# SCSS 코드 스타일 규칙
---
path : assets/scss/**/*
---

## 모듈 시스템
- `@use` / `@forward` 사용, `@import` 금지 (Dart Sass deprecated)
- `style.scss`는 `@use` 선언만 — 직접 스타일 작성 금지
- abstracts는 `@use "abstracts"` 하나로만 참조 (barrel 패턴)
- 새 컴포넌트 → `components/_*.scss` 생성 후 `style.scss`에 `@use` 등록

## 네이밍 (BEM)
- Block: `.card`
- Block__Element: `.card__title`, `.card__image`
- Block--Modifier: `.card--featured`, `.btn--primary`
- 요소명은 kebab-case: `.service-card__icon`
- BEM 3단계 중첩 금지: `.card__body__text` → `.card__text`로 평탄화
- JS 토글 상태는 `.is-*` 접두사 전용: `.is-open`, `.is-active`, `.is-scrolled`, `.is-error`
- 레이아웃 유틸리티는 `l-` 접두사 허용 (예: `.l-grid`)

## 색상 — CSS 변수 필수
- `color()` 함수 또는 `var(--color-*)` 사용: `color(bg)`, `color(text)`, `var(--color-border)`
- 색상 하드코딩 금지: `#ffffff`, `#222` 직접 사용 불가
- 새 색상 추가 시 `_variables.scss`(원시 토큰) + `_colors.scss`($themes 맵) 동시 수정
- CSS 변수만 쓰면 `_theme.scss`가 다크모드를 자동 처리

## 반응형 — Mobile-First
- `respond($bp)` 믹스인 필수, 직접 `@media` 작성 금지
- 브레이크포인트 순서: sm(576) → md(768) → lg(1024) → xl(1280) → 2xl(1440) → full(1920)
- 너비 하드코딩 금지: `width: 1280px` → `.container`로 대체

## 타이포그래피 — 유동 폰트
- 제목·본문 폰트는 `$font-size-*` 변수 또는 `fn.fluid()` 함수 사용
- 고정값 금지: `font-size: 1.6rem` (타이포그래피에 한함)
- `line-height`: `$line-height-tight`(1.2) / `$line-height-base`(1.6) / `$line-height-loose`(1.8)
- `font-weight`: `$font-weight-regular`(400) / `$font-weight-medium`(500) / `$font-weight-bold`(700)

| 변수 | 범위 |
|------|------|
| `$font-size-xs` | 1.2 → 1.4rem |
| `$font-size-sm` | 1.4 → 1.6rem |
| `$font-size-md` | 1.6 → 1.8rem |
| `$font-size-lg` | 1.8 → 2.2rem |
| `$font-size-xl` | 2.4 → 3.2rem |
| `$font-size-2xl` | 3.2 → 4.8rem |
| `$font-size-3xl` | 4.8 → 6.4rem |

## 속성 선언 순서
1. 레이아웃: `display`, `position`, `flex/grid`, `z-index`
2. 박스 모델: `width`, `height`, `margin`, `padding`
3. 시각: `background`, `border`, `border-radius`, `box-shadow`
4. 텍스트: `font`, `color`, `text-align`
5. 트랜지션·애니메이션
6. `&__Element` (BEM 자식)
7. `&--Modifier` (BEM 변형)
8. `&.is-*` (상태)
9. `@include respond()` — 오름차순
10. `&:hover`, `&:focus-visible`, `&::before`

## 접근성
- `outline: none` / `outline: 0` 사용 금지
- `:hover` 단독 사용 금지 → `:hover, :focus-visible` 쌍으로 선언
- `:focus-visible` 스타일: `outline: 2px solid color(primary); outline-offset: 2px`
- 아이콘 버튼: `aria-label` 또는 `.blind` 클래스 텍스트 필수
- 인터랙티브 요소 최소 터치 영역: `min-height: 4.4rem`

## 포매팅
- 들여쓰기: 스페이스 2칸
- 단위: `rem` 사용 (`border: 1px`, `outline: 2px` 예외)
- 색상: 소문자 hex (`#5dade2` ✅, `#5DADE2` ❌)
- 0값 단위 생략: `margin: 0` ✅, `margin: 0px` ❌
- 섹션 구분 주석: `// ─────────────────────────────────────────────`
- 선택자 사이 빈 줄 1개 유지
