# 제1회 ART 전시회 랜딩페이지 개발문서

## 1. 문서 목적

이 문서는 `HTML`, `CSS`, `JavaScript`만으로 제1회 ART 전시회 랜딩페이지를 제작하기 위한 개발 가이드다.

기획서의 전시 콘셉트, 페이지 구성, 주요 문구, 신청 흐름, 디자인 방향을 실제 웹 페이지 구조로 옮기기 위한 기준을 정리한다.

---

## 2. 프로젝트 개요

### 프로젝트명

제1회 ART 전시회 랜딩페이지

### 제작 형식

- HTML
- CSS
- JavaScript
- 정적 웹페이지
- 반응형 웹 지원

### 제작 목적

- 제1회 ART 전시회의 분위기와 관람 경험 전달
- 30명 이상 작가가 참여하는 단체전의 성격 안내
- 전시 작가 참가 신청 유도
- 전시 관람 신청 유도
- 대전 아르테미 갤러리에서 열리는 전시 정보 제공

### 주최

트리거스

---

## 3. 전시 기본 정보

| 항목 | 내용 |
|---|---|
| 전시명 | 제1회 ART 전시회 |
| 전시 형태 | 30명 이상의 작가가 함께 참여하는 단체전 |
| 작품 구성 | 참여 작가 1인당 1작품 제출 |
| 작품 수 | 참가 작가 수에 따라 변동 가능 |
| 전시 장소 | 대전 아르테미 갤러리 |
| 전시 기간 | 2026년 5월 30일(토) - 2026년 6월 5일(금) |
| 전시 작가 참가 신청 | 구글폼 접수 |
| 전시 관람 신청 | 별도 구글폼 접수 |
| 주최 | 트리거스 |

---

## 4. 랜딩페이지 콘셉트

### 콘셉트명

빛과 상상이 만나는 디지털 아트 전시

### 콘셉트 설명

제1회 ART 전시회는 30명 이상의 작가가 각자의 시선으로 만든 작품을 한 공간에서 선보이는 단체전이다. 디지털 이미지가 만들어내는 새로운 감각의 장면들이 대전 아르테미 갤러리 안에서 하나의 풍경처럼 펼쳐진다.

관람객은 작품을 단순히 감상하는 것을 넘어, 공간을 거닐며 다양한 작가의 이미지와 마주한다. 전시는 어렵고 멀게 느껴지는 예술이 아니라, 누구나 보고 느끼고 참여할 수 있는 감각적인 장면으로 구성된다.

### 핵심 키워드

- 디지털 아트
- 빛
- 색
- 몰입
- 감각
- 이미지
- 상상
- 움직임
- 단체전
- 새로운 풍경
- 시각 경험

---

## 5. 주요 타깃

### 핵심 타깃

일반 관람객

### 보조 타깃

전시 작가로 참여를 희망하는 창작자

### 타깃별 주요 행동

| 타깃 | 주요 행동 |
|---|---|
| 일반 관람객 | 전시 정보 확인 후 관람 신청 구글폼 이동 |
| 참여 희망 작가 | 전시 개요와 작품 제출 조건 확인 후 작가 참가 신청 구글폼 이동 |

---

## 6. 페이지 구조

권장 섹션 순서는 아래와 같다.

```text
1. Header
2. Hero
3. Exhibition Intro
4. Experience
5. Preview Gallery
6. Program
7. Artist Application
8. Visit Information
9. Visitor Application CTA
10. FAQ
11. Host / Footer
```

---

## 7. 파일 구조

정적 페이지 기준의 권장 파일 구조다.

```text
project/
├─ index.html
├─ css/
│  └─ style.css
├─ js/
│  └─ main.js
└─ assets/
   ├─ images/
   │  ├─ hero.jpg
   │  ├─ preview-01.jpg
   │  ├─ preview-02.jpg
   │  ├─ preview-03.jpg
   │  └─ preview-04.jpg
   └─ logos/
      └─ triggers-logo.png
```

이미지 파일명은 실제 보유 이미지에 맞게 변경해도 된다.

---

## 8. HTML 구조 설계

### 8-1. 기본 문서 구조

