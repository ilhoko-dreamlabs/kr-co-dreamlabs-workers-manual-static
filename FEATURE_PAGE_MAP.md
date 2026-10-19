# 기능별 문서와 확인 상태

2026-10-01 과거 화면, 2026-10-09 당시 두 워커의 실행 이미지, 2026-10-19 worker0의 직전 Codex·Console 이미지 실행·건강 확인과 새 GitLab 이미지의 Registry 후보 상태를 구분한다. worker00 대시보드는 열어 확인했지만 신규 기능의 세부 화면 캡처와 조작 검증은 아직 없다.

| 범위 | 공개 문서 | 확인 상태 |
|---|---|---|
| 새 요청·상태·검색·후속 요청 | `guide/new-session/`, `task-status/`, `session-search/`, `follow-up/` | 가상 회의 메모를 실제로 실행해 정상 응답과 후속 결과 확인. 첫 실행 차단도 실제 기록 |
| 대시보드 Action·Operations·Projects·Knowledge·PARA | `dashboard/`, `dashboard-views/` | 다섯 메뉴의 과거 화면 확인. 10월 16일 이미지의 worker0 실행·건강은 확인됐지만 Action 제목·출처·요청자·세션 이동의 운영 결과·새 화면 전 |
| 모델·추론 강도·속도 | `execution-options/` | 선택 UI 확인, 옵션별 비교 실행 전 |
| 최근·외부 세션, 메시지 복사 | `session-controls/`, `session-actions/` | 샘플 세션 검색·복원 확인. 10월 16일 이미지의 worker0 실행·건강은 확인됐지만 맨 아래로 버튼의 운영 화면·모바일 조작 전 |
| 파일 첨부 | `attachments/` | 버튼 확인, 실제 업로드 전 |
| 예약 | `reservations/` | 새 예약 양식·기존 예약 메뉴 확인, 저장·실행 전 |
| 프로젝트 | `projects/` | 생성 양식·프로젝트 목록 확인, 새 프로젝트 저장 전 |
| 작업공간 탐색기 | `workspace/` | 패널 열기 확인, 파일 목록 로딩 완료 전 |
| Wiki 탐색기·워크벤치 | `wiki-explorer/`, `wiki-workbench/` | 탐색 패널·검색·그래프·통계·마이그레이션 탭 확인, 검색 결과 검증 전 |
| 응답 도구 | `response-tools/` | 과거 응답 원문·정보 버튼 확인. 10월 16일 이미지의 worker0 실행·건강과 Codex 공개 요약 격리 검증 확인, 운영 제공자 결과 전 |
| 언어·테마·설정 메뉴 | `preferences/`, `settings-map/` | 10월 1일 화면의 10개 탭 확인. 10월 15일 이미지 소스의 시스템 포함 11개 탭과 파일 업로드 네 한도 문서화, worker0 실행·건강 확인. 저장·새 화면 미검증 |
| 새 탐색·모바일 화면 | `console-navigation/` | 2026-10-09 실행 이미지·소스와 worker00 데스크톱 메뉴 확인. 최신 데스크톱/모바일 캡처·직접 조작 전 |
| 워커 간 RRA 협업 | `remote-collaboration/` | 승인된 두 워커 사이 무첨부 최초·후속 2건의 과거 수용 증거 있음. 현재 UI 캡처·다른 대상 조작 전 |
| GitLab 작업·REST 대체 경로 | `gitlab-work/` | 10월 19일 후보의 소스·격리 검사와 Registry 등록 확인. Connector 우선, 독립 승인 대체·읽기 전용·결과 불명 쓰기 보호를 문서화. 지정 워커 기능 결과·새 화면 전 |
| 스킬 선택·로딩 정책 | `skill-loading/` | 설치/허용/선택 분리와 미리보기 소스·배포 확인. 현재 UI 캡처·새 작업 효과 전 |
| 전체 업데이트 상태 | `whole-update/` | 2026-10-13 worker0의 과거 업데이트 성공 확인. 10월 16일 이미지의 worker0 실행·건강과 완료 화면 격리 검증은 확인됐지만 실제 완료 UI·재로그인 결과 전. 다음 할당은 실행 전에 새로 조회 |
| 공식 스킬 레지스트리 선택 설치 | `skill-registry/` | 2026-10-09 양쪽 워커 실행 이미지·소스 포함. 새 화면 캡처·현재 설치 후 주입 검증 전 |
| 문제 해결 | `troubleshooting/` | 실제 blocked 및 재실행 성공 사례 |
| 제품 배포별 개선 이력 | `release-history/` | 2026-10-19 GitLab Registry 후보와 worker0 실행 확인된 2026-10-16 Codex·Console 이미지, 앞선 확인본을 구분. 정식 릴리스 번호 미확정 |
| GitLab REST fallback 이미지 | `candidate-20261019-gitlab-rest-fallback/` | 470건 개발 검사·이미지 격리 검사·Registry 식별 확인. 서버 배치·새 제안·워커 적용·실제 GitLab 결과·운영 화면 미확인 |
| Codex 공개 요약·Console 후속 이미지 | `candidate-20261016-codex-ui-followup/` | 468건 개발 검사·이미지 격리 검사와 Registry·서버 공급·Manager 제안 뒤 10월 19일 worker0 실행 이미지·건강 확인. 기능 결과·운영 화면 미확인 |
| 실행 기록·업로드 설정 통합 이미지 | `candidate-20261015-console-upload-integration/` | 이미지 검사·Registry·서버 사전 배치 후 10월 16일 worker0 실행 이미지·건강 확인. 적용 경로·Console 완료 화면과 기능 결과·새 운영 화면 미확인 |
| Claude 구독 인증 보정 이미지 | `candidate-20261014-claude-subscription-auth/` | 만료 액세스+갱신 토큰의 네이티브 갱신 기회, OAuth/종량제 자격 분리, --bare·다른 제공자 거부. claude-worker 정확한 실행 이미지·건강·인증 준비 확인. 모델 요청·갱신 성공, 상태 파일 정규화·설정/마운트 보존 확인, 운영 캡처 전 |
| RRA 대화 이어가기·진행·동시 실행 이미지 | `candidate-20261013-rra-progress-capacity/` | 10월 14일 worker0·worker1 정확한 실행 이미지·건강 확인. RRA/Chat 연결·진행 재접속·관리자 상한 저장 결과와 새 기능 화면 미검증. 경로의 candidate는 최초 게시 당시 이름 |
| Connector 기록 호환성 복구 이미지 | `candidate-20261013-connector-ledger-compat/` | worker00 정확한 이미지·건강·13건 보존 검사와 실제 기록 2,000건 읽기·GitLab 성공 확인. worker0 별도 실행 이미지·건강 확인, 보존·업무 결과 미검증. UI 변경 없음 |
| 시스템 이벤트·설치 스킬 자동업데이트 이미지 | `candidate-20261013-system-events-skill-auto-update/` | 당시 worker0 실행·건강·콘솔 성공 확인. 이후 Connector 이미지로 변경. 관리자 handler 준비/수신 꺼짐/발행자 0명. 외부 HTTPS는 신뢰 프록시 미설정으로 거부. CI·전달·단일 스킬 시험·새 화면 캡처 전 |
| UI·스킬 설치 진단 이미지 | `candidate-20261011-ui-skills/` | 2026-10-13 08:03(KST) worker0 과거 실행·건강 상태 확인. 이후 다음 이미지로 변경. 실제 화면 캡처·기능 수용 전 |
| 대화 맥락 압축·단일 업데이트 호환 개선 | `candidate-20261011-context-compat/` | 빌드·Registry·서버 배치·제안 이후 worker0 실행 이미지·건강 상태 확인. 새 이미지 실제 화면 캡처·기본 20초 기능 수용 전. 경로의 candidate는 최초 게시 당시 이름 |
| 보안 의존성·Codex 이미지 | `candidate-20261010-security-codex/` | worker0 실행 이미지·건강 상태 확인. 실제 화면 캡처·상세 기능 및 유료 모델 수용 전. 경로의 candidate는 최초 게시 당시 이름 |
| UI·공통 대화 컨텍스트 이미지 후보 | `candidate-20261009-ui-context/` | 정확한 이전 후보 이미지의 빌드·Registry·서버 배치·worker0 제안 확인. 운영 적용·실제 화면 캡처·유료 모델 시험 전 |
| 매뉴얼 갱신 이력 | `changes/` | 문서의 추가·수정 날짜만 기록하고 제품 배포와 구분 |

공개 가능한 11개 설정 탭과 시스템 파일 업로드 네 한도의 사용·검증 절차는 이 매뉴얼에서 다룬다. 비밀값과 내부 운영 절차, 원본 캡처는 공개 저장소 밖에 둔다.

캡처는 실제 워커 화면을 직사각형으로 자른 것이다. 화면상 로딩이 끝나지 않은 항목은 완료 사례로 쓰지 않는다. 공개 제품 릴리스 번호가 정해지면 문서별 적용 버전·재현 시나리오·캡처를 릴리스와 연결한다.

모든 기능 페이지의 「이 화면을 직접 테스트하기」는 사용자가 앞으로 수행할 절차다. 기존에 실제 실행한 네 흐름과 나머지 기능의 계획된 테스트를 구분하고, 판정 시 워커·시각·증거를 남긴다. 신규 스킬 페이지에서 구형 설정 메뉴 캡처는 제거했다.

문서 변경 기록은 `guide/changes/`, 확인된 제품 배포와 운영 미적용 후보는 `guide/release-history/`에서 구분해 확인한다. 제품 공식 버전 번호가 정해지면 각 이미지 확인본에 연결한다.
