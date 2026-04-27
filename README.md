# 제1회 ART 전시회 랜딩페이지

제1회 ART 전시회를 소개하고, 작가 참가 신청과 관람 신청으로 연결하는 정적 랜딩페이지 프로젝트입니다.

## 배포 주소

- 사이트: https://art-landing-page-nine.vercel.app/
- GitHub 저장소: https://github.com/a01099792102/art-landing-page

## 신청 링크

- 작가 참가 신청: https://forms.gle/XT9k76G4nESxZmsr9
- 관람 신청: https://forms.gle/MMrWEA1hB1neP5MM7

## 사용 기술

- HTML
- CSS
- JavaScript
- Vercel

## 프로젝트 구조

```text
20250420/
├─ index.html
├─ README.md
├─ css/
│  └─ style.css
├─ js/
│  └─ main.js
├─ assets/
│  └─ images/
│     └─ artemi-map.svg
├─ apps-script/
│  └─ create_visitor_form.gs
├─ 제1회_ART_전시회_랜딩페이지_기획서.md
└─ 제1회_ART_전시회_랜딩페이지_개발문서.md
```

## 주요 기능

- 전시 소개와 프로그램 안내
- 작가 참가 신청 버튼 연결
- 관람 신청 버튼 연결
- FAQ 아코디언
- 모바일 메뉴 토글
- 상단 이동 버튼

## 수정 포인트

- 작가 참가 신청 버튼: [index.html](./index.html)
- 관람 신청 버튼: [index.html](./index.html)
- 전체 스타일: [css/style.css](./css/style.css)
- 인터랙션 스크립트: [js/main.js](./js/main.js)
- 관람 신청 구글폼 생성 스크립트: [apps-script/create_visitor_form.gs](./apps-script/create_visitor_form.gs)

## 배포 방법

```powershell
git add .
git commit -m "Update landing page"
git push
```

GitHub에 푸시하면 Vercel에서 자동으로 배포됩니다.

## 참고 문서

- 기획서: [제1회_ART_전시회_랜딩페이지_기획서.md](./제1회_ART_전시회_랜딩페이지_기획서.md)
- 개발문서: [제1회_ART_전시회_랜딩페이지_개발문서.md](./제1회_ART_전시회_랜딩페이지_개발문서.md)
