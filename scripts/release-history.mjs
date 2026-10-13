// Public deployment history. Exact image digests and internal rollout evidence stay in the private work packet.
import { uiContextCandidate } from './candidate-ui-context.mjs';
import { securityCodexCandidate } from './candidate-security-codex.mjs';
import { contextCompatCandidate } from './candidate-context-compat.mjs';
import { uiSkillsDiagnosticsCandidate } from './candidate-ui-skills-diagnostics.mjs';
import { systemEventsSkillAutoCandidate } from './candidate-system-events-skill-auto-update.mjs';
import { connectorLedgerCompatCandidate } from './candidate-connector-ledger-compat.mjs';
const entries = [
  {
    id: 'previous-operating', date: '2026.10.09', label: '당시 확인 배포', workers: 'worker0 · worker00 (당시)',
    state: '2026.10.09 두 워커 동일 이미지 확인 · 이후 worker0은 다음 이미지로 변경',
    introduction: '직전 확인본의 탐색·협업·스킬·업데이트 화면을 유지하며, 기존 연결과 요청 진입의 호환성을 보완했습니다.',
    improvements: [
      ['다른 워커 요청 찾기', '대상 연결 상태를 더 일관되게 찾고, 한국어로 특정 워커에 요청하거나 요청 후 결과까지 확인하려는 문장을 인식하도록 보완했습니다. 대상이 등록되지 않았다면 미설정 상태를 안내합니다.', 'remote-collaboration'],
      ['기존 연결 호환성', '이미 설정된 GitLab·GitHub API 연결의 사용 가능 상태를 복구했습니다. 새 권한이나 연결이 자동으로 추가됐다는 뜻은 아닙니다.', 'settings-map'],
      ['기존 스킬 설정 호환성', '보존된 스킬 정책을 읽어 새 작업의 승인 단계에 적용하는 호환성을 보완했습니다.', 'skill-loading']
    ],
    evidence: '2026.10.09 읽기 전용 운영 조회에서 두 워커가 running/healthy이며 동일한 실행 이미지를 사용함을 확인했습니다. 이후 worker0은 보안·Codex 이미지를 거쳐 대화 맥락 개선 이미지로 변경됐습니다. worker00의 현재 이미지 상태는 이 페이지의 새 확인 범위에 포함되지 않습니다. 당시 worker00 콘솔의 대시보드와 탐색 메뉴는 열어 확인했으나 각 기능의 최종 효과까지 검증하지 않았습니다.'
  },
  {
    id: 'previous', date: '2026.10.08', label: '직전 확인 배포', workers: 'worker0 · worker00',
    state: '워커별 이미지 상이 · 공통 기능 소스 확인',
    introduction: '두 워커에 공통으로 포함된 기능을 기준으로 정리했습니다. 당시 worker00에는 보존된 스킬 설정에 대한 추가 호환 보정이 있었습니다.',
    improvements: [
      ['탐색과 모바일 화면', '최근 세션, 프로젝트, Mattermost, Remote Request API를 독립 그룹으로 찾고 좁은 화면에서는 메뉴 서랍으로 이동합니다.', 'console-navigation'],
      ['승인 기반 워커 간 협업', '다른 워커에 보낼 요청의 대상과 내용을 확인하고 한 요청마다 1회 승인합니다. 보낸 요청과 대상 결과, 후속 원격 대화를 구분해 봅니다.', 'remote-collaboration'],
      ['요청별 스킬 로딩', '설치·사용 허용·선택을 나누고, 미리보기와 실제 작업에서 선택된 스킬을 별도로 확인합니다.', 'skill-loading'],
      ['전체 업데이트 상태', '현재·대상 할당, 차단 사유, 진행 단계와 보존 요청 상태를 콘솔에서 읽습니다.', 'whole-update']
    ],
    evidence: '2026.10.08 읽기 전용 운영 조회에서 두 워커의 실행 이미지와 소스를 대조했습니다. 당시 신규 화면의 최신 캡처와 모든 클릭 결과는 확보되지 않았습니다.'
  }
];

