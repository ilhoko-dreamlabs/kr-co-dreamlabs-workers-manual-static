// Public candidate copy. Exact source/image identity and receipts stay in private evidence.
export const securityCodexCandidate = {
  slug: 'candidate-20261010-security-codex',
  label: '2026.10.10 보안 의존성·Codex 0.162.0 개선 후보',
  status: {
    build: '완료 · 이미지 검사 통과',
    registry: '등록 완료 · 이미지 식별 일치',
    prestage: '완료 · 서버 이미지 식별 일치',
    offer: 'worker0 사용 가능 응답 확인 · 재조회 필요',
    apply: '미진행'
  }
};

export const securityCodexCandidateGuide = {
  slug: securityCodexCandidate.slug, title: securityCodexCandidate.label, category: '버전',
  description: 'Worker 생산 의존성 경고와 번들 Codex 버전을 개선한 운영 미적용 이미지 후보의 내용과 검증 범위입니다.',
  verifiedAt: '2026.10.10', evidenceLabel: '후보 이미지 공급·제안 확인 / 운영 미적용', history: true, candidate: true,
  toc: [['state','현재 단계'],['changes','이번 이미지에서 바뀐 점'],['compatibility','호환성과 기존 기능'],['actions','사용자·관리자 행동'],['checks','확인된 검사'],['limits','남은 확인 사항'],['acceptance','적용 후 테스트']],
  body: () => `<div class="note capture-warning"><strong>운영 미적용 이미지 후보</strong>이미지 빌드·Registry 등록·서버 사전 배치와 worker0의 업데이트 제안 응답을 확인했습니다. 실제 워커 업데이트는 실행되지 않았습니다. <a href="../release-history/">버전별 개선 이력</a>에서 운영 배포와 후보를 구분해 확인하세요.</div>
    <section id="state"><h2>현재 단계</h2><p>2026년 10월 10일(KST) 빌드한 이미지입니다. 날짜는 정식 제품 버전 번호가 아닙니다. 이전 <a href="../candidate-20261009-ui-context/">UI·공통 대화 컨텍스트 후보</a>와는 별개의 불변 이미지입니다. worker0의 제안은 2026년 10월 10일 00:19(KST) 읽기 전용 확인 결과이며 만료·갱신될 수 있으므로 적용 전에 다시 조회해야 합니다.</p><div class="release-stage-grid">
      <div><strong>이미지 빌드·격리 검사</strong><span>${securityCodexCandidate.status.build}</span></div>
      <div><strong>Registry 등록</strong><span>${securityCodexCandidate.status.registry}</span></div>
      <div><strong>서버 사전 배치</strong><span>${securityCodexCandidate.status.prestage}</span></div>
      <div><strong>워커 업데이트 제안</strong><span>${securityCodexCandidate.status.offer}</span></div>
      <div><strong>워커 실제 적용</strong><span>${securityCodexCandidate.status.apply}</span></div>
    </div><p>각 단계는 별도로 확인합니다. Registry 등록이나 서버에 이미지를 준비하는 것만으로 워커 실행 버전이 바뀌지 않습니다.</p></section>
    <section id="changes"><h2>이번 이미지에서 바뀐 점</h2><div class="release-improvements"><div><h3>Worker 생산 의존성</h3><p>이전 후보에서 보고된 생산 의존성 보안경고 8건(심각 1·높음 2·보통 5)에 대응하는 호환 버전으로 갱신했습니다. 새 이미지의 생산 의존성 <code>npm audit --omit=dev</code> 결과는 0건입니다. 이는 검사 시점의 해당 의존성 집합 결과이며 운영 보안 전체를 보증하지 않습니다.</p></div><div><h3>번들 Codex CLI</h3><p>Worker 이미지에 포함된 Codex CLI를 0.154.0에서 정식 0.162.0으로 올렸습니다. Claude 2.1.183과 Kimi 0.29.2는 유지했습니다. 사용 중인 개별 CLI의 즉시 업데이트 기능이 추가된 것은 아닙니다.</p></div></div><p>주요 갱신 패키지는 MCP SDK 1.30.0 → 1.32.1, Express 4.22.2 → 4.22.3, body-parser 1.20.6 → 1.20.8, proxy-addr 2.0.7 → 2.0.8, fast-uri 3.1.5 → 3.1.8, hono 4.13.0 → 4.13.13, ip-address 10.4.0 → 10.7.3, qs 6.15.3 → 6.16.0입니다. Express의 주 버전은 4로 유지했습니다.</p></section>
    <section id="compatibility"><h2>기존 기능과 데이터 호환성</h2><p>이 이미지는 직전 UI·공통 대화 컨텍스트 후보의 화면·언어·상태 표시 개선을 그대로 포함합니다. 이번 이미지에서 새로운 사용자 화면이나 설정 메뉴가 추가된 것은 아닙니다. 이전 후보의 상세 사용·수용 항목은 <a href="../candidate-20261009-ui-context/">해당 버전 페이지</a>에서 확인하세요.</p><p>인증 데이터, 대화 History, Wiki를 초기화하거나 옮기는 변경은 포함되지 않았습니다. 데이터 마이그레이션을 완료했다고 표시할 항목도 없습니다.</p></section>
    <section id="actions"><h2>사용자와 관리자가 할 일</h2><div class="release-improvements"><div><h3>일반 사용자</h3><p>지정 워커에 이 후보가 실제 적용되기 전에는 화면이나 답변 변화가 있다고 기대하지 않습니다. 적용 후 새 세션의 모델 목록과 시험 요청 결과를 확인하고, 이전 후보의 실행 프로필·컨텍스트 사용법을 새 화면에서 대조합니다.</p></div><div><h3>관리자</h3><p>업데이트 패널에서 제안을 새로 조회하고 대상 워커·이미지·현재 상태를 확인합니다. 사용자가 Update를 선택한 뒤에만 실제 적용 여부를 판정합니다. 생산 의존성 감사와 CLI 버전, 데이터 보존, 프록시 전달 헤더 정책은 각각 별도 증거로 확인합니다.</p></div></div></section>
    <section id="checks"><h2>확인된 검사</h2><p>정확한 후보 소스의 전체 개발 검증은 <strong>414건 통과·실패 0·차단 0</strong>이었고, 새 이미지 내부의 생산 의존성 점검은 0건이었습니다. 이미지 안의 Codex 0.162.0, Claude 2.1.183, Kimi 0.29.2와 파일 무결성을 네트워크 없는 일회용 검사로 확인했습니다.</p><p>Windows와 Linux 이미지에서 실제 CLI 및 Worker 실행 경로를 합성 로컬 제공자와 연결해 모델 목록, Wiki·Connector 왕복, 컨텍스트·스킬 텍스트, 최종 응답, 취소 동작을 검사했습니다. 유료 모델을 호출하거나 지정 운영 워커에서 이 새 이미지의 기능을 실행한 결과는 아닙니다.</p></section>
    <section id="limits"><h2>남은 확인 사항</h2><ul><li>후보 화면 캡처도 미촬영입니다. 새 UI는 없지만 실제 적용 뒤 기존 기능 화면과 실행 결과를 새 이미지 기준으로 다시 확인해야 합니다.</li><li>저장소의 별도 개발 도구 보안경고 7건은 이번 Worker 생산 이미지의 0건 결과에 포함되지 않으며 해결했다고 주장하지 않습니다.</li><li>운영 Apache의 전달 헤더 처리와 직접 접근 경로는 별도 운영 확인이 필요합니다.</li><li>유료 모델의 실제 답변 품질, 운영 자격 증명, 지정 워커의 기능 수용은 아직 검사하지 않았습니다.</li></ul></section>
    <section id="acceptance"><h2>실제 적용 후 테스트</h2><ol><li>관리자가 새 제안을 다시 조회하고 대상 워커·현재 버전·업데이트 가능 상태를 확인합니다. 실제 적용은 사용자가 선택한 뒤 진행합니다.</li><li>적용 뒤 지정 워커의 정확한 실행 이미지, 건강 상태와 보존된 대화·설정을 확인합니다.</li><li>관리자 검증에서 번들 CLI 버전과 이미지의 생산 의존성 점검 결과를 대조합니다. 일반 사용자는 새 세션에서 모델 목록과 시험 요청의 최종 결과를 확인합니다.</li><li>이전 후보에서 추가된 실행 프로필 선택, 언어 전환, 공통 컨텍스트 정보 화면을 데스크톱·모바일에서 다시 열고 실제 화면을 새로 촬영합니다.</li><li>승인된 시험 범위에서 실제 모델 응답·취소·Wiki와 Connector 결과를 점검하고, 운영 프록시 헤더 정책은 별도 운영 기록으로 검증합니다.</li></ol><p>적용·화면·실제 결과를 각각 통과시키기 전까지 이 후보를 현재 운영 배포로 표시하지 않습니다.</p></section>`
};
