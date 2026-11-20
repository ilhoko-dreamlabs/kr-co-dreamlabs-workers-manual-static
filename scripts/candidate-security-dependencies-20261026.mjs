// Public version prose. Exact OCI identities and internal release destinations stay in the private receipt.
export const securityDependenciesCandidate = {
  slug: 'candidate-20261026-security-dependencies',
  label: '2026.10.26 생산 의존성 보안 보완 이미지 후보',
  status: {
    build: '완료 · 별도 linux/amd64 불변 이미지 빌드·식별',
    validation: '완료 · 깨끗한 전체 검사 516건 통과·이미지 생산 의존성 감사 0건',
    registry: '완료 · 동일 불변 이미지 원격 등록·독립 식별 확인',
    prestage: '완료 · 동일 불변 이미지 서버 단독 배치·식별 확인',
    offer: '확인 · 관리 대상 8개에서 정확 대상 제안 available',
    apply: '미수행 · 01:13(KST) 조회 당시 Update·재시작 없음',
  },
};

export const securityDependenciesCandidateGuide = {
  slug: securityDependenciesCandidate.slug,
  title: securityDependenciesCandidate.label,
  category: '버전',
  description: '10월 25일 Claude Plan 장기 인증 이미지에서 이어진 생산 의존성 보안 보완과 실제 배포·검증 경계를 설명합니다.',
  verifiedAt: '2026.10.26',
  evidenceLabel: '깨끗한 소스·이미지·Registry·서버 배치·8개 제안 / 실제 적용 전',
  history: true,
  candidate: true,
  noScreenshot: true,
  toc: [['state','이미지와 배포 단계'],['delta','직전 이미지와의 차이'],['versions','바뀐 패키지와 범위'],['compatibility','화면·데이터·인증 호환'],['checks','검증한 경계'],['limits','남은 위험과 미확인'],['acceptance','적용 후 확인 절차'],['captures','화면 증거']],
  body: () => `<div class="note capture-warning"><strong>Registry·서버 배치·8개 제안 확인 · 실제 적용 전</strong>이 페이지는 2026년 10월 26일의 불변 이미지 한 개를 기록한 운영 미적용 후보 안내입니다. 직전 <a href="../candidate-20261025-claude-plan-auth/">Claude Code Plan 장기 인증 후보</a>에서 달라진 생산 의존성만 이번 이미지의 새 기능으로 계산합니다. 동일 이미지의 Registry 업로드·원격 식별과 10월 26일 01:12(KST) 서버 이미지 단독 배치, 01:13(KST) 관리 대상 8개의 정확한 제안 available을 확인했습니다. 당시 기존 컨테이너 13개의 실행 이미지·재시작 수·설정·마운트는 유지됐고 실제 Update·재시작은 없었습니다. 날짜는 공식 제품 버전 번호가 아닙니다.</div>
    <section id="state"><h2>이미지와 실제 배포 단계</h2><div class="release-stage-grid"><div><strong>이미지 빌드</strong><span>${securityDependenciesCandidate.status.build}</span></div><div><strong>전체·이미지 검사</strong><span>${securityDependenciesCandidate.status.validation}</span></div><div><strong>Registry 등록</strong><span>${securityDependenciesCandidate.status.registry}</span></div><div><strong>서버 사전 배치</strong><span>${securityDependenciesCandidate.status.prestage}</span></div><div><strong>업데이트 제안</strong><span>${securityDependenciesCandidate.status.offer}</span></div><div><strong>워커 실제 적용</strong><span>${securityDependenciesCandidate.status.apply}</span></div></div><p>Registry 식별·서버 이미지 배치·업데이트 제안은 특정 워커의 새 이미지 실행을 뜻하지 않습니다. 기존 자동설정 대상의 다음 점검과 수동 대상의 사용자 선택은 별도 단계이며, 실제 적용은 대상 워커의 정확한 실행 이미지·건강·보존 자료를 새로 읽은 뒤에만 판정합니다.</p></section>
    <section id="delta"><h2>직전 이미지에서 달라진 점</h2><p>10월 25일 이미지는 Claude Code Plan의 관리자용 장기 OAuth 인증과 기본 꺼진 Console Next 검증 기반을 포함했지만, 당시 생산 의존성 감사에서 중간 심각도 2건·높은 심각도 2건이 남아 있었습니다. 이번 별도 이미지에서는 그 네 패키지 계열과 필요한 하위 의존성을 올려 <strong>루트·Standalone 앱·이미지 내부의 생산 의존성 npm 감사 0건</strong>을 확인했습니다. 이전 이미지의 감사 결과를 소급해 0건으로 바꾸지 않습니다.</p><p>이 변경은 기존에 저장된 관리 토큰의 발급·검증을 수행하거나 새 인증 화면을 추가하지 않습니다. 장기 인증의 조작 순서·만료 표기·파일 로그인 관계는 <a href="../candidate-20261025-claude-plan-auth/">직전 후보 사용법</a>을 따르며, 실제 계정·모델 요청 수용은 여전히 남아 있습니다.</p></section>
    <section id="versions"><h2>바뀐 생산 패키지와 검사 범위</h2><table><thead><tr><th>패키지</th><th>이번 이미지 버전</th><th>확인 범위</th></tr></thead><tbody><tr><td><code>body-parser</code></td><td>1.20.9 / 2.4.0</td><td>Express와 MCP SDK가 쓰는 두 계열 모두 포함</td></tr><tr><td><code>fast-uri</code></td><td>3.1.9</td><td>생산 잠금 파일·이미지 검사</td></tr><tr><td><code>ip-address</code></td><td>10.7.5</td><td>생산 잠금 파일·이미지 검사</td></tr><tr><td><code>zod</code></td><td>4.6.7</td><td>생산 잠금 파일·이미지 검사</td></tr></tbody></table><p><code>body-parser</code> 2.x에 필요한 <code>content-type</code> 2.1.0과 공통 하위 패키지 <code>qs</code> 6.16.1도 함께 잠겼습니다. 루트와 Standalone 앱의 잠금 파일을 대조했으며, 취약한 하위 복사본을 일부러 넣어 검사가 놓치지 않는지 확인했습니다. 이것은 <strong>npm 생산 의존성</strong> 감사 결과이고 운영체제 전체 보안 스캔을 대신하지 않습니다.</p></section>
    <section id="compatibility"><h2>화면·데이터·인증 호환</h2><p>이번 소스 차이에는 Console 화면, 사용자 조작, 권한, 보존 데이터 형식, 포트·서비스 소유권 또는 CLI 버전 변경이 없습니다. Codex 0.162.0, Claude 2.1.183, Kimi 0.29.2가 유지됩니다. 기존 파일 로그인과 Worker 관리 장기 토큰 동작은 패키지 교체 후에도 별도 인증 회귀 검사로 확인했습니다.</p><p>따라서 이번 보완만을 위한 새 설정 절차나 화면 캡처는 없습니다. 다만 <strong>10월 25일에 추가된 장기 인증 패널의 실제 운영 화면 캡처와 계정·모델 결과는 아직 확보되지 않았습니다.</strong> 기존 Portable ZIP은 이 이미지로 갱신되지 않았으며 해당 배포 형태의 호환성·오프라인·업데이트 보존은 별도 검증이 필요합니다.</p></section>
    <section id="checks"><h2>검증한 경계</h2><p>정확한 깨끗한 소스에서 전체 검사 <strong>516건 통과·실패 0·차단 0</strong>을 확인했습니다. 두 <code>body-parser</code> 계열은 각각 정상 gzip, 잘못된 JSON의 <code>400</code>, 과도한 본문의 <code>413</code>, 압축 데이터 뒤 잔여 바이트, 이후 정상 응답의 다섯 경우를 격리 HTTP 검사로 통과했습니다. 생산 의존성 회귀 검사는 취약한 중첩 복사본도 찾는 11개 항목을 통과했습니다.</p><p>동일 이미지에서 자산 1,695개의 출처·식별, 비어 있는 인증 자료, 관리 인증 검사 11건, 네트워크를 막은 임시 기동의 건강 응답 <code>200</code>·Wiki 준비·인증 없는 관리자 조회 거부 <code>401</code>을 확인했습니다. 실제 운영 요청·제공자 모델 호출·장기 토큰 발급을 실행한 결과는 아닙니다.</p></section>
    <section id="limits"><h2>남은 위험과 미확인</h2><p>루트의 <strong>개발 도구 의존성 경고 7건</strong>은 별도 범위로 남았습니다. 이번 생산 이미지에는 해당 개발 도구가 복사되지 않았지만, 저장소 전체 감사가 0건이라는 뜻은 아닙니다. 운영체제 패키지 스캔도 이번 검사에 포함되지 않았습니다.</p><p>최종 전체 검사 전에는 서로 다른 검사 집계 실패가 기록됐습니다. 검사 건수 변경에 따른 집계 조건과 시험 포트 문제는 검증 도구에서 보정해 같은 안전 검사로 다시 실행했습니다. Wiki의 간헐 실패 원인은 아직 확정되지 않았습니다. Kimi 기동 검사는 처음 두 번 30초 제한에 걸렸고, 별도 진단 뒤 4.3초 및 원래 30초 검사에서 통과했습니다. 이를 운영 Kimi 요청 성공으로 해석하지 않습니다.</p><p>10월 26일 01:13(KST) 제안 확인 당시 지정 워커 적용·실제 업무 결과는 없었습니다. 업데이트 제안은 이후 상태가 바뀔 수 있으므로 실행·수용 여부는 새 읽기 증거가 생길 때까지 <strong>미확인</strong>으로 남깁니다.</p></section>
    <section id="acceptance"><h2>지정 워커 적용 뒤 확인할 순서</h2><ol><li>업데이트 전에 대상 워커·현재 실행 이미지·건강·기존 세션과 설정·자격 자료 보존 상태를 비공개 기록으로 확인합니다. Registry 등록이나 제안만으로 워커 적용을 판정하지 않습니다.</li><li>승인된 정확 이미지를 적용한 뒤 새 실행 이미지·건강·Wiki 준비·기존 자료가 그대로인지 확인합니다. 실제 작업 전후의 인증 자료 원문은 읽거나 공개 기록에 남기지 않습니다.</li><li>격리 시험 워커에서만 정상·잘못된 JSON·용량 초과·압축 본문 후속 정상 응답을 양쪽 파서 경로에서 확인합니다. 예상 <code>400</code>/<code>413</code>과 이후 정상 응답을 구분합니다.</li><li>기존 Claude Plan 장기 인증 화면의 권한·CLI 상태와 승인된 무해한 새 실행의 최종 결과를 별도 판정합니다. Kimi와 다른 어댑터도 승인된 안전한 요청의 실제 최종 상태로 확인합니다.</li><li>생산 npm 감사 0건, 개발 도구 경고·OS 스캔·Portable ZIP 미검증을 서로 다른 항목으로 기록합니다. 실패한 변경 요청은 원래 결과를 확인한 뒤 재시도합니다.</li></ol><p>이 절차는 향후 수용 기준이며 아직 어느 지정 워커에서도 실행한 통과 기록이 아닙니다.</p></section>
    <section id="captures"><h2>화면 증거</h2><p><strong>화면 미촬영 · 이번 이미지의 UI 변경은 없습니다.</strong>새 화면을 만들거나 과거 캡처를 이번 이미지의 운영 증거로 재사용하지 않았습니다. 직전 이미지의 Claude Code Plan 장기 인증 패널은 실제 적용 후 관리자·일반 사용자 화면을 별도로 촬영해야 합니다. 이번 이미지가 그 화면에 적용됐다는 사실은 정확한 워커 이미지 확인 뒤에만 표시합니다.</p></section>`,
};
