// Public image-edition copy. Exact source, image digests and retained-state evidence stay private.
export const connectorLedgerCompatCandidate = {
  slug: 'candidate-20261013-connector-ledger-compat',
  label: '2026.10.13 Connector 기록 호환성 복구 이미지',
  status: {
    build: '완료 · 로컬 불변 이미지·격리 검사 통과',
    registry: '등록 완료 · 원격 이미지 식별 재검증',
    prestage: '완료 · 서버 이미지 단독 배치·기존 컨테이너 불변',
    offer: 'worker00 대상 · 대기 창에서 1회 실행',
    apply: 'worker00 적용·보존 검사 확인 / worker0 실행·건강 확인'
  }
};

export const connectorLedgerCompatCandidateGuide = {
  slug: connectorLedgerCompatCandidate.slug, title: connectorLedgerCompatCandidate.label, category: '버전',
  description: '기존 Connector 효과 기록을 안전하게 읽도록 보완한 이미지의 워커별 적용·검사 결과와 남은 CI 검사를 구분합니다.',
  verifiedAt: '2026.10.13', evidenceLabel: 'worker00 보존·GitLab 조회 / worker0 실행·건강 확인', history: true, deployed: true, deployedWorker: 'worker00·worker0',
  toc: [['state','이미지와 적용 상태'],['problem','무엇이 막혔나'],['behavior','복구 범위와 보호 규칙'],['checks','확인된 검사'],['acceptance','수용 결과와 남은 검사'],['captures','화면 증거 범위']],
  body: () => `<div class="note capture-warning"><strong>worker00 적용·조회 확인 / worker0 실행·건강 확인</strong>2026년 10월 13일 11:49(KST) worker00에 이 정확한 이미지를 한 번 적용했고, 보존 파일·설정과 실제 GitLab Connector 성공 기록을 확인했습니다. 21:00(KST) 별도 읽기에서는 worker0도 같은 이미지로 건강하게 실행 중이었습니다. worker0의 적용 경로나 기록·기능 수용은 이 조회로 확인하지 않았습니다. <strong>CI 구성의 최종 결과와 이벤트 전송은 별도 확인이 필요합니다.</strong></div>
    <section id="state"><h2>이미지와 적용 상태</h2><p>날짜는 정식 제품 버전 번호가 아닙니다. 이 이미지는 <a href="../candidate-20261013-system-events-skill-auto-update/">시스템 이벤트·설치 스킬 자동업데이트 이미지</a>의 다음 소스에서 만들었고, 이번 항목에는 Connector 기록 읽기 호환성 수정만 기록합니다. 콘솔의 <code>v0.1.0</code>으로 두 이미지를 구별할 수 없으므로 정확한 이미지 식별은 비공개 배포 기록에서 대조합니다.</p><div class="release-stage-grid">
      <div><strong>이미지 빌드·격리 검사</strong><span>${connectorLedgerCompatCandidate.status.build}</span></div>
      <div><strong>Registry 등록</strong><span>${connectorLedgerCompatCandidate.status.registry}</span></div>
      <div><strong>서버 사전 배치</strong><span>${connectorLedgerCompatCandidate.status.prestage}</span></div>
      <div><strong>worker00 업데이트 제안</strong><span>${connectorLedgerCompatCandidate.status.offer}</span></div>
      <div><strong>워커 실행 확인</strong><span>${connectorLedgerCompatCandidate.status.apply}</span></div>
    </div><p>09:17(KST)에는 원격·서버 이미지가 일치하고 worker00 업데이트 제안이 준비된 상태였습니다. 이후 작업이 없는 대기 창을 새로 확인하고 11:49(KST) worker00에만 Manager 업데이트를 1회 실행했습니다. 정확한 실행 이미지가 healthy·재시작 0으로 확인됐고, 적용 후 13개 보존 검사가 모두 통과했습니다. 기존 대화·프로젝트·스킬·Connector·효과 기록·RRA·인증 파일, Wiki, 마운트와 보호 설정이 적용 직전과 일치했으며 당시 다른 12개 컨테이너는 바뀌지 않았습니다. 21:00(KST) 별도 운영 조회에서 worker0도 이 이미지로 healthy·재시작 0임을 확인했습니다. worker0의 업데이트 원인·보존 데이터·실제 Connector 결과는 이 조회로 판정하지 않습니다.</p></section>
    <section id="problem"><h2>무엇이 막혔나</h2><p>worker00의 기존 Connector 효과 기록에는 과거에 저장된 부가 메타데이터가 있습니다. 이전 이미지의 엄격한 읽기 방식은 이 추가 필드를 만나면 기록 전체를 거부해, 관련 없는 새 조회까지 진행하지 못했습니다. 보존된 기록은 기존 한도인 <strong>2,000건</strong>이며 JSON 자체가 손상됐거나 제공자 토큰이 거부됐다고 확인된 사례가 아닙니다. 사용자에게 보일 증상은 Connector 조회가 시작되기 전에 내부 기록 검증 오류로 차단되는 것입니다.</p></section>
    <section id="behavior"><h2>복구 범위와 보호 규칙</h2><p>새 읽기 방식은 이름과 크기·형식이 확인된 기존 부가 메타데이터만 허용합니다. 알 수 없는 필드와 핵심 값이 잘못된 기록은 계속 거부합니다. 메타데이터가 권한, 승인, 실제 작업 인자나 처리 결과를 바꾸도록 허용하지 않습니다.</p><p>기존의 <strong>확인 필요</strong> 기록은 그대로 보존하고 같은 요청의 실행을 차단합니다. 그 기록과 무관한 새 조회만 계속 진행할 수 있습니다. 결과가 불확실한 변경 작업의 중복 실행 방지도 유지합니다. 기록 삭제·초기화·재등록, 권한 확대, 승인 절차 우회는 하지 않으며 2,000건 보존 한도 정책도 바꾸지 않습니다. Console 메뉴·폼의 화면 변경은 없습니다.</p></section>
    <section id="checks"><h2>확인된 검사와 제한</h2><p>정확한 새 소스에서 집중 Connector 검사, 유형 검사·빌드, Wiki 부정 사례 20건, 최소 안정성 검사와 깨끗한 소스의 전체 개발 검증을 통과했습니다. 적용 전 실제 worker00의 보존 기록 2,000건을 새 순수 읽기 검사기로 읽기 전용 대조했고, 적용 후 새 실행 이미지의 실제 리더로도 모두 읽었습니다. 그중 <strong>확인 필요 상태 1건은 보존된 차단 상태</strong>로 남았습니다. 기록 파일을 수동 수정·초기화하지 않았습니다.</p><p>원격 Registry와 서버 배치 이미지는 로컬 불변 빌드와 일치했고, worker00 적용 후 보존 검사는 13건 모두 통과했습니다. 별도 진단 요청에서 올바른 프로젝트를 탐색한 뒤 실제 <code>gitlab.api.request</code> 성공 기록을 확인해 기존 기록 검증 오류가 새 조회 전체를 막지 않음을 확인했습니다. 앞선 잘못된 프로젝트 경로의 HTTP 404는 별개이며, 최종 CI 파일·시험·Wiki 반영과 이벤트 전달은 아직 확인되지 않았습니다. 이벤트 수신은 꺼져 있고 발행자는 0명, 자동 정책은 기본 꺼짐입니다. 재관찰된 프로세스 정리 경고는 이 이미지 적용으로 근본 해결됐다고 보지 않습니다. Codex 0.162.0, Claude 2.1.183, Kimi 0.29.2는 앞선 이미지와 같습니다.</p></section>
    <section id="acceptance"><h2>수용 결과와 남은 검사</h2><ol><li><strong>통과:</strong> worker00의 정확한 이미지·건강·재시작 0과 보존 파일·설정의 적용 전후 일치를 확인했습니다. worker0에서는 나중에 같은 실행 이미지·건강·재시작 0만 별도로 확인했으며 보존 파일·업무 결과는 미검증입니다.</li><li><strong>통과:</strong> worker00의 기존 효과 기록 2,000건을 실제 새 리더가 읽고, 확인 필요 기록 1건은 차단 상태로 남았습니다. 임의 승인·삭제·재실행은 하지 않았습니다.</li><li><strong>조회 경로 확인:</strong> worker00의 승인된 별도 진단에서 실제 GitLab Connector 성공 기록을 확인했습니다. 앞선 잘못된 경로의 404를 전체 복구 실패나 CI 성공으로 해석하지 않습니다.</li><li><strong>미완료:</strong> CI 구성 작업의 최종 상태, 파일·시험·Wiki 반영과 이벤트 전송을 각각 확인해야 합니다. 결과가 불확실한 변경 작업의 중복 실행 차단도 격리 시험 범위로 남깁니다.</li></ol><p>설치된 이미지와 Connector 조회 경로의 수용을 CI 통합 완료로 확대하지 않습니다.</p></section>
    <section id="captures"><h2>화면 증거 범위</h2><p><strong>새 UI 변경 없음</strong>입니다. 이 수정은 내부 Connector 기록 읽기 호환성에 한정되므로 이전 화면을 새 버전의 캡처로 재사용하거나 새 화면을 임의로 만들지 않습니다. 실제 조회 성공은 운영 기록으로 확인했으나 공개용 화면 캡처는 미확보입니다. CI 최종 Task 결과가 나오면 민감정보 없이 별도 기록합니다.</p></section>`
};
