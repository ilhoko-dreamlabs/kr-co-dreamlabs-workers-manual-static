// Public candidate prose. Exact OCI identities and private qualification logs stay in the work packet.
export const rraKeylessRecoveryCandidate = {
  slug: 'candidate-20261023-rra-keyless-recovery',
  label: '2026.10.23 RRA 요청 복구·탐색 상태 유지 공급 후보',
  status: {
    build: '완료 · linux/amd64 불변 이미지 빌드·식별',
    validation: '완료 · 최종 깨끗한 전체 소스 검사 492건 통과·이미지 검증',
    registry: '완료 · 동일 불변 이미지 Registry 등록·원격 식별',
    prestage: '완료 · 서버 이미지 단독 배치·13개 컨테이너 보존',
    offer: '확인 · claude-worker 정확 대상 제안 available',
    apply: '미수행 · 공급 조회 당시 Update·재시작 없음',
  },
};

export const rraKeylessRecoveryCandidateGuide = {
  slug: rraKeylessRecoveryCandidate.slug,
  title: rraKeylessRecoveryCandidate.label,
  category: '버전',
  description: 'RRA 요청의 키 없는 복구 저장·안전한 503 오류와 Console 탐색 개선의 이미지 검증·공급·제안·적용 단계를 설명합니다.',
  verifiedAt: '2026.10.23',
  evidenceLabel: '전체 소스·이미지 검증, Registry·서버 배치·대상 제안 확인 / 실제 적용 전',
  history: true,
  candidate: true,
  noScreenshot: true,
  toc: [['state','이미지와 적용 상태'],['rra','RRA 복구 변경'],['navigation','탐색 상태 변경'],['compatibility','호환성과 운영 주의'],['checks','검증과 미완료'],['acceptance','적용 뒤 직접 검사'],['captures','화면 증거']],
  body: () => `<div class="note capture-warning"><strong>이미지 공급·제안 확인 · 실제 적용 전</strong>2026년 10월 23일의 별도 linux/amd64 이미지 기준입니다. 최종 깨끗한 전체 소스 검사와 패키지·이미지 내부 검증을 통과하고 동일 이미지를 Registry에 등록해 서버에 이미지로만 배치했습니다. claude-worker의 정확한 대상 제안을 확인했지만 Update 제출·재시작과 실제 Gateway 결과는 없습니다. 이 공개 문서는 운영 미적용 후보를 설명하며 날짜는 정식 제품 버전 번호가 아닙니다.</div>
    <section id="state"><h2>이미지와 실제 적용 상태</h2><div class="release-stage-grid"><div><strong>이미지 빌드</strong><span>${rraKeylessRecoveryCandidate.status.build}</span></div><div><strong>검증</strong><span>${rraKeylessRecoveryCandidate.status.validation}</span></div><div><strong>Registry 등록</strong><span>${rraKeylessRecoveryCandidate.status.registry}</span></div><div><strong>서버 사전 배치</strong><span>${rraKeylessRecoveryCandidate.status.prestage}</span></div><div><strong>업데이트 제안</strong><span>${rraKeylessRecoveryCandidate.status.offer}</span></div><div><strong>워커 실제 적용</strong><span>${rraKeylessRecoveryCandidate.status.apply}</span></div></div><p>10월 23일 14:03(KST) 공급 확인 당시 기존 컨테이너 13개의 식별·상태와 대상의 설정 구조가 보존됐습니다. claude-worker는 여전히 이전 이미지로 건강하게 실행 중이었고 활성 요청은 0건이었습니다. 업데이트 제안은 만료될 수 있으므로 실제 실행 전 다시 조회해야 합니다. 비교 기준은 앞선 실행 프로필·예약 지금 실행 이미지이며, 공급·제안만으로 Gateway 복구 성공을 판정하지 않습니다.</p></section>
    <section id="rra"><h2>RRA 요청 접수와 복구가 달라진 점</h2><p>이전 이미지에서는 이름 붙인 실행 프로필이 켜진 RRA 요청에 필요한 복구 자료를 저장할 때 전용 payload 암호화 키가 없으면 요청 접수 전에 실패할 수 있었습니다. 이때 공개 호출자는 원인을 구분하기 어려운 일반 <code>500</code> 응답을 볼 수 있었습니다. 이 후보의 새 요청은 <strong>별도 RRA payload 암호화 키 없이도 로컬의 지속 복구 자료를 작성</strong>하며, 접수 당시 프로필·권한·맥락·스킬 선택을 고정합니다.</p><p>복구 저장소를 사용할 수 없으면 <code>503 REMOTE_REQUEST_EXECUTION_UNAVAILABLE</code>과 <code>retryRecommended: false</code>로 차단합니다. 요청을 새 Idempotency-Key로 무작정 다시 보내지 말고 기존 요청 ID·멱등성 키·History에서 접수와 외부 효과를 확인한 뒤 관리자에게 문의하세요. 상태·결과 조회와 <code>sessionId</code>로 후속 대화를 잇는 공개 <code>/api/v1</code> 규약은 그대로입니다. <a href="../rra-integration/#keyless-recovery">RRA 개발자 연동 가이드의 장애 판별·재현 절차</a>를 함께 보세요.</p></section>
    <section id="navigation"><h2>이전 P1 탐색 상태 수정도 포함</h2><p>같은 이미지에는 앞서 작성된 Console P1 개선이 포함됩니다. 최근 세션, Mattermost, RRA, 프로젝트, 예약 목록을 서버 이벤트로 다시 읽어도 해당 행을 통째로 교체하지 않아 열린 그룹·메뉴, 입력 중인 내용, 키보드 초점과 스크롤 위치를 보존하도록 했습니다. 프로젝트 제목은 해당 프로젝트를 열고 별도 펼침 버튼은 자식 세션 목록을 접고 펼칩니다. 메뉴의 방향키·Home/End·Escape 조작과 로딩·빈 목록·오류 표시도 보완했습니다.</p><p>이 내용은 이전 이미지에 포함되지 않은 소스 차이입니다. 로컬 브라우저의 합성 기록과 여러 화면 폭 검사는 운영 Console의 실제 화면·업무 결과를 대신하지 않습니다. <a href="../console-navigation/#p1-refresh-candidate">탐색 메뉴의 직접 검사 절차</a>를 적용 뒤 확인하세요.</p></section>
    <section id="compatibility"><h2>호환성, 보안, 복구 제한</h2><p>새 RRA 요청의 복구 파일은 잠금·원자적 저장과 파일 권한 <code>0600</code>, 소유 Worker·요청 식별자·내용 digest 대조를 사용합니다. <strong>새 복구 자료 자체는 애플리케이션에서 암호화하지 않습니다.</strong>따라서 호스트 파일 접근과 백업 보호를 운영 환경에서 별도로 확인해야 합니다. 이 변경은 전체 대화 기록을 암호화하거나 API Key·토큰의 저장 방식을 바꾸는 기능이 아닙니다.</p><p>이전 이미지가 작성한 암호화 형식은 해당 읽기 키가 있을 때만 호환 읽기하며, 오래된 기록을 일괄 삭제하거나 새 형식으로 조용히 바꾸지 않습니다. 새 형식을 이전 이미지에서 읽는 되돌리기는 지원되지 않는 전진 전용 변경입니다. 저장된 요청의 소유자·본문·접수 당시 설정이 맞지 않으면 복구 실행을 차단하고 원장에 남은 기록을 확인합니다. checksum은 우발적인 손상 감지용이며 악의적인 호스트 수정에 대한 증명은 아닙니다.</p></section>
    <section id="checks"><h2>검증한 것과 운영에서 남은 것</h2><p>최종 깨끗한 전체 소스 검사는 <strong>492건 통과·실패 0·차단 0</strong>이고, 동일 소스의 linux/amd64 이미지 자산 1,472개 출처·식별, 비어 있는 인증 자료, 고정된 Node·Codex·Claude·Kimi CLI 기동, RRA 복구 16건과 별도 Wiki 준비·건강 200을 확인했습니다. 이 이미지 내부 시험은 실제 운영 RRA 요청이나 유료 모델 추론을 실행하지 않았습니다. 별도 로컬 HTTP 프로필 접수·진행 검사는 합성 자격과 격리 환경 기준입니다.</p><p>앞선 집계에서는 이전 암호화 가정을 둔 검사 1건이 실패했고 수정 뒤 집중 호환 검사와 최종 전체 검사에 통과했습니다. 다른 실행의 브라우저 준비 시간 초과는 자원 압박과 겹쳤지만 원인이 확정된 것은 아닙니다. 최종 통과를 위해 브라우저의 기능 주장을 약화하지 않았습니다. 동일 이미지의 Registry 식별, 서버 pull·독립 식별, 대상 제안은 확인했으나 <strong>지정 워커의 Update·Gateway 첫 요청·결과·세션 이어쓰기 수용은 아직 미실행</strong>입니다. 기존 중간 심각도 의존성 권고 1건도 남아 있습니다.</p></section>
    <section id="acceptance"><h2>지정 워커 적용 뒤 직접 확인할 순서</h2><ol><li>정확한 실행 이미지·건강·기존 RRA Key와 History·대화 자료 보존을 비공개 운영 기록에서 먼저 확인합니다. Registry 등록이나 제안만으로 적용을 판정하지 않습니다.</li><li>승인된 시험 Key로 가상의 짧은 첫 요청을 한 번 제출합니다. <code>202</code> 접수와 <code>requestId</code>, 최종 <code>200</code> 결과를 확인합니다. 첫 요청의 <code>sessionId</code>를 저장해 같은 Key·새 Idempotency-Key로 후속 질문을 보냅니다.</li><li>두 요청의 ID는 다르고 세션 ID는 같으며 이전 맥락이 결과에 반영되는지 검사합니다. 다른 Key의 세션은 조회·이어쓰기가 거부돼야 합니다. 재시작·대기 복구에서도 접수 당시 프로필/권한을 유지하고 대화 턴을 중복 만들지 않는지 격리 시험으로 확인합니다.</li><li>저장소를 의도적으로 사용할 수 없게 만드는 검사는 운영 자료가 없는 격리 환경에서만 수행합니다. <code>503 REMOTE_REQUEST_EXECUTION_UNAVAILABLE</code>과 재시도 비권장 표시가 나와야 하며 일반 <code>500</code>으로 바뀌지 않아야 합니다.</li><li>Console의 최근 세션·Mattermost·RRA·프로젝트·예약 목록을 펼치고 한 항목에 초점을 둔 뒤 갱신 전후의 메뉴·초점·스크롤·입력 중인 값을 비교합니다. 프로젝트 제목과 별도 펼침 버튼을 데스크톱·모바일에서 확인합니다.</li></ol><p>오류 재현에 실제 고객 요청이나 비밀값을 사용하지 않습니다. 업무 요청의 외부 효과가 불확실하면 원래 요청의 결과와 대상 리소스를 먼저 대조합니다.</p></section>
    <section id="captures"><h2>새 화면 증거</h2><p><strong>화면 미촬영 · 이 이미지의 운영 캡처는 아직 없습니다.</strong>RRA는 HTTP 응답·History·세션 조회를 비밀값 없이 기록해야 합니다. Console P1은 갱신 전후의 열린 그룹·행·초점·프로젝트 펼침 상태를 데스크톱과 좁은 화면에서 실제 후보 UI로 촬영해야 합니다. 이전 이미지 캡처를 이 버전의 화면처럼 재사용하지 않습니다.</p></section>`,
};
