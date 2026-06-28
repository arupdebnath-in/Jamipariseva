package nic.esignature.repository;
import nic.esignature.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
public interface DocumentRepository extends JpaRepository<Document, UUID> {
}
