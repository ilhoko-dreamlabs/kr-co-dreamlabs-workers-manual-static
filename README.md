# 워커 사용자 매뉴얼

공개 사용자 매뉴얼을 위한 정적 문서입니다. 2026-10-01 실제 실행·화면 증거와 2026-10-09~13 이미지·운영 상태에서 확인한 변경을 구분합니다. 내부 운영 문서와 원본 캡처는 공개 에셋과 분리합니다.

- 목표 도메인: `manual.workers.dreamlabs.co.kr`
- 현재 단계: 안내 문서 31개와 페이지별 재현 검사 31개, GitHub Pages 공개 배포
- 기존 촬영 기준: 2026-10-01 KST worker00. 이후 UI가 바뀌어 이 캡처를 최신 화면 증거로 사용하지 않습니다.
- 현재 실행 이미지 확인: 2026-10-11 KST worker0에서 대화 맥락 압축·호환 이미지와 건강 상태를 확인했습니다. worker00의 마지막 확인은 2026-10-09 KST이며 그 뒤 적용 상태는 새로 판정하지 않습니다. 정확한 식별자는 내부 검증 문서에서 관리합니다.
- 최신 탐색·워커 간 요청·스킬 로딩·전체 업데이트·스킬 설치 화면의 직접 캡처와 사용자 클릭 검증은 아직 확보하지 못했습니다. 페이지별로 미촬영을 표시합니다.
- 제품의 배포별 개선은 `guide/release-history/`, 이 매뉴얼의 수정 내역은 `guide/changes/`에서 구분해 봅니다. 콘솔 표시 `v0.1.0`만으로 확인 배포를 구분하지 않습니다.
- `guide/candidate-20261009-ui-context/`는 빌드·격리 검사·Registry 등록·서버 사전 배치와 worker0의 업데이트 제안 응답까지 확인된 운영 미적용 후보입니다. 제안은 적용 전 다시 조회해야 하며 후보 내용은 현재 워커 사용법으로 취급하지 않습니다.
- `guide/candidate-20261010-security-codex/`는 기존 경로를 유지한 과거 worker0 적용 이미지 상세 페이지입니다. Worker 생산 의존성 감사 0건과 Codex 0.162.0을 확인했습니다. 이후 worker0은 다음 이미지로 변경됐고 이 이미지의 실제 기능·화면 수용은 미완료입니다.
- `guide/candidate-20261011-context-compat/`는 긴 대화 맥락 압축·이전 버전 호환을 보완한 이미지입니다. 빌드·Registry·서버 배치·제안 이후 worker0의 실행 이미지·건강 상태를 확인했으나 기능과 새 화면 수용은 미완료입니다. 경로의 candidate는 최초 게시 당시 이름입니다.
- `guide/candidate-20261011-ui-skills/`는 UI 상태·탐색 및 스킬 설치 실패 진단을 보완한 새 불변 후보입니다. 이미지 빌드·검사, Registry 등록·서버 배치·worker0 제안 수신을 확인했습니다. 과거 대기열 잠금 차단은 승인된 복구로 해소됐고 2026-10-12 worker0 콘솔의 실행 버튼 활성까지 확인했습니다. 새 이미지 실제 적용과 화면·기능 수용은 미진행입니다.
- `guide/candidate-20261013-system-events-skill-auto-update/`는 시스템 이벤트와 설치 스킬 자동업데이트를 추가한 별도 이미지 후보입니다. 로컬 이미지 빌드·격리 검사만 완료했으며 Registry·서버 배치·제안·적용·CI 통합과 실제 화면 촬영은 미진행입니다. 이벤트 수신과 자동 허용은 기본 꺼짐입니다.

## 실행

```powershell
node scripts/build-sample.mjs
python -m http.server 43817 --bind 127.0.0.1 --directory .
```

브라우저에서 `http://127.0.0.1:43817/guide/`을 엽니다. 빌드는 Node 기본 모듈만 사용합니다. 생성된 HTML, CSS, JavaScript, PNG만으로 동작합니다.

## 편집

- `scripts/build-sample.mjs`, `scripts/full-guides.mjs`, `scripts/latest-guides.mjs`, `scripts/release-history.mjs`, `scripts/candidate-ui-context.mjs`, `scripts/candidate-security-codex.mjs`, `scripts/candidate-context-compat.mjs`, `scripts/candidate-ui-skills-diagnostics.mjs`, `scripts/candidate-system-events-skill-auto-update.mjs`: 문서 내용과 HTML 생성
- `scripts/test-cases.mjs`: 기능별 시작 조건·실행 순서·통과 기준·증거
- `guide/manual.css`: 공통 화면 구성
- `guide/manual.js`: 예제 복사, 캡처 확대
- `assets/screenshots/2026-10-01/`: 공개용 실제 캡처
- `FEATURE_PAGE_MAP.md`: 기능별 문서 확장 계획과 확인 상태
- `MANUAL_TEST_STANDARD.md`: 이후 배포마다 적용할 화면 캡처·실행 검증 기준


생성된 HTML 대신 생성 스크립트를 편집하고 다시 빌드합니다. 기존 버전 캡처는 덮어쓰지 않고 촬영일/제품 릴리스별로 추가합니다. 원본 캡처에는 계정 정보와 다른 작업이 포함될 수 있으므로 공개 저장소에 넣지 않습니다.

## 검증 범위

가상 회의 메모의 요청·결과·후속 요청·세션 검색은 10월 1일 worker00에서 실제 성공 결과까지 확인했습니다. 이후 배포에서 같은 흐름을 다시 검증한 기록은 아닙니다. 예약 생성, 프로젝트 생성, 첨부, 파일 탐색 및 설정 저장은 실제 효과 검증 전입니다. 각 페이지의 검사 절차는 독자가 재현하기 위한 지침이며 통과 기록이 아닙니다. 10월 9일 worker00 대시보드와 탐색 메뉴는 열어 확인했지만 신규 기능의 세부 화면과 조작은 아직 미촬영·미검증입니다. 내부 설정 10개 탭의 자세한 사용법과 캡처는 공개 저장소 밖의 운영 문서에 있습니다.

## 다음 구현 단계

1. 동일한 문서 형식으로 실제 기능을 하나씩 실행·검증하고 캡처합니다.
2. 정식 제품 릴리스 번호가 확정되면 배포 확인본과 연결하고, 문서·캡처에도 적용 버전을 붙입니다.
3. 워커 배포와 제품 개선 이력의 갱신을 자동화합니다.

배포마다 문서 영향 검사를 하고, 변경이 없는 기능도 해당 버전에서 확인한 상태를 기록합니다. 제품 개선 이력은 확인된 배포와 적용 워커를 기준으로 게시하며, 정식 릴리스 번호와 자동 연계는 그 기준이 확정된 뒤 추가합니다.

