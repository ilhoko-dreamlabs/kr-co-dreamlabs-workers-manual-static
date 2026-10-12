// Public image-edition copy. Exact source, image digests and operating receipts stay private.
export const uiSkillsDiagnosticsCandidate = {
  slug: 'candidate-20261011-ui-skills',
  label: '2026.10.11 UI·스킬 설치 진단 개선 이미지',
  status: {
    build: '완료 · 이미지·호환성 검사 통과',
    registry: '등록 완료 · 원격 이미지 식별 일치',
    prestage: '완료 · 서버 이미지 식별 일치',
    offer: 'worker0 제안 수신 · 콘솔 실행 버튼 활성',
    apply: 'worker0 실행·건강 상태 확인 · 기능 수용 전'
  }
};

export const uiSkillsDiagnosticsCandidateGuide = {
  slug: uiSkillsDiagnosticsCandidate.slug, title: uiSkillsDiagnosticsCandidate.label, category: '버전',
  description: '콘솔 상태·탐색과 스킬 설치 실패 진단을 개선한 이미지의 worker0 실행 확인과 남은 기능 검사를 구분합니다.',
  verifiedAt: '2026.10.13', evidenceLabel: 'worker0 실행 이미지·건강 상태 확인 / 화면·기능 수용 전', history: true, deployed: true,
  toc: [['state','이미지와 적용 상태'],['screen','콘솔 화면 개선'],['skills','스킬 설치 진단'],['limits','호환성과 제한'],['blocker','업데이트 준비 상태'],['checks','확인된 검사'],['acceptance','적용 후 화면 테스트']],
  body: () => `<div class="note capture-warning"><strong>worker0 실행 이미지 확인 · 기능·화면 수용 전</strong>2026년 10월 13일 08:03(KST) 읽기에서 worker0이 이 정확한 이미지로 정상 실행 중이며 건강 상태가 정상임을 확인했습니다. 앞선 10월 12일의 업데이트 버튼 활성은 당시 준비 기록입니다. 이번 읽기에서는 새 <a href="../candidate-20261013-system-events-skill-auto-update/">시스템 이벤트 후보</a>가 다음 대상 할당으로 보였고 그 업데이트 버튼은 누르지 않았습니다. 이 이미지의 데스크톱·모바일 실제 화면과 스킬 업무 결과는 아직 별도 수용 검사를 하지 않았습니다.</div>
    <section id="state"><h2>이미지와 적용 상태</h2><p>2026년 10월 11일 빌드한 별도 불변 이미지입니다. 날짜는 정식 제품 버전 번호가 아닙니다. 앞선 대화 맥락 개선 이미지의 기능을 포함하되, 이번 항목에는 새로 바뀐 콘솔 표시와 스킬 설치 진단만 기록합니다. 정확한 이미지 식별자는 내부 배포 기록에서 관리합니다.</p><div class="release-stage-grid">
      <div><strong>이미지 빌드·격리 검사</strong><span>${uiSkillsDiagnosticsCandidate.status.build}</span></div>
      <div><strong>Registry 등록</strong><span>${uiSkillsDiagnosticsCandidate.status.registry}</span></div>
      <div><strong>서버 사전 배치</strong><span>${uiSkillsDiagnosticsCandidate.status.prestage}</span></div>
      <div><strong>워커 업데이트 제안</strong><span>${uiSkillsDiagnosticsCandidate.status.offer}</span></div>
      <div><strong>워커 실제 적용</strong><span>${uiSkillsDiagnosticsCandidate.status.apply}</span></div>
    </div><p>2026년 10월 11일 23:14(KST) 서버에서 정확한 이미지의 사전 배치와 컨테이너·설정 불변을 확인했습니다. 당시 worker0의 대상 할당은 대기열 잠금 불확실로 차단됐으나, 10월 12일 승인된 복구 뒤 실행 버튼 활성을 확인했습니다. 이후 10월 13일 08:03(KST) 읽기에서 이 이미지가 worker0의 현재 실행 이미지이고 건강 상태가 정상임을 확인했습니다. 실제로 어느 시각에 버튼이 눌렸는지 이 읽기만으로 단정하지 않습니다. 이 상태는 worker0의 런타임 식별 확인이며 다른 워커의 적용이나 사용자 기능·화면 검사 완료가 아닙니다.</p></section>
    <section id="screen"><h2>콘솔 화면에서 바뀌는 점</h2><div class="release-improvements"><div><h3>상태와 아이콘을 정확히 읽기</h3><p>상태 배지는 사용 불가·읽기 전용을 성공으로 보이게 하지 않도록 구분합니다. 아이콘에는 텍스트를 남기고 한국어·영어 접근성 이름을 제공하도록 보완했습니다. 녹색 표시만 보지 말고 실제 상태 문구와 마지막 결과를 함께 읽으세요.</p></div><div><h3>설정·차트·Wiki 표시</h3><p>설정 구역은 내용 높이에 맞춰 표시하고, 데이터가 0건인 차트는 값을 꾸며내지 않습니다. Wiki 그래프를 새로고침하는 동안 마지막 정상 그래프를 유지하며, 새 조회 실패를 성공 갱신으로 표시하지 않습니다.</p></div><div><h3>탐색과 업데이트 진행</h3><p>최상위 탐색은 처음 열 때 접힌 상태로 시작합니다. 기존에 사용자가 열어 둔 워커 간 요청의 하위 메뉴 상태와 실시간 상태 전달은 보존합니다. 전체 업데이트 화면은 접수된 요청의 결과를 제한된 시간 동안 관찰하고, 결과가 불확실하면 중복 실행을 유도하지 않도록 보완했습니다.</p></div></div><p>이 항목들은 새 이미지의 소스·합성 브라우저 검사 결과입니다. 현재 운영 워커의 화면에서 모두 보인다는 뜻은 아닙니다.</p></section>
    <section id="skills"><h2>스킬 설치 실패를 단계별로 확인</h2><p>관리자용 <a href="../skill-registry/">설정 → 스킬</a>에서 목록, 미리보기, 다운로드, 검증, 활성화, 설치 결과 재조회 중 어느 단계에서 실패했는지 한국어·영어 안내로 구분합니다. 마지막 실패 진단은 화면을 다시 열어도 확인할 수 있고, 감사 기록에도 남깁니다. 오류 코드·대상 스킬·버전을 확인한 뒤 해당 단계의 원인을 조치하세요. 같은 설치 버튼을 반복해서 누르는 것으로 해결됐다고 판단하지 않습니다.</p><div class="note"><strong>기존 스킬 보호</strong>업데이트가 중단됐을 때 기존 정상 패키지를 유지하는 경로를 읽기 검증으로 보완했습니다. 실패 후에는 기존 설치 기록과 실제 파일, 활성화 상태를 각각 재조회합니다. 설치·활성화·요청별 로딩·어댑터 적용은 여전히 별개입니다.</div></section>
    <section id="limits"><h2>호환성과 알려진 한계</h2><ul><li>Codex 0.162.0, Claude 2.1.183, Kimi 0.29.2는 앞선 이미지와 동일합니다. 이번 이미지의 CLI 업그레이드가 아닙니다.</li><li>상태 데이터 마이그레이션이나 의미 요약 정책 자동 활성화는 포함되지 않습니다. 이전 이미지 리더를 사용한 호환 검사 20건은 합성 실행이며 운영 롤백 결과가 아닙니다.</li><li>별도 스킬 Registry의 tunnel 1.3.1 후보는 아직 게시되지 않았습니다. 기존 카탈로그 패키지 오류가 이 Worker 이미지 하나로 해결됐다고 판단하지 않습니다.</li><li>데스크톱·모바일의 새 실제 화면과 스킬 설치·업데이트 업무 결과는 아직 확인하지 않았습니다. 기존 캡처는 이 이미지의 화면 증거로 사용하지 않습니다.</li></ul></section>
    <section id="blocker"><h2>과거 업데이트 준비 기록</h2><p>2026년 10월 11일 밤 worker0의 <a href="../whole-update/">Settings → Runtime → Whole Update</a> 화면에는 <code>UNIFIED_QUEUE_STATE_LOCK_UNCERTAIN</code> 차단 사유가 표시됐고 <strong>Run Whole Update</strong> 버튼이 비활성화돼 있었습니다. 사용자가 별도로 승인한 운영 복구에서 원본 잠금 증거를 보존하고 큐·상태 파일 152개의 내용이 바뀌지 않았음을 확인했습니다. 같은 당시 실행 이미지로 다시 시작한 뒤 10월 12일 00:57(KST) 건강 상태·작업 0건·잠금 부재를 확인했습니다. 이어 로그인 콘솔을 Refresh하자 차단 사유가 없고 <strong>Run Whole Update 버튼이 활성화</strong>돼 있었습니다. 당시 버튼과 확인창은 누르지 않았으므로 그 관찰만으로는 이 이미지의 적용 근거가 아니었습니다. 10월 13일 별도 읽기에서 worker0 실행 이미지임을 확인했습니다. 일반 사용자는 잠금 파일을 직접 다루지 말고, 실행 전 현재·대상과 차단 사유를 다시 조회하세요.</p></section>
    <section id="checks"><h2>확인된 검사와 범위</h2><p>정확한 새 이미지 소스의 전체 개발 검증은 <strong>430건 통과·실패 0·차단 0</strong>입니다. 유형 검사·빌드, Wiki 부정 사례 20건과 최소 안정성 검사를 통과했습니다. 소스 기반 Chromium 화면 검사 43건에서 여러 화면 너비의 상태·아이콘·레이아웃을 확인했고, 실제 이전 이미지 리더와의 저장 상태 호환 검사 20건이 통과했습니다.</p><p>브라우저 검사는 격리된 시험 화면이며 실제 worker0 화면 캡처가 아닙니다. 이번 10월 13일 읽기는 실행 이미지와 건강 상태만 확인했고, 실제 모델 호출이나 운영 스킬 설치·업데이트의 기능 결과는 아직 수용하지 않았습니다.</p></section>
    <section id="acceptance"><h2>실제 화면과 기능 테스트</h2><ol><li>worker0의 정확한 실행 이미지·건강 상태·보존 데이터를 검사 시각에 다시 확인합니다. 다른 워커는 별도로 적용 여부를 확인합니다.</li><li>일반 사용자 화면을 데스크톱·좁은 화면에서 열어 접힌 첫 탐색, 상태 문구와 아이콘 이름, 설정 구역 높이, 0건 차트, Wiki 새로고침 중 그래프를 실제로 촬영합니다.</li><li>관리자 화면에서 스킬 목록·설치·활성화·새 요청의 실제 적용을 각각 확인합니다. 실패 사례는 승인된 격리 시험에서만 만들고 실패 단계·재로그인 후 진단·기존 패키지 보존을 대조합니다.</li><li>전체 업데이트 화면의 현재·대상과 차단 사유를 새로고침 후 확인합니다. 새로운 시스템 이벤트 후보의 대상 할당은 이 이미지 자체의 기능 수용과 분리합니다.</li></ol><p>worker0의 실행 확인만으로 이 페이지의 화면·업무 기능까지 통과로 표시하지 않습니다.</p></section>`
};
