package nic.esignature.dto;

public class KhatianRequest {
    private String khatianNo;
    private String villageCode;
    private String districtCode;

    public String getKhatianNo() {
        return khatianNo;
    }

    public void setKhatianNo(String khatianNo) {
        this.khatianNo = khatianNo;
    }

    public String getVillageCode() {
        return villageCode;
    }

    public void setVillageCode(String villageCode) {
        this.villageCode = villageCode;
    }

    public String getDistrictCode() {
        return districtCode;
    }

    public void setDistrictCode(String districtCode) {
        this.districtCode = districtCode;
    }
}