```html
<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>제1회 ART 전시회</title>
  <meta name="description" content="2026년 5월 30일부터 6월 5일까지 대전 아르테미 갤러리에서 열리는 제1회 ART 전시회">
  <link rel="stylesheet" href="./css/style.css">
</head>
<body>
  <header class="site-header"></header>
  <main>
    <section id="hero" class="hero"></section>
    <section id="intro" class="section intro"></section>
    <section id="experience" class="section experience"></section>
    <section id="preview" class="section preview"></section>
    <section id="program" class="section program"></section>
    <section id="artist-apply" class="section artist-apply"></section>
    <section id="info" class="section info"></section>
    <section id="visitor-apply" class="section visitor-apply"></section>
    <section id="faq" class="section faq"></section>
  </main>
  <footer class="site-footer"></footer>
  <script src="./js/main.js"></script>
</body>
</html>
```

---

## 9. 섹션별 개발 내용

## 9-1. Header

### 역할

페이지 상단에서 전시명과 주요 이동 메뉴를 제공한다. 모바일에서는 메뉴를 접고 펼칠 수 있게 구성한다.

### 포함 요소

- 로고 또는 텍스트 로고: `제1회 ART 전시회`
- 메뉴: 전시소개, 경험, 작가참가, 관람정보, FAQ
- CTA 버튼: 관람 신청

### 권장 HTML

```html
<header class="site-header">
  <a href="#hero" class="brand">제1회 ART 전시회</a>
  <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
    메뉴
  </button>
  <nav id="site-nav" class="site-nav">
    <a href="#intro">전시소개</a>
    <a href="#experience">경험</a>
    <a href="#artist-apply">작가참가</a>
    <a href="#info">관람정보</a>
    <a href="#faq">FAQ</a>
    <a href="GOOGLE_FORM_VISITOR_URL" class="nav-cta" target="_blank" rel="noopener">관람 신청</a>
  </nav>
</header>
```

---

## 9-2. Hero

### 역할

랜딩페이지의 첫인상을 결정한다. 전시명, 핵심 카피, 일정, 장소, 신청 버튼을 한눈에 보여준다.

### 화면 문구

```text
제1회 ART 전시회

상상이 이미지가 되고,
이미지가 공간이 되는 순간

30명 이상의 작가가 함께 만드는
감각적인 단체 전시를 만나보세요.

2026.05.30 - 2026.06.05
대전 아르테미 갤러리
```

### CTA 버튼

- 전시 작가 참가 신청하기
- 관람 신청하기

### 권장 HTML

```html
<section id="hero" class="hero">
  <div class="hero-content">
    <p class="eyebrow">제1회 ART 전시회</p>
    <h1>상상이 이미지가 되고,<br>이미지가 공간이 되는 순간</h1>
    <p class="hero-copy">30명 이상의 작가가 함께 만드는 감각적인 단체 전시를 만나보세요.</p>
    <dl class="hero-meta">
      <div>
        <dt>기간</dt>
        <dd>2026.05.30 - 2026.06.05</dd>
      </div>
      <div>
        <dt>장소</dt>
        <dd>대전 아르테미 갤러리</dd>
      </div>
    </dl>
    <div class="hero-actions">
      <a href="GOOGLE_FORM_ARTIST_URL" class="button button-primary" target="_blank" rel="noopener">전시 작가 참가 신청하기</a>
      <a href="GOOGLE_FORM_VISITOR_URL" class="button button-secondary" target="_blank" rel="noopener">관람 신청하기</a>
    </div>
  </div>
</section>
```

---

## 9-3. Exhibition Intro

### 역할

전시의 성격을 설명한다. 30명 이상 단체전, 1인 1작품 제출, 감각적인 전시 경험을 자연스럽게 전달한다.

### 화면 문구

```text
빛은 색이 되고, 색은 장면이 됩니다.
그리고 그 장면은 전시장 안에서 하나의 새로운 풍경이 됩니다.

제1회 ART 전시회는 30명 이상의 작가가 함께 만드는 단체전입니다.
작가마다 한 점의 작품을 선보이며,
최종 작품 수는 참여 인원에 따라 달라질 수 있습니다.
```

---

## 9-4. Experience

### 역할

관람객이 전시에서 기대할 수 있는 핵심 경험을 보여준다.

### 섹션 제목

```text
전시에서 만나는 네 가지 장면
```

### 경험 카드

