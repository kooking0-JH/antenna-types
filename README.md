# 그림으로 보는 햄 안테나 (antenna-types)

햄 무선의 주력 안테나 다섯 가지(다이폴, 모노폴·휩, 야기, 루프, 로그 주기)의 원리와 쓰임을 칠판 그림으로 정리한 해설 페이지입니다.
GitHub Pages로 게시하고, 티스토리 블로그(6k5ehn.tistory.com)에 iframe으로 넣어 씁니다.

주소: https://kooking0-jh.github.io/antenna-types/

## 파일 구성

```
index.html          목차 (기초 + 안테나 5종 카드)
basics.html         안테나 기초: 방사, 공진, 패턴과 널, 이득, 편파, SWR, 용어집
dipole.html         1편 다이폴
monopole.html       2편 모노폴과 휩
yagi.html           3편 야기-우다
loop.html           4편 루프
lpda.html           5편 로그 주기
others.html         부록 그 밖의 안테나 (헬리컬, 접시형)
assets/common.css   공통 스타일 (칠판 그림, Pretendard, 한국어+원어 라벨)
assets/site.js      그림 애니메이션 + iframe 높이 자동 맞춤
tistory-embed.html  티스토리 글에 붙여 넣는 코드 (저장소에 없어도 되지만 참고용)
```

## 올리는 방법

1. GitHub에서 새 저장소 `antenna-types` 생성 (Public)
2. 위 파일들을 폴더 구조 그대로 업로드 (`assets` 폴더 포함)
3. Settings → Pages → Branch: `main` / `(root)` → Save
4. 1~2분 뒤 https://kooking0-jh.github.io/antenna-types/ 접속 확인

## 새 안테나 페이지 추가 규칙

- `basics.html`을 복사해서 시작합니다. 맨 위 숨은 `<svg>`(필터·화살촉 정의)는 꼭 남겨 둡니다.
- 그림은 `<figure class="fig"><div class="board"><svg viewBox="0 0 680 H">…` 형식.
  - 선: `class="ln st-or|st-bl|st-ye|chalk|faint"`, 그려지는 효과는 `draw` + `pathLength="1"` (+ `d2`, `d3` 지연)
  - 손그림 떨림: 선들을 `<g class="sketch">`로 감쌉니다. 글자는 감싸지 않습니다.
  - 글자: 한국어 `class="k"`, 원어 `class="e"`(한국어 바로 아래 17px), 큰 제목 `tt`, 설명 `s`
  - 나중에 나타날 라벨은 `<g class="lbl">`로 감쌉니다.
- 본문 용어는 `<span class="term">널<i>(null)</i></span>` 형식으로 처음 나올 때 원어를 붙입니다.
- 용어는 `basics.html` 용어집의 짝을 그대로 씁니다.
- 상자: 핵심 `<div class="box key">`, 흔한 오해 `<div class="box myth">`
- 완성되면 `index.html`의 해당 카드를 `<div class="card soon">` → `<a class="card" href="파일.html">`로 바꾸고 `준비 중` 배지를 지웁니다.

## 문체·표현 규칙

- 본문과 상자 글은 합니다체, 그림 설명(캡션)은 명사형 종결("~함", "~임", 명사로 끝냄), 용어집 뜻풀이는 명사형.
- 동사는 기술 용어로: 쏜다·몰아준다·올라간다 → 방사한다·형성된다·감쇠한다.
- 정도 표현은 수치나 용어로: 세게·조금 더·멀리 → 이득(dB), 방사 강도, 앙각 ○°, 원거리(DX).
- 구어체 부사 사용 금지: 딱, 그냥, 바로, 훨씬, 진짜. "올라간다·내려간다"는 "높아진다·낮아진다·형성된다"로.
- SVG 색상은 직접 쓰지 않고 클래스로: 선 st-or·st-bl·st-ye·st-re·st-gr·chalk·faint·dim, 글자 hl·or·bl·re, 도형 채우기 fc(분필)·fo(주황)·fb(칠판). 예외: 맨 위 공통 정의의 화살촉(marker)은 색상 코드를 직접 씀.
- 비유는 이해를 확실히 돕는 경우에만 한 페이지에 한두 개(예: 이득의 풍선 비유).
- 용어는 basics.html 용어집의 한국어·원어 짝을 그대로 쓰고, 새 용어가 생기면 용어집에 먼저 추가.
