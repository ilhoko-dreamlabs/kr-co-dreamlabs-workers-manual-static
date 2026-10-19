// Public release note. Exact source/image digests and internal endpoints stay in private evidence.
export const gitlabRestFallbackCandidate = {
  slug: 'candidate-20261019-gitlab-rest-fallback',
  label: '2026.10.19 GitLab REST fallback 업데이트 후보',
  status: {
    build: '완료 · 불변 이미지 빌드·격리 검사 통과',
    registry: '완료 · 원격 이미지 식별 재검증',
    prestage: '보류 · 서버 이미지 배치 승인 대기',
    offer: '미확인 · 새 이미지 대상 제안 없음',
    apply: '미실행 · 지정 워커의 새 이미지 실행 없음'
  }
};

export const gitlabRestFallbackCandidateGuide = {
  slug: gitlabRestFallbackCandidate.slug, title: gitlabRestFallbackCandidate.label, category: '버전',
  description: 'GitLab 작업의 승인된 REST 대체 경로, 오류 분류와 중복 변경 방지, 이미지 공급 단계 및 적용 후 검사를 설명합니다.',
  verifiedAt: '2026.10.19', evidenceLabel: '이미지 빌드·Registry 확인 / 서버 배치·워커 적용 전', history: true, candidate: true,
  toc: [['state','후보 이미지 상태'],['changes','이번 이미지의 변경'],['access','자격·권한 경계'],['retry','안전한 대체·재시도'],['skills','스킬과 RRA 안내'],['compat','이전 이미지와의 경계'],['checks','확인된 검사'],['acceptance','적용 후 직접 테스트'],['captures','화면 증거']],
  body: () => `<div class="note capture-warning"><strong>Registry 공급 후보 · 워커 적용 전</strong>2026년 10월 19일 이미지의 빌드·격리 검사와 Registry 등록·원격 식별 확인은 완료했습니다. 서버 이미지 배치와 새 업데이트 제안은 기존 자동 업데이트 정책에 대한 이번 후보의 운영 승인 대기 중입니다. 실제 워커 업데이트나 새 이미지의 운영 기능 검사는 없습니다. 아래 절차는 적용 후 시험 기준입니다.</div>
    <section id="state"><h2>후보 이미지 상태</h2><p>2026.10.19는 정식 제품 버전 번호가 아니라 이력 구분 날짜입니다. 비교 기준은 <a href="../candidate-20261016-codex-ui-followup/">Codex 공개 요약·Console 후속 이미지</a>입니다. 10월 19일 15:52(KST) Registry 읽기에서 로컬 검증 이미지와 동일한 식별을 확인했습니다. 서버 배치·새 Manager 제안·지정 워커 적용은 이 확인의 결과가 아닙니다. 15:21(KST) 읽기에서 worker0은 비교 기준 이미지를 건강하게 실행 중이었습니다.</p><div class="release-stage-grid">
      <div><strong>이미지 빌드·격리 검사</strong><span>${gitlabRestFallbackCandidate.status.build}</span></div>
      <div><strong>Registry 등록</strong><span>${gitlabRestFallbackCandidate.status.registry}</span></div>
      <div><strong>서버 사전 배치</strong><span>${gitlabRestFallbackCandidate.status.prestage}</span></div>
      <div><strong>워커 업데이트 제안</strong><span>${gitlabRestFallbackCandidate.status.offer}</span></div>
      <div><strong>워커 실제 적용</strong><span>${gitlabRestFallbackCandidate.status.apply}</span></div>
    </div><p>Registry 등록만으로 콘솔의 업데이트 버튼이 활성화되거나 현재 워커의 기능이 바뀌지 않습니다. 실제 적용을 판정할 때는 지정 워커의 정확한 실행 이미지와 건강 상태를 새로 읽어야 합니다.</p></section>
    <section id="changes"><h2>이번 이미지의 변경</h2><p>GitLab 작업 실패를 <strong>로컬 선택·자격 저장소 문제, GitLab 제공자 거부, 변경 효과가 불확실한 쓰기 결과</strong>로 나누어 진단합니다. 준비되고 승인된 Connector가 있으면 그 경로를 우선합니다. Connector가 준비되지 않았더라도 서버에 설정된 자격과 독립된 승인 검사를 통과하면 GitLab REST 경로로 작업할 수 있습니다. 일반 <code>GET</code> 읽기는 읽기 전용으로 처리합니다. <a href="../gitlab-work/">GitLab 작업 사용법과 예제</a>에서 기대 결과를 확인하세요.</p></section>
    <section id="access"><h2>자격·권한 경계</h2><p>대체 경로는 Connector 권한을 무제한 우회하는 기능이 아닙니다. 요청한 계정·프로젝트와 리소스 범위, 읽기 전용 정책, 사용 중지·권한 회수 상태를 다시 검사합니다. 서버 자격이 있어도 실제 계정과 GitLab 프로젝트 권한이 맞지 않으면 실행할 수 없습니다. 공개 화면에서 토큰 값이나 내부 GitLab 주소를 요구하지 않습니다. 각 워커의 실제 설정과 제공자 권한은 적용 뒤 별도 운영 검사로 확인해야 합니다.</p></section>
    <section id="retry"><h2>안전한 대체·재시도</h2><p>처음 경로가 <strong>변경 효과 없음</strong>으로 확실하게 끝났을 때만 승인된 다른 경로를 한 번 사용할 수 있습니다. GitLab에 쓰기가 전달됐는지 알 수 없는 경우에는 자동으로 같은 변경을 다시 보내지 않습니다. 동일 작업을 재시작하거나 기록을 다시 읽을 때도 중복 변경을 막도록 보완했습니다. 결과 불명이라면 원래 Task·대상 리소스·제공자 기록을 조회해 효과를 확인하고 운영 담당자와 다음 조치를 결정하세요. 실패 카드를 성공으로 기록하거나 새 요청을 반복해서 보내지 마세요.</p></section>
    <section id="skills"><h2>스킬과 RRA 안내</h2><p>이번 이미지에는 <code>gitlab-work</code> 번들 스킬과 RRA 요청 처리 안내가 포함됩니다. 스킬은 승인된 경로의 사용 순서와 안전한 결과 확인을 설명하며, 스킬 설치나 선택만으로 자격·프로젝트 권한이 생기지 않습니다. RRA의 요청자와 대상 권한도 그대로 확인해야 합니다. 실제 워커에서 스킬 선택·GitLab 결과가 함께 확인되기 전까지는 운영 통과로 표시하지 않습니다.</p></section>
    <section id="compat"><h2>이전 이미지와의 경계</h2><p>이번 변경은 GitLab 실행 경로와 관련 안내입니다. 직전 이미지의 Codex 공개 요약, Action 식별, 맨 아래로 버튼, 업데이트 완료 안내는 포함되지만 이번 신규 UI 개선으로 다시 세지 않습니다. 번들 Codex 0.162.0, Claude 2.1.183, Kimi 0.29.2는 그대로입니다. 새 서비스·승인 화면·자격 데이터베이스·데이터 마이그레이션은 없습니다. Worker 소스의 원격 main 통합이나 운영 전체 적용도 이 이미지 검사로 입증되지 않습니다.</p></section>
    <section id="checks"><h2>확인된 검사</h2><p>깨끗한 소스 기준 개발 검사 <strong>470건 통과·실패 0·차단 0</strong>과 이미지 내부 <strong>1,420개 파일</strong>의 출처·무결성 검사를 확인했습니다. 패키징된 GitLab REST 경로, 재시작 후 중복 방지, 읽기 전용 처리, 결과 불명 쓰기 차단, 비밀정보 가림, 번들 스킬을 네트워크 차단·읽기 전용 격리 환경에서 검사했습니다. 로컬 자원 부족 상황에서 한 컨테이너에 합친 CLI 검사 세 번이 시간 제한으로 끝났으며 원인은 확정되지 않았습니다. 이후 같은 30초 제한으로 앱과 세 CLI를 각각 순차 검사해 모두 통과했고 실패 로그도 보존했습니다. Registry의 원격 이미지 식별은 검증본과 일치합니다. <strong>실제 GitLab 계정·제공자 결과와 지정 워커 기능은 아직 검증하지 않았습니다.</strong></p></section>
    <section id="acceptance"><h2>적용 후 직접 테스트하기</h2><ol><li>지정 워커의 정확한 실행 이미지·건강·기존 자료 보존을 먼저 확인합니다. Registry 등록이나 제안만으로 적용을 판정하지 않습니다.</li><li>권한 있는 시험 프로젝트에서 읽기 전용 목록 요청을 한 번 실행해 Task 최종 상태와 실제 GitLab 응답의 프로젝트·자료를 대조합니다. 준비된 Connector가 있으면 우선 사용됐는지도 기록합니다.</li><li>Connector가 준비되지 않은 허용된 시험 환경에서 서버 자격·계정·프로젝트 범위가 모두 맞을 때만 대체 경로의 읽기 결과를 확인합니다. 비활성·회수·범위 밖·읽기 전용 제한은 거부돼야 합니다.</li><li>승인된 격리 시험 프로젝트에서만 안전한 변경 요청과 제공자 결과를 대조합니다. 결과 불명 쓰기를 같은 요청으로 다시 보내지 않고 원래 리소스의 효과를 먼저 조회합니다. 재시작·재진입 후 중복 변경도 별도 시험합니다.</li><li><code>gitlab-work</code> 스킬의 선택 기록과 RRA 경로의 대상·권한·최종 결과를 확인합니다. 스킬 선택을 GitLab 권한 확인으로 대신하지 않습니다.</li></ol><p>워커·정확한 내부 이미지·시각, 시험 계정/프로젝트 범위, Task 및 제공자 결과, 경로 선택·거부 사유·중복 효과 여부를 비공개 기록에 남깁니다. 공개 자료에는 토큰·내부 주소·고객 자료를 넣지 않습니다.</p></section>
    <section id="captures"><h2>화면 증거</h2><p><strong>새 이미지의 운영 화면 캡처 미확보</strong>입니다. 이번 변경에는 새 Console 화면이 없으며 후보는 아직 지정 워커에 적용되지 않았습니다. 적용 뒤에는 기존 세션의 요청·최종 결과·오류 진단과 스킬 선택 상태를 실제 화면에서 촬영해 기능 판정에 연결합니다. 2026년 10월 1일 과거 캡처를 이 이미지의 운영 증거로 재사용하지 않습니다.</p></section>`
};