| 제목 | 설명 |
|---|---|
| 디지털 작품 감상 | 빛과 색, 형태가 만들어내는 장면들이 전시장 곳곳에 펼쳐집니다. |
| 인터랙티브 체험 | 관람객의 움직임과 선택이 작품의 일부가 됩니다. |
| 아티스트 토크 | 창작자의 시선으로 작품과 전시의 이야기를 들어봅니다. |
| 포토존 | 빛과 이미지가 어우러진 공간에서 특별한 장면을 남겨보세요. |

### 권장 UI

- 데스크톱: 4열 카드
- 태블릿: 2열 카드
- 모바일: 1열 카드

---

## 9-5. Preview Gallery

### 역할

전시 분위기를 이미지 중심으로 전달한다.

### 섹션 제목

```text
빛으로 그려진 장면들
```

### 설명 문구

```text
흐르는 색, 겹쳐지는 빛, 낯선 풍경.
전시장에서는 디지털 이미지가 만들어낸 다채로운 장면을 만날 수 있습니다.
```

### 이미지 구성

- 대표 이미지 4장 이상 권장
- 각 이미지에 작품명 또는 분위기 키워드 표시
- 실제 작품 이미지가 준비되지 않은 경우 임시 이미지로 구성 가능

### 작품 카테고리 예시

- 빛의 풍경
- 움직이는 색
- 감정의 이미지
- 낯선 도시
- 꿈의 정원
- 새로운 초상

---

## 9-6. Program

### 역할

전시 관람 외의 참여 요소를 안내한다.

### 프로그램 예시

| 프로그램 | 설명 |
|---|---|
| 전시 해설 | 작품과 공간을 더 깊이 이해할 수 있는 해설 프로그램입니다. |
| 이미지 체험 프로그램 | 간단한 참여를 통해 나만의 디지털 이미지를 만들어보는 시간입니다. |
| 아티스트 토크 | 창작자의 시선으로 작품과 전시의 이야기를 들어보는 자리입니다. |
| 포토 이벤트 | 전시장 속 장면을 사진으로 남기고 함께 공유하는 이벤트입니다. |

---

## 9-7. Artist Application

### 역할

전시 작가로 참여하고 싶은 창작자에게 참가 조건과 신청 방식을 안내한다.

### 화면 문구

```text
전시 작가로 함께하세요.

제1회 ART 전시회는 30명 이상의 작가가 함께 만드는 단체전입니다.
참여 작가는 1인당 1작품을 제출하며,
최종 전시 작품 수는 참가 인원에 따라 달라질 수 있습니다.

자신만의 시선이 담긴 작품으로
대전 아르테미 갤러리에서 열리는 첫 번째 전시에 함께하세요.
```

### 참가 안내

| 항목 | 내용 |
|---|---|
| 참가 대상 | 전시 작가로 참여를 희망하는 창작자 |
| 작품 수 | 작가 1인당 1작품 |
| 전시 장소 | 대전 아르테미 갤러리 |
| 전시 기간 | 2026년 5월 30일(토) - 6월 5일(금) |
| 접수 방식 | 구글폼 접수 |

### CTA

```text
전시 작가 참가 신청하기
```

링크 대상은 `GOOGLE_FORM_ARTIST_URL` 자리표시자를 실제 구글폼 링크로 교체한다.

---

## 9-8. Visit Information

### 역할

방문에 필요한 정보를 한눈에 제공한다.

### 정보 구성

| 항목 | 내용 |
|---|---|
| 전시명 | 제1회 ART 전시회 |
| 전시 형태 | 30명 이상 작가가 참여하는 단체전 |
| 작품 구성 | 참여 작가 1인당 1작품 |
| 기간 | 2026.05.30 - 2026.06.05 |
| 운영 시간 | 10:00 - 18:00 |
| 장소 | 대전 아르테미 갤러리 |
| 입장 | 추후 공개 |
| 전시 작가 참가 신청 | 구글폼 접수 |
| 전시 관람 신청 | 별도 구글폼 접수 |
| 주최 | 트리거스 |
| 문의 | 추후 공개 |

### 지도 영역

대전 아르테미 갤러리의 지도 링크 또는 지도 임베드 영역을 배치한다.

```html
<div class="map-placeholder">
  대전 아르테미 갤러리 지도 영역
</div>
```

---

## 9-9. Visitor Application CTA

### 역할

일반 관람객의 관람 신청을 유도한다.

