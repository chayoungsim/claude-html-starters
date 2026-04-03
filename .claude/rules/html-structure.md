# HTML 구조 규칙
- 들여쓰기 : 스페이스 4칸

## 기본 문서 구조
```html
<!DOCTYPE html>
<html lang="ko" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>페이지명 | 브랜드명</title>
  <link rel="stylesheet" href="../../assets/css/style.css">
</head>
<body>
  <p id="accessibility"><a href="#container">본문바로가기</a></p>
  <div id="wrap">
    <div data-include="../../pages/_inc/header.html"></div>

    <div id="container">
      <!-- 페이지 콘텐츠 -->
    </div>

    <div data-include="../../pages/_inc/footer.html"></div>
  </div>
  <script src="../../assets/js/common.js"></script>
</body>
</html>
```

## include 방식
- 헤더/푸터는 `<div data-include="경로">` 로 삽입, 개별 HTML에 직접 작성 금지
- 헤더/푸터 수정은 `pages/_inc/header.html`, `pages/_inc/footer.html` 만 수정
- 새 페이지 추가 시 `pages/_inc/header.html`과 모바일 메뉴 양쪽에 링크 추가

## 섹션 패턴
```html
<!-- 기본 섹션 -->
<section class="section-{name}">
  <div class="container">
    <div class="section-header">
      <h2 class="section-header__title">제목</h2>
      <p class="section-header__desc">설명</p>
    </div>
    <!-- 콘텐츠 -->
  </div>
</section>

<!-- 배경 전체폭, 콘텐츠 제한폭 -->
<section class="section-{name}">       <!-- 배경·패딩 담당 -->
  <div class="container">              <!-- 너비 제한 -->
    <!-- 콘텐츠 -->
  </div>
</section>
```

## 컨테이너
- `.container` — 기본 (max-width: 1280px)
- `.container--wide` — 와이드 (max-width: 1440px)
- `.container--narrow` — 좁음 (max-width: 960px)
- `.container--fluid` — 전체폭

## 제목 계층
- `h1`: 페이지당 1개, 해당 페이지의 핵심 제목
- `h2`: 주요 섹션 제목
- `h3`: 섹션 내 서브 항목
- 시각적 크기를 위해 계층을 건너뛰는 것 금지 (h1 → h3 등)

## 접근성
- `<div id="container">` — 스킵 네비게이션 링크 대상 필수
- 아이콘 버튼: `aria-label="설명"` 필수
- 스크린 리더 전용 텍스트: `<span class="blind">텍스트</span>`
- 이미지: 의미있는 이미지는 `alt="설명"`, 장식용은 `alt=""`
- 폼 입력: `<label>`과 `<input>` 반드시 연결 (`for`/`id` 또는 묶음)
- 인터랙티브 요소는 키보드로 접근 가능해야 함 (Tab 순서 논리적)

## 카드·그리드 패턴
```html
<!-- 카드 그리드 -->
<ul class="{name}-grid">
  <li class="{name}-card">
    <div class="{name}-card__image"><!-- 이미지 --></div>
    <div class="{name}-card__body">
      <h3 class="{name}-card__title">제목</h3>
      <p class="{name}-card__desc">설명</p>
    </div>
  </li>
</ul>

<!-- 목록이 아닌 카드 (단독) -->
<article class="{name}-card">
  ...
</article>
```

## 버튼 패턴
```html
<!-- 링크형 버튼 -->
<a href="#" class="button primary md">텍스트</a>

<!-- 동작형 버튼 -->
<button type="button" class="button outline md">텍스트</button>

<!-- 아이콘 버튼 -->
<button type="button" class="btn-icon" aria-label="메뉴 열기">
  <svg aria-hidden="true">...</svg>
</button>
```

## 폼 패턴
```html
<form>
  <div class="form-group">
    <label for="input-name">이름</label>
    <input type="text" id="input-name" class="input" placeholder="이름 입력">
  </div>
  <div class="form-group">
    <label for="input-email">이메일</label>
    <input type="email" id="input-email" class="input" placeholder="이메일 입력">
    <span class="form-error" role="alert">유효하지 않은 이메일입니다</span>
  </div>
  <button type="submit" class="btn btn--primary btn--md">제출</button>
</form>
```

## 시맨틱 태그 사용
- `<header>` — 페이지/섹션 헤더
- `<nav>` — 주요 내비게이션 (페이지당 1개 권장, 여러 개면 `aria-label` 구분)
- `<main>` — 페이지 핵심 콘텐츠 (1개)
- `<section>` — 주제가 있는 독립 영역 (heading 포함)
- `<article>` — 독립적으로 배포 가능한 콘텐츠 (카드, 포스트)
- `<aside>` — 부가 콘텐츠 (사이드바, 광고)
- `<footer>` — 페이지/섹션 푸터
- `<div>` — 시맨틱 의미 없는 순수 레이아웃 래퍼로만 사용
