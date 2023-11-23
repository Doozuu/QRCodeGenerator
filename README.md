## ✨ 주요 기능 설명

`public/data/info.csv`

엑셀에서 추출한 csv 데이터 저장하는 곳

`utils/csvToJson.tsx`

csv 파일 json 형식으로 바꾸는 기능

`pages/api/convert.js`

csv 파일 json 형식으로 바꿔서 반환해주는 api

`app/page.tsx`

- convert api 호출해서 jsonData에 정보 저장
- 저장 버튼 클릭시 QRCode를 svg 파일로 변환해 zip 파일로 저장

<br>

## ✨ 실행 사진
![스크린샷 2023-11-24 오전 1 12 59](https://github.com/Doozuu/QRCodeGenerator/assets/104717341/058bee2a-e1db-44ac-a56a-1910d1bd0c81)
