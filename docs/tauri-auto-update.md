# Tauri 자동 업데이트 배포 가이드

이 문서는 `uode`를 **자동 업데이트 가능한 형태**로 배포하기 위한 설정 절차를 정리합니다.

## 현재 구성 요약

- 소스·릴리즈 저장소: 동일 GitHub 저장소 (Actions가 이 레포에 Release 업로드)
- 배포 자동화: GitHub Actions + `tauri-apps/tauri-action`
- 릴리즈 트리거: `v*` 태그 푸시
- 채널: stable / beta
  - stable 태그 예: `v0.2.0`
  - beta 태그 예: `v0.2.0-beta.1`

## 1) 1회성 키 생성

업데이터 서명 키를 생성합니다.

```bash
bun run tauri signer generate -- -w ~/.tauri/uode.key
```

- private key: 절대 외부 공유 금지
- public key: `tauri.conf.json`의 updater `pubkey`에 설정

## 2) Tauri 설정 반영

`src-tauri/tauri.conf.json`에서 다음을 확인합니다.

- `bundle.createUpdaterArtifacts: true`
- `plugins.updater.pubkey`: 실제 public key 값
- `plugins.updater.endpoints`: **이 저장소** GitHub Releases의 `latest.json` URL (`https://github.com/<owner>/<repo>/releases/latest/download/latest.json`)

예시:

```json
"plugins": {
  "updater": {
    "pubkey": "YOUR_PUBLIC_KEY",
    "endpoints": [
      "https://github.com/owner/repo/releases/latest/download/latest.json"
    ]
  }
}
```

## 3) GitHub Secrets 설정 (이 저장소)

아래 시크릿을 등록합니다.

- `TAURI_SIGNING_PRIVATE_KEY`: private key 파일의 내용(또는 경로 문자열)
- `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`: 키 비밀번호(없으면 빈 문자열)
- `TAURI_RELEASE_TOKEN`: (선택) **직접 만든 PAT 한 개만** 등록. GitHub가 자동으로 넣는 `GITHUB_TOKEN`은 시크릿으로 만들지 않는다.  
  Actions에서 Release 생성 시 `Resource not accessible by integration` 이 나오면(조직 정책 등) **Classic PAT `repo`** 또는 **Fine-grained: Contents Read and write + Metadata Read** 로 이 저장소에 권한을 주고, 조직이 SAML SSO를 쓰면 해당 PAT에 **Authorize**까지 해 둔다.

기본적으로는 워크플로의 자동 `GITHUB_TOKEN`(`permissions: contents: write`)으로 Release를 만든다. 저장소 **Settings → Actions → General → Workflow permissions** 에서 **Read and write** 가 켜져 있어야 한다.

### 저장소가 private일 때 (업데이터)

GitHub는 **private 저장소의 Release 자산**에 대해 저장소 읽기 권한이 있는 사용자만 접근할 수 있습니다.  
일반 사용자 PC에서 돌아가는 앱이 `latest.json`·설치 파일 URL을 **인증 없이** 받아야 한다면, Release는 **public 저장소**에 두거나, 자산을 **공개 CDN/S3 등**에 올리고 endpoint를 그쪽으로 맞추는 방식을 검토해야 합니다.

## 4) 릴리즈 방식

워크플로우는 `tauri-action`으로 번들/릴리즈 업로드를 수행하며, updater JSON 업로드를 활성화합니다.

워크플로우는 **이 저장소**에 릴리즈를 만들며, `releaseCommitish`는 태그가 가리키는 커밋(`github.sha`)을 사용합니다.

- stable 태그(`vX.Y.Z`) → `latest.json`
- beta 태그(`vX.Y.Z-beta.N`) → `latest-beta.json`

업로드 자산:

- `release-installer.exe`
- `release-installer.exe.sig`
- `latest.json` 또는 `latest-beta.json`

## 5) 앱 업데이트 체크

프론트엔드에서 다음 유틸을 사용할 수 있습니다.

- `checkForAppUpdate()`
- `downloadAndInstallLatestUpdate()`

경로:

- `apps/web/src/shared/lib/tauri/updater.ts`

## 6) 채널 운영 주의사항

현재 앱 기본 endpoint는 `latest.json`(stable)입니다.  
`latest-beta.json`은 배포 파이프라인에서 생성/업로드되며, beta 채널을 앱에서 직접 사용하려면 endpoint를 beta용으로 분기하는 추가 런타임 구현이 필요합니다.

## 7) 자동 업데이트 반영 조건

- 프론트 코드 수정 후 **커밋/푸시만으로는 배포가 실행되지 않습니다.**
- 이 저장소의 릴리즈 파이프라인은 `v*` 태그 푸시에서만 실행됩니다.
  - 예: `v0.1.2`, `v0.1.2-beta.1`
- 즉, 자동 업데이트 확인은 다음 순서가 필요합니다.
  1. 코드 변경 커밋/푸시
  2. 새 버전 태그 생성/푸시
  3. Actions 성공 확인
  4. 설치된 앱에서 업데이트 체크/설치

