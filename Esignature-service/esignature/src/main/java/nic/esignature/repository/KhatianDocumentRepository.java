package nic.esignature.repository;
import nic.esignature.entity.KhatianDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
@Repository

public interface KhatianDocumentRepository
        extends JpaRepository<KhatianDocument, UUID> {
    Optional<KhatianDocument>
    findByKhatianNoAndVillageCodeAndDistrictCode(
            String khatianNo,
            String villageCode,
            String districtCode
    );
}
