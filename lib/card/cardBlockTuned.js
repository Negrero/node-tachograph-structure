/**
 * Created by negrero on 13/03/2016.
 */







function getFn(type){
    var fn,n;
    switch (type){
        case "String":
            fn=bytestoString;
            break;
        case "Number":
            fn = bytestoNumber;
            break;
        case "Date":
            fn = bytestoDate;
            break;
        case "BCDString":
            fn = BCDtoString;
            break;
        case "OctetString":
            fn = OctetString;
            break;
        case "ManufactureCode":
            fn = ManufactureCode;
            break;
        case "NationNumeric":
            fn = NationNumeric;
            break;
        case "EquipmentType":
            fn = EquipmentType;
            break;
        case "EventFaultType":
            fn = EventFaultType;
            break;
        case "Array":
            fn = propertiesArray;
            break;
        case "Object":
            fn = blockProperties;
            break;
        case "ActivityChangeInfo":
            fn = ActivityChangeInfo;
            break;
        case "Activity":
            fn = ActivityDailyRecords;
            break;
        case "ControlType":
            fn = ControlType;
            break;
        case "EntryTypeDailyWorkPeriod":
            fn = EntryTypeDailyWorkPeriod;
            break;
        case "RegionNumeric":
            fn = RegionNumeric;
            break;

        case "eventArray":
            fn = eventArray;
            break;
        case "faultArray":
            fn = faultArray;
            break;
        case "ManualInputFlag":
            fn = ManualInputFlag;
            break;
        case "SpecificConditionType":
            fn = SpecificConditionType;
            break;
        case "CalibrationPurpose":
            fn = CalibrationPurpose;
            break;
        case "EventFaultRecordPurpose":
            fn = EventFaultRecordPurpose;
            break;

        default:
            fn="properties type not found";
            break
    }
    return fn
}
// declaration block {block: name , properties:properties [name,size,type,[properties]]}

var TAG={};
TAG[0x0002]= {block:"cardIccIdentification" ,properties:
    [   {name:"clockStop",size: size_card.CLOCKSTOP[1], type:"OctetString",properties: []},
        {name:"cardExtendedSerailNumber", size:size_card.CARDEXTENDEDSERIALNUMBER[1], type:"Object",properties: [
            {name:"serialNumber", size:size_card.SERIALNUMBER[1], type:"String",properties: []},
            {name:"monthYear", size:size_card.MONTHYEAR[0], type:"BCDString", properties:[]},
            {name:"type",size: size_card.TYPE[0], type:"OctetString",properties: []},
            {name:"ManufacturerCode",size: size_card.MANUFACTUREDCODE[0],type: "ManufactureCode",properties: []}
        ]},
        {name:"cardAprovalNumber", size:size_card.CARDAPPROVALNUMBER[0], type:"String", properties:[]},
        {name:"cardPersonaliserId", size:size_card.CARDPERSONALISERID[0], type:"String", properties:[]},
        {name:"embedderIcAssemblerId",size: size_card.EMBEDDERICASSEMBLERID[0], type :"String",properties: []},
        {name:"icIdentifier",size: size_card.ICIDENTIFIER[0], type:"OctetString", properties:[]}]

};
TAG[0x0005]={
    block:"cardChipIdentification",properties:[
        {name:"icSerialNumber",size :size_card.ICSERIALNUMBER[0], type:"OctetString",properties:[]},
        {name:"icManufacturingReferences", size: size_card.ICMANUFACTURINGREFENCES[0], type:"OctetString",properties:[]}
    ]};