export const releaseHistoryGuide = {
  slug: 'release-history', title: '워커 버전별 개선 이력', category: '버전',
  description: 'worker0에서 확인된 운영 이미지와 이전 확인본, 운영 미적용 개선 후보를 버전별로 구분합니다.',
  verifiedAt: '2026.10.13', evidenceLabel: '운영 이미지·후보 구분 확인', history: true,
  toc: [['reading','이력 읽는 법'], ['connector-ledger-candidate','2026.10.13 Connector 복구 후보'], ['system-events-candidate','2026.10.13 worker0 적용'], ['ui-skills-candidate','2026.10.11 과거 적용'], ['context-candidate','2026.10.11 과거 적용'], ['security-deployed','2026.10.10 과거 적용'], ['ui-context-candidate','2026.10.09 이전 후보'], ...entries.map(entry => [entry.id, `${entry.date} ${entry.label}`]), ['verify','내 워커에서 확인하기']],
  body: () => `<section id="reading"><h2>이력 읽는 법</h2><p>이 페이지는 <strong>워커에 실제 적용된 이미지, 적용되지 않은 후보, 과거 확인본</strong>을 구분합니다. 문서 수정 내역은 <a href="../changes/">매뉴얼 갱신 이력</a>에서 확인하세요. 콘솔에 표시된 <code>v0.1.0</code>만으로 아래 이미지들을 구분할 수 없습니다. 정식 릴리스 번호가 확정되기 전까지는 <strong>확인 날짜·적용 워커·적용 상태</strong>를 함께 표시합니다. 날짜는 제품 버전 번호가 아닙니다.</p><div class="note"><strong>검증 수준</strong>이미지 빌드, Registry 등록, 지정 워커 적용, 실제 기능 결과는 서로 다른 단계입니다. worker0에서 확인된 적용을 다른 워커 전체로 확대하지 않으며, 후보가 보이더라도 현재 워커에서 사용할 수 있다는 뜻은 아닙니다.</div></section>
    <section id="connector-ledger-candidate" class="release-candidate"><span class="release-candidate-label">공급·제안 완료 · worker00 미적용 후보</span><h2>${connectorLedgerCompatCandidate.label}</h2><p>worker00의 보존된 Connector 효과 기록에 포함된 기존 부가 메타데이터 때문에 무관한 새 조회까지 차단되던 호환성 문제를 보완한 별도 이미지입니다. 확인 필요 기록과 중복·불확실 효과 차단은 유지합니다. 실제 worker00 기록 2,000건을 새 읽기 방식으로 변경 없이 대조했고, 원격 Registry 등록·서버 이미지 배치와 Manager 대상 사용 가능 상태까지 확인했습니다. worker00은 작업이 실행 중이어서 업데이트를 제출하지 않았습니다. <strong>실제 적용·GitLab 조회 복구와 CI 구현은 아직 확인되지 않았습니다.</strong> Console 화면 변경은 없습니다.</p><a href="../${connectorLedgerCompatCandidate.slug}/">복구 범위·공급 상태·적용 후 검사 보기 →</a></section>
    <section id="system-events-candidate" class="release-deployed"><span class="release-deployed-label">worker0 적용 확인 · 이벤트·스킬 자동업데이트 수용 전</span><h2>${systemEventsSkillAutoCandidate.label}</h2><p>RRA와 분리된 시스템 이벤트 수신·결과 기록, 이미 설치된 Registry 스킬의 전체/개별 동의 기반 자동업데이트, 관리자용 설정·결과 화면을 추가했습니다. Git 스킬 다운로드 격리와 전체 워커 자동 업데이트 일정 처리도 보완했습니다. 빌드·원격 Registry 등록·서버 배치·worker0 제안 뒤 사용자 업데이트가 진행됐고, <strong>10월 13일 08:26(KST) 이후 worker0의 정확한 실행 이미지·정상 건강 상태</strong>를 확인했습니다. 관리자 화면의 handler는 준비 상태지만 수신 꺼짐·발행자 0명입니다. 외부 HTTPS 확인은 신뢰 프록시 미설정으로 거부되며 단일 스킬 자동업데이트·CI 전송 시험은 아직 없습니다. worker00은 운영 Wiki를 작성했으나 CI 구현은 Connector 기록 오류로 차단돼 commit/push가 없습니다. 새 실제 화면 캡처도 미확보입니다.</p><a href="../${systemEventsSkillAutoCandidate.slug}/">적용 상태와 남은 운영 검사 보기 →</a></section>
    <section id="ui-skills-candidate" class="release-deployed"><span class="release-deployed-label">worker0 과거 적용 확인 · 기능·화면 수용 전</span><h2>${uiSkillsDiagnosticsCandidate.label}</h2><p>상태·아이콘·설정 레이아웃·0건 차트·Wiki 그래프·첫 탐색과 전체 업데이트의 관찰 방식을 보완하고, 스킬 설치 실패 단계와 마지막 진단을 표시합니다. 10월 12일 실행 버튼 활성까지 확인한 기록은 당시 준비 상태입니다. <strong>2026년 10월 13일 08:03(KST) worker0에서 이 이미지의 실행과 정상 건강 상태</strong>를 별도 읽기로 확인했습니다. 이후 worker0은 다음 시스템 이벤트 이미지로 변경됐습니다. 이 이미지의 새 실제 화면과 스킬 업무 결과는 미검증입니다.</p><a href="../${uiSkillsDiagnosticsCandidate.slug}/">과거 적용과 남은 기능 검사 보기 →</a></section>
    <section id="context-candidate" class="release-deployed"><span class="release-deployed-label">worker0 과거 적용 확인 · 기능·화면 수용 전</span><h2>${contextCompatCandidate.label}</h2><p>긴 대화의 맥락 계산·선택 입력 배분, 같은 모델의 선택적 의미 요약과 이전 버전이 읽을 수 있는 저장 형식을 보완했습니다. 이미지 빌드·Registry 등록·서버 배치와 이전 업데이트 제안을 확인했고, 2026년 10월 11일 22:57(KST) 읽기 전용 조회에서 <strong>worker0의 실행 이미지와 건강 상태</strong>를 확인했습니다. 10월 13일에는 다음 UI·스킬 진단 이미지의 실행을 확인했고, 이후 시스템 이벤트 이미지로 다시 변경됐습니다. 다른 워커의 적용과 이 과거 이미지의 실제 장문 대화 결과는 미검증입니다. 기본 요약 방식은 여전히 추출식이며 60초 격리 시험을 기본 20초 운영 통과로 보지 않습니다.</p><a href="../${contextCompatCandidate.slug}/">적용 범위와 남은 기능 검사 보기 →</a></section>
    <section id="security-deployed" class="release-deployed"><span class="release-deployed-label">worker0 과거 적용 확인 · 기능·화면 수용 전</span><h2>${securityCodexCandidate.label}</h2><p>Worker 생산 의존성 경고를 이미지 감사 시점 0건으로 줄이고 번들 Codex를 0.162.0으로 갱신한 이미지입니다. 2026년 10월 11일 14:13(KST) 읽기 전용 조회에서 <strong>당시 worker0이 이 이미지로 실행 중이며 건강 상태가 정상</strong>임을 확인했습니다. 이후 worker0은 대화 맥락 개선 이미지로 변경됐습니다. worker00의 현재 적용 상태와 상세 화면·업무 결과는 이 증거로 판정하지 않습니다. 관측됐던 짧은 후속 질문 차단의 개선 효과는 후속 이미지에서 별도 검사가 필요합니다.</p><a href="../${securityCodexCandidate.slug}/">과거 적용 범위와 남은 검사 보기 →</a></section>
    <section id="ui-context-candidate" class="release-candidate"><span class="release-candidate-label">운영 미적용 · 이전 이미지 후보</span><h2>${uiContextCandidate.label}</h2><p>공통 대화 컨텍스트, 실행 프로필 선택, 언어·상태 표시를 보완한 별도 이미지입니다. 빌드·Registry 등록·서버 사전 배치를 확인했고, worker0 제안은 2026년 10월 9일 20:58(KST) 사용 가능 응답을 받았습니다. 이후 worker0에는 다른 이미지가 적용됐으며 이 후보 이미지 자체의 지정 워커 적용은 확인되지 않았습니다.</p><a href="../${uiContextCandidate.slug}/">이전 후보의 개선 내용과 남은 검사 보기 →</a></section>
    <div class="release-timeline">${entries.map(entry => `<section id="${entry.id}" class="release-entry"><div class="release-entry-head"><span class="release-date">${entry.date}</span><div><h2>${entry.label}</h2><p>${entry.workers}</p></div></div><p class="release-state">${entry.state}</p><p>${entry.introduction}</p><div class="release-improvements">${entry.improvements.map(([title, description, slug]) => `<div><h3>${title}</h3><p>${description}</p><a href="../${slug}/">사용법·테스트 보기 →</a></div>`).join('')}</div><p class="release-evidence"><strong>확인 범위</strong>${entry.evidence}</p></section>`).join('')}</div><section id="verify"><h2>내 워커에서 확인하기</h2><ol><li>워커 이름, 실행 이미지와 확인 시각을 기록합니다. 콘솔의 <code>v0.1.0</code>은 배포 식별자로 단독 사용하지 않습니다.</li><li>해당 이미지 항목이 현재 적용, 과거 확인 또는 운영 미적용 후보인지 확인합니다.</li><li>적용된 워커에서 화면과 실제 기능 결과를 따로 검사합니다. 새 후보는 지정 워커에 적용된 뒤에만 운영 수용 절차를 진행합니다.</li></ol><p>정확한 내부 이미지 식별자와 배포 검증 기록은 별도 운영 문서에서 관리합니다.</p></section>`
};
