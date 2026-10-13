// Public image-edition copy. Exact image digests and internal runtime evidence stay private.
export const claudeSubscriptionAuthCandidate = {
  slug: 'candidate-20261014-claude-subscription-auth',
  label: '2026.10.14 Claude 구독 인증 보정 이미지',
  status: {
    build: '완료 · 불변 이미지·격리 인증 검사 통과',
    registry: '등록 완료 · 원격 이미지 식별 확인',
    prestage: '완료 · 서버 이미지 단독 배치',
    offer: 'claude-worker 할당 확인',
    apply: 'claude-worker 실행·건강·인증 준비 확인 · 모델 요청 전'
  }
};

export const claudeSubscriptionAuthCandidateGuide = {
  slug: claudeSubscriptionAuthCandidate.slug, title: claudeSubscriptionAuthCandidate.label, category: '버전',
  description: 'Claude 구독 파일 로그인과 장기 OAuth 토큰의 경계를 바로잡은 이미지의 동작, 제한, 적용 후 검사 방법입니다.',
  verifiedAt: '2026.10.14', evidenceLabel: 'claude-worker 실행·건강·인증 준비 확인 / 모델 요청 전', history: true, deployed: true, deployedWorker: 'claude-worker',
  toc: [['state','이미지와 적용 상태'],['change','무엇이 달라졌나'],['usage','구독 계정 사용법'],['limits','자격 증명과 기능 경계'],['checks','확인된 검사'],['acceptance','적용 후 재현 검사'],['captures','화면 증거 범위']],
  body: () => `<div class="note capture-warning"><strong>claude-worker 적용·건강·인증 준비 확인 · 실제 모델 요청 전</strong>이번 보정은 Claude 구독 인증의 사전 판정과 실행 경로에 관한 것입니다. 이미지 공급과 지정 워커 적용을 확인했으며, 적용 후 읽기에서 기존 구독 파일 로그인과 갱신 토큰이 남고 Worker 인증 준비 상태가 확인됐습니다. <strong>CLI의 실제 토큰 갱신과 모델 응답은 아직 확인하지 않았습니다.</strong> 상태 파일의 전후 해시 차이는 기동 시 메타데이터 정규화로 확인했고 환경 변수 항목·마운트 구조는 유지됐습니다.</div>
    <section id="state"><h2>이미지와 적용 상태</h2><p>2026.10.14는 정식 제품 버전 번호가 아닙니다. 콘솔의 <code>v0.1.0</code>이나 날짜만으로 이미지를 구별하지 않습니다. 정확한 소스·이미지 식별과 비교 기준은 비공개 배포 기록에서 관리합니다. 이번 이미지는 앞선 RRA·진행·동시 실행 이미지의 소스를 기준으로 Claude 인증 보정을 더한 별도 불변 이미지입니다.</p><div class="release-stage-grid">
      <div><strong>이미지 빌드·격리 검사</strong><span>${claudeSubscriptionAuthCandidate.status.build}</span></div>
      <div><strong>Registry 등록</strong><span>${claudeSubscriptionAuthCandidate.status.registry}</span></div>
      <div><strong>서버 사전 배치</strong><span>${claudeSubscriptionAuthCandidate.status.prestage}</span></div>
      <div><strong>워커 업데이트 제안</strong><span>${claudeSubscriptionAuthCandidate.status.offer}</span></div>
      <div><strong>워커 실제 적용</strong><span>${claudeSubscriptionAuthCandidate.status.apply}</span></div>
    </div><p>10월 14일 07:58(KST) claude-worker가 정확한 새 이미지로 시작해 정상 건강·재시작 0·활성 작업 0 상태인 것을 확인했습니다. Console의 업데이트 완료 알림과 <code>succeeded</code> 상태도 확인했습니다. 기존 구독 로그인 파일의 소유권·권한·수정 시각과 갱신 토큰 존재도 유지됐습니다. Worker의 인증 진단은 구독 파일 로그인을 사용 가능, 액세스 만료·갱신 대기 상태로 읽었고 종량제 API 키나 장기 OAuth 토큰이 적용됐다고 보고하지 않았습니다. 다른 워커는 변경되지 않았습니다. 상태 파일의 바이트 해시 차이는 기동 시 출처 메타데이터 정규화로 확인했으며 환경 변수 항목·마운트 구조와 기존 지식·스킬, 다른 워커 상태는 유지됐습니다.</p></section>
    <section id="change"><h2>무엇이 달라졌나</h2><p>이전 Worker는 Claude 파일 로그인에 <strong>액세스 토큰 만료</strong>가 기록되면 갱신 토큰과 네이티브 Claude CLI의 구독 로그인 상태가 남아 있어도 실행 전에 거부할 수 있었습니다. 이 이미지는 갱신 토큰이 있고 네이티브 상태가 <strong>로그인됨·Claude 구독·first-party</strong>로 확인되면 요청을 CLI로 넘겨 정상 갱신 기회를 줍니다. Worker가 토큰을 직접 갱신하거나 실패한 업무 요청을 자동으로 다시 보내지는 않습니다.</p><p>구독용 OAuth 토큰은 종량제 API 키·bearer 자격 증명과 구별합니다. 네이티브 로그아웃, 잘못된 상태, 다른 제공자, API 키·helper 경로 또는 <code>--bare</code> 실행은 구독 준비 완료로 표시하지 않습니다. 다른 Adapter, 특히 Kimi 실행에 Claude 토큰이 전달되지 않도록 경계를 유지합니다. 인증 상태는 실제 설정 홈과 구조화된 네이티브 상태를 기준으로 읽습니다.</p></section>
    <section id="usage"><h2>구독 계정 사용법</h2><ol><li>사용자는 claude-worker가 이번 이미지를 실행 중인지 운영 담당자의 적용 확인을 먼저 받습니다. 콘솔 표시 버전만으로 정확한 이미지를 추정하지 않습니다.</li><li>기존 Claude 구독 파일 로그인을 사용하는 경우, 로그인 파일을 삭제하거나 갱신 토큰을 복사하지 않습니다. 관리자 진단에서 네이티브 로그인됨·구독 제공자와 Worker의 사용 가능 판정을 대조합니다.</li><li>승인된 무해한 시험 요청 한 건을 Claude로 실행하고, 최종 Task 상태와 실제 답변을 확인합니다. 만료된 액세스 토큰이 있는 경우에도 CLI의 갱신 기회를 거쳐 성공했는지는 실제 요청 결과로만 판단합니다.</li><li>실패하면 표시된 최종 오류·시각·Task ID를 기록하고 운영 담당자에게 전달합니다. 같은 요청을 무작정 반복하거나 비밀 토큰을 채팅·캡처에 붙이지 않습니다.</li></ol><p>장기 구독 토큰 발급·주입은 사람의 인증과 보호된 비밀 관리가 필요한 별도 운영 절차입니다. 이번 이미지에 토큰을 발급하거나 넣지 않았으며 기존 파일 로그인은 유지합니다.</p></section>
    <section id="limits"><h2>자격 증명과 기능 경계</h2><p>구독 준비 상태는 실제 제공자 요청 성공의 보증이 아닙니다. CLI가 갱신·요청을 시도한 뒤 실패하면 그 실패를 최종 결과로 취급합니다. 장기 토큰을 사용할 때에도 종량제 API 키로 조용히 전환하지 않으며, 거부된 장기 토큰을 만료된 파일 로그인으로 자동 대체하지 않습니다. <code>--bare</code> 모드에서는 구독 인증을 허용하지 않습니다.</p><p>설정 화면의 환경 변수 비밀값 마스킹은 표시 가림 기능이며 암호화된 비밀 저장소가 아닙니다. 비밀값은 공개 매뉴얼·소스·캡처에 기록하지 않습니다. 선택적 Claude 의미 요약은 기존 파일 로그인 자격 확인 범위에 남아 있으며 장기 토큰 방식은 이번 보정으로 새로 검증되지 않았습니다. 번들 Codex 0.162.0, Claude 2.1.183, Kimi 0.29.2, Node 22.23.3 버전은 앞선 이미지와 같습니다.</p></section>
    <section id="checks"><h2>확인된 검사</h2><p>깨끗한 소스에서 전체 개발 검사 <strong>455건 통과</strong>, Wiki 검증과 최소 안정성 검사가 통과했습니다. 인증 회귀 검사 <strong>17개 그룹</strong>과 로컬 불변 이미지의 격리 인증 검사가 통과했습니다. 이미지 내부 파일 <strong>1,384개</strong>의 출처·무결성을 확인했고 네트워크 차단·읽기 전용·비루트 환경에서 구성요소 버전과 이전 기능 보존을 점검했습니다.</p><p>별도 적용 후 읽기에서 claude-worker의 정확한 실행 이미지·정상 건강·인증 준비 상태는 확인했습니다. 이것은 운영 로그인 파일의 실제 갱신 성공이나 Claude 모델 응답을 입증하지 않습니다. 장기 토큰은 발급·주입하지 않았고, 실제 모델 요청과 재시작 보존 시험은 아직 없습니다.</p></section>
    <section id="acceptance"><h2>적용 후 재현 검사</h2><ol><li>claude-worker의 정확한 실행 이미지·건강·재시작 상태를 다시 읽고, 기동 정규화된 상태 파일과 보존된 설정·마운트의 판정을 비공개 운영 기록에서 확인합니다.</li><li>비밀값을 출력하지 않는 진단으로 실제 설정 홈과 네이티브 로그인 상태가 구독·first-party·로그인됨인지 확인합니다. 액세스 만료와 갱신 토큰 존재는 구분하고, 갱신 토큰이 없는 만료 파일은 준비 완료로 판정하지 않습니다.</li><li>사람이 승인한 무해한 Claude 모델 요청 한 건을 실행해 최종 상태와 답변을 확인합니다. 네이티브 갱신의 성공 여부는 이 실제 결과로 판정하며, 실패하면 중복 실행 없이 원인을 기록합니다.</li><li>격리 시험에서는 네이티브 로그아웃·잘못된 상태·다른 제공자·API 키 경로·<code>--bare</code>의 구독 인증 거부와 Kimi 등 다른 Adapter로 토큰이 넘어가지 않는지를 확인합니다. 운영 자격 증명을 변형해 시험하지 않습니다.</li><li>장기 토큰 전환을 별도로 승인받았다면 보호된 비밀 주입과 재시작 보존, 만료·교체 계획을 검증합니다. 이 단계는 이번 적용의 완료 결과가 아닙니다.</li></ol><p>각 항목에 워커 이름·이미지 식별·시각·Task 결과를 남기고, 비밀값은 기록하지 않습니다. 현재 이미지·건강·인증 준비 읽기만 확인됐으며, 실제 모델 요청과 갱신 성공은 미검증입니다.</p></section>
    <section id="captures"><h2>화면 증거 범위</h2><p><strong>새 UI 배치 변경 없음 · 새 이미지의 운영 인증 화면 캡처 미확보</strong>입니다. 인증 판정은 화면 모양이 아니라 지정 워커의 실행 이미지·네이티브 상태·실제 Task 결과로 확인해야 합니다. 적용 후에는 비밀값을 가린 콘솔의 실행 상태와 최종 시험 결과만 촬영하고, 촬영 시각·실행 이미지를 함께 기록합니다. 과거 화면을 이번 이미지의 운영 증거로 재사용하지 않습니다.</p></section>`
};
