// Public deployment history. Exact image digests and internal rollout evidence stay in the private work packet.
import { uiContextCandidate } from './candidate-ui-context.mjs';
import { securityCodexCandidate } from './candidate-security-codex.mjs';
const entries = [
  {
    id: 'current', date: '2026.10.09', label: '현재 확인 배포', workers: 'worker0 · worker00',
    state: '두 워커 동일 이미지 · 실행/건강 상태 확인',
    introduction: '직전 확인본의 탐색·협업·스킬·업데이트 화면을 유지하며, 기존 연결과 요청 진입의 호환성을 보완했습니다.',
    improvements: [
      ['다른 워커 요청 찾기', '대상 연결 상태를 더 일관되게 찾고, 한국어로 특정 워커에 요청하거나 요청 후 결과까지 확인하려는 문장을 인식하도록 보완했습니다. 대상이 등록되지 않았다면 미설정 상태를 안내합니다.', 'remote-collaboration'],
      ['기존 연결 호환성', '이미 설정된 GitLab·GitHub API 연결의 사용 가능 상태를 복구했습니다. 새 권한이나 연결이 자동으로 추가됐다는 뜻은 아닙니다.', 'settings-map'],
      ['기존 스킬 설정 호환성', '보존된 스킬 정책을 읽어 새 작업의 승인 단계에 적용하는 호환성을 보완했습니다.', 'skill-loading']
    ],
    evidence: '2026.10.09 읽기 전용 운영 조회에서 두 워커가 running/healthy이며 동일한 실행 이미지를 사용함을 확인했습니다. worker00 콘솔의 대시보드와 탐색 메뉴는 열어 확인했습니다. 각 변경 기능의 저장·전송·새 작업 결과까지 이 확인만으로 통과로 판정하지 않습니다.'
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
  description: '현재 운영 배포와 두 개의 운영 미적용 이미지 후보를 버전별로 구분합니다.',
  verifiedAt: '2026.10.10', evidenceLabel: '운영 배포·후보 이미지 구분 확인', history: true,
  toc: [['reading','이력 읽는 법'], ['security-candidate','2026.10.10 개선 후보'], ['ui-context-candidate','2026.10.09 이전 후보'], ...entries.map(entry => [entry.id, `${entry.date} ${entry.label}`]), ['verify','내 워커에서 확인하기']],
  body: () => `<section id="reading"><h2>이력 읽는 법</h2><p>이 페이지는 <strong>현재 운영 배포와 두 개의 업데이트 후보</strong>를 구분해 기록합니다. 문서 수정 내역은 <a href="../changes/">매뉴얼 갱신 이력</a>에서 확인하세요. 현재 콘솔에는 <code>v0.1.0</code>이 표시됐지만, 이 번호만으로 아래 확인 배포를 구분할 수 없습니다. 정식 릴리스 번호가 확정되기 전까지는 <strong>확인 날짜·적용 워커·적용 상태</strong>를 함께 표시합니다. 날짜는 제품 버전 번호가 아닙니다.</p><div class="note"><strong>검증 수준</strong>이미지 빌드, Registry 등록, 지정 워커 적용, 실제 작업 결과는 서로 다른 단계입니다. 후보가 보이더라도 현재 워커에서 사용할 수 있다는 뜻은 아닙니다.</div></section>
    <section id="security-candidate" class="release-candidate"><span class="release-candidate-label">운영 미적용 · 새 이미지 후보</span><h2>${securityCodexCandidate.label}</h2><p>직전 UI·컨텍스트 후보를 포함하고 Worker 생산 의존성 경고를 이미지 검사 시점 0건으로 줄였으며 번들 Codex를 0.162.0으로 갱신했습니다. 빌드·격리 검사, Registry 등록과 서버 사전 배치가 완료됐습니다. worker0 업데이트 제안은 2026년 10월 10일 00:19(KST) 사용 가능 응답을 확인했으며 적용 전 재조회해야 합니다. <strong>지정 워커 실제 적용은 ${securityCodexCandidate.status.apply}</strong> 상태입니다.</p><a href="../${securityCodexCandidate.slug}/">이번 후보의 상세 변경과 테스트 보기 →</a></section>
    <section id="ui-context-candidate" class="release-candidate"><span class="release-candidate-label">운영 미적용 · 이전 이미지 후보</span><h2>${uiContextCandidate.label}</h2><p>공통 대화 컨텍스트, 실행 프로필 선택, 언어·상태 표시를 보완한 별도 이미지입니다. 빌드·Registry 등록·서버 사전 배치를 확인했고, worker0 업데이트 제안은 2026년 10월 9일 20:58(KST) 사용 가능 응답을 받았습니다. 제안은 적용 전에 다시 조회해야 합니다. <strong>지정 워커 실제 적용은 ${uiContextCandidate.status.apply}</strong> 상태입니다.</p><a href="../${uiContextCandidate.slug}/">이전 후보의 개선 내용과 남은 검사 보기 →</a></section>
    <div class="release-timeline">${entries.map(entry => `<section id="${entry.id}" class="release-entry"><div class="release-entry-head"><span class="release-date">${entry.date}</span><div><h2>${entry.label}</h2><p>${entry.workers}</p></div></div><p class="release-state">${entry.state}</p><p>${entry.introduction}</p><div class="release-improvements">${entry.improvements.map(([title, description, slug]) => `<div><h3>${title}</h3><p>${description}</p><a href="../${slug}/">사용법·테스트 보기 →</a></div>`).join('')}</div><p class="release-evidence"><strong>확인 범위</strong>${entry.evidence}</p></section>`).join('')}</div><section id="verify"><h2>내 워커에서 확인하기</h2><ol><li>콘솔의 Worker 이름과 표시 버전을 기록합니다. <code>v0.1.0</code>은 배포 식별자로 단독 사용하지 않습니다.</li><li>이 페이지에서 해당 항목이 운영 배포인지 후보인지 먼저 확인합니다.</li><li>운영 배포 항목의 적용 워커와 기능 사용법을 대조합니다. 후보 기능은 지정 워커에 실제 적용된 뒤에만 해당 페이지의 수용 절차를 진행합니다.</li></ol><p>정확한 내부 이미지 식별자와 배포 검증 기록은 별도 운영 문서에서 관리합니다.</p></section>`
};