TAG[0x0501]={block:"driverCardApplicationIdentification",properties:[
    {name:"equipmentType",size :size_card.TYPEOFTACHOGRAPHCARDID[0], type:"EquipmentType",properties:[]},
    {name:"CardStructureVersion",size: size_card.CARDSTRUCTUREVERSION[0], type:"OctetString",properties:[]},
    {name:"noOfEventsPerType",size :size_card.NOOFEVENTSPERTYPE[0], type:"Number",properties:[]},
    {name:"NoOfFaultsPerType",size :size_card.NOOFFAULTSPERTYPE[0], type:"Number",properties:[]},
    {name:"CardActivityLengthRange",size :size_card.ACTIVITYSTRUCTURELENGTH[0], type:"Number",properties:[]},
    {name:"NoOfCardVehicleRecords",size :size_card.NOOFCARDVEHICLERECORDS[0], type:"Number",properties:[]},
    {name:"NoOfCardPlaceRecords",size :size_card.NOOFCARDPLACERECORDS[0], type:"Number",properties:[]},
]};
TAG[0x0502]={block:"cardEventData",properties:[
    {name:"cardEventRecords",size :size_card.CARDEVENTRECORD[0], type:"Array",properties:[
        {name:"eventType",size :size_card.EVENTTYPE[0], type:"EventFaultType",properties:[]},
        {name:"eventBeginTime",size :size_card.EVENTBEGINTIME[0], type:"Date",properties:[]},
        {name:"eventEndTime",size :size_card.EVENTENDTIME[0], type:"Date",properties:[]},
        {name:"eventVehicleRegistration",size :size_card.EVENTVEHICLEREGISTRATION[0], type:"Object",properties:[
            {name:"vehicleRegistrationNation",size :size_card.VEHICLEREGISTRATIONNATION[0], type:"NationNumeric",properties:[]},
            {name:"vehicleRegistrationNumber",size :size_card.VEHICLEREGISTRATIONNUMBER[0], type:"String",properties:[]}
        ]},
    ]},

]};
TAG[0x0503]={block:"cardFaultData",properties:[
    {name:"cardFaultRecords",size: size_card.CARDFAULTRECORD[0], type:"Array",properties:[
        {name:"faultType",size :size_card.FAULTTYPE[0], type:"EventFaultType",properties:[]},
        {name:"faultBeginTime",size :size_card.FAULTBEGINTIME[0], type:"Date",properties:[]},
        {name:"faultEndTime",size :size_card.FAULTENDTIME[0], type:"Date",properties:[]},
        {name:"faultVehicleRegistration",size :size_card.FAULTVEHICLEREGISTRATION[0], type:"Object",properties:[
            {name:"vehicleRegistrationNation",size :size_card.VEHICLEREGISTRATIONNATION[0], type:"NationNumeric",properties:[]},
            {name:"vehicleRegistrationNumber",size :size_card.VEHICLEREGISTRATIONNUMBER[0], type:"String",properties:[]}
        ]},
    ]},

]};
TAG[0x504]={block:"CardDriverActivity",properties:[
    {name:"activityPointerOldestDayRecord",size: size_card.ACTIVITYPOINTEROLDESTADAYRECORD[0], type:"Number",properties: []},
    {name:"activityPointerNewestRecord",size: size_card.ACTIVITYPOINTERNEWESTRECORD[0], type:"Number",properties: []},
    {name:"activityDailyRecords",size :size_card.ACTIVITYDAILYRECORDS[0], type:"Activity",properties:[
        {name:"activityPreviousRecordLength",size :size_card.ACTIVITYPREVIUSRECORDLENGTH[0], type:"Number",properties:[]},
        {name:"activityRecordLength",size :size_card.ACTIVITYRECORDLENGTH[0], type:"Number",properties:[]},
        {name:"activityRecordDate",size :size_card.ACTIVITYRECORDDATE[0], type:"Date",properties:[]},
        {name:"activityDailyPresenceCounter",size :size_card.ACTIVITYDAILYPRESENCECOUNTER[0], type:"Number",properties:[]},
        {name:"activityDayDistance",size :size_card.ACTIVITYDAYDISTANCE[0], type:"Number",properties:[]},
        {name:"activityChangeInfo",size :size_card.ACTIVITYCHANGEINFO[0], type:"ActivityChangeInfo",properties:[]},
    ]},
]};
TAG[0x0505]={block:"cardVehiclesUsed",properties:[
    {name:"vehiclePointerNewestRecord",size :size_card.VEHICLEPOINTERNEWESTRECORD[0], type:"Number",properties:[]},
    {name:"cardVehicleRecords",size :size_card.CARDVEHICLERECORD[0], type:"Array",properties:[
            {name:"vehicleOdometerBegin",size :size_card.VEHICLEODOMETERBEGIN[0], type:"Number",properties:[]},
            {name:"vehicleOdometerEnd",size :size_card.VEHICLEODOMETEREND[0], type:"Number",properties:[]},
            {name:"vehicleFirstUse",size :size_card.VEHICLEFIRSTUSE[0], type:"Date",properties:[]},
            {name:"vehicleLastUse",size :size_card.VEHICLELASTUSE[0], type:"Date",properties:[]},
            {name:"vehicleRegistration",size :size_card.VEHICLEREGISTRATION[0], type:"Object",properties:[
                {name:"vehicleRegistrationNation",size :size_card.VEHICLEREGISTRATIONNATION[0], type:"NationNumeric",properties:[]},
                {name:"vehicleRegistrationNumber;",size :size_card.VEHICLEREGISTRATIONNUMBER[0], type:"String",properties:[]},
            ]},
            {name:"vuDataBlockCounter",size :size_card.VUDATABLOCKCOUNTER[0], type:"Number",properties:[]},
    ]},

]};
TAG[0x0506]={block:"cardPlaceDailyWorkPeriod",properties:[
    {name:"placePointerNewestRecord",size :size_card.PLACEPOINTERNEWESTRECORD[0], type:"Number",properties:[]},
    {name:"placeRecords",size :size_card.PLACERECORD[0], type:"Array",properties:[
            {name:"entryTime",size :size_card.ENTRYTIME[0], type:"Date",properties:[]},
            {name:"entryTypeDailyWorkPeriod",size :size_card.ENTRYTYPEDAILYWORKPERIOD[0], type:"EntryTypeDailyWorkPeriod",properties:[]},
            {name:"dailyWorkPeriodCountry",size :size_card.DAILYWORKPERIODCOUNTRY[0], type:"NationNumeric",properties:[]},
            {name:"dailyWorkPeriodRegion",size :size_card.DAILYWORKPERIODREGION[0], type:"RegionNumeric",properties:[]},
            {name:"vehicleOdometerValue",size :size_card.VEHICLEODOMETERVALUE[0], type:"Number",properties:[]},
    ]},
]};
TAG[0x0507]={block:"CardCurrentUse",properties:[
    {name:"sessionOpenTime",size :size_card.SESSIONOPENTIME[0], type:"Date",properties:[]},
    {name:"sessionOpenVehicle",size :size_card.SESSIONOPENVEHICLE[0], type:"Object",properties:[
        {name:"vehicleRegistrationNation",size :size_card.VEHICLEREGISTRATIONNATION[0], type:"NationNumeric",properties:[]},
        {name:"vehicleRegistrationNumber;",size :size_card.VEHICLEREGISTRATIONNUMBER[0], type:"String",properties:[]},
    ]},

]};
TAG[0x0508]={block:"CardControlActivityDataRecord",properties:[
    {name:"controlType",size :size_card.CONTROLTYPE[0], type:"ControlType",properties:[]},
    {name:"controlTime",size :size_card.CONTROLTIME[0], type:"Date",properties:[]},
    {name:"controlCardNumber",size :size_card.CONTROLCARDNUMBER[0], type:"Object",properties:[
        {name:"cardType",size :size_card.CARDTYPE[0], type:"EquipmentType",properties:[]},
        {name:"cardIssuingMemberState",size :size_card.CARDISSUINGMEMBERSTATE[0], type:"NationNumeric",properties:[]},
        {name:"cardNumber",size :size_card.CARDNUMBER[0], type:"Object",properties:[
            {name:"driverIdentification",size :size_card.DRIVERIDENTIFICATION[0], type:"String",properties:[]},
            {name:"drivercardReplacementIndex",size :size_card.DRIVERCARDREPLACEMENTINDEX[0], type:"String",properties:[]},
            {name:"drivercardRenewalIndex",size :size_card.DRIVERCARDRENEWALINDEX[0], type:"String",properties:[]},
        ]},
    ]},
    {name:"controlVehicleRegistration",size :size_card.VEHICLEREGISTRATION[0], type:"Object",properties:[
            {name:"vehicleRegistrationNation",size :size_card.VEHICLEREGISTRATIONNATION[0], type:"NationNumeric",properties:[]},
            {name:"vehicleRegistrationNumber;",size :size_card.VEHICLEREGISTRATIONNUMBER[0], type:"String",properties:[]},
    ]},
    {name:"controlDownloadPeriodBegin",size :size_card.CONTROLDOWNLOADPERIODBEGIN[0], type:"Date",properties:[]},
    {name:"controlDownloadPeriodEnd",size :size_card.CONTROLDOWNLOADPERIODEND[0], type:"Date",properties:[]},
]};
TAG[0x050e]={block:"NoOfCalibrationsSinceDownload",properties:[
    {name:"lastCardDownload",size :size_card.LASTCARDDOWNLOAD[0], type:"Date",properties:[]},
]};
TAG[0x0520]={block:"CardIdentification",properties:[
    {name:"cardIssuingMemberState",size :size_card.CARDISSUINGMEMBERSTATE[0], type:"NationNumeric",properties:[]},
    {name:"cardNumber",size :size_card.CARDNUMBER[0], type:"Object",properties:[
        {name:"driverIdentification",size :size_card.DRIVERIDENTIFICATION[0], type:"String",properties:[]},
        {name:"drivercardReplacementIndex",size :size_card.DRIVERCARDREPLACEMENTINDEX[0], type:"String",properties:[]},
        {name:"drivercardRenewalIndex",size :size_card.DRIVERCARDRENEWALINDEX[0], type:"String",properties:[]},
    ]},
    {name:"cardIssuingAuthorityName",size :size_card.CARDISSUINGAUTORITYNAME[0], type:"String",properties:[]},
    {name:"cardIssueDate",size :size_card.CARDISSUEDATE[0], type:"Date",properties:[]},
    {name:"cardValidityBegin",size :size_card.CARDVALIDITYBEGIN[0], type:"Date",properties:[]},
    {name:"cardExpiryDate",size :size_card.CARDEXPIRYDATE[0], type:"Date",properties:[]},
    {name:"driverCardHolderIdentification",size :size_card.DRIVERCARDHOLDERIDENTIFICATION[0], type:"Object",properties:[
        {name:"cardHolderName",size :size_card.CARDHOLDERNAME[0], type:"Object",properties:[
            {name:"holderSurname",size :size_card.HOLDERSURNAME[0], type:"String",properties:[]},
            {name:"holderFirstName",size :size_card.HOLDERFIRTSNAMES[0], type:"String",properties:[]},
        ]},
        {name:"cardHolderBirthDate",size :size_card.CARDHOLDERBIRTHDATE[0], type:"Date",properties:[]},
        {name:"cardHolderPreferredLanguage",size :size_card.CARDHOLDERPREFERREDLANGUAGE[0], type:"String",properties:[]},
    ]},
]};
TAG[0x0521]={block:"cardDrivingLicenceInformation",properties:[
    {name:"drivingLicenceIssuingAuthority",size :size_card.DRIVINGLICENCEISSUINGAUTHORITY[0], type:"String",properties:[]},
    {name:"drivingLicenceIssuingNation",size :size_card.DRIVINGLICENCEISSUINGNATION[0], type:"String",properties:[]},
    {name:"drivingLicenceNumber",size :size_card.DRIVINGLICENCENUMBER[0], type:"Date",properties:[]},
]};
TAG[0x0522]={block:"specificConditionRecord",properties:[
    {name:"entryTime",size :size_card.ENTRYTIME[0], type:"Date",properties:[]},
    {name:"specificConditionType",size :size_card.SPECIFICCIONDITIONTYPE[0], type:"String",properties:[]},

]};
TAG[0xc100]={block:"cardCertificate",properties:[
    {name:"certificate",size :size_card.CARDCERTIFICATE[0], type:"OctetString",properties:[]}
]};
TAG[0xc108]={block:"memberStateCertificate",properties:[
    {name:"certificate",size :size_card.MEMBERSTATECERTIFICATE[0], type:"OctetString",properties:[]}
]};
TAG[0X7601]={block:"resumen", properties:[
    {name:"memberStateCertificate",size :size_vu.MEMBERSTATECERTIFICATE, type:"OctetString",properties:[]},
    {name:"vuCertificate",size :size_vu.VUCERTIFICATE, type:"OctetString",properties:[]},
    {name:"vehicleIdentificationNumber",size :size_vu.VEHICLEIDENTIFICATIONNUMBER, type:"String",properties:[]},
    {name:"vehicleRegistrationIdentification",size :size_vu.VEHICLEREGISTRATIONIDENTIFICATION_TREP1, type:"Object",properties:[
        {name:"vehicleRegistrationNation",size :size_vu.VEHICLEREGISTRATIONNATION_TREP1, type:"NationNumeric",properties:[]},
        {name:"vehicleRegistrationNumber",size :size_vu.VEHICLEREGISTRATIONNUMBER_TREP1, type:"String",properties:[]}
    ]},
    {name:"currentDateTime",size :size_vu.CURRENTDATETIME, type:"Date",properties:[]},
    {name:"vuDownloablePeriod",size :size_vu.VUDOWNLOADABLEPERIOD, type:"Object",properties:[
        {name:"minDownloadbleTime",size :size_vu.MINDOWNLOADLETIME, type:"Date",properties:[]},
        {name:"maxDownloadbleTime",size :size_vu.MAXDOWNLOADLETIME, type:"Date",properties:[]}
    ]},
    {name:"cardSlotsStatus",size :size_vu.CARDSLOTSSTATUS, type:"EquipmentType",properties:[]},
    {name:"vuDownloadActivityData",size :size_vu.VUDOWNLOADACITIVITYDATA, type:"Object",properties:[
        {name:"downloadingTime",size :size_vu.DOWNLOADINGTIME, type:"Date",properties:[]},
        {name:"fullCardNumber",size :size_vu.FULLCARDNUMBER, type:"Object",properties:[
            {name:"driverIdentification",size :size_card.DRIVERIDENTIFICATION[0], type:"String",properties:[]},
            {name:"drivercardReplacementIndex",size :size_card.DRIVERCARDREPLACEMENTINDEX[0], type:"String",properties:[]},
            {name:"drivercardRenewalIndex",size :size_card.DRIVERCARDRENEWALINDEX[0], type:"String",properties:[]}
        ]},
        {name:"companyOrWorkshopName",size :size_vu.COMPANYORWORKSHOPNAME, type:"String",properties:[]},
    ]},
    {name:"vuCompanyLocksData",size :size_vu.VUCOMPANYLOCKSDATA, type:"Object",properties:[
        {name:"noOfLocks",size :size_vu.NOOFLOCKS, type:"Number",properties:[]},
        {name:"vuCompanyLocksRecord",size :size_vu.VUCOMPANYLOCKSRECORD, type:"Array",properties:[
            {name:"lockInTime",size :size_vu.LOCKINTITME, type:"Date",properties:[]},
            {name:"lockOutTime",size :size_vu.LOCKOUTTIME, type:"Date",properties:[]},
            {name:"companyName",size :size_vu.COMPANYNAME, type:"String",properties:[]},
            {name:"companyAddress",size :size_vu.COMPANYADDRESS, type:"String",properties:[]},
            {name:"companyCardNumber",size :size_vu.COMPANYCARDNUMBER, type:"Object",properties:[
                {name:"cardType",size :size_card.CARDTYPE[0], type:"EquipmentType",properties:[]},
                {name:"cardIssuingMemberState",size :size_card.CARDISSUINGMEMBERSTATE_CONTROL[0], type:"NationNumeric",properties:[]},
                {name:"ownerIdentification",size :size_card.OWNERIDENTIFICATION[0], type:"String",properties:[]},
                {name:"cardConsecutiveIndex",size :size_card.CARDCONSECUTIVEINDEX[0], type:"String",properties:[]},
                {name:"cardReplacementIndex",size :size_card.CARDREPLACEMENTINDEX[0], type:"String",properties:[]},
                {name:"cardRenewalIndex",size :size_card.CARDRENEWALINDEX[0], type:"String",properties:[]},
            ]}
        ]},
    ]},
    {name:"vuControlActivityData",size :size_vu.VUCONTROLACTIVITYDATA, type:"Object",properties:[
        {name:"noOfControls",size :size_vu.NOOFCONTROLS, type:"Number",properties:[]},
        {name:"vuConrolActivityRecord",size :size_vu.VUCONTROLACTIVITYRECORD, type:"Array",properties:[
            {name:"controlType",size :size_vu.CONTROLTYPE, type:"ControlType",properties:[]},
            {name:"controlTime",size :size_vu.CONTROLTIME, type:"Date",properties:[]},
            {name:"controlCardNumber",size :size_vu.CONTROLCARDNUMBER, type:"Object",properties:[
                {name:"cardType",size :size_card.CARDTYPE[0], type:"EquipmentType",properties:[]},
                {name:"cardIssuingMemberState",size :size_card.CARDISSUINGMEMBERSTATE_CONTROL[0], type:"NationNumeric",properties:[]},
                {name:"ownerIdentification",size :size_card.OWNERIDENTIFICATION[0], type:"String",properties:[]},
                {name:"cardConsecutiveIndex",size :size_card.CARDCONSECUTIVEINDEX[0], type:"String",properties:[]},
                {name:"cardReplacementIndex",size :size_card.CARDREPLACEMENTINDEX[0], type:"String",properties:[]},
                {name:"cardRenewalIndex",size :size_card.CARDRENEWALINDEX[0], type:"String",properties:[]},
            ]},
            {name:"downloadPeriodBeginTime",size :size_vu.DOWNLOADPERIODBEGINTIME, type:"Date",properties:[]},
            {name:"downloadPeriodEndTime",size :size_vu.DOWNLOADPERIODENDTIME, type:"Date",properties:[]}
        ]},
    ]},
    {name:"signature",size :size_vu.SIGNATURE_TREP1, type:"OctetString",properties:[]},
    {name:"size",size : 0, type:"size",properties:[]}

]};
TAG[0X7602]= {
    block: "activity", properties: [
        {name: "timeReal", size: size_vu.TIMEREAL, type: "Date", properties: []},
        {name: "odometerValueMindnight", size: size_vu.ODOMETERVALUEMINDNIGHT, type: "Number", properties: []},
        {name: "vuCardIwData", size: size_vu.VUCARDWDATA, type: "Object", properties: [
            {name: "noOfVuCardIwRecords", size: size_vu.NOOFVUCARDIWRECORDS, type: "Number", properties: []},
            {name: "vuCardIwRecord", size: size_vu.VUCARDIWRECORD, type: "Array", properties: [
                {name: "cardHolderName", size: size_vu.CARDHOLDERNAME, type: "Object", properties: [
                    {name: "holderSurname", size: size_vu.HOLDERSURNAME, type: "String", properties: []},
                    {name: "holderFirstNames", size: size_vu.HOLDERFIRSTNAMES, type: "String", properties: []}
                ]},
                {name: "fullCardNumber", size: size_vu.FULLCARDNUMBER, type: "Object", properties: [
                    {name:"cardType",size :size_card.CARDTYPE[0], type:"EquipmentType",properties:[]},
                    {name:"cardIssuingMemberState",size :size_card.CARDISSUINGAUTORITYNAME[0], type:"NationNumeric",properties:[]},
                    {name:"driverIdentification",size :size_card.DRIVERIDENTIFICATION[0], type:"String",properties:[]},
                    {name:"driverCardReplacementIndex",size :size_card.DRIVERCARDREPLACEMENTINDEX[0], type:"String",properties:[]},
                    {name:"driverCardRenewalIndex",size :size_card.DRIVERCARDRENEWALINDEX[0], type:"String",properties:[]},
                ]},
                {name: "cardExpirytDate", size: size_vu.CARDEXPIRYTDATE, type: "Date", properties: []},
                {name: "cardInsertionTime", size: size_vu.CARDINSERTIONTIME, type: "Date", properties: []},
                {name: "vehicleOdometerValueAtInsertion", size: size_vu.VEHICLEODOMETERVALUEATINSERTION, type: "Number",properties: []},
                {name: "cardSlotNumber", size: size_vu.CARDSLOTNUMBER, type: "Number", properties: []},
                {name: "cardWithDrawalTime", size: size_vu.CARDWITHDRAWALTIME_VUCARDWDATA, type: "Date", properties: []},
                {name: "vehicleOdometerValueAtWithDrawal", size: size_vu.VEHICLEODOMETERVALUEATWITHDRAWAL, type: "Number",properties: [
                        {name: "vehicleRegistrationIdentification", size: size_vu.VEHICLEREGISTRATIONIDENTIFICATION_TREP2, type: "Object",properties: [
                                {name: "vehicleRegistrationNumber", size: size_vu.VEHICLEREGISTRATIONNUMBER_TREP5, type: "String",properties: []},
                                {name: "cardWithDrawalTime", size: size_vu.CARDWITHDRAWALTIME_VUCARDWDATA, type: "Date",properties: []},
                            ]},

                    ]},
                {name: "manualInputFlag", size: size_vu.MANUALINPUTFLAG, type: "ManualInputFlag", properties: []},
            ]},
        ]},
        {name: "vuActivityDailyData", size: size_vu.VUACTIVITYDAILYDATA, type: "Object", properties: [
            {name: "noOfActivityChanges", size: size_vu.NOOFACTIVITYCHANGES, type: "Number", properties: []},
            {name: "activityChangeInfo", size: size_vu.ACTIVITYCHANGEINFO, type: "ActivityChangeInfo", properties: []},
        ]},
        {name: "vuPlaceDailyWorkPeriodData", size: size_vu.VUPLACEDAILYWORKPERIODDATA, type: "Object", properties: [
            {name: "noOfPlaceRecords", size: size_vu.NOOFPLACERECORDS, type: "Number", properties: []},
            {name: "vuPlaceDailyWorkerPeriodRecord",size: size_vu.VUPLACEDAILYWORKPERIODRECORD, type: "Array",properties: [
                    {name: "fullCardNumber", size: size_vu.FULLCARDNUMBER_TREP2, type: "Object", properties: [
                        {name:"cardType",size :size_card.CARDTYPE[0], type:"EquipmentType",properties:[]},
                        {name:"cardIssuingMemberState",size :size_card.CARDISSUINGAUTORITYNAME[0], type:"NationNumeric",properties:[]},
                        {name:"driverIdentification",size :size_card.DRIVERIDENTIFICATION[0], type:"String",properties:[]},
                        {name:"driverCardReplacementIndex",size :size_card.DRIVERCARDREPLACEMENTINDEX[0], type:"String",properties:[]},
                        {name:"driverCardRenewalIndex",size :size_card.DRIVERCARDRENEWALINDEX[0], type:"String",properties:[]},
                    ]},
                    {name: "placeRecord", size: size_vu.PLACERECORD, type: "Object", properties: [
                        {name: "entryTime", size: size_vu.ENTRYTIME_PLACERECORD, type: "Date", properties: []},
                        {name: "entryTypeDailyWorkPeriod", size: size_vu.ENTRYTYPEDAILYWORKPERIOD, type: "EntryTypeDailyWorkPeriod", properties: []},
                        {name: "dailyWorkPeriodCountry", size: size_vu.DAILYWORKPERIODCOUNTRY, type: "NationNumeric", properties: []},
                        {name: "dailyWorkPeriodRegion", size: size_vu.DAILYWORKPERIODREGION, type: "RegionNumeric", properties: []},
                        {name: "vehicleOdometerValue", size: size_vu.VEHICLEODOMETERVALUE, type: "Number", properties: []},
                    ]},

                ]},
        ]},
        {name: "vuSpecificConditionData", size: size_vu.VUSPECIFICCONDITIONDATA, type: "Object", properties: [
            {name: "noOfSpecificConditionsRecords", size: size_vu.NOOFSPECIFICCONDITIONSRECORDS, type: "Number", properties: []},
            {name: "specificConditionRecord", size: size_vu.SPECIFICCONDITIONRECORD, type: "Array", properties: [
                {name: "entryTime", size: size_vu.ENTRYTIME_PLACERECORD, type: "Date", properties: []},
                {name: "specificConditionType", size: size_vu.SPECIFICCONDITIONTYPE, type: "SpecificConditionType", properties: []},
            ]},
        ]},
        {name: "signature", size: size_vu.SIGNATURE_TREP2, type: "OctetString", properties: []},
        {name: "size", size: 0, type: "size", properties: []},
    ]
};
TAG[0X7603]={block:"eventsFaults", properties:[
    {name:"vuFaultData",size :size_vu.VUFAULTDATA, type:"Object",properties:[
        {name:"noOfVuFaults",size :size_vu.NOOFVUFAULTS, type:"Number",properties:[]},
        {name:"vuFaultRecord",size :size_vu.VUFAULTRECORD, type:"Array",properties:[
            {name:"vufaultType",size :size_vu.FAULTTYPE, type:"EventFaultType",properties:[]},
            {name:"faultRecordPurpose",size :size_vu.FAULTRECORDPURPOSE, type:"EventFaultRecordPurpose",properties:[]},
            {name:"faultBeginTime",size :size_vu.FAULTBEGINTIME, type:"Date",properties:[]},
            {name:"faultEndTime",size :size_vu.FAULTENDTIME, type:"Date",properties:[]},
            {name:"cardNumberDriverSlotBegin",size :size_vu.CARDNUMBERCODRIVERSLOTBEGIN_FAULT, type:"Object",properties:[
                {name:"cardType",size :size_card.CARDTYPE[0], type:"Date",properties:[]},
                {name:"cardIssuingMemberState",size :size_card.CARDISSUINGAUTORITYNAME[0], type:"NationNumeric",properties:[]},
                {name:"driverIdentification",size :size_card.DRIVERIDENTIFICATION[0], type:"String",properties:[]},
                {name:"driverCardReplacementIndex",size :size_card.DRIVERCARDREPLACEMENTINDEX[0], type:"String",properties:[]},
                {name:"driverCardRenewalIndex",size :size_card.DRIVERCARDRENEWALINDEX[0], type:"String",properties:[]},
            ]},
            {name:"cardNumberCoDriverSloBegin",size :size_vu.CARDNUMBERCODRIVERSLOTBEGIN_FAULT, type:"Object",properties:[
                {name:"cardType",size :size_card.CARDTYPE[0], type:"Date",properties:[]},
                {name:"cardIssuingMemberState",size :size_card.CARDISSUINGAUTORITYNAME[0], type:"NationNumeric",properties:[]},
                {name:"driverIdentification",size :size_card.DRIVERIDENTIFICATION[0], type:"String",properties:[]},
                {name:"driverCardReplacementIndex",size :size_card.DRIVERCARDREPLACEMENTINDEX[0], type:"String",properties:[]},
                {name:"driverCardRenewalIndex",size :size_card.DRIVERCARDRENEWALINDEX[0], type:"String",properties:[]},
            ]},
            {name:"cardNumberDriverSlotEnd",size :size_vu.CARDNUMBERDRIVERSLOTEND_FAULT, type:"Object",properties:[
                {name:"cardType",size :size_card.CARDTYPE[0], type:"Date",properties:[]},
                {name:"cardIssuingMemberState",size :size_card.CARDISSUINGAUTORITYNAME[0], type:"NationNumeric",properties:[]},
                {name:"driverIdentification",size :size_card.DRIVERIDENTIFICATION[0], type:"String",properties:[]},
                {name:"driverCardReplacementIndex",size :size_card.DRIVERCARDREPLACEMENTINDEX[0], type:"String",properties:[]},
                {name:"driverCardRenewalIndex",size :size_card.DRIVERCARDRENEWALINDEX[0], type:"String",properties:[]},
            ]},
            {name:"cardNumberCoDriverSloEnd",size :size_vu.CARDNUMBERCODRIVERSLOTEND_FAULT, type:"Object",properties:[
                {name:"cardType",size :size_card.CARDTYPE[0], type:"Date",properties:[]},
                {name:"cardIssuingMemberState",size :size_card.CARDISSUINGAUTORITYNAME[0], type:"NationNumeric",properties:[]},
                {name:"driverIdentification",size :size_card.DRIVERIDENTIFICATION[0], type:"String",properties:[]},
                {name:"driverCardReplacementIndex",size :size_card.DRIVERCARDREPLACEMENTINDEX[0], type:"String",properties:[]},
                {name:"driverCardRenewalIndex",size :size_card.DRIVERCARDRENEWALINDEX[0], type:"String",properties:[]},
            ]}
        ]},
    ]},
    {name:"vuEventData",size :size_vu.VUEVENTDATA, type:"Object",properties:[
        {name:"noOfVuEvents",size :size_vu.NOOFVUEVENTS, type:"Number",properties:[]},
        {name:"vuEventRecord",size :size_vu.VUEVENTRECORD, type:"Array",properties:[
            {name:"vueventType",size :size_vu.EVENTTYPE, type:"EventFaultType",properties:[]},
            {name:"eventRecordPurpose",size :size_vu.EVENTRECORDPURPOSE, type:"EventFaultRecordPurpose",properties:[]},
            {name:"eventBeginTime",size :size_vu.EVENTBEGINTIME, type:"Date",properties:[]},
            {name:"eventEndTime",size :size_vu.EVENTENDTIME, type:"Date",properties:[]},
            {name:"cardNumberDriverSlotBegin",size :size_vu.CARDNUMBERDRIVERSLOTBEGIN_EVENT, type:"Object",properties:[
                {name:"cardType",size :size_card.CARDTYPE[0], type:"Date",properties:[]},
                {name:"cardIssuingMemberState",size :size_card.CARDISSUINGAUTORITYNAME[0], type:"NationNumeric",properties:[]},
                {name:"driverIdentification",size :size_card.DRIVERIDENTIFICATION[0], type:"String",properties:[]},
                {name:"driverCardReplacementIndex",size :size_card.DRIVERCARDREPLACEMENTINDEX[0], type:"String",properties:[]},
                {name:"driverCardRenewalIndex",size :size_card.DRIVERCARDRENEWALINDEX[0], type:"String",properties:[]},
            ]},
            {name:"cardNumberCoDriverSlotBegin",size :size_vu.CARDNUMBERCODRIVERSLOTBEGIN_EVENT, type:"Object",properties:[
                {name:"cardType",size :size_card.CARDTYPE[0], type:"Date",properties:[]},
                {name:"cardIssuingMemberState",size :size_card.CARDISSUINGAUTORITYNAME[0], type:"NationNumeric",properties:[]},
                {name:"driverIdentification",size :size_card.DRIVERIDENTIFICATION[0], type:"String",properties:[]},
                {name:"driverCardReplacementIndex",size :size_card.DRIVERCARDREPLACEMENTINDEX[0], type:"String",properties:[]},
                {name:"driverCardRenewalIndex",size :size_card.DRIVERCARDRENEWALINDEX[0], type:"String",properties:[]},
            ]},
            {name:"cardNumberDriverSlotEnd",size :size_vu.CARDNUMBERDRIVERSLOTEND_EVENT, type:"Object",properties:[
                {name:"cardType",size :size_card.CARDTYPE[0], type:"Date",properties:[]},
                {name:"cardIssuingMemberState",size :size_card.CARDISSUINGAUTORITYNAME[0], type:"NationNumeric",properties:[]},
                {name:"driverIdentification",size :size_card.DRIVERIDENTIFICATION[0], type:"String",properties:[]},
                {name:"driverCardReplacementIndex",size :size_card.DRIVERCARDREPLACEMENTINDEX[0], type:"String",properties:[]},
                {name:"driverCardRenewalIndex",size :size_card.DRIVERCARDRENEWALINDEX[0], type:"String",properties:[]},
            ]},
            {name:"cardNumberCoDriverSlotEnd",size :size_vu.CARDNUMBERCODRIVERSLOTEND_EVENTDRIVER, type:"Object",properties:[
                {name:"cardType",size :size_card.CARDTYPE[0], type:"Date",properties:[]},
                {name:"cardIssuingMemberState",size :size_card.CARDISSUINGAUTORITYNAME[0], type:"NationNumeric",properties:[]},
                {name:"driverIdentification",size :size_card.DRIVERIDENTIFICATION[0], type:"String",properties:[]},
                {name:"driverCardReplacementIndex",size :size_card.DRIVERCARDREPLACEMENTINDEX[0], type:"String",properties:[]},
                {name:"driverCardRenewalIndex",size :size_card.DRIVERCARDRENEWALINDEX[0], type:"String",properties:[]},
            ]}
        ]},
    ]},
    {name:"vuOverSpeedingControlData",size :size_vu.VUOVERSPEEDINGCONTROLDATA, type:"Object",properties:[
        {name:"lastOverSpeedControlTime",size :size_vu.LASTOVERSPEEDCONTROLTIME, type:"Date",properties:[]},
        {name:"firstOverSpeedSince",size :size_vu.FIRSTOVERSPEEDSINCE, type:"Date",properties:[]},
        {name:"numberOfOverSpeedSince",size :size_vu.NUMBEROFOVERSPEEDSINCE, type:"Number",properties:[]}
    ]},
    {name:"vuOverSpeedingEventData",size :size_vu.VUOVERSPEEDINGEVENTDATA, type:"Object",properties:[
        {name:"noOfVuOverSpeedingEvents",size :size_vu.NOOFVUOVERSPEEDINGEVENTS, type:"Number",properties:[]},
        {name:"vuOverSpeedingEventRecord",size :size_vu.VUOVERSPEEDINGEVENTRECORD, type:"Array",properties:[
            {name:"eventType",size :size_vu.EVENTTYPE_VUOVERSPEED, type:"EventFaultType",properties:[]},
            {name:"eventRecordPurpose",size :size_vu.EVENTRECORDPURPOSE_VUOVERSPEED, type:"EventFaultRecordPurpose",properties:[]},
            {name:"eventBeginTime",size :size_vu.EVENTBEGINTIME_VUOVERSPEED, type:"Date",properties:[]},
            {name:"eventEndTime",size :size_vu.EVENTENDTIME_VUOVERSPEED, type:"Date",properties:[]},
            {name:"maxSpeedValue",size :size_vu.MAXSPEEDVALUE, type:"Number",properties:[]},
            {name:"avarageSpeedValue",size :size_vu.AVARAGESPEEDVALUE, type:"Number",properties:[]},
            {name:"cardNubmerDriverSlotBegin",size :size_vu.CARDNUMBERDRIVERSLOTBEGIN_VUOVERSPEED, type:"Object",properties:[
                {name:"cardType",size :size_card.CARDTYPE[0], type:"Date",properties:[]},
                {name:"cardIssuingMemberState",size :size_card.CARDISSUINGAUTORITYNAME[0], type:"NationNumeric",properties:[]},
                {name:"driverIdentification",size :size_card.DRIVERIDENTIFICATION[0], type:"String",properties:[]},
                {name:"driverCardReplacementIndex",size :size_card.DRIVERCARDREPLACEMENTINDEX[0], type:"String",properties:[]},
                {name:"driverCardRenewalIndex",size :size_card.DRIVERCARDRENEWALINDEX[0], type:"String",properties:[]},
            ]},
            {name:"similarEventsNumber",size :size_vu.SIMILAREVENTSNUMBER, type:"Number",properties:[]}
        ]},
    ]},
    {name:"vuTimeAdjustmentData",size :size_vu.VUTIMEADJUSTMENTDATA, type:"Object",properties:[
        {name:"noOfVuTimejustmentRecord",size :size_vu.NOOFVUTIMEADJUSTMENTRECORDS, type:"Number",properties:[]},
        {name:"vuTimeAdjustmentRecord",size :size_vu.VUTIMEADJUSTMENTRECORD, type:"Array",properties:[
            {name:"oldTimeValue",size :size_vu.OLDTIMEVALUE_VUTIMEADJUSTMENTDATA, type:"Date",properties:[]},
            {name:"newTimeValue",size :size_vu.NEWTIMEVALUE_VUTIMEADJUSTMENTDATA, type:"Date",properties:[]},
            {name:"workshopName",size :size_vu.WORKSHOPNAME_VUTIMEADJUSTMENTADATA, type:"String",properties:[]},
            {name:"workshopAddress",size :size_vu.WORKSHOPADDRESS_VUTIMEADJUSTMENTADATA, type:"String",properties:[]},
            {name:"workshopNumber",size :size_vu.WORKSHOPCARDNUMBER_VUTIMEADJUSTMENTADATA, type:"String",properties:[]}

        ]},
    ]},
    {name:"signature",size :size_vu.SIGNATURE_TREP3, type:"OctetString",properties:[]},
    {name:"size",size : 0, type:"size",properties:[]},
]};
TAG[0X7604]={block:"speed",properties:[
    {name:"vuDetailedSpeedData",size :size_vu.VUDETAILEDSPEEDDATA, type:"Object",properties:[
        {name:"noOfSpeedBlocks",size :size_vu.NOOFSPEEDBLOCKS, type:"Number",properties:[]},
        {name:"vuDetailedSpeedBlock",size :size_vu.VUDETAILEDSPEEDBLOCK, type:"Array",properties:[
            {name:"speedBlockBeginDate",size :size_vu.SPEEDBLOCKBEGINDATE, type:"Date",properties:[]},
            {name:"speedPerSecond",size :size_vu.SPEEDPERSECOND, type:"Number",properties:[]},
        ]},
    ]},
    {name:"signature",size :size_vu.SIGNATURE_TREP4, type:"OctetString",properties:[]},
    {name:"size",size :0, type:"size",properties:[]},
]};
TAG[0X7605]={block:"technical",properties:[
    {name:"vuIdentification",size :size_vu.VUIDENTIFICATION, type:"Object",properties:[
        {name:"vuManufacturerName",size :size_vu.VUMANUFACTURERNAME, type:"String",properties:[]},
        {name:"vuManufacturerAddress",size :size_vu.VUMANUFACTURERADDRESS, type:"String",properties:[]},
        {name:"vuPartNumber",size :size_vu.VUPARTNUMBER, type:"String",properties:[]},
        {name:"vuSerialNumber",size :size_vu.VUSERIALNUMBER, type:"Object",properties:[
            {name:"serialNumber",size :size_vu.SERIALNUMBER, type:"Number",properties:[]},
            {name:"monthYear",size :size_vu.MONTHYEAR, type:"BCDString",properties:[]},
            {name:"type",size :size_vu.TYPE, type:"Number",properties:[]},
            {name:"manufacturerCode",size :size_vu.MANUFACTURERCODE, type:"Number",properties:[]},
        ]},
        {name:"vuSoftwareIdentification",size :size_vu.VUSOFTWAREIDENTIFICATION, type:"Object",properties:[
            {name:"vuSoftwareVersion",size :size_vu.VUSOFTWAREVERSION, type:"String",properties:[]},
            {name:"vuSoftwareInstallationDate",size :size_vu.VUSOFTWAREINSTALLATIONDATE, type:"Date",properties:[]}
        ]},
        {name:"vuManufaturingDate",size :size_vu.VUMANUFATURINGDATE, type:"Date",properties:[]},
        {name:"vuAprovalNumber",size :size_vu.VUAPPROVALNUMBER, type:"String",properties:[]},
    ]},
    {name:"sensorPaired",size :size_vu.SENSORPAIRED, type:"Object",properties:[
        {name:"sensorSerialNumber",size :size_vu.SENSORSERIALNUMBER, type:"Object",properties:[
            {name:"serialNumber",size :size_vu.SERIALNUMBER, type:"Number",properties:[]},
            {name:"monthYear",size :size_vu.MONTHYEAR, type:"BCDString",properties:[]},
            {name:"type",size :size_vu.TYPE, type:"Number",properties:[]},
            {name:"manufacturerCode",size :size_vu.MANUFACTURERCODE, type:"Number",properties:[]},
        ]},
        {name:"sensorApprovalNumber",size :size_vu.SENSORAPPROVALNUMBER, type:"String",properties:[]},
        {name:"sensorPairingDateFirst",size :size_vu.SENSORPAIRINGDATEFIRST, type:"Date",properties:[]},
    ]},
    {name:"vuCalibrationData",size :size_vu.VUCALIBRATIONDATA, type:"Object",properties:[
        {name:"noOfVuCalibrationRecords",size :size_vu.NOOFVUCALIBRATIONRECORDS, type:"Number",properties:[]},
        {name:"vuCalibrationRecord",size :size_vu.VUCALIBRATIONRECORD, type:"Array",properties:[
            {name:"calibrationPurpose",size :size_vu.CALIBRATIONPURPOSE, type:"CalibrationPurpose",properties:[]},
            {name:"workshopName",size :size_vu.WORKSHOPNAME_VUCALIBRATIONDATA, type:"String",properties:[]},
            {name:"workshopAddress",size :size_vu.WORKSHOPADDRESS_VUCALIBRATIONDATA, type:"String",properties:[]},
            {name:"workshopCardNumber",size :size_vu.WORKSHOPCARDNUMBER_VUCALIBRATIONDATA, type:"Object",properties:[
                {name:"cardType",size :size_card.CARDTYPE[0], type:"String",properties:[]},
                {name:"cardIssuingMemberState",size :size_card.CARDISSUINGMEMBERSTATE[0], type:"NationNumeric",properties:[]},
                {name:"ownerIdentification",size :size_card.OWNERIDENTIFICATION[0], type:"String",properties:[]},
                {name:"cardConsecutiveIndex",size :size_card.CARDCONSECUTIVEINDEX[0], type:"String",properties:[]},
                {name:"cardReplacementIndex",size :size_card.CARDREPLACEMENTINDEX[0], type:"String",properties:[]},
                {name:"cardRenewalIndex",size :size_card.CARDRENEWALINDEX[0], type:"String",properties:[]},
            ]},
            {name:"workshopCardExpiryDate",size :size_vu.WORKSHOPCARDNUMBER_VUCALIBRATIONDATA, type:"Date",properties:[]},
            {name:"vehicleIdentificationNumber",size :size_vu.VEHICLEINDENTIFICATIONNUMBER, type:"String",properties:[]},
            {name:"vehicleRegistrationIdentification",size :size_vu.VEHICLEREGISTRATIONIDENTIFICATION_TREP5, type:"Object",properties:[
                {name:"vehicleRegistrationNation",size :size_vu.VEHICLEREGISTRATIONNATION_TREP5, type:"NationNumeric",properties:[]},
                {name:"vehicleRegistrationNumber",size :size_vu.VEHICLEREGISTRATIONNUMBER_TREP5, type:"String",properties:[]},
            ]},
            {name:"wVehicleCharacteristicConstant",size :size_vu.WVEHICLECHARACTERISTICCONSTANT, type:"Number",properties:[]},
            {name:"kConstantOfRecordIngequipment",size :size_vu.KCONSTANTOFRECORDINGEQUIPMENT, type:"Number",properties:[]},
            {name:"lTyreCircumference",size :size_vu.LTYRECIRCUMFERENCE, type:"Number",properties:[]},
            {name:"tyreSize",size :size_vu.TYRESIZE, type:"String",properties:[]},
            {name:"authorisedSpeed",size :size_vu.AUTHORISEDSPEED, type:"Number",properties:[]},
            {name:"oldOdometerValue",size :size_vu.OLDODOMETERVALUE, type:"Number",properties:[]},
            {name:"newOdometerValue",size :size_vu.NEWODOMETERVALUE, type:"Number",properties:[]},
            {name:"OldTimeValue",size :size_vu.OLDTIMEVALUE_VUCALIBRATIONDATA, type:"Date",properties:[]},
            {name:"newTimeValue",size :size_vu.NEWTIMEVALUE, type:"Date",properties:[]},
            {name:"nextCalibrationDate",size :size_vu.NEXTCALIBRATIONDATE, type:"Date",properties:[]},


        ]},
    ]},
    {name:"signature",size :size_vu.SIGNATURE_TREP5, type:"OctetString",properties:[]},
    {name:"size",size : 0, type:"size",properties:[]},
]};



