# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 개발 명령어

```bash
# SCSS 워치만 실행
npm run sass

```

> `npm run dev`는 `live-server`(포트 3000)와 `sass --watch`를 동시에 실행한다. `fetch()` 기반 HTML include가 사용되므로 반드시 서버를 통해 열어야 한다 (`file://` 불가).

## 아키텍처 개요

### HTML include 방식
헤더/푸터는 별도 파일(`pages/_inc/header.html`, `pages/_inc/footer.html`)로 분리되어 있고, 각 페이지에서 `<div data-include="...">` 속성으로 삽입된다. `assets/js/common.js`의 `loadIncludes()`가 `DOMContentLoaded` 이후 `fetch()`로 비동기 로드한다. 이 때문에 헤더/푸터에 의존하는 기능(`initMobileMenu`, `initActiveMenu` 등)은 반드시 `loadIncludes()` await 이후에 초기화된다.

### SCSS 구조 (`assets/scss/`)
`style.scss`가 단일 진입점이며 7-1 패턴을 따른다.

| 디렉토리 | 역할 |
|----------|------|
| `abstracts/` | 변수(`_variables.scss`), 믹스인, 함수, 브레이크포인트, 색상 토큰 — 출력 CSS 없음 |
| `base/` | 리셋, 폰트, 공통 스타일, 테마, 접근성 |
| `layout/` | 헤더, 푸터, 컨테이너, 모바일 메뉴 |
| `components/` | 버튼, 모달, 폼 |

### 테마 시스템
`_colors.scss`의 `$themes` 맵에 `light`/`dark` 두 세트가 정의된다. `_theme.scss`가 `generate-theme-variables()` 믹스인으로 `:root`에 CSS 변수(`--color-*`)를 주입한다. JS는 `<html data-theme="dark|light">`를 토글하며 `localStorage`에 저장한다.

### 반응형 브레이크포인트 (Mobile-First)
`_breakpoints.scss`의 `respond($bp)` 믹스인을 사용한다.
- `sm`: 576px / `md`: 768px / `lg`: 1024px / `xl`: 1280px / `2xl`: 1440px / `full`: 1920px

### 페이지 구조
```
pages/
  _inc/         # 공통 헤더·푸터 조각
  main/         # 메인 페이지
  company/      # about, history
  project/      # project 목록
```
각 HTML은 `../../assets/css/style.css`와 `../../assets/js/common.js`를 상대 경로로 참조한다.

## 주요 규칙

- **색상 변경 시** `_variables.scss`와 `_colors.scss`의 `$themes` 맵을 함께 수정해야 다크모드에도 반영된다. CSS 변수(`--color-*`)를 직접 사용한다.
- **새 컴포넌트 추가 시** `assets/scss/components/_*.scss` 파일을 생성하고 `style.scss`에 `@use`로 등록한다.
- **헤더/푸터 수정**은 `pages/_inc/` 파일만 수정하면 모든 페이지에 반영된다. 개별 HTML에는 헤더/푸터 마크업을 직접 작성하지 않는다.
- **새 페이지 추가 시** `pages/_inc/header.html`과 `pages/_inc/`의 모바일 메뉴 양쪽에 링크를 추가한다.
