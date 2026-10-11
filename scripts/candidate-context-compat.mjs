// Public image-candidate copy. Exact tag, digests and operational receipts stay private.
export const contextCompatCandidate = {
  slug: 'candidate-20261011-context-compat',
  label: '2026.10.11 대화 맥락 압축·단일 업데이트 호환 후보',
  status: {
    build: '완료 · 이미지·호환성 검사 통과',
    registry: '등록 완료 · 이미지 식별 일치',
    prestage: '완료 · 서버 이미지 식별 일치',
    offer: 'worker0 제안 수신 · 콘솔 실행 버튼 활성',
    apply: '미진행'
  }
};

export const contextCompatCandidateGuide = {
  slug: contextCompatCandidate.slug, title: contextCompatCandidate.label, category: '버전',
  description: '긴 대화의 맥락 선택과 요약, 이전 버전이 읽을 수 있는 상태 저장을 보완한 운영 미적용 이미지 후보입니다.',
  verifiedAt: '2026.10.11', evidenceLabel: '후보 이미지 공급·콘솔 준비 확인 / 운영 미적용', history: true, candidate: true,
  toc: [['state','현재 단계'],['context','긴 대화 개선'],['policy','요약 정책과 한계'],['compatibility','이전 버전 호환'],['checks','확인된 검사'],['actions','사용자·관리자 행동'],['acceptance','적용 후 테스트']],
  body: () => `<div class="note capture-warning"><strong>운영 미적용 이미지 후보</strong>이미지 빌드·Registry 등록·서버 사전 배치와 worker0의 API·로그인 콘솔에서 업데이트 준비 상태를 확인했습니다. 이 후보를 적용하는 Worker Update·재기동·정책 변경은 진행되지 않았습니다. <a href="../release-history/">버전별 개선 이력</a>에서 운영 배포와 후보를 구분해 확인하세요.</div>
    <section id="state"><h2>현재 단계</h2><p>2026년 10월 11일(KST) 빌드한 별도 불변 이미지입니다. 날짜는 정식 제품 버전 번호가 아닙니다. 직전 <a href="../candidate-20261010-security-codex/">보안 의존성·Codex 0.162.0 이미지</a>의 개선을 포함하며, 이번 이미지에서 CLI 버전을 다시 올리지는 않았습니다. worker0의 업데이트 제안은 2026년 10월 11일 14:13(KST) API 응답 이후 로그인 콘솔에서도 확인했습니다. 상태는 바뀔 수 있으므로 실제 적용 전에는 다시 조회해야 합니다.</p><div class="release-stage-grid">
      <div><strong>이미지 빌드·격리 검사</strong><span>${contextCompatCandidate.status.build}</span></div>
      <div><strong>Registry 등록</strong><span>${contextCompatCandidate.status.registry}</span></div>
      <div><strong>서버 사전 배치</strong><span>${contextCompatCandidate.status.prestage}</span></div>
      <div><strong>워커 업데이트 제안</strong><span>${contextCompatCandidate.status.offer}</span></div>
      <div><strong>워커 실제 적용</strong><span>${contextCompatCandidate.status.apply}</span></div>
    </div><div class="note"><strong>콘솔에서 확인한 준비 상태</strong>2026년 10월 11일 약 18:08–18:09(KST), 로그인된 worker0 콘솔의 Settings → Runtime → Whole Update에서 현재 실행 이미지와 대상 후보를 구분해 확인했습니다. 단계는 ‘할당 수신’, 보존 대기열은 0, 보고된 차단 사유는 없었고 ‘Run Whole Update’ 버튼이 활성화돼 있었습니다. 화면의 Refresh 후에도 같은 상태였습니다. 버튼이나 확인창은 실행하지 않았으므로 업데이트 완료 또는 새 기능의 작동 증거가 아닙니다.</div></section>
    <section id="context"><h2>긴 대화에서도 현재 질문을 우선 보존</h2><p>긴 대화의 입력 길이를 더 정확하게 계산하고, 선택적으로 들어오는 스킬·Wiki·Memory·작업공간 자료에 입력 예산을 나눕니다. 현재 질문, 필수 지시, 권한 관련 내용이 부가 자료 때문에 밀려나지 않도록 순서를 정리했습니다.</p><p>과거 대화를 압축하더라도 원문, 생성된 요약, 요청별 실제 맥락, 실패 진단을 구분해 확인할 수 있게 보완했습니다. 이 변경은 기존 원문이나 History를 삭제하지 않습니다. 현재 worker0에서 관측된 짧은 후속 질문의 입력 초과 차단을 겨냥한 수정이지만, 지정 워커에 이 이미지를 적용한 뒤 같은 조건에서 재검사하기 전에는 해결을 운영 결과로 판정하지 않습니다.</p></section>
    <section id="policy"><h2>요약 정책: 기본값과 선택 기능 구분</h2><p>기본 정책인 <strong>자동 처리 켜짐·추출식 요약·제한 시간 20초</strong>는 바뀌지 않았습니다. 모델이 의미를 해석해 요약하는 방식은 관리자가 <strong>같은 어댑터·모델 사용</strong>을 명시적으로 선택할 때만 사용합니다. Codex·Claude·Kimi 경로에는 도구 없는 요약 호출, 시간 제한, 취소와 결과 형식 검사를 보완했습니다.</p><div class="note"><strong>60초 격리 테스트의 의미</strong>52·96·140개 메시지로 만든 합성 장문 대화를 각 어댑터·모델에서 3차례 비교했으며, 명시적으로 60초를 준 조건에서 원문 대비 의미 품질을 확인했습니다. 기본 20초 설정에서도 모두 성공하거나 실제 업무 대화에서 같은 품질을 낸다는 뜻은 아닙니다. 실패 시 추출식 대체 결과와 실패 원인을 따로 확인해야 합니다.</div></section>
    <section id="compatibility"><h2>한 번의 업데이트와 이전 버전 호환</h2><p>기존 버전이 읽을 수 있는 기본 상태와 새 버전의 비공개 형식 맥락을 함께 보존합니다. 시험용 이전 이미지의 실제 리더를 사용한 저장 상태 호환 검사 20건이 통과했습니다. 관리자 설정의 나중 변경이나 이미 끝난 결과를 되돌리지 않으며, 인증·History·Wiki를 초기화하지 않습니다.</p><p>구버전으로 돌아가면 기존 추출식/전체 입력 방식으로 동작합니다. 새 의미 요약 기능이 구버전에서도 작동한다는 뜻은 아닙니다. 선택 입력 일부가 생략된 상태로 고정된 요청은 구버전에서 안전하게 차단하고, 새 버전을 다시 적용하면 복원하도록 설계했습니다. 관리자는 기본 상태, 비공개 기록, 확인 기록을 함께 백업하고 상태 파일을 임의로 삭제하지 않아야 합니다.</p></section>
    <section id="checks"><h2>확인된 검사와 범위</h2><p>정확한 후보 소스에서 전체 개발 검증 <strong>424건 통과·실패 0·차단 0</strong>, Wiki 음성·최소 안정성 검사, 최종 이미지의 이전 리더 호환 검사 20건을 확인했습니다. 이미지 파일 1,274개의 출처와 Codex 0.162.0, Claude 2.1.183, Kimi 0.29.2를 격리 검사했습니다. 이미지의 생산 의존성 <code>npm audit</code> 결과는 0건이며, 운영체제나 모든 CLI 구성요소의 취약점이 0이라는 의미는 아닙니다.</p><p>실제 업무 세션, 배포 후 브라우저 화면, 지정 워커의 기능 결과는 아직 이 이미지로 검증하지 않았습니다. 후보 화면 캡처도 미촬영입니다.</p></section>
    <section id="actions"><h2>사용자와 관리자가 할 일</h2><div class="release-improvements"><div><h3>일반 사용자</h3><p>실제 업데이트 전에는 현재 워커의 압축 동작이 바뀌었다고 기대하지 않습니다. 적용 후 안전한 시험 대화의 짧은 후속 질문과 최종 답변, 컨텍스트 정보 화면의 원문·요약·요청별 사용 범위를 비교합니다.</p></div><div><h3>관리자</h3><p>대상 워커의 정확한 이미지와 건강 상태를 먼저 확인합니다. 기본 정책값을 기록하고, 의미 요약을 시험할 때만 같은 어댑터·모델 옵션과 별도 제한 시간을 명시한 뒤 복원합니다. 백업 단위와 이전 버전 호환을 확인하되 실제 롤백은 별도 운영 절차로 다룹니다.</p></div></div></section>
    <section id="acceptance"><h2>실제 적용 후 테스트</h2><ol><li>지정 워커의 실행 이미지·건강 상태·보존된 세션을 확인하고 이 후보와 일치하는지 기록합니다.</li><li>관리자 화면에서 맥락 정책 기본값인 자동 처리·추출식 요약·20초를 재조회합니다. 설정값을 바꾸지 않았다면 의미 요약이 기본 활성화된 것으로 판정하지 않습니다.</li><li>비밀값 없는 긴 시험 대화에서 짧은 후속 질문을 보내 최종 상태와 응답을 확인합니다. 같은 조건의 과거 차단 사례와 비교하되 실패가 사라졌는지 실제 결과로 기록합니다.</li><li>컨텍스트 정보 화면에서 원문, 요약, 요청별 맥락과 실패 진단을 구분하고, 스킬·Wiki·Memory·작업공간 입력의 선택·생략 이유를 확인합니다. 데스크톱·모바일 실제 화면을 새로 촬영합니다.</li><li>별도 승인된 격리 시험에서만 같은 어댑터·모델 요약과 60초 제한을 켜 원문 대비 결과, 취소와 추출식 대체를 비교하고 원래 정책으로 복원합니다.</li></ol><p>이 검사를 마치기 전까지 로컬 이미지 검사나 60초 합성 대화 결과를 운영 워커의 기능 통과로 표시하지 않습니다.</p></section>`
};