function propertiesArray(buffer,start,size,end,properties,array,sizeBlock){
    var array=[];
    if(end>start){
        switch (properties[0].name){
            case "eventType":
                array=eventArray(buffer,start,size,end-48,properties,array,sizeBlock);
                break;
            case "faultType":
                array=faultArray(buffer,start,size,end-48,properties,array,sizeBlock);
                break;
            default:
                array=normalArray(buffer,start,size,end-size,properties,array,sizeBlock);
                break
        }
    }
    return array

}
function normalArray(buffer,start,size,end,properties,array,sizeBlock){
    var obj=blockProperties(properties,0,buffer,start,{},sizeBlock);
    if(!isDefault(buffer,start,start+size))
        array.push(blockProperties(properties,0,buffer,start,{},sizeBlock));
    return start>=end?
        array:
        normalArray(buffer,start+size,size,end,properties,array,sizeBlock)

}
function eventArray(buffer,start,size,end,properties,array,sizeBlock){

    var obj=blockProperties(properties,0,buffer,start,{},sizeBlock);
    if (obj.eventType!="No hay más información")
        array.push(blockProperties(properties,0,buffer,start,{},sizeBlock));

    return start>end?
        array:
        eventArray(buffer,start+size,size,end,properties,array,sizeBlock)
}
function faultArray(buffer,start,size,end,properties,array,sizeBlock){
    var obj=blockProperties(properties,0,buffer,start,{},sizeBlock);
    if (obj.faultType!="No hay más información")
        array.push(blockProperties(properties,0,buffer,start,{},sizeBlock));

    return start>end?
        array:
        faultArray(buffer,start+size,size,end,properties,array,sizeBlock)
}
function isDefault(buffer,i,end){
    return (i>end-1)?true:
        (buffer[i]!=0 || buffer[i]!=0x20)?false:
            isDefault(buffer,i+1,end)
}
function bytestoDate(buffer,start,size){
    var n;
    n=bytestoNumber(buffer,start,size)*1000;
    return new Date(n)
}
function bytestoString(buffer,start,size){
    function mapCharacters(buffer,i,end,array){
                if(buffer[i]>31)
                    array.push(buffer[i]);
                return (i>end-2)?array:
                    mapCharacters(buffer,i+1,end,array)
    }
    var str=mapCharacters(buffer,start,start+size,[]);
    return String.fromCharCode.apply(null, str).trim()
}
function bytestoNumber (array, i, size) {
    var end=i+size;
    switch (size){
        case 1:
            var result = (array[end - 1]);
            break;
        case 2:
            var result = ((array[end - 1]) |
            (array[end - 2] << 8) );
            break;
        case 3:
            var result = ((array[end - 1]) |
            (array[end - 2] << 8) |
            (array[end - 3] << 16));
            break;
        case 4:
            var result = ((array[end - 1]) |
            (array[end - 2] << 8) |
            (array[end - 3] << 16) |
            (array[end - 4] << 24));
            break
    }

    return result;
}
function BCDtoString(buffer,start,size){
    var str ="";
    for (var i=start;i<start+size;i++){
        // elimino 4 ultimos bits
        var high = (buffer[i] & 0xf0);
        // desplazo los 4 bits hacia la derecha
        high >>>=  4;
        // pongo a cero los cuatro primeros bits
        high =  (high & 0x0f);
        // elimino los 4 primeros bits
        var low =  (buffer[i] & 0x0f);
        str+=high.toString()+low.toString()
    }

    return str;
}
function OctetString(buffer,start,size){
    var str ="";
    for (var i=start;i<start+size;i++){
        str+=("0"+buffer[i].toString(16)).slice(-2)+" "
    }

    return str.trim();
}
function ManufactureCode(buffer,start,size){
    var str;
    switch (buffer[start]) {
        case 0x00:
            str="No information available";
            break;
        case 0x01:
             str="Reserved value";
            break;
        case 0x10:
            str= "Actia S.A.";
            break;
        case 0x12:
            str= "Austria Card Plastikkarten und Ausweissysteme GmbH";
            break;
        case 0x13:
            str= "Agencija za komercijalnu djelatnost d.o.o (AKD)";
            break;
        case 0x20:
            str= "CETIS d.d.";
            break;
        case 0x21:
            str= "certSIGN";
            break;
        case 0x22:
            str= "RUE Cryptotech";
            break;
        case 0x30:
            str= "Sdu Identification B.V. (formerly Ensched�/Sdu B.V.)";
            break;
        case 0x32:
            str= "EFKON AG.";
            break;
        case 0x38:
            str= "Fabrica Nacional de Moneda y Timbre";
            break;
        case 0x40:
            str= "Giesecke & Devrient GmbH";
            break;
        case 0x43:
            str= "Giesecke & Devrient GB Ltd.";
            break;
        case 0x44:
            str= "Giesecke & Devrient sa/nv";
            break;
        case 0x48:
            str= "Hungarian Banknote Printing Co. Ltd.";
            break;
        case 0x50:
            str= "Imprimerie Nationale";
            break;
        case 0x51:
            str= "Imprensa Nacional-Casa da Moeda, SA";
            break;
        case 0x52:
            str= "InfoCamere S.C.p.A";
            break;
        case 0x81:
            str= "Morpho e-documents  (formerly Sagem Orga and before that ORGA Kartensysteme GmbH)";
            break;
        case 0x82:
            str= "ORGA Zelenograd ZAO";
            break;
        case 0x88:
            str= "Asseco Czech Republic a.s. (formerly PVT a.s.)";
            break;
        case 0x89:
            str= "Polska Wytw�rnia Papier�w Wartosciowych S.A. - PWPW S.A.";
            break;
        case 0xA1:
            str= "Continental Automotive GmbH (formerly Siemens AG - Siemens VDO Automotive)";
            break;
        case 0xA2:
            str= "Stoneridge Electronics AB";
            break;
        case 0xA3:
            str= "Gemalto  (formerly Schlumberger SEMA, Axalto and before that)";
            break;
        case 0xA4:
            str= "3M Security Printing and Systems Ltd.";
            break;
        case 0xD8:
            str= "Union of Chambers and Commodity Exchanges of Turkey - TOBB";
            break;
        case 0xAB:
            str= "T-Systems International GmbH";
            break;
        case 0xAC:
            str= "Tr�b AG";
            break;
        case 0xAD:
            str= "Tr�b Baltic AS";
            break;
        case 0xAE:
            str= "TEMPEST a.s.";
            break;
        case 0xAF:
            str= "Trueb - DEMAX PLC";
            break;
        default:
            str="Unknown Manufacturer %s or equipment not type approved "+buffer[start];
            break
    }

    return str

}
function EquipmentType(buffer,start,size){
    var str;
    switch(buffer[start]){
        case 0 :
            str = "Reserved(0)";
            break;
        case 1:
            str = "Driver Card (1)";
            break;
        case 2:
            str = "Workshop Card(2)";
            break;
        case 3:
            str = "Control Card(3)";
            break;
        case 4:
            str = "Company Card(4)";
            break;
        case 5:
            str = "Manufacturing Card(5)";
            break;
        case 6:
            str = "Vehicle Unit(6)";
            break;
        case 7:
            str = "Motion Sensor(7)";
            break;
        default:
            str = "RFU(8....255)";
            break

    }
    return str
}
function NationNumeric(buffer,start,size){
    var cadena="";
    switch(buffer[start]){
        case 0x00:cadena="No hay informacion disponible (00)H";break;
        case 0x01:cadena="Austria (01)H";break;
        case 0x02:cadena="Albania (02)H";break;
        case 0x03:cadena="Andorra (03)H";break;
        case 0x04:cadena="Armenia (04)H";break;
        case 0x05:cadena="Azerbaiyan (05)H";break;
        case 0x06:cadena="Belgica (06)H";break;
        case 0x07:cadena="Bulgaria (07)H";break;
        case 0x08:cadena="Bosnia y Hercegovina (08)H";break;
        case 0x09:cadena="Bielorrusia (09)H";break;
        case 0x0a:cadena="Suiza (0A)H";break;
        case 0x0b:cadena="Chipre (0B)H";break;
        case 0x0c:cadena="Republica Checa (0C)H";break;
        case 0x0d:cadena="Alemania (0D)H";break;
        case 0x0e:cadena="Dinamarca (0E)H";break;
        case 0x0f:cadena="España (0F)H";break;
        case 0x10:cadena="Estonia (10)H";break;
        case 0x11:cadena="Francia (11)H";break;
        case 0x12:cadena="Finlandia (12)H";break;
        case 0x13:cadena="Liechtenstein (13)H";break;
        case 0x14:cadena="Islas Feroe (14)H";break;
        case 0x15:cadena="Reino Unido (15)H";break;
        case 0x16:cadena="Georgia (16)H";break;
        case 0x17:cadena="Grecia (17)H";break;
        case 0x18:cadena="Hungria (18)H,";break;
        case 0x19:cadena="Croacia (19)H";break;
        case 0x1a:cadena="Italia (1A)H";break;
        case 0x1b:cadena="poikl Irlanda (1B)H";break;
        case 0x1c:cadena="Islandia (1C)H";
        case 0x1d:cadena=" Kazajistan (1D)H";break;
        case 0x1e:cadena="Luxemburgo (1E)H";break;
        case 0x1f:cadena="Lituania (1F)H";break;
        case 0x20:cadena="Letonia (20)H";break;
        case 0x21:cadena="Malta (21)H";break;
        case 0x22:cadena="Monaco (22)H";break;
        case 0x23:cadena="Republica de Moldavia (23)H";break;
        case 0x24:cadena="Macedonia (24)H";break;
        case 0x25:cadena="Noruega (25)H";break;
        case 0x26:cadena="Paises Bajos (26)H";break;
        case 0x27:cadena="Portugal (27)H";break;
        case 0x28:cadena="Polonia (28)H";break;
        case 0x29:cadena="Rumania (29)H";break;
        case 0x2a:cadena="San Marino (2A)H";break;
        case 0x2b:cadena="Federacion Rusa (2B)H";break;
        case 0x2c:cadena="Suecia (2C)H";break;
        case 0x2d:cadena="Eslovaquia (2D)H";break;
        case 0x2e:cadena="Eslovenia (2E)H";break;
        case 0x2f:cadena="Turkmenistan (2F)H";break;
        case 0x30:cadena="Turquia (30)H";break;
        case 0x31:cadena="Ucrania (31)H";break;
        case 0x32:cadena="Vaticano (32)H";break;
        case 0x33:cadena="Yugoslavia (33)H";break;
        case 0xFC:cadena="RFU (34..FC)H";break;
        case 0xfd:cadena="Comunidad Europea (FD)H";break;
        case 0xfe:cadena="Resto de Europa (FE)H";break;
        case 0xff:cadena="Resto del mundo (FF)H";break;
    }

    return cadena;
}
function EventFaultType(buffer,start,size){
    var str="";
    switch (buffer[start]) {
        //0xIncidentes de carácter general,
        case 0x00:str="No hay más información";break;
        case 0x01:str="Inserción de una tarjeta no válida";break;
        case 0x02:str="Conflicto de tarjetas";break;
        case 0x03:str="Solapamiento temporal";break;
        case 0x04:str="Conducción sin tarjeta adecuada";break;
        case 0x05:str="Inserción de tarjeta durante la conducción";break;
        case 0x06:str="Error al cerrar la última sesión de la tarjeta";break;
        case 0x07:str="Exceso de velocidad";break;
        case 0x08:str="Interrupción del suministro eléctrico";break;
        case 0x09:str="Error en datos de movimiento";break;
        case 0x0a:str="Conflicto de movimiento del vehículo";break;
        //′0B′H .. ′0F′H RFU,
        //′1x′H Intentos de violación de la seguridad relacionados con la unidad intravehicular,
        case 0x10:str="No hay más información";break;
        case 0x11:str="Fallo de autentificación del sensor de movimiento";break;
        case 0x12:str="Fallo de autentificación de la tarjeta de tacógrafo";break;
        case 0x13:str="Cambio no autorizado del sensor de movimiento";break;
        case 0x14:str="Error de integridad en la entrada de los datos de la tarjeta";break;
        case 0x15:str="Error de integridad en los datos de usuario almacenados";break;
        case 0x16:str="Error en una transferencia interna de datos";break;
        case 0x17:str="Apertura no autorizada de la carcasa";break;
        case 0x18:str="Sabotaje del hardware";break;
        //′19′H .. ′1F′H RFU
        //′2x′H Intentos de violación de la seguridad relacionados con el sensor,
        case 0x20:str="No hay más información";break;
        case 0x21:str="Fallo de autentificación";break;
        case 0x22:str="Error de integridad en los datos almacenados";break;
        case 0x23:str="Error en una transferencia interna de datos";break;
        case 0x24:str="Apertura no autorizada de la carcasa";break;
        case 0x25:str="Sabotaje del hardware";break;
        // ′26′H .. ′2F′H RFU,
        // ′3x′H Fallos del aparato de control
        case 0x30:str="No hay más información";break;
        case 0x31:str="Fallo interno de la VU";break;
        case 0x32:str="Fallo de la impresora";break;
        case 0x33:str="Fallo de la pantalla";break;
        case 0x34:str="Fallo de transferencia";break;
        case 0x35:str="Fallo del sensor";break;
        //′36′H .. ′3F′H RFU
        //′4x′H	Fallos de las tarjetas
        case 0x40:str="No hay más información";break;
        //′41′H .. ′4F′H RFU
        //′50′H .. ′7F′H RFU
        //′80′H .. ′FF′H Específicos del fabricante
        default:
            if (buffer[start]>0x80){
                str="Específicos del fabricante";
            }else{
                str="RFU";
            }
            break;
    }
    return str;


}
function ControlType(buffer,start,size){
    var bits = [];
    for (var i = 7; i >= 0; i--) {
        var bit = buffer[start] & (1 << i) ? 1 : 0;
        bits.push(bit);
    }

    var c,v,p,d;
    c=bits[0];
    v=bits[1];
    p=bits[2];
    d=bits[3];

    //'c'B transferencia de los datos de la tarjeta:
    c=(c==0)?"datos de la tarjeta no transferidos durante esta actividad de control":
        "datos de la tarjeta transferidos durante esta actividad de control";
    //'v'B transferencia de los datos de la VU:
    v=(v==0)?"datos de la VU no transferidos durante esta actividad de control":
        "datos de la VU transferidos durante esta actividad de control";
    // 'p'B impresi�n:
    p=(p==0)?"no se imprimen datos durante esta actividad de control":
        "se imprimen datos durante esta actividad de control";
    // 'd'B visualizaci�n:
    d=(v==0)?"no se visualizan datos durante esta actividad de control":
        "se visualizan datos durante esta actividad de control";

    return {c:c,v:v,p:p,d:d}
}
function EntryTypeDailyWorkPeriod(buffer,start,size){
    var str="";
    switch (bytestoNumber(buffer,start,size)){
        case 0: str="Begin: card insertion time or time of entry ";break;
        case 1: str="End: card with drawal time or time of entry ";break;
        case 2: str="Begin: card withdrawal time or time of entry ";break;
        case 3: str="End: related time manually entered (end of work period) ";break;
        case 4: str="Begin: related time assumed by VU";break;
        case 5: str="related time assumed by VU";break;
        default: str=bytestoNumber(buffer,start,size)
    }
    return str
}
function RegionNumeric(buffer,start,size){
    var str="";
    switch (buffer[start]) {
        case 0x01:
            str = "Andalucia";
            break;
        case 0x02:
            str = "Aragon";
            break;
        case 0x03:
            str = "Asturias";
            break;
        case 0x04:
            str = "Cantabria";
            break;
        case 0x05:
            str = "Cataluña";
            break;
        case 0x06:
            str = "Castilla-Leon";
            break;
        case 0x07:
            str = "Castilla-La-Mancha";
            break;
        case 0x08:
            str = "Valencia";
            break;
        case 0x09:
            str = "Extremadura";
            break;
        case 0x0A:
            str = "Galicia";
            break;
        case 0x0B:
            str = "Baleares";
            break;
        case 0x0C:
            str = "Canarias";
            break;
        case 0x0D:
            str = "La Rioja";
            break;
        case 0x0E:
            str = "Madrid";
            break;
        case 0x0F:
            str = "Murcia";
            break;
        case 0x10:
            str = "Navarra";
            break;
        case 0x11:
            str = "Pais Vasco";
            break
    }
    return str;
}
function ManualInputFlag(buffer,start,size){
    return (buffer[start]==0)?"noEntry (0)":"manualEntries (1)"
}
function SpecificConditionType(buffer,start,size){
    var str;
    switch (buffer[start]){
    case 0x00: str="RFU"; break;
    case 0x01: str="Fuera de ambito-Comienzo";break;
    case 0x02: str="Fuera de ambito-Final";break;
    case 0x03: str="Puente/Paso a nivel";break;
    default: str="RFU";
    }
    return str
}
function CalibrationPurpose(buffer,start,size) {
    var str = "";
    switch (buffer[start]) {
        case 0x00:
            str = "valor reservado";
            break;
        case 0x01:
            str = "activación: registro de los parámetros de calibrado conocidos en el momento de la activación de la VU";
            break;
        case 0x02:
            str = "primera instalación: primer calibrado de la VU después de su activación";
            break;
        case 0x03:
            str = "instalación: primer calibrado de la VU en el vehículo actual";
            break;
        case 0x04:
            str = "control periódico";
            break;
        default:
            break;
    }
    return str;
}
function EventFaultRecordPurpose(buffer,start,size){
    var str="";
    switch (buffer[start]) {
        case 0x00:str="uno de los 10 incidentes o fallos más recientes (o de los 10 últimos)";break;
        case 0x01:str="el incidente de más duración ocurrido en uno de los 10 últimos días en que se hayan producido incidentes de este tipo";break;
        case 0x02:str=" uno de los 5 incidentes de más duración ocurridos en los últimos 365 días";break;
        case 0x03:str="el último incidente ocurrido en uno de los 10 últimos días en que se hayan producido incidentes de este tipo";break;
        case 0x04:str="el incidente más grave en uno de los últimos días en que se hayan producido incidentes de este tipo";break;
        case 0x05:str="uno de los 5 incidentes más graves ocurridos en los últimos 365 días";break;
        case 0x06:str="el primer incidente o fallo ocurrido tras el último calibrado";break;
        case 0x07:str="un incidente o fallo activo/en curso";break;
        default:
            str="RFU";
            break;
    }
    return str;

}

