// Public candidate copy. Exact source/image identity and status receipts are private evidence.
export const uiContextCandidate = {
  slug: 'candidate-20261009-ui-context',
  label: '2026.10.09 UI·공통 대화 컨텍스트 통합 후보',
  shortLabel: 'UI·공통 대화 컨텍스트 통합 후보',
  status: {
    build: '완료 · 격리 검사 통과',
    registry: '등록 완료 · 이미지 식별 일치',
    prestage: '완료 · 서버 이미지 식별 일치',
    offer: 'worker0 사용 가능 응답 확인 · 재조회 필요',
    apply: '미진행'
  }
};

export const uiContextCandidateGuide = {
  slug: uiContextCandidate.slug, title: uiContextCandidate.label, category: '버전',
  description: '운영에 적용되지 않은 이미지 후보의 개선 내용, 확인된 검사와 남은 수용 항목입니다.',
  verifiedAt: '2026.10.09', evidenceLabel: '후보 이미지 빌드·격리 검사 확인 / 운영 미적용', history: true, candidate: true,
  toc: [['state','현재 단계'],['context','대화 컨텍스트'],['console','콘솔 사용성'],['locale','언어와 상태 표시'],['actions','사용자·관리자 행동'],['limits','검증 범위와 한계'],['acceptance','실제 적용 후 확인']],
  body: () => `<div class="note capture-warning"><strong>운영에 적용되지 않은 업데이트 후보</strong>이미지 빌드·Registry 등록·서버 사전 배치와 worker0의 업데이트 제안 응답을 확인했습니다. 실제 워커 업데이트는 실행되지 않았으므로 worker0·worker00에서 이 기능을 사용할 수 있다고 뜻하지 않습니다. 실제 배포 여부는 <a href="../release-history/">버전별 개선 이력</a>에서 별도로 확인하세요.</div>
    <section id="state"><h2>현재 단계</h2><p>현재 운영 이미지와 비교해 작성한 후보입니다. 날짜는 정식 제품 릴리스 번호가 아닙니다. 아래 제안 상태는 2026년 10월 9일 20:58(KST) 읽기 전용 확인 결과이며, 제안은 갱신될 수 있으므로 적용 전 관리자 화면에서 다시 확인해야 합니다.</p><div class="release-stage-grid">
      <div><strong>이미지 빌드·격리 검사</strong><span>${uiContextCandidate.status.build}</span></div>
      <div><strong>Registry 등록</strong><span>${uiContextCandidate.status.registry}</span></div>
      <div><strong>서버 사전 배치</strong><span>${uiContextCandidate.status.prestage}</span></div>
      <div><strong>워커 업데이트 제안</strong><span>${uiContextCandidate.status.offer}</span></div>
      <div><strong>워커 실제 적용</strong><span>${uiContextCandidate.status.apply}</span></div>
    </div></section>
    <section id="context"><h2>대화 컨텍스트를 일관되게 확인</h2><p>채팅, Mattermost, 다른 워커 요청, 예약 작업에 공통된 컨텍스트 계산 방식을 적용합니다. 새 요청에 실제로 들어갈 대화 범위를 입력 예산 안에서 고르고, 원문·요약·이력과 실제 주입 정보를 확인하는 화면을 제공합니다. 필요할 때 다음 요청용 컨텍스트를 다시 만들고 요약 후보를 비교할 수 있습니다.</p><p>다른 워커 요청은 API Key·세션 범위를 섞지 않으며 예약 작업의 각 실행 회차도 독립적으로 다룹니다. 요약 때문에 원문을 숨기거나 이미 잃어버린 과거 기록을 복원한다고 안내하지 않습니다.</p></section>
    <section id="console"><h2>모델·추론·속도를 한 흐름에서 선택</h2><p>요청 입력란의 실행 프로필을 <strong>모델 → 추론 강도 → 속도</strong> 순서로 고르고 마지막 단계에서 확정하도록 정리합니다. 선택 도중 <kbd>Esc</kbd>를 누르면 변경을 취소합니다. 입력란과 조작 버튼은 모바일 폭에서도 정렬되도록 보완했습니다.</p><p>실제 메뉴 이름과 적용 결과는 이 이미지가 지정 워커에 적용된 뒤 <a href="../execution-options/">실행 옵션 사용법</a>의 절차로 다시 확인해야 합니다.</p></section>
    <section id="locale"><h2>언어 변경과 상태 표시 개선</h2><p>한국어·영어를 바꿀 때 대시보드, 프로젝트, 다른 워커 요청, 스킬, 설정 등 동적으로 갱신되는 화면도 선택한 언어로 다시 표시하도록 보완했습니다. 상태 배지와 아이콘을 정리하고, 비활성·연결 끊김·준비 안 됨 같은 부정 상태가 정상 상태처럼 보이지 않게 검사를 추가했습니다.</p><p>이 항목은 <a href="../preferences/">언어와 테마</a> 및 관련 기능 화면을 실제 배포 후 다시 열어 확인해야 합니다.</p></section>
    <section id="actions"><h2>사용자와 관리자가 할 일</h2><div class="release-improvements"><div><h3>일반 사용자</h3><p>현재 운영 워커에서는 후보 기능을 전제로 작업하지 않습니다. 실제 업데이트가 끝난 뒤 실행 프로필 선택·취소, 언어 전환, 컨텍스트 정보 화면과 새 요청 결과를 비교합니다.</p></div><div><h3>관리자</h3><p>적용 전에 대상 워커와 업데이트 제안을 새로 조회하고 기존 정책을 확인합니다. 실제 적용은 사용자가 업데이트를 선택한 뒤 별도로 진행됩니다. 요약 정책 변경은 별도 관리자 설정이며, API를 통한 의미 요약은 같은 모델 사용을 명시적으로 선택한 경우에만 적용합니다. 이미지 준비가 운영 설정 변경이나 데이터 마이그레이션 완료를 뜻하지 않습니다.</p></div></div></section>
    <section id="limits"><h2>검증 범위와 알려진 한계</h2><p>정확한 후보 소스에서 전체 개발 검증 413건이 통과했고 실패·차단은 0건입니다. 데스크톱 1440/1920px과 모바일 390px의 Chromium 레이아웃 43건, 한국어·영어 컨텍스트 화면 검사, 네트워크 없는 일회용 이미지 검사를 통과했습니다.</p><ul><li>지정 워커의 실제 화면과 유료 모델을 사용하는 최종 동작은 아직 검사하지 않았습니다. 후보 화면 캡처도 미촬영입니다.</li><li>CLI 실행 도중 무제한 컨텍스트 압축은 보장하지 않습니다. CLI는 추출식 대체 방식을 사용합니다.</li><li>기존 의존성 보안 점검 항목은 남아 있습니다. 이 후보가 해결했다고 표시하지 않습니다.</li></ul></section>
    <section id="acceptance"><h2>실제 적용 후 확인할 순서</h2><ol><li>지정 워커에 적용된 이미지와 건강 상태를 읽어 이 후보와 일치하는지 확인합니다.</li><li>데스크톱·모바일에서 실행 프로필의 선택·확정·<kbd>Esc</kbd> 취소와 상태 배지를 확인합니다.</li><li>한국어↔영어 전환 뒤 동적 화면이 다시 표시되는지 확인합니다.</li><li>시험용 새 요청에서 컨텍스트 원문·요약·실제 주입 정보와 최종 결과를 대조합니다. 다른 워커 요청과 예약 회차의 범위도 별도로 검사합니다.</li></ol><p>검사를 마치기 전까지 현재 운영 배포의 화면이나 2026년 10월 1일 과거 캡처를 이 후보의 결과로 사용하지 않습니다.</p></section>`
};
