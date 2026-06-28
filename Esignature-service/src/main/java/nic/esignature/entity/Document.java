package nic.esignature.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
@Entity
@Table(name = "documents")
public class Document {

        @Id
        private UUID documentId;

        @Column(name = "file_name")
        private String fileName;

        @Column(name = "mime_type")
        private String mimeType;


        @Column(name = "signature")
        private String signature;

        @Column(name = "uploaded_at")
        private LocalDateTime uploadedAt;
    @PrePersist
    public void generateId() {
        if (documentId == null) {
            documentId = UUID.randomUUID();
        }
    }

        public UUID getDocumentId() {
            return documentId;
        }

        public void setDocumentId(UUID documentId) {
            this.documentId = documentId;
        }

        public String getFileName() {
            return fileName;
        }

        public void setFileName(String fileName) {
            this.fileName = fileName;
        }

        public String getMimeType() {
            return mimeType;
        }

        public void setMimeType(String mimeType) {
            this.mimeType = mimeType;
        }


        public LocalDateTime getUploadedAt() {
            return uploadedAt;
        }

        public void setUploadedAt(LocalDateTime uploadedAt) {
            this.uploadedAt = uploadedAt;
        }
    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }
}