function ActivityDailyRecords(buffer,start,obj,properties,sizeBlock){
    var array=[];
    if(obj.activityPointerNewestRecord<obj.activityPointerOldestDayRecord){
        var buffer1=buffer.slice(start+obj.activityPointerOldestDayRecord,start+sizeBlock-4);
        var buffer2=buffer.slice(start,start+obj.activityPointerNewestRecord);
        var tmp = new Uint8Array(buffer1.length + buffer2.length);
        tmp.set(new Uint8Array(buffer1), 0);
        tmp.set(new Uint8Array(buffer2), buffer1.length);
        array = ActivityDailyRecord(tmp,0,sizeBlock,[],{},properties.properties)
    }else{
        var begin=start + obj.activityPointerOldestDayRecord+4;
        var end=start + obj.activityPointerNewestRecord + 4 - obj.activityPointerOldestDayRecord + 4;
        array = ActivityDailyRecord(buffer,begin,end,[],{},properties.properties)
    }

    return  array

}
function ActivityDailyRecord(buffer,start,end,array,obj,properties){
    var obj=blockProperties(properties,0,buffer,start,{},0);
    if(obj.activityRecordLength>0)
        array.push(obj);

    return (obj.activityRecordLength==0)?array:
            ActivityDailyRecord(buffer,start+obj.activityRecordLength,end,array,obj,properties)
}

