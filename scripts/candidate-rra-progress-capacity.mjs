// Public image-edition copy. Exact image digests and internal site evidence stay private.
export const rraProgressCapacityCandidate = {
  slug: 'candidate-20261013-rra-progress-capacity',
  label: '2026.10.13 RRA 대화 이어가기·진행 표시·동시 실행 후보',
  status: {
    build: '완료 · 불변 이미지·격리 검사 통과',
    registry: '등록 완료 · 원격 식별 재검증',
    prestage: '완료 · 서버 이미지 단독 배치·기존 컨테이너 불변',
    offer: 'worker0 할당 수신 · 차단 없음 · 실행 버튼 활성',
    apply: 'worker0 미적용 · 사용자 실행 대기'
  }
};

export const rraProgressCapacityCandidateGuide = {
  slug: rraProgressCapacityCandidate.slug, title: rraProgressCapacityCandidate.label, category: '버전',
  description: '외부 요청을 일반 대화 초안으로 이어가기, 공개 진행 상태 복구, 관리자 동시 실행 상한을 보완한 이미지 후보의 기능과 검사 방법입니다.',
  verifiedAt: '2026.10.13', evidenceLabel: '이미지 공급·worker0 업데이트 준비 확인 / 운영 미적용', history: true, candidate: true,
  toc: [['state','이미지와 적용 상태'],['handoff','RRA에서 일반 대화 초안 만들기'],['progress','공개 진행 상태 다시 보기'],['capacity','관리자 동시 실행 설정'],['version','사이드바 버전과 언어'],['checks','확인된 검사와 제한'],['acceptance','적용 후 재현 검사'],['captures','화면 증거 범위']],
  body: () => `<div class="note capture-warning"><strong>이미지 공급·worker0 업데이트 준비 완료 · 실제 적용 대기</strong>이 항목은 앞선 <a href="../candidate-20261013-connector-ledger-compat/">Connector 기록 호환성 이미지</a> 다음 소스로 만든 별도 불변 이미지 후보입니다. 2026년 10월 13일 원격 Registry 등록·서버 이미지 단독 배치와 worker0의 대상 할당·실행 버튼 활성을 확인했습니다. <strong>업데이트 실행·재시작은 하지 않았으므로</strong> 새 RRA·진행·동시 실행 기능은 아직 운영 화면에서 확인되지 않았습니다.</div>
    <section id="state"><h2>이미지와 적용 상태</h2><p>2026.10.13은 정식 제품 버전 번호가 아닙니다. 콘솔에 표시되던 <code>v0.1.0</code>이나 날짜만으로 불변 이미지를 구별하지 않습니다. 정확한 소스·이미지 식별은 비공개 배포 기록에서 관리합니다.</p><div class="release-stage-grid">
      <div><strong>이미지 빌드·격리 검사</strong><span>${rraProgressCapacityCandidate.status.build}</span></div>
      <div><strong>Registry 등록</strong><span>${rraProgressCapacityCandidate.status.registry}</span></div>
      <div><strong>서버 사전 배치</strong><span>${rraProgressCapacityCandidate.status.prestage}</span></div>
      <div><strong>워커 업데이트 제안</strong><span>${rraProgressCapacityCandidate.status.offer}</span></div>
      <div><strong>워커 실제 적용</strong><span>${rraProgressCapacityCandidate.status.apply}</span></div>
    </div><p>22:08(KST) 원격 이미지와 서버에 배치된 이미지의 식별이 일치하고, 13개 컨테이너의 실행 상태와 보호 설정이 그대로인 것을 확인했습니다. worker0은 기존 이미지로 healthy·활성 작업 0·재시작 0이며, Manager는 기존 이미지를 현재/복구 대상으로, 새 이미지를 사용 가능한 대상으로 표시했습니다. 인증된 Console 새로고침 뒤 <strong>할당 수신·차단 없음·Run Whole Update 버튼 활성</strong>도 실제 화면에서 확인했습니다. worker0 자동 이미지 업데이트는 사용자 승인에 따라 꺼졌고 다른 정책은 유지됐습니다. 제안은 시간이 지나면 만료되므로 실제 적용 직전 새로고침해 현재·대상·복구 이미지와 작업 대기열을 다시 확인해야 합니다. Update 요청·버튼 클릭은 없었으며 worker00 등 다른 워커도 이 이미지로 변경하지 않았습니다.</p></section>
    <section id="handoff"><h2>RRA 응답에서 일반 대화 초안 만들기</h2><p>후보 구현에서는 <strong>외부 세션 → Remote Request API</strong>에서 완료·차단 등 최종 상태의 요청과 응답을 열고, 응답 옆 <strong>대화로 이어가기</strong>를 선택합니다. <strong>대화 제목</strong>, <strong>첫 요청 초안</strong>, 필요한 경우 <strong>프로젝트</strong>를 확인한 뒤 <strong>대화 만들기</strong>를 누릅니다. 만들어진 일반 Chat에는 <strong>Remote Request에서 이어진 대화</strong>와 <strong>원본 요청 보기</strong>가 표시되고, 원래 RRA History는 읽기 전용으로 남습니다. 같은 연결을 다시 선택할 때는 <strong>관련 대화</strong>에서 기존 초안으로 돌아갈 수 있도록 설계했습니다.</p><p>대화를 만드는 것만으로 첫 요청이 실행되지 않습니다. 제목·초안을 검토한 뒤 일반 Chat에서 별도로 보내야 합니다. 첨부파일은 복사되지 않고 RRA 키 권한·실행 환경·도구 권한도 새 대화에 승계되지 않습니다. 원본이 바뀌었거나 삭제됐다면 새로고침 안내를 확인하고 중복 생성을 임의로 반복하지 않습니다.</p></section>
    <section id="progress"><h2>공개 진행 상태 다시 보기</h2><p>RRA 외부 세션의 <strong>실행과정 보기</strong>와 일반 Chat 진행 표시가 브라우저 연결이 끊기거나 다른 세션으로 이동해도 보존된 공개 실행 기록에서 다시 시작하도록 보완됐습니다. 다시 열면 먼저 현재 스냅샷을 읽고 이후 새 이벤트를 받아 진행 상태를 갱신합니다. 늦게 도착한 이전 세션 이벤트는 현재 세션 화면에 섞이지 않아야 합니다. RRA의 최종 응답은 보존된 정식 History 결과를 기준으로 표시합니다.</p><p>이 기능은 사용자에게 공개 가능한 실행 진행 정보입니다. 내부 추론 원문이나 비공개 도구 프로토콜을 공개하지 않습니다. 브라우저를 다시 연결하는 동작이 같은 작업을 다시 실행하거나 새 요청을 만드는 동작이어서도 안 됩니다. 과거에 기록되지 않은 진행 정보를 소급해서 만들어 내지는 않습니다.</p></section>
    <section id="capacity"><h2>관리자 Adapter 동시 실행 상한</h2><p><strong>관리자</strong>는 후보 적용 후 <strong>설정 → 런타임 → Execution Admission → Adapter 동시 실행 상한</strong>에서 각 Adapter의 설정값·권장값·유효값을 대조합니다. 지원 범위는 최대 <strong>16</strong>이며 권장 초기값은 <strong>2</strong>입니다. 실제 동시에 실행 가능한 수는 Worker 전체·lane·Adapter 상한 중 가장 작은 값으로 제한됩니다. <strong>0</strong>은 해당 Adapter의 새 실행을 멈추는 값입니다.</p><p>이전에 <strong>2</strong>가 저장돼 있다면 예전의 더 높은 값을 추측해 자동 복원하지 않습니다. 관리자가 원하는 값을 명시적으로 저장하고 다시 읽어야 합니다. 상한을 높여도 이미 실행 중인 작업, 모델·제공자 한도, 권한과 운영 자원 제한이 사라지지 않습니다. 운영 값 변경은 배포 후 관리자 판단과 별도 시험이 필요합니다.</p></section>
    <section id="version"><h2>사이드바 버전과 한국어·영어 표시</h2><p>후보 UI는 로드된 이미지의 출처 정보가 유효하면 사이드바에 <strong>Worker 이미지 버전</strong>을 표시하도록 보완했습니다. 출처가 없거나 읽기 오류가 나면 알 수 없음·오류 상태로 구분해야 합니다. 관련 대화 Context와 진행 상태 문구의 한국어·영어 표시도 함께 보완했습니다. 표시된 버전은 실제 실행 이미지 확인의 단서이며, 운영 담당자는 워커 이름·이미지·건강 상태를 별도로 대조합니다.</p></section>
    <section id="checks"><h2>확인된 검사와 제한</h2><p>깨끗한 소스의 전체 개발 검증 <strong>454건 통과</strong>와 Wiki 검사 후 만든 로컬 이미지에서 파일 <strong>1,384개</strong>의 출처·무결성을 확인했습니다. 비루트·읽기 전용·네트워크 차단 격리 검사는 2개 초과 Adapter 상한 보존, RRA/Chat 공개 진행 기록, 앞선 Connector 효과 기록 호환성과 기본 이벤트 수신 꺼짐을 확인했습니다. 이미지에는 운영 인증·상태 파일이 들어 있지 않습니다. Codex 0.162.0, Claude 2.1.183, Kimi 0.29.2와 Node 22.23.3은 앞선 이미지에서 바뀌지 않았습니다.</p><p>원격 Registry 이미지와 서버 이미지의 식별·출처도 같은 빌드로 확인했습니다. 서버 사전 배치 뒤 기존 13개 컨테이너와 worker0의 환경·마운트·보호 설정은 바뀌지 않았습니다. 자동 업데이트 끄기와 할당 준비 화면은 <strong>이전 실행 이미지의 관리자 UI</strong>에서 확인한 것으로, 새 후보의 기능 화면이나 실제 Chat 연결·진행 표시·상한 저장 결과가 아닙니다. 운영 수용은 worker0 적용 후 별도 검사해야 합니다.</p></section>
    <section id="acceptance"><h2>적용 후 재현 검사</h2><ol><li>업데이트 실행 직전에 worker0이 작업 없는 정상 상태인지 확인하고 Console을 새로고침해 만료된 제안 대신 현재·대상·복구 이미지를 다시 읽습니다. 사용자 실행 뒤에만 정확한 새 이미지·건강·보존 데이터를 확인합니다.</li><li>최종 RRA 요청·응답 하나에서 <strong>대화로 이어가기</strong>를 눌러 제목·첫 요청 초안·프로젝트를 검토합니다. 생성 후 원본 History, 새 일반 Chat과 <strong>원본 요청 보기</strong>를 대조하고, 자동 실행·첨부 전송·권한 승계가 없는지 확인합니다. 같은 연결을 반복해도 대화가 중복되지 않아야 합니다.</li><li>RRA와 Chat 작업의 공개 진행 표시를 확인한 뒤 브라우저 연결을 끊고 다시 엽니다. 기존 스냅샷·새 이벤트·최종 History와 실제 Task 결과가 맞고, 이전 세션 이벤트가 섞이거나 작업이 재실행되지 않아야 합니다.</li><li>관리자 시험 환경에서 Adapter 상한을 승인된 2 초과 값으로 저장·재조회하고 새 요청 동시 실행 한도를 확인합니다. Worker·lane 제한, 0의 신규 실행 차단, 기존 저장값 2의 비자동 복원도 대조한 뒤 시험 설정을 복원합니다.</li><li>한국어·영어와 좁은 화면에서 연결 버튼·진행 표시·사이드바 버전을 실제로 촬영하고, 값이 로드된 실행 이미지와 일치하는지 확인합니다.</li></ol><p>이 절차는 향후 운영 수용 기준이며 지금 통과한 결과가 아닙니다.</p></section>
    <section id="captures"><h2>화면 증거 범위</h2><p><strong>새 후보의 운영 기능 화면 캡처 미확보</strong>입니다. worker0의 자동업데이트 해제·업데이트 준비 화면은 실제로 확보했지만 기존 실행 이미지의 관리자 화면입니다. 원본에는 내부 이미지 식별자와 운영 설정이 있어 공개 이미지로 싣지 않았습니다. 이를 새 이미지의 RRA 연결 버튼·진행 표시·Adapter 설정·사이드바 버전 증거로 재사용하지 않습니다. 실제 적용 후 데스크톱·좁은 화면의 한국어·영어 표시와 클릭 결과를 촬영하고, 워커·이미지·시각·결과를 기록합니다.</p></section>`
};
