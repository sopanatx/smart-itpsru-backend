export interface AccountInfo  {
  id: String;
  accountId: String;
  nickname?: String;
  educateGroup: Number;
  graduateSchool?: String;
  admissionYear?: Number;
  profileImageUrl?: String;
  canContactAddress?: String;
  currentAddress?: String;
  workAddress?: String;
  phoneNumber?: String;
  facebookAccount?: String;
  lineID?: String;
  privacyPermission?: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
