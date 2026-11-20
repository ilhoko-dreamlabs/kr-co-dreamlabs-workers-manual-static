// Public product changes only; exact image identities are in the private receipt.
export const consoleC10Candidate = {
  slug: 'candidate-20261028-console-c10',
  label: '2026.10.28 Console C10·Claude 인증 후보',
  status: {
    build: '완료 · linux/amd64 불변 이미지 빌드·식별 확인',
    validation: '완료 · 정확한 소스의 깨끗한 전체 검사 596건 통과·실패 0·차단 0',
    registry: '완료 · 동일 불변 이미지 원격 식별',
    prestage: '완료 · 서버 이미지 단독 공급, 기존 컨테이너 13개 유지',
    offer: '확인 · worker0·claude-worker 포함 관리 워커 8개 available',
    apply: '미수행 · 지정 워커 Update·실제 화면 수용 전',
  },
};

export const consoleC10CandidateGuide = {
  slug: consoleC10Candidate.slug,
  title: consoleC10Candidate.label,
  category: '버전',
  description: 'Console Next 설정과 Claude 장기 인증 개선의 이미지 검사·배포 단계를 구분합니다.',
  verifiedAt: '2026.10.28',
  evidenceLabel: '불변 이미지·Registry·서버 공급·8개 제안·전체 검사 596건 / 적용 전',
  history: true, candidate: true, noScreenshot: true,
  toc: [['state','이미지와 배포 단계'],['changes','이전 후보와 달라진 점'],['settings','새 설정 연결 범위'],['claude','Claude 연결 개선'],['checks','확인된 검사와 한계'],['acceptance','적용 뒤 재현 검사'],['captures','화면 캡처 상태']],
  body: () => `<div class="note capture-warning"><strong>이미지 공급·제안 확인 · C10 운영 미적용</strong>날짜는 공식 제품 버전 번호가 아닙니다. 10월 27일 Console Next 기본 화면 후보 다음 소스의 이미지입니다. 빌드·전체 검사·동일 이미지의 Registry 등록·서버 이미지 단독 공급과 관리 워커 8개의 업데이트 제안 available을 확인했습니다. worker0·claude-worker의 실제 Update는 수행하지 않았으며 C10 지정 워커 적용은 확인 전입니다.</div>
    <section id="state"><h2>이미지와 배포 단계</h2><div class="release-stage-grid"><div><strong>이미지 빌드</strong><span>${consoleC10Candidate.status.build}</span></div><div><strong>전체 검사</strong><span>${consoleC10Candidate.status.validation}</span></div><div><strong>Registry</strong><span>${consoleC10Candidate.status.registry}</span></div><div><strong>서버 공급</strong><span>${consoleC10Candidate.status.prestage}</span></div><div><strong>업데이트 제안</strong><span>${consoleC10Candidate.status.offer}</span></div><div><strong>워커 적용</strong><span>${consoleC10Candidate.status.apply}</span></div></div><p>비교 기준은 <a href="../candidate-20261027-console-next-default/">10월 27일 기본 화면 후보</a>입니다. 그 이미지의 Registry·서버 공급·8개 제안 결과를 이 C10 이미지의 상태로 옮겨 적지 않습니다.</p></section>
    <section id="changes"><h2>이전 후보와 달라진 점</h2><table><thead><tr><th>영역</th><th>C10 변경</th></tr></thead><tbody><tr><td>로그인·배치</td><td>허용된 로컬 계정·Google 로그인 진입, 브랜드 정보, 탐색/작업 패널의 배치·크기 조절을 새 Console에 연결했습니다. 브라우저 배치 선호는 서버 설정이 아닙니다.</td></tr><tr><td>설정</td><td>새 Console에서 네 설정 상세를 열고 나머지는 기존 Console로 이동합니다. Google 관리자와 일반 사용자 권한을 구분합니다.</td></tr><tr><td>Claude Code Plan</td><td>기존 Console의 장기 인증에서 연결 클릭 시 팝업을 먼저 예약하고, 인증 주소가 늦거나 팝업이 차단되면 수동 열기 경로를 제공합니다.</td></tr><tr><td>입력·저장 보호</td><td>같은 계정의 상태 알림은 비밀번호 초안을 지우지 않으며 계정 전환·로그아웃·권한 상실 때 보호된 초안을 폐기합니다. 결과 불명 쓰기는 정식 재조회로 대조하고, 프로필 이름 변경만으로 없는 어댑터 매핑을 만들지 않습니다.</td></tr></tbody></table></section>
    <section id="settings"><h2>새 Console의 설정 연결 범위</h2><p><strong>설정 → 시스템 → 파일 업로드 정책</strong>과 <strong>설정 → 보안 → 로컬 사용자</strong>는 Google 관리자 전용입니다. <strong>설정 → 런타임 → 실행 프로필</strong>과 <strong>설정 → 어댑터 → 런타임 어댑터</strong>는 일반 계정에서 조회할 수 있으나 변경은 관리자만 합니다. <a href="../console-next-settings/">설정 사용·검증 안내</a>에 화면별 순서와 실패 처리를 정리했습니다.</p><p>자격·비밀값, 예약, 플러그인, 커넥터, 스킬, 지식, 도구, 업데이트 등 다른 상세 설정은 아직 완전히 이전되지 않았습니다. <strong>기존 Console에서 열기</strong>를 사용하고, 새 설정 목록의 설명만으로 저장 가능하다고 판단하지 않습니다.</p></section>
    <section id="claude"><h2>Claude 장기 인증 연결 보완</h2><p>관리자는 기존 Console의 <strong>설정 → 어댑터 → Claude Code Plan → 설정 → 장기 인증</strong>에서 <strong>브라우저 인증으로 연결</strong>을 사용합니다. 주소가 아직 준비되지 않았다면 <strong>연결 상태 새로고침</strong>으로 확인합니다. 팝업이 보이지 않으면 화면에 나온 허용된 주소를 복사하거나 <strong>인증 페이지 열기</strong>를 선택합니다. 코드가 요구될 때만 제출합니다. <a href="../candidate-20261025-claude-plan-auth/">기존 장기 인증 절차</a>도 참고하세요.</p><p>실제 Claude OAuth 승인·토큰 발급·유료 모델 요청은 검증하지 않았습니다. CLI 상태만으로 모델 응답 성공을 판정하지 않습니다.</p></section>
    <section id="checks"><h2>확인된 검사와 한계</h2><p>정확한 소스의 깨끗한 개발 전체 검사 <strong>596건 통과·실패 0·차단 0</strong>, Wiki stale 0·오류 0, linux/amd64 이미지 빌드·식별, 패키지 자산 1,724개 대조와 인증 파일 부재를 확인했습니다. 이미지의 CLI는 Codex 0.162.0, Claude Code 2.1.183, Kimi Code 0.29.2입니다. 로컬 API/브라우저 검사는 합성 인증·자료를 사용했습니다. 동일 이미지의 Registry 원격 식별과 22:35(KST) 서버 이미지 단독 공급, 관리 워커 8개의 정확한 업데이트 제안을 확인했습니다. 공급 당시 컨테이너 13개의 ID·설정·마운트·재시작 횟수는 유지됐습니다.</p><p>C10 지정 워커 Update, 실제 사용자 화면·보존 자료·OAuth/모델 결과와 Portable ZIP 수용은 별도 단계입니다. 기존 자동설정은 변경하지 않았으며 제안 available만으로 적용 완료를 주장하지 않습니다.</p></section>
    <section id="acceptance"><h2>정확한 이미지 적용 뒤 재현 검사</h2><ol><li>적용 전 워커 이미지·건강·기존 설정·사용자·프로필 수를 비공개 기록에 남기고, Update 뒤 정확한 새 실행 이미지와 보존을 대조합니다.</li><li>관리자/일반 사용자로 로그인해 네 설정의 표시·읽기·변경 권한을 시험합니다. 같은 계정의 갱신 중 비밀번호 초안은 유지되고 계정 전환·로그아웃 뒤에는 지워져야 합니다.</li><li>가상 값으로 업로드 정책의 네 한도를 저장·재조회·복원합니다. 충돌과 결과 불명에서 자동 중복 저장이 없는지 확인합니다.</li><li>시험용 로컬 사용자·프로필의 생성, 목록·revision·기본값, 비밀번호 재설정/세션 무효화, 이름 변경 때 매핑 보존을 확인합니다.</li><li>런타임의 현재 선택과 설정/유효/권장 용량을 읽고, 승인된 시험 변경이 새 요청에만 적용되는지 확인합니다.</li><li>Claude 인증 주소 지연·팝업 차단 복구를 확인하고, 실제 OAuth/모델 결과는 수행한 경우에만 따로 기록합니다. 데스크톱·모바일 화면을 비밀값 없이 촬영합니다.</li></ol><p>이 절차는 적용 후 수용 기준이며 현재 통과 기록이 아닙니다.</p></section>
    <section id="captures"><h2>화면 캡처 상태</h2><p><strong>화면 미촬영 · C10 이미지의 실제 운영 화면은 미촬영입니다.</strong> 이전 이미지의 화면을 현재 증거로 재사용하지 않습니다. 정확한 이미지 적용 뒤 로그인·설정 목록·네 상세 화면·Claude 대기/수동 열기를 데스크톱과 모바일에서 촬영하고 계정·비밀번호·토큰·코드를 가립니다.</p></section>`,
};