function ActivityChangeInfo(buffer,start,size,obj){
   var end=(obj.activityRecordLength)?obj.activityRecordLength-14:(obj.noOfActivityChanges*2)-2;
   return propertieActivityChangeInfo(buffer,start,start+end,[],obj)
}
function propertieActivityChangeInfo(buffer,start,end,arrayChangeInfo){
    var bits = [0,0,0,0,0,0,0,0];
    var bytes=bits.map(function(e,i,a){return buffer[start] & (1 << i) ? 1 : 0;}).reverse().
    concat(bits.map(function(e,i,a){return buffer[start+1] & (1 << i) ? 1 : 0;}).reverse());
    var s,c,p,aa,t;
    s=bytes[0];
    c=bytes[1];
    p=bytes[2];
    aa=bytes[3].toString()+bytes[4].toString();

    t=parseInt(bytes.slice(5,16).join(""),2);

    s=(s==0)?"conductor":"segundo conductor";
    if (p==0){
        c=(s==0)?"solitario":"en equipo";
    }else{
        c=(s==0)?"indeterminado":"entrada manual";
    }
    p=(p==0)?"insertada":"no insertada";
    switch(aa) {
        case "00":
            aa = "PAUSA/DESCANSO";
            break;
        case "01":
            aa = "DISPONIBILIDAD";
            break;
        case "10":
            aa = "TRABAJO";
            break;
        case "11":
            aa = "CONDUCCIÓN";
            break;
    }
    arrayChangeInfo.push({s:s,c:c,p:p,aa:aa,t:t});
    return start>end-2?arrayChangeInfo:
        propertieActivityChangeInfo(buffer,start+2,end,arrayChangeInfo)
}
function blockProperties(properties,i,buffer,start,obj,sizeBlock){
    var name,end;
    try{
        if (i < properties.length) {
            name = properties[i].name;
            end = properties[i].size;

            switch (properties[i].type){
                case "Object":
                    obj[name] = blockProperties(properties[i].properties, 0, buffer, start, {});
                    switch (name){
                        case "vuCompanyLocksData":
                            //noinspection JSUnresolvedVariable
                            end = (obj.vuCompanyLocksData.noOfLocks == 0) ? size_vu.NOOFLOCKS:(obj.vuCompanyLocksData.noOfLocks * size_vu.VUCOMPANYLOCKSRECORD)+size_vu.NOOFLOCKS;
                            break;
                        case "vuControlActivityData":
                            end = (obj.vuControlActivityData.noOfControls==0)? size_vu.NOOFCONTROLS:(obj.vuControlActivityData.noOfControls * size_vu.VUCONTROLACTIVITYRECORD)+size_vu.NOOFCONTROLS;
                            break;
                        case "vuCardIwData":
                            end = (obj.vuCardIwData.noOfVuCardIwRecords==0)? size_vu.NOOFVUCARDIWRECORDS:(obj.vuCardIwData.noOfVuCardIwRecords* size_vu.VUCARDIWRECORD)+size_vu.NOOFVUCARDIWRECORDS;
                            break;
                        case "vuActivityDailyData":
                            end = (obj.vuActivityDailyData.noOfActivityChanges==0)?size_vu.NOOFACTIVITYCHANGES:(obj.vuActivityDailyData.noOfActivityChanges * size_vu.ACTIVITYCHANGEINFO)+size_vu.NOOFACTIVITYCHANGES;
                            break;
                        case "vuPlaceDailyWorkPeriodData":
                            end = (obj.vuPlaceDailyWorkPeriodData.noOfPlaceRecords==0)?size_vu.NOOFPLACERECORDS:(obj.vuPlaceDailyWorkPeriodData.noOfPlaceRecords * size_vu.VUPLACEDAILYWORKPERIODRECORD)+size_vu.NOOFPLACERECORDS;
                            break;
                        case "vuSpecificConditionData":
                            end = (obj.vuSpecificConditionData.noOfSpecificConditionsRecords==0)?size_vu.NOOFSPECIFICCONDITIONSRECORDS:(obj.vuSpecificConditionData.noOfSpecificConditionsRecords * size_vu.VUSPECIFICCONDITIONDATA)+size_vu.NOOFSPECIFICCONDITIONSRECORDS;
                            break;
                        case "vuCalibrationData":
                            end = (obj.vuCalibrationData.noOfVuCalibrationRecords==0)?size_vu.NOOFVUCALIBRATIONRECORDS:(obj.vuCalibrationData.noOfVuCalibrationRecords * size_vu.VUCALIBRATIONRECORD)+size_vu.NOOFVUCALIBRATIONRECORDS;
                            break;
                        case "vuFaultData":
                            end = (obj.vuFaultData.noOfVuFaults==0)?size_vu.NOOFVUFAULTS:(obj.vuFaultData.noOfVuFaults * size_vu.VUFAULTRECORD)+size_vu.NOOFVUFAULTS;
                            break;
                        case "vuEventData":
                            end = (obj.vuEventData.noOfVuEvents==0)?size_vu.NOOFVUEVENTS:(obj.vuEventData.noOfVuEvents * size_vu.VUEVENTRECORD)+size_vu.NOOFVUEVENTS;
                            break;
                        case "vuOverSpeedingEventData":
                            end = (obj.vuOverSpeedingEventData.noOfVuOverSpeedingEvents==0)?size_vu.NOOFVUOVERSPEEDINGEVENTS:(obj.vuOverSpeedingEventData.noOfVuOverSpeedingEvents * size_vu.VUOVERSPEEDINGEVENTRECORD)+size_vu.NOOFVUOVERSPEEDINGEVENTS;
                            break;
                        case "vuTimeAdjustmentData":
                            end = (obj.vuTimeAdjustmentData.noOfVuTimejustmentRecord==0)?size_vu.NOOFVUTIMEADJUSTMENTRECORDS:(obj.vuTimeAdjustmentData.noOfVuTimejustmentRecord * size_vu.VUTIMEADJUSTMENTRECORD)+size_vu.NOOFVUTIMEADJUSTMENTRECORDS;
                            break;
                        case "vuDetailedSpeedData":
                            end = (obj.vuDetailedSpeedData.noOfSpeedBlocks==0)?size_vu.NOOFSPEEDBLOCKS:(obj.vuDetailedSpeedData.noOfSpeedBlocks * size_vu.VUDETAILEDSPEEDBLOCK)+size_vu.NOOFSPEEDBLOCKS;
                            break

                    }
                    break;
                case "Activity":
                    obj[name] = ActivityDailyRecords(buffer,start,obj,properties[i],sizeBlock);
                    break;
                case "size":
                    obj[name]=start;
                    break;
                case "vuActivityDailyRecord":
                    end = start + (properties[i].size * obj.noOfVuCardIwRecords);
                    break;
                case "ActivityChangeInfo":
                    obj[name] = ActivityChangeInfo(buffer,start,end,obj);
                    end= (obj.noOfActivityChanges==0)?size_vu.NOOFACTIVITYCHANGES:(properties[i].size*obj.noOfActivityChanges)+size_vu.NOOFACTIVITYCHANGES;
                    break;
                case "Array":
                    switch (name){
                        case "cardVehicleRecords":
                            end = start + (properties[i].size * (obj.vehiclePointerNewestRecord - 2));
                            break;
                        case "placeRecords":
                            end = start + (properties[i].size * (obj.placePointerNewestRecord - 2));
                            break;
                        case "vuCardIwRecord":
                            end = start + (properties[i].size * obj.noOfVuCardIwRecords)-obj.noOfVuCardIwRecords;
                            break;
                        case "vuPlaceDailyWorkerPeriodRecord":
                            end = start + (properties[i].size * obj.noOfPlaceRecords);
                            break;
                        case "vuCompanyLocksRecord":
                            end = start + (properties[i].size * obj.noOfLocks);
                            break;
                        case "vuConrolActivityRecord":
                            end = start + (properties[i].size * obj.noOfControls);
                            break;
                        case "specificConditionRecord":
                            end = start + (properties[i].size * obj.noOfSpecificConditionsRecords);
                            break;
                        case "vuCalibrationRecord":
                            end = start + (properties[i].size * obj.noOfVuCalibrationRecords);
                            break;
                        case "vuFaultRecord":
                            end = start + (properties[i].size * obj.noOfVuFaults);
                            break;
                        case "vuEventRecord":
                            end = start + (properties[i].size * obj.noOfVuEvents);
                            break;
                        case "vuOverSpeedingEventRecord":
                            end = start + (properties[i].size * obj.noOfVuOverSpeedingEvents);
                            break;
                        case "vuTimeAdjustmentData":
                            end = start + (properties[i].size * obj.noOfVuTimejustmentRecord);
                            break;
                        case "vuDetailedSpeedBlock":
                            end = start + (properties[i].size * obj.noOfSpeedBlocks);
                            break;
                        default:
                            end=start + sizeBlock;
                            break
                    }
                    obj[name] = execute.call(null,getFn(properties[i].type),buffer, start , properties[i].size,end ,properties[i].properties,[],sizeBlock);
                    start=end;
                    end=0;
                    break;
                default:
                    obj[name] = execute.call(null,getFn(properties[i].type),buffer, start , properties[i].size,obj);
                    break
            }
        }
        return i>=properties.length-1 ?
            obj:
            blockProperties(properties,i+1,buffer,start+end,obj,sizeBlock)
    }catch(ex){
        console.log(ex+" in properties "+properties[i].name+" size:"+properties[i].size);
        console.log("stack "+ex.stack)
    }

}
module.exports=function(buffer){
    var b={};
    if (buffer[0] != 0x76) {
        b = cardBlock(buffer, 0, {});
        console.log();
    } else {
        b = vuBlock(buffer, 0, {});
    }
    return b
};
function vuBlock(buffer, start, obj) {
    if(buffer[start]==0x76){
        var trep = bytestoNumber(buffer, start, 2);
        start+=2;
        if (trep > 0x7600 && trep < 0x7606) {
            switch (trep) {
                case 0x7602:
                    if(!obj[TAG[trep].block])
                        obj[TAG[trep].block]=[];
                    obj[TAG[trep].block].push(blockProperties(TAG[trep].properties, 0, buffer, start, {},0));
                    start=obj[TAG[trep].block][obj[TAG[trep].block].length-1].size;
                    break;
                default:
                    obj[TAG[trep].block]=blockProperties(TAG[trep].properties, 0, buffer, start, {},0);
                    start=obj[TAG[trep].block].size
            }

        }
    }else{
        start++
    }

    size_buffer=(typeof buffer==="object")?Object.keys(buffer).length:
        (typeof buffer==="array")?buffer.length:null;
    return (start >=  size_buffer - 2) ? obj : vuBlock(buffer, start, obj)
}
var cardBlock=function(buffer,i,obj){
    var name;
    var fid=bytestoNumber(buffer,i,2);
    i+=2;
    var typeFile=buffer[i];
    i++;
    var size=bytestoNumber(buffer,i,2);
    i+=2;
    console.log("fid: \%h",fid);
    if(i<buffer.length-1) {
        if (TAG[fid]) {
            if(typeFile==0){
                name=TAG[fid].block;
                obj[name] = blockProperties(TAG[fid].properties, 0, buffer, i, {},size)
            }
        } else {
            console.error("error fid no encontrado")
        }
    }
    return i>buffer.length-1?
        obj
        :
        cardBlock(buffer,i+size,obj)
};
function execute(fn,buffer,start,size,i,end,properties,array,sizeBlock){
    if(typeof fn!= "function"){
        console.log()

    }
    return fn.call(null,buffer,start,size,i,end,properties,array,sizeBlock)
}