### 화면 문구

```text
새로운 장면을 직접 만나보세요.

빛과 색, 움직이는 이미지가 만드는 감각적인 전시.
제1회 ART 전시회에서 직접 경험해보세요.
```

### CTA

```text
관람 신청하기
```

링크 대상은 `GOOGLE_FORM_VISITOR_URL` 자리표시자를 실제 구글폼 링크로 교체한다.

---

## 9-10. FAQ

### 역할

관람객과 참여 희망 작가가 가질 수 있는 기본 질문을 해결한다.

### 질문 목록

```text
Q. 전시를 처음 보는 사람도 즐길 수 있나요?
A. 네. 작품 설명과 해설 프로그램이 준비되어 있어 누구나 편하게 관람할 수 있습니다.

Q. 사진 촬영이 가능한가요?
A. 일부 제한 구역을 제외하고 촬영 가능한 공간이 마련될 예정입니다.

Q. 체험 프로그램은 별도 신청이 필요한가요?
A. 프로그램별로 신청 방식이 다를 수 있으며, 자세한 내용은 추후 안내됩니다.

Q. 아이와 함께 관람할 수 있나요?
A. 네. 빛과 이미지 중심의 전시로 가족 관람객도 함께 즐길 수 있습니다.

Q. 현장 입장이 가능한가요?
A. 현장 상황에 따라 가능하지만, 원활한 관람을 위해 사전 신청을 권장합니다.

Q. 전시 작가로 참가하려면 어떻게 신청하나요?
A. 전시 작가 참가 신청은 별도의 구글폼을 통해 접수합니다.

Q. 작가는 몇 작품을 제출하나요?
A. 참여 작가는 1인당 1작품을 제출합니다.

Q. 전체 전시 작품 수는 몇 점인가요?
A. 30명 이상의 단체전으로 진행되며, 최종 작품 수는 참가 작가 수에 따라 달라질 수 있습니다.
```

### 권장 UI

- 아코디언 형식
- 첫 번째 질문만 기본으로 열림
- 키보드 접근성 지원

---

## 9-11. Host / Footer

### 역할

주최 정보를 명확히 표시하고, 페이지 하단에서 신청 링크와 기본 정보를 다시 제공한다.

### 포함 요소

- 주최: 트리거스
- 전시명
- 전시 기간
- 전시 장소
- 작가 참가 신청 링크
- 관람 신청 링크
- 문의 정보
- 저작권 문구

### 권장 문구

```text
주최: 트리거스
제1회 ART 전시회
2026.05.30 - 2026.06.05
대전 아르테미 갤러리
```

---

## 10. CSS 디자인 가이드

### 전체 톤

- 다크 그레이 배경
- 컬러풀한 이미지 중심
- 세련된 디지털 아트 전시회 분위기
- 텍스트는 명확한 대비 확보
- CTA 버튼은 선명하고 쉽게 찾을 수 있게 구성

### 컬러 토큰 예시

```css
:root {
  --color-bg: #111113;
  --color-surface: #1b1b1f;
  --color-surface-soft: #25252b;
  --color-text: #f5f5f7;
  --color-muted: #b7b7c2;
  --color-line: rgba(255, 255, 255, 0.14);
  --color-primary: #00d7ff;
  --color-secondary: #ff4fd8;
  --color-accent: #b8ff4d;
}
```

### 타이포그래피

```css
body {
  font-family: "Pretendard", "Noto Sans KR", system-ui, sans-serif;
  background: var(--color-bg);
  color: var(--color-text);
}
```

### 레이아웃 기준

- 최대 콘텐츠 폭: `1120px`
- 섹션 상하 여백: 데스크톱 `96px`, 모바일 `64px`
- 카드 반경: `8px` 이하
- 버튼 반경: `8px` 이하
- 모바일 최소 대응 폭: `360px`

### 반응형 기준

```css
@media (max-width: 1024px) {
  /* 태블릿 */
}

@media (max-width: 768px) {
  /* 모바일 */
}
```

---

## 11. JavaScript 기능 가이드

### 필수 기능

- 모바일 내비게이션 열기/닫기
- FAQ 아코디언
- 스크롤 시 헤더 상태 변경
- 내부 링크 클릭 시 부드러운 스크롤

### 선택 기능

