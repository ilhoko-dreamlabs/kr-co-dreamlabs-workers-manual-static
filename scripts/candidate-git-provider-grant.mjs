// Exact source, OCI digests and private supply endpoints belong in the internal receipt.
import { providerGrantCandidateCapture } from './git-provider-access-guide.mjs';

export const gitProviderGrantCandidate = {
  slug: 'candidate-20261019-git-provider-grant',
  label: '2026.10.19 GitLab·GitHub 계정 권한 방식 개선 후보',
  status: {
    build: '완료 · 22:20(KST) 이미지·격리 검사 통과',
    registry: '완료 · 22:25(KST) 원격 이미지 식별 확인',
    prestage: '완료 · 22:27(KST) 서버 이미지 단독 배치',
    offer: '확인 · 22:28(KST) 관리 워커 8개 대상 제안',
    apply: '미확인 · 22:28(KST) 당시 미적용, 이후 재조회 필요'
  }
};

export const gitProviderGrantCandidateGuide = {
  slug: gitProviderGrantCandidate.slug, title: gitProviderGrantCandidate.label, category: '버전',
  description: 'GitLab·GitHub 연결의 계정/토큰 권한 기준, 기존 연결 전환, OAuth 동의와 이전 이미지 호환성 및 공급 단계를 설명합니다.',
  verifiedAt: '2026.10.19', evidenceLabel: '빌드·Registry·서버 배치·제안 확인 / 실제 적용 미확인', history: true, candidate: true, localCapture: true,
  toc: [['state','이미지 공급·적용 상태'],['changes','이번 이미지에서 달라진 점'],['transition','기존 연결·OAuth'],['boundary','유지되는 경계'],['compat','이전 이미지와 되돌리기'],['checks','확인된 검사'],['acceptance','적용 뒤 직접 테스트'],['captures','화면 증거']],
  body: () => `<div class="note capture-warning"><strong>새 별도 이미지 · 공급 및 제안 확인</strong>이 항목은 앞선 <a href="../candidate-20261019-gitlab-rest-fallback/">GitLab REST fallback 이미지</a>와 다른 10월 19일 이미지입니다. 22:28(KST) 공급 조회에서 새 이미지의 대상 제안은 확인됐지만 실제 워커 적용·운영 Git 제공자 작업은 확인되지 않았습니다. 같은 날짜가 정식 제품 버전 번호를 뜻하지 않습니다.</div>
    <section id="state"><h2>이미지 공급·적용 상태</h2><p>정확한 비교 기준은 앞선 GitLab REST fallback 이미지입니다. 신규 이미지의 빌드·격리 검사와 Registry 등록·원격 식별, 서버 이미지 단독 배치가 순서대로 확인됐습니다. 22:28(KST) 관리 워커 8개 모두 정확한 새 이미지 제안이 사용 가능했고 정상·진행 작업 0·대기 중 업데이트 없음이었습니다. 기존 13개 컨테이너의 식별·상태가 그대로였고 worker0의 환경·마운트·보호 설정이 보존됐습니다. 강제 실행·수동 Update·정책 변경은 없었습니다. 일부 워커의 기존 자동 업데이트 정책은 유지됐으므로 <strong>이후 적용 상태는 각 워커의 실행 이미지로 새로 판정</strong>해야 합니다.</p><div class="release-stage-grid">
      <div><strong>이미지 빌드·격리 검사</strong><span>${gitProviderGrantCandidate.status.build}</span></div>
      <div><strong>Registry 등록</strong><span>${gitProviderGrantCandidate.status.registry}</span></div>
      <div><strong>서버 사전 배치</strong><span>${gitProviderGrantCandidate.status.prestage}</span></div>
      <div><strong>워커 업데이트 제안</strong><span>${gitProviderGrantCandidate.status.offer}</span></div>
      <div><strong>워커 실제 적용</strong><span>${gitProviderGrantCandidate.status.apply}</span></div>
    </div><p>제안의 사용 가능 상태는 조회 시점의 결과이며 오래 유지된다는 보장은 없습니다. 화면에 업데이트가 보이더라도 현재 워커 기능이 새 이미지로 바뀌었다고 판정하지 않습니다.</p></section>
    <section id="changes"><h2>이번 이미지에서 달라진 점</h2><p><strong>GitLab·GitHub의 외부 작업과 자료 접근 권한은 실제 연결 계정·토큰의 서비스 권한</strong>을 따릅니다. 신규 Git 연결의 기능 체크박스와 외부 프로젝트·저장소 허용목록을 제거하고 저장·선택·준비 상태·도구·API·OAuth 흐름에 같은 기준을 적용했습니다. 일반 REST 경로도 새 기능별 허용 체크박스를 요구하지 않습니다. 콘솔의 연결 상세에 저장 성공·실패 안내를 표시하고 한국어·영어의 좁은 화면 정렬을 보완했습니다. 번들 <code>gitlab-work</code> 안내도 바뀌었습니다. <a href="../git-provider-access/">새 연결·관리자 전환·오류 확인 절차</a>를 따라 단계별로 시험할 수 있습니다.</p><p>앞선 이미지의 GitLab REST 대체 경로, 결과 불명 쓰기·재시작 중복 방지와 다른 일반 기능은 이어받지만, 그 이미지의 예전 기능/리소스 제한을 이번 개선으로 소급해서 없었다고 보지 않습니다. GitHub 환경 자격 대체 경로, Google/GAS 정책과 워커 간 요청 권한은 이번 변경 대상이 아닙니다.</p></section>
    <section id="transition"><h2>기존 연결·OAuth 동의</h2><p>기존 GitLab·GitHub 연결은 <strong>관리자가 연결별로 명시적으로 전환</strong>해야 새 권한 기준을 사용합니다. 운영 설정의 일괄 전환이나 토큰 교체는 수행되지 않았습니다. 전환 전에는 옛 기능·리소스 제한과 전환 필요 안내가 유지됩니다. 전환은 연결 ID·자격증명·사용 경로를 보존하고 이미 시작된 요청의 권한을 넓히지 않습니다.</p><p>OAuth 화면은 <strong>다음 인증에 요청할 범위</strong>와 <strong>현재 토큰에 보고된 실제 범위</strong>를 따로 보여 줍니다. 일부만 허용된 동의나 보고된 범위 없음도 사실대로 표시합니다. 요청 범위를 바꾼 뒤에는 서비스의 재동의를 완료하고 실제 결과를 다시 읽어야 합니다. PAT 권한은 서비스에서 관리하며, 연결 저장만으로 토큰 권한이 바뀌지 않습니다.</p></section>
    <section id="boundary"><h2>유지되는 경계와 거부 처리</h2><p>계정·서비스 주소의 정확한 선택, 사용 중지·회수, 워커에서 사용할 위치와 프로젝트, 요청자의 작업 권한, 읽기 전용 의도와 변경 승인, 자격증명 비공개·신뢰할 수 있는 서비스 주소 검사는 유지됩니다. 서비스가 <code>401</code> 또는 <code>403</code>으로 거부하면 실제 계정·토큰·동의 범위를 확인해야 합니다. 같은 토큰을 다른 경로로 다시 보내는 것이 해결책은 아닙니다. <code>404</code>만으로 권한 부족을 단정하지 않습니다. 결과가 불확실한 쓰기는 재전송 전에 원래 대상의 효과를 읽어 확인합니다.</p></section>
    <section id="compat"><h2>이전 이미지와 되돌리기</h2><p>정확한 앞선 이미지의 저장소 읽기 검사는 통과해 기존 설정을 읽어도 자료는 그대로였습니다. 하지만 <strong>이전 이미지에서 어느 Connector 설정이든 저장하면 이번 이미지의 새 권한 방식 표시 목록이 사라집니다.</strong> 다시 이번 이미지로 올리면 관리자가 영향받은 Git 연결을 다시 전환해야 합니다. 이번 이미지에서 새로 만든 Git 연결이 이전 이미지에서 똑같이 작동한다는 보장도 없습니다. 되돌리기는 완전한 권한·데이터 모델 복구가 아니며, 불확실한 쓰기를 새 요청으로 반복하지 않습니다.</p><p>Codex 0.162.0, Claude 2.1.183, Kimi 0.29.2의 번들 버전은 변경되지 않았습니다. 이를 각 CLI의 최신 버전이라고 주장하지 않습니다. Worker 소스의 원격 main 통합·파이프라인·전체 워커 적용 또는 Portable 패키지 수용은 이 이미지 공급으로 입증되지 않았습니다.</p></section>
    <section id="checks"><h2>확인된 검사</h2><p>깨끗한 정확 소스 기준 <strong>472건 통과·실패 0·차단 0</strong>, 타입 검사·빌드·Wiki 부정 사례 20건과 최소 안정성 검사를 확인했습니다. 새 권한 기준의 소스 의미 검사 18그룹, OAuth 합성 호출 16건, 이미지 내부 새 기능 17그룹과 주요 이전 기능 회귀를 검사했습니다. 1,420개 애플리케이션 파일의 이미지 출처를 확인했고, Codex·Claude·Kimi의 동일 버전 실행을 네트워크 차단·읽기 전용 격리 환경에서 검사했습니다. 실제 제품 설정 컴포넌트는 로컬 Chromium에서 한국어·영어×360/390/1280픽셀 여섯 경우를 모의 API로 검사했습니다. 앞선 이미지의 저장소 읽기/쓰기 호환성은 별도 격리 시험으로 확인했습니다.</p><p><strong>실제 운영 계정의 제공자 권한 결과, 전체 관리자 API, 연결 전환·재인증, 지정 워커 기능 및 새 운영 화면은 아직 수용 검사를 하지 않았습니다.</strong></p></section>
    <section id="acceptance"><h2>적용 뒤 직접 테스트하기</h2><ol><li>대상 워커의 정확한 실행 이미지·건강·기존 자료를 읽어 새 후보 적용을 먼저 확인합니다. Registry·서버 배치·제안만으로 적용 통과를 기록하지 않습니다.</li><li>관리자와 일반 사용자 계정으로 <strong>설정 → 커넥터</strong>를 열고 새 Git 연결에 옛 기능 체크박스·외부 허용목록이 없는지, 일반 사용자에게 저장·전환 버튼이 없는지 확인합니다. 한국어·영어, 데스크톱·좁은 화면을 대조합니다.</li><li>승인된 시험 계정으로 새 연결을 만들고 실제 계정 확인과 읽기 결과를 원본 서비스와 대조합니다. 옛 제한이 있는 기존 연결은 전환 전/관리자 확인 후의 상태·자격증명·배정을 기록합니다.</li><li>권한이 제한된 토큰과 일부 OAuth 동의에서 서비스의 실제 거부를 확인합니다. 요청 범위와 부여된 범위, 재인증 후 결과를 구분합니다. 승인된 쓰기와 읽기 전용 거부·결과 불명 중복 방지는 격리 시험 자료에서만 검사합니다.</li><li>이전 이미지로 되돌리는 검사는 별도 격리 자료로 수행하고, 옛 버전에서 설정 저장 후 재업그레이드·관리자 재전환이 필요한지 확인합니다. 운영 워커의 되돌리기나 설정 변경을 이 페이지 검사만으로 실행하지 않습니다.</li></ol><p>비공개 기록에 정확한 이미지, 워커·확인 시각, 연결 ID·계정과 범위, 전환 전후 상태, Task와 제공자 결과, 화면 캡처를 남기되 토큰과 고객 자료는 가립니다.</p></section>
    <section id="captures"><h2>화면 증거</h2><p>아래는 실제 후보 설정 컴포넌트의 <strong>로컬 Chromium·모의 API 화면</strong>입니다. 사용자 동선과 좁은 화면 배치를 살필 수 있지만 운영 워커나 실제 서비스 권한을 보여 주지 않습니다. <a href="../git-provider-access/">상세 사용법</a>에는 생성 화면과 전환 전후 모바일 화면을 함께 두었습니다.</p>${providerGrantCandidateCapture('legacy-card-mobile-ko.png','로컬 후보 기존 Git 연결 전환 전 모바일 카드','관리자 전환 안내와 버튼을 보여 주는 390픽셀 합성 연결 화면입니다. 운영 화면 캡처 미확보.')}${providerGrantCandidateCapture('grant-card-mobile-ko.png','로컬 후보 Git 연결 전환 후 모바일 카드','전환 뒤 계정·토큰 권한 안내입니다. 모의 API 결과이며 실제 제공자 검사 전입니다.')}<p><strong>새 이미지의 운영 화면 캡처 미확보</strong>입니다. 지정 워커 적용과 실제 연결 결과를 확인한 뒤 운영 화면을 별도 촬영해야 합니다.</p></section>`
};
