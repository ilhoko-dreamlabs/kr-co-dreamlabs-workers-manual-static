// Public candidate prose. Exact OCI identities and private qualification logs stay in the work packet.
export const namedExecutionProfilesCandidate = {
  slug: 'candidate-20261022-named-execution-profiles',
  label: '2026.10.22 사용자 정의 실행 프로필·예약 지금 실행 공급 후보',
  status: {
    build: '완료 · linux/amd64 로컬 불변 이미지 빌드·내부 검증',
    registry: '완료 · 동일 불변 이미지 Registry 등록·원격 식별',
    prestage: '완료 · 서버 이미지 단독 배치·13개 컨테이너 보존',
    offer: '확인 · 관리 대상 8개에 정확한 대상 제안 available',
    apply: '미확인 · 공급 조회 당시 Update 제출 없음',
  },
};

export const namedExecutionProfilesCandidateGuide = {
  slug: namedExecutionProfilesCandidate.slug,
  title: namedExecutionProfilesCandidate.label,
  category: '버전',
  description: '사용자 정의 실행 프로필·채널/키/예약 상속·예약 지금 실행 후보의 Registry·서버 배치·제안과 실제 적용 경계를 확인합니다.',
  verifiedAt: '2026.10.22 00:25(KST)',
  evidenceLabel: 'Registry·서버 배치·8개 제안 확인 / 실제 적용·화면 미촬영',
  history: true,
  candidate: true,
  noScreenshot: true,
  toc: [['state','공급·적용 단계'],['changes','이번 후보의 개선'],['compatibility','기존 설정과 호환'],['checks','검증 범위'],['acceptance','배포 뒤 확인할 항목'],['captures','화면 증거']],
  body: () => `<div class="note capture-warning"><strong>이미지 공급·제안 확인 · 실제 적용 전</strong>2026년 10월 22일 만든 별도 linux/amd64 이미지의 소스·이미지 내부 검증 뒤 동일 이미지를 Registry에 등록하고 서버에 이미지로만 배치했습니다. 관리 대상 8개가 정확한 대상 업데이트 제안을 available로 반환했지만 Update 제출과 지정 워커 적용은 확인되지 않았습니다. 이 공개 문서는 운영 미적용 후보를 설명하며, 날짜는 정식 제품 버전 번호가 아닙니다.</div>
    <section id="state"><h2>공급·적용 단계를 분리해 읽기</h2><div class="release-stage-grid"><div><strong>이미지 빌드·격리 검사</strong><span>${namedExecutionProfilesCandidate.status.build}</span></div><div><strong>Registry 등록</strong><span>${namedExecutionProfilesCandidate.status.registry}</span></div><div><strong>서버 사전 배치</strong><span>${namedExecutionProfilesCandidate.status.prestage}</span></div><div><strong>워커 업데이트 제안</strong><span>${namedExecutionProfilesCandidate.status.offer}</span></div><div><strong>워커 실제 적용</strong><span>${namedExecutionProfilesCandidate.status.apply}</span></div></div><p>10월 22일 공급 확인 시 관리 대상 8개가 모두 건강했고 업데이트 대기 상태는 없었습니다. 기존 컨테이너 13개와 설정은 유지됐으며 이미지 배치 자체로 실행 컨테이너를 바꾸지 않았습니다. 제안은 만료될 수 있으므로 업데이트 전 다시 조회해야 합니다. 비교 기준은 앞서 공급된 이미지의 소스이며, 이번 페이지는 그 이후 포함된 실행 프로필과 예약 수동 실행 개선을 설명합니다.</p></section>
    <section id="changes"><h2>이번 후보에서 달라진 점</h2><div class="release-improvements"><div><h3>이름 붙인 실행 프로필</h3><p>관리자가 프로필을 추가·복제·이름 변경·삭제하고, 어댑터마다 모델·추론 강도·속도 매핑을 저장합니다. 현재 어댑터의 지원·미지원·미검증 상태와 사용처·삭제 영향도 확인합니다.</p><a href="../named-execution-profiles/">프로필 설정과 직접 검사 보기 →</a></div><div><h3>요청별 상속과 고정</h3><p>Console의 이번 요청·세션, RRA API Key, Mattermost 채널, 예약에서 서버가 프로필을 선택합니다. 접수 순간의 설정을 고정해 대기·재시작 복구·결과 카드에서 대조합니다. 공개 RRA 호출자는 프로필이나 모델을 요청 본문으로 지정할 수 없습니다.</p><a href="../named-execution-profiles/#inheritance">상속 순서 보기 →</a></div><div><h3>예약 지금 실행</h3><p>관리자는 기존 예약 상세의 <strong>지금 실행</strong>으로 일정 시각과 별개인 수동 실행을 접수합니다. 같은 예약의 실행 레인을 공유하고 다음 예약 시각을 바꾸지 않습니다. 응답이 불확실하면 기존 작업의 상태를 확인합니다.</p><a href="../named-execution-profiles/#run-now">예약 실행 절차 보기 →</a></div><div><h3>오류와 결과 확인</h3><p>미지원·미검증 옵션은 요청 접수 때 차단하고 임의 모델로 바꾸지 않습니다. 완료 카드와 예약 이력은 접수 당시의 프로필 이름·어댑터·모델·추론·속도 정보를 표시합니다. 오래된 기록에 없으면 현재 설정으로 추정하지 않습니다.</p><a href="../named-execution-profiles/#results">결과·오류 읽기 →</a></div></div></section>
    <section id="compatibility"><h2>기존 설정과 호환성</h2><p>기존 프로필·대화·예약 기록은 현재 리더에서 보존하며, 새 프로필 편집이 이미 접수된 대기·실행 요청을 바꾸지 않습니다. 수동 예약 실행은 반복 일정의 <code>nextRunAt</code>을 앞당기거나 건너뛰지 않습니다. 과거 기록에 실행 설정 스냅샷이 없으면 현재 선택값으로 거꾸로 채우지 않습니다.</p><p><strong>업데이트는 앞으로만 진행합니다.</strong>이 후보가 기록한 새 스냅샷·예약 실행 정보가 있는 상태를 이전 이미지로 되돌리는 절차는 지원되는 복구 경로가 아닙니다. 문제는 보존된 자료를 지운 뒤 되돌리는 대신 후속 수정 이미지로 해결해야 합니다. 어댑터는 계속 한 번에 하나만 활성 상태이며, 프로필 저장이 런타임 전환이나 모델 요청을 실행하지는 않습니다. Claude의 사용자 정의 프로필은 이전 legacy 실행 경로를 지원하지 않으며, 확인되지 않은 속도·모델 옵션은 차단합니다.</p></section>
    <section id="checks"><h2>검증한 것과 아직 확인하지 않은 것</h2><p>포함된 소스의 깨끗한 개발 검증은 <strong>490건 통과·실패 0·차단 0</strong>으로 기록됐습니다. 로컬 이미지 내부에서는 패키지 파일 1,472개 무결성, 프로필 저장/해결 27건, 공통 실행 11건, Claude 합성 프로필 15건과 별도 Wiki 기동·건강 200을 확인했습니다. Node 22.23.3, Codex 0.162.0, Claude 2.1.183, Kimi 0.29.2의 CLI 기동도 대조했습니다. 이 격리 검사는 모델 요청을 보내지 않았습니다.</p><p>별도 Windows 로컬 시험에서 실제 Codex Console 요청 1건과 Codex·Claude의 고정된 네이티브 설정 요청을 확인했지만, 이는 Linux 이미지의 실제 제공자 호출, 모든 모델·옵션, Fast 모드, 운영 계정 결과 또는 지정 워커 수용을 증명하지 않습니다. Claude 이미지 내부 15건은 합성 자식 프로세스 검사입니다. Registry의 동일 이미지 식별, 서버 이미지 pull·식별, 관리 대상 8개의 제안 조회는 통과했지만 지정 워커 Update와 실제 기능 수용은 아직 확인되지 않았습니다.</p></section>
    <section id="acceptance"><h2>지정 워커 적용 뒤 직접 확인할 순서</h2><ol><li>먼저 그 워커의 정확한 실행 이미지·건강·기존 설정과 기록 보존을 비공개 운영 자료로 확인합니다. 후보 이미지 빌드나 제안만으로 적용을 판정하지 않습니다.</li><li>관리자와 일반 사용자로 <strong>설정 → 런타임 → 실행 프로필</strong>의 접근·편집 권한과 한국어/영어, 데스크톱·좁은 화면을 확인합니다. 안전한 시험 프로필에서 추가→매핑→저장→재조회→복제→사용처 확인→대체 또는 상속으로 삭제를 검사합니다.</li><li>Console 이번 요청·세션, RRA Key, Mattermost 채널, 예약의 상속 우선순위와 접수 당시 결과 카드·이력 정보를 각각 대조합니다. 공개 RRA 본문에 모델/프로필을 넣으면 거부되어야 합니다.</li><li>관리자가 시험 예약의 <strong>지금 실행</strong>을 한 번 누르고 접수→실행 상태→종료 이력과 다음 예약 시각 불변을 확인합니다. 응답 손실·재시작·동시 실행에서 같은 작업을 자동 중복 실행하지 않는지 별도 격리 자료로 검사합니다.</li><li>미지원/미검증 옵션, 삭제된 프로필, 오래된 스냅샷 없는 기록과 이전 이미지 복귀 제한을 확인합니다. 속도 옵션은 제공자 비용 정책도 별도로 검토합니다.</li></ol><p>비밀값, 전체 이미지 해시와 내부 주소는 공개 캡처에 포함하지 않습니다. 실패 때는 요청·이력의 안정적인 오류 코드와 이전 외부 효과를 확인한 뒤 재요청합니다.</p></section>
    <section id="captures"><h2>화면 증거</h2><p><strong>새 후보 화면 캡처는 아직 없습니다.</strong>설정/프로필 목록·편집·사용처/삭제, Console 요청 미리보기·결과 카드, RRA Key·Mattermost 채널·예약 상속, 예약 지금 실행의 접수/완료/불확실 상태를 실제 후보 UI에서 데스크톱과 모바일로 촬영해야 합니다. 10월 1일의 이전 실행 옵션 화면을 이 이미지의 캡처로 재사용하지 않습니다. 지정 워커의 운영 화면은 적용 후 별도로 촬영·검증해야 합니다.</p></section>`,
};
