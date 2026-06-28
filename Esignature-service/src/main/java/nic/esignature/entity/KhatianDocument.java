package nic.esignature.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
@Entity
@Table(name = "khatian_documents")

public class KhatianDocument {
    @Id
    private UUID id;

    @Column(name = "khatian_no")
    private String khatianNo;

    @Column(name = "village_code")
    private String villageCode;

    @Column(name = "district_code")
    private String districtCode;

    @Column(name = "file_name")
    private String fileName;


    @Column(name = "document_content", columnDefinition = "BYTEA")
    private byte[] documentContent;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    public void generateId() {
        if (id == null) {
            id = UUID.randomUUID();
        }

        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }

    // Getters and Setters

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

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

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public byte[] getDocumentContent() {
        return documentContent;
    }

    public void setDocumentContent(byte[] documentContent) {
        this.documentContent = documentContent;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
