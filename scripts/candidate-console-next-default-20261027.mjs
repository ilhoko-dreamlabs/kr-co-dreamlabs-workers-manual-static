// Public product changes only. Exact source and OCI identities belong in the private receipt.
export const consoleNextDefaultCandidate = {
  slug: 'candidate-20261027-console-next-default',
  label: '2026.10.27 Console Next 기본 화면 후보',
  status: {
    build: '완료 · linux/amd64 불변 이미지 빌드·내부 검사',
    validation: '완료 · 정확한 소스의 깨끗한 전체 검사 581건 통과·실패 0·차단 0',
    registry: '완료 · 로컬과 동일한 불변 이미지 원격 식별',
    prestage: '완료 · 서버 이미지 단독 공급, 기존 컨테이너 13개 유지',
    offer: '완료 · worker0 포함 관리 워커 8개 available',
    apply: '확인 · worker0·worker1 정확한 실행 이미지·건강 / 기능·화면 수용 전',
  },
};

export const consoleNextDefaultCandidateGuide = {
  slug: consoleNextDefaultCandidate.slug,
  title: consoleNextDefaultCandidate.label,
  category: '버전',
  description: '새 기본 Console의 포함 기능과 worker0·worker1 실행 이미지·건강, 실제 기능·화면 수용 경계를 확인합니다.',
  verifiedAt: '2026.10.28',
  evidenceLabel: 'worker0·worker1 실행 이미지·건강 확인 / 기능·실제 화면 수용 전',
  history: true,
  candidate: false,
  noScreenshot: true,
  toc: [['state','후보와 배포 단계'],['entry','기본 화면 전환'],['included','이번 후보의 사용자 기능'],['legacy','기존 화면에서 계속 쓰는 기능'],['checks','확인한 검사'],['acceptance','적용 뒤 확인 절차'],['captures','화면 캡처 상태']],
  body: () => `<div class="note capture-warning"><strong>worker0·worker1 실행 이미지·건강 확인 · 기능·화면 수용 전</strong>이 페이지의 날짜는 공식 제품 버전 번호가 아닙니다. 새 이미지와 정확한 소스의 깨끗한 전체 검사 581건 통과·실패 0·차단 0을 확인했습니다. 동일 이미지의 Registry 등록·서버 이미지 단독 공급과 관리 워커 8개의 업데이트 제안 available을 확인했습니다. 10월 28일 읽기에서 worker0·worker1은 정확한 소스를 실행하고 health 200·Wiki 준비 상태였습니다. 새 화면 조작·업무 결과와 캡처는 확인 전입니다.</div>
    <section id="state"><h2>후보와 배포 단계</h2><div class="release-stage-grid"><div><strong>로컬 이미지</strong><span>${consoleNextDefaultCandidate.status.build}</span></div><div><strong>최종 검사</strong><span>${consoleNextDefaultCandidate.status.validation}</span></div><div><strong>Registry</strong><span>${consoleNextDefaultCandidate.status.registry}</span></div><div><strong>서버 공급</strong><span>${consoleNextDefaultCandidate.status.prestage}</span></div><div><strong>업데이트 제안</strong><span>${consoleNextDefaultCandidate.status.offer}</span></div><div><strong>워커 적용</strong><span>${consoleNextDefaultCandidate.status.apply}</span></div></div><p>로컬 이미지·정적 자산·격리 기동 검사는 실제 사용자의 업무 결과나 보존 데이터 수용을 대신하지 않습니다. 적용 상태는 지정 워커의 실행 이미지와 건강, 실제 화면을 다시 읽어 판단합니다.</p></section>
    <section id="entry"><h2>기본 화면 전환</h2><p>이 후보가 적용되면 인증된 사용자의 <code>/console</code>은 Console Next를 엽니다. 화면의 <strong>설정·예약 등 기존 기능</strong> 링크나 <code>/console?ui=legacy</code>를 이용하면 기존 Console로 이동합니다. 기존 화면에서도 같은 Worker의 정식 인증·API 권한이 적용됩니다. Console Next의 데이터는 실제 서버 API에서 읽으며 모의 데이터가 운영 화면을 대신하지 않습니다.</p><p>기존 세션·프로젝트·RRA 자료를 새 형식으로 옮기는 마이그레이션은 없습니다. 이번 전환은 기본 진입 화면 변경이며 전체 기능 동등성을 주장하지 않습니다. 화면별 조작은 <a href="../console-next/">Console Next 탐색·뷰어 안내</a>에서 확인하세요.</p></section>
    <section id="included"><h2>이번 후보에서 연결된 사용자 기능</h2><table><thead><tr><th>영역</th><th>확인할 수 있는 동작</th></tr></thead><tbody><tr><td>Chat·RRA</td><td>정식 세션과 완료 응답·공개 진행 내역을 읽고, 일반 Chat 새 대화·명시적 전송·대기 요청 수정/삭제/실행·실행 중 취소를 조작합니다. 완료된 RRA 응답은 일반 Chat 초안으로 연결할 수 있지만 자동 실행하지 않습니다.</td></tr><tr><td>대시보드</td><td>Action·Operations·Projects·Knowledge·PARA의 정식 구성 데이터를 표시하고, 정확한 세션·프로젝트 목적지가 있을 때 이동합니다. 일부 출처 실패는 0건으로 꾸미지 않고 부분 상태로 표시합니다.</td></tr><tr><td>프로젝트</td><td>분류·진행·보관 상태·지침 revision과 멤버 세션을 읽습니다. 새 프로젝트, 설정, 세션 생성/연결/해제, 보관·복원·허용된 삭제를 명시적으로 실행합니다. 새 세션 생성만으로 요청이 실행되지는 않습니다.</td></tr><tr><td>Workspace·Wiki</td><td>Workspace 파일과 Wiki 문서·검색·3D 그래프를 탐색합니다. Markdown·텍스트·이미지·격리 HTML·PDF·Mermaid의 허용된 미리보기를 사용하고 필요한 파일은 권한 내에서 내려받습니다.</td></tr></tbody></table><p>RRA의 외부 프로그램 연동 규약은 계속 <code>/api/v1</code>입니다. 같은 대화에서 후속 요청을 보내는 방법은 <a href="../rra-integration/">RRA v1 연동 개발자 가이드</a>를 따르세요.</p></section>
    <section id="legacy"><h2>기존 화면에서 계속 쓰는 기능</h2><p><strong>설정·예약·Mattermost 정책·Skills·Tools·Connectors·업데이트·관리 기능</strong>은 이 후보의 Console Next에서 모두 연결됐다고 볼 수 없습니다. 새 화면의 <strong>설정·예약 등 기존 기능</strong> 링크를 눌러 기존 Console에서 사용하세요. 권한 없는 작업은 어느 화면에서도 허용되지 않습니다. Dashboard 카드에 이동 목적지가 없으면 비활성 안내가 보이며, 없는 화면으로 추측해서 이동하지 않습니다.</p></section>
    <section id="checks"><h2>현재 확인한 검사</h2><p>정확한 소스에서 깨끗한 전체 검사 581건 통과·실패 0·차단 0, 일반 빌드·타입 검사·한국어/영어 문구 검사와 기본 진입·인증 경계·명시적 기존 화면 이동의 집중 검사가 확인됐습니다. 실제 Edge의 390px 화면에서도 한국어/영어 전환과 이전 화면 이동을 확인했습니다. 로컬 불변 이미지 안의 정적 자산 출처·식별, 권한 계정 실행, 인증 자료 부재, 외부 네트워크를 끊은 임시 기동의 건강 응답과 PDF 한글 렌더링 자산도 검사했습니다.</p><p><strong>최종 깨끗한 전체 검사 581건 통과·실패 0·차단 0</strong>을 확인했습니다. 앞선 실행 시점 의존적인 기존 화면 브라우저 실패는 검증 기록에 남아 있으며 최종 결과를 소급하지 않습니다. worker0·worker1 실행 이미지·건강 조회는 별도 읽기 결과입니다. 인증·저장 자료·모바일 화면과 업무 결과는 아직 수용하지 않았습니다.</p></section>
    <section id="acceptance"><h2>정확한 이미지 적용 뒤 확인할 순서</h2><ol><li>대상 워커의 적용 전 실행 이미지·건강·보존된 세션·프로젝트·RRA 기록·설정의 기준을 비공개 기록으로 남깁니다.</li><li>사용자가 Update를 수행한 뒤 정확한 새 실행 이미지·건강·기존 데이터 보존을 확인합니다. 데스크톱과 모바일에서 <code>/console</code> 기본 진입과 <code>/console?ui=legacy</code> 이동을 촬영합니다.</li><li>권한별로 Chat·RRA·대시보드·프로젝트·Workspace·Wiki를 읽고, 승인된 가상 자료로 새 대화·대기열·프로젝트 변경을 실행해 성공/충돌/실패의 결과를 대조합니다.</li><li>한글 PDF와 Mermaid, 이미지, 격리 HTML을 실제 허용 파일로 열고, 표시 한도나 자원 실패 때 안내·다운로드가 맞는지 확인합니다.</li><li>기존 화면으로 이동해 설정·예약·Mattermost 정책·Skills·Tools·업데이트 진입을 확인합니다. 실제 화면 캡처와 최종 판정 시각을 이 페이지에 반영합니다.</li></ol><p>이 절차는 적용 후 수용 기준이며 아직 실행 통과 기록이 아닙니다.</p></section>
    <section id="captures"><h2>화면 캡처 상태</h2><p><strong>화면 미촬영 · 지정 워커의 실제 Console Next 화면은 미촬영입니다.</strong> 로컬 컴포넌트 시험 화면이나 이전 Console 캡처를 이 이미지의 운영 증거로 재사용하지 않습니다. 적용 후 데스크톱과 모바일의 기본 화면, Chat/RRA, 프로젝트, 탐색기·뷰어, 기존 화면 이동을 새로 촬영해야 합니다.</p></section>`,
};
