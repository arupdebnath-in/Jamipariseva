package nic.esignature.services;
import nic.esignature.dto.KhatianResponse;
import nic.esignature.entity.KhatianDocument;
import nic.esignature.repository.KhatianDocumentRepository;
import org.springframework.stereotype.Service;
import java.util.Base64;

@Service
public class KhatianService {
    private final KhatianDocumentRepository repository;

    public KhatianService(
            KhatianDocumentRepository repository) {
        this.repository = repository;
}
    public KhatianResponse getKhatianDocument(
            String khatianNo,
            String villageCode,
            String districtCode) {

        KhatianDocument document =
                repository
                        .findByKhatianNoAndVillageCodeAndDistrictCode(
                                khatianNo,
                                villageCode,
                                districtCode)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Document not found"));

        String base64 =
                Base64.getEncoder()
                        .encodeToString(
                                document.getDocumentContent());

        KhatianResponse response =
                new KhatianResponse();

        response.setDocumentId(
                document.getId().toString());

        response.setFileName(
                document.getFileName());

        response.setBase64Document(base64);

        return response;
    }
}
