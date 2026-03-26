# Tauri 자동 업데이트 배포 가이드

이 문서는 `uode`를 **자동 업데이트 가능한 형태**로 배포하기 위한 설정 절차를 정리합니다.

## 현재 구성 요약

- 소스 저장소: private
- 업데이트 아티팩트 저장소: public GitHub Releases (별도 repo)
- 배포 자동화: GitHub Actions (`.github/workflows/tauri-release.yml`)
- 릴리즈 트리거: `v*` 태그 푸시
- 채널: stable / beta
  - stable 태그 예: `v0.2.0`
  - beta 태그 예: `v0.2.0-beta.1`

## 1) 1회성 키 생성

업데이터 서명 키를 생성합니다.

```bash
npm run tauri signer generate -- -w ~/.tauri/uode.key
```

- private key: 절대 외부 공유 금지
- public key: `tauri.conf.json`의 updater `pubkey`에 설정

## 2) Tauri 설정 반영

`src-tauri/tauri.conf.json`에서 다음을 확인합니다.

- `bundle.createUpdaterArtifacts: true`
- `plugins.updater.pubkey`: 실제 public key 값
- `plugins.updater.endpoints`: public release repo의 `latest.json` URL

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

## 3) GitHub Secrets 설정 (소스 repo)

아래 시크릿을 소스 저장소에 등록합니다.

- `RELEASE_REPO`: `owner/repo` 형태 (public 릴리즈 저장소)
- `GH_PAT_RELEASE_REPO`: public 릴리즈 저장소에 release write 가능한 PAT
- `TAURI_SIGNING_PRIVATE_KEY`: private key 파일의 내용(또는 경로 문자열)
- `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`: 키 비밀번호(없으면 빈 문자열)

## 4) 릴리즈 방식

워크플로우는 NSIS 설치 파일 기준으로 updater JSON을 생성합니다.

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

- `src/shared/lib/tauri/updater.ts`

## 6) 채널 운영 주의사항

현재 앱 기본 endpoint는 `latest.json`(stable)입니다.  
`latest-beta.json`은 배포 파이프라인에서 생성/업로드되며, beta 채널을 앱에서 직접 사용하려면 endpoint를 beta용으로 분기하는 추가 런타임 구현이 필요합니다.