- 섹션 진입 시 페이드 인
- 갤러리 이미지 클릭 시 라이트박스
- 상단으로 이동 버튼

### 주요 상수

구글폼 링크는 실제 링크 확정 후 아래 자리표시자를 교체한다.

```javascript
const LINKS = {
  artistForm: "GOOGLE_FORM_ARTIST_URL",
  visitorForm: "GOOGLE_FORM_VISITOR_URL"
};
```

### FAQ 아코디언 예시 구조

```html
<div class="faq-item">
  <button class="faq-question" type="button" aria-expanded="false">
    전시를 처음 보는 사람도 즐길 수 있나요?
  </button>
  <div class="faq-answer" hidden>
    네. 작품 설명과 해설 프로그램이 준비되어 있어 누구나 편하게 관람할 수 있습니다.
  </div>
</div>
```

---

## 12. 접근성 체크리스트

- 모든 이미지에 의미 있는 `alt` 텍스트 작성
- CTA 링크는 목적이 명확한 문구 사용
- FAQ 버튼에 `aria-expanded` 적용
- 모바일 메뉴 버튼에 `aria-controls`, `aria-expanded` 적용
- 배경과 텍스트의 대비 확보
- 키보드만으로 메뉴, FAQ, 링크 이용 가능
- 외부 구글폼 링크에는 `target="_blank"`와 `rel="noopener"` 적용

---

## 13. SEO 및 공유 메타 정보

### 권장 메타 태그

```html
<title>제1회 ART 전시회</title>
<meta name="description" content="2026년 5월 30일부터 6월 5일까지 대전 아르테미 갤러리에서 열리는 제1회 ART 전시회입니다. 30명 이상의 작가가 함께하는 감각적인 단체 전시를 만나보세요.">
<meta property="og:title" content="제1회 ART 전시회">
<meta property="og:description" content="30명 이상의 작가가 함께 만드는 감각적인 단체 전시. 2026.05.30 - 06.05, 대전 아르테미 갤러리.">
<meta property="og:type" content="website">
<meta property="og:image" content="./assets/images/og-image.jpg">
```

---

## 14. 구글폼 링크 관리

실제 개발 시 아래 두 링크를 확정해야 한다.

| 링크명 | 용도 | 자리표시자 |
|---|---|---|
| 작가 참가 신청 구글폼 | 전시 작가 참가 접수 | `GOOGLE_FORM_ARTIST_URL` |
| 관람 신청 구글폼 | 일반 관람객 관람 신청 | `GOOGLE_FORM_VISITOR_URL` |

두 신청은 목적이 다르므로 버튼 문구와 링크를 반드시 분리한다.

---

## 15. 개발 완료 기준

- `index.html`, `css/style.css`, `js/main.js` 파일이 분리되어 있다.
- 모든 섹션이 기획서 순서대로 구현되어 있다.
- 작가 참가 신청 버튼은 작가용 구글폼으로 연결된다.
- 관람 신청 버튼은 관람객용 구글폼으로 연결된다.
- 전시명, 기간, 장소, 주최 정보가 정확히 표시된다.
- 모바일에서 메뉴, 버튼, 카드, FAQ가 깨지지 않는다.
- 이미지가 없는 경우에도 레이아웃이 무너지지 않는다.
- 외부 링크가 새 창으로 열린다.

---

## 16. 최종 화면 핵심 문구 모음

### Hero

```text
제1회 ART 전시회

상상이 이미지가 되고,
이미지가 공간이 되는 순간

30명 이상의 작가가 함께 만드는
감각적인 단체 전시를 만나보세요.

2026.05.30 - 2026.06.05
대전 아르테미 갤러리
```

### 작가 참가 신청

```text
전시 작가로 함께하세요.

제1회 ART 전시회는 30명 이상의 작가가 함께 만드는 단체전입니다.
참여 작가는 1인당 1작품을 제출하며,
최종 전시 작품 수는 참가 인원에 따라 달라질 수 있습니다.
```

### 관람 신청

```text
새로운 장면을 직접 만나보세요.

빛과 색, 움직이는 이미지가 만드는 감각적인 전시.
제1회 ART 전시회에서 직접 경험해보세요.
```

### Footer

```text
주최: 트리거스
제1회 ART 전시회
2026.05.30 - 2026.06.05
대전 아르테미 갤러리
```
