function createVisitorApplicationForm() {
  const config = getVisitorFormConfig_();

  const form = FormApp.create(config.title)
    .setTitle(config.title)
    .setDescription(config.description)
    .setConfirmationMessage(config.confirmationMessage)
    .setShowLinkToRespondAgain(false)
    .setAllowResponseEdits(false)
    .setProgressBar(true)
    .setCollectEmail(config.collectEmail);

  form.addTextItem()
    .setTitle("신청자 이름")
    .setRequired(true);

  form.addTextItem()
    .setTitle("연락처")
    .setHelpText("예: 010-1234-5678")
    .setRequired(true);

  form.addTextItem()
    .setTitle("이메일")
    .setHelpText("관람 안내를 받을 이메일 주소를 입력해 주세요.")
    .setRequired(false);

  form.addDateItem()
    .setTitle("방문 희망일")
    .setHelpText("2026년 5월 30일 ~ 2026년 6월 5일 중 선택해 주세요.")
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("방문 희망 시간")
    .setChoiceValues(config.timeSlots)
    .setRequired(true);

  form.addListItem()
    .setTitle("방문 인원")
    .setChoiceValues(config.groupSizes)
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle("관심 있는 프로그램")
    .setHelpText("해당되는 항목을 모두 선택해 주세요.")
    .setChoiceValues(config.programs)
    .showOtherOption(true)
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle("방문 방식")
    .setChoiceValues([
      "혼자 방문",
      "가족과 함께 방문",
      "친구/지인과 함께 방문",
      "단체 방문"
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle("함께 방문하는 분 또는 추가 메모")
    .setHelpText("동반 인원 이름, 단체 방문 내용, 참고할 사항이 있다면 적어 주세요.")
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle("문의사항")
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle("개인정보 수집 및 이용 동의")
    .setHelpText("신청 확인과 관람 안내를 위한 최소한의 정보만 사용합니다.")
    .setChoiceValues([
      "동의합니다."
    ])
    .setRequired(true);

  const responseSheet = SpreadsheetApp.create(config.responseSheetTitle);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, responseSheet.getId());

  Logger.log("편집 링크: " + form.getEditUrl());
  Logger.log("공유 링크: " + form.getPublishedUrl());
  Logger.log("응답 시트: " + responseSheet.getUrl());
}

function getVisitorFormConfig_() {
  return {
    title: "제1회 ART 전시회 관람 신청",
    description: [
      "제1회 ART 전시회 관람 신청 폼입니다.",
      "전시 기간: 2026.05.30 - 2026.06.05",
      "장소: 대전 아르테미 갤러리",
      "원활한 관람 안내를 위해 아래 항목을 작성해 주세요."
    ].join("\n"),
    confirmationMessage: "관람 신청이 접수되었습니다. 전시에서 뵙겠습니다.",
    responseSheetTitle: "제1회 ART 전시회 관람 신청 응답",
    collectEmail: false,
    timeSlots: [
      "10:00 - 12:00",
      "12:00 - 14:00",
      "14:00 - 16:00",
      "16:00 - 18:00"
    ],
    groupSizes: [
      "1명",
      "2명",
      "3명",
      "4명",
      "5명 이상"
    ],
    programs: [
      "작품 관람",
      "인터랙티브 체험",
      "이미지 체험 프로그램",
      "아티스트 토크",
      "포토존"
    ]
  };
}